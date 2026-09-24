import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { fetchAvitoRanges, rangesOverlap } from '@/lib/ics'
import { spaSurcharge } from '@/lib/site'
import { isWeekendNight, priceForNight, type AvailabilitySettings, type SeasonalPrice } from '@/lib/availability'

/** Больше двадцати топок за заезд — явная ошибка ввода, а не заказ. */
const MAX_SPA_SESSIONS = 20

function formatDate(iso: string) {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

function formatRub(n: number) {
  return n.toLocaleString('ru-RU') + ' ₽'
}

function seasonWidth(from: string, to: string): number {
  const [fm, fd] = from.split('-').map(Number)
  const [tm, td] = to.split('-').map(Number)
  const fromDay = fm * 31 + fd
  const toDay = tm * 31 + td
  return toDay >= fromDay ? toDay - fromDay : (12 * 31 + 31) - fromDay + toDay
}

function minimumNightsForDate(d: Date, seasons: SeasonalPrice[], fallback: number): number {
  const key = `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  const matching = seasons.filter((s) =>
    s.date_from <= s.date_to
      ? key >= s.date_from && key <= s.date_to
      : key >= s.date_from || key <= s.date_to,
  )
  return Math.max(fallback, ...matching.map((s) => s.minimum_nights ?? 1))
}

type NightInfo = { date: Date; price: number; weekend: boolean }

function calcPrice(
  arrival: string,
  departure: string,
  settings: AvailabilitySettings,
  seasons: SeasonalPrice[],
): { total: number; nights: number; nightsList: NightInfo[] } {
  const start = new Date(`${arrival}T00:00:00`)
  const end = new Date(`${departure}T00:00:00`)
  const nights = Math.round((end.getTime() - start.getTime()) / 86_400_000)
  let total = 0
  const nightsList: NightInfo[] = []

  for (let i = 0; i < nights; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const price = priceForNight(d, seasons, settings)
    total += price
    nightsList.push({ date: d, price, weekend: isWeekendNight(d) })
  }

  return { total, nights, nightsList }
}

/** Группирует ночи по фактической цене — так разбивка всегда сходится с итогом */
function buildPriceBreakdown(nightsList: NightInfo[]): string[] {
  const groups = new Map<string, { price: number; count: number; weekend: boolean }>()
  for (const n of nightsList) {
    const key = `${n.price}|${n.weekend ? 'w' : 'b'}`
    const g = groups.get(key)
    if (g) g.count++
    else groups.set(key, { price: n.price, count: 1, weekend: n.weekend })
  }
  return [...groups.values()]
    .sort((a, b) => b.price - a.price)
    .map(
      (g) =>
        `   ${g.weekend ? 'Выходные' : 'Будни'}: ${g.count} н. × ${formatRub(g.price)} = ${formatRub(g.count * g.price)}`,
    )
}

function nightsWord(n: number) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'ночь'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'ночи'
  return 'ночей'
}

async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string,
  inlineKeyboard?: object,
) {
  if (!token || !chatId) return
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      ...(inlineKeyboard ? { reply_markup: { inline_keyboard: inlineKeyboard } } : {}),
    }),
  }).catch((e) => console.error('[telegram] send error:', e))
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { arrival, departure, guests, name, phone, comment, spaSessions } = body

    if (!arrival || !departure || !name || !phone) {
      return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
    }

    // Количество топок бани приходит от клиента, поэтому нормализуем его сами:
    // целое число в разумных границах, цену берём только серверную.
    const spaCount = Number.isFinite(Number(spaSessions))
      ? Math.min(MAX_SPA_SESSIONS, Math.max(0, Math.trunc(Number(spaSessions))))
      : 0

    const supabase = createServiceClient()

    // --- Load the same pricing/settings source as /api/availability ---
    const [
      { data: pricingRow, error: pricingError },
      { data: settings, error: settingsError },
      { data: seasons, error: seasonsError },
    ] = await Promise.all([
      supabase
        .from('settings')
        .select('base_price, weekend_price, price_mode, minimum_nights, extra_guest_price, base_guests, max_guests')
        .eq('id', 1)
        .single(),
      supabase
        .from('settings')
        .select('telegram_bot_token, telegram_chat_id, avito_ics_url, site_url')
        .eq('id', 1)
        .single(),
      supabase
        .from('seasonal_prices')
        .select('*')
        .eq('active', true)
        .order('sort_order'),
    ])

    if (pricingError) console.error('[booking] pricing settings error:', pricingError.message)
    if (settingsError) console.error('[booking] telegram settings error:', settingsError.message)
    if (seasonsError) console.error('[booking] seasonal prices error:', seasonsError.message)

    const pricingSettings: AvailabilitySettings = {
      base_price: pricingRow?.base_price ?? 20000,
      weekend_price: pricingRow?.weekend_price ?? 24000,
      extra_guest_price: pricingRow?.extra_guest_price ?? 1650,
      cleaning_fee: 0,
      minimum_nights: pricingRow?.minimum_nights ?? 1,
      base_guests: pricingRow?.base_guests ?? 8,
      max_guests: pricingRow?.max_guests ?? 15,
      // Normalize the database value so whitespace/casing cannot silently disable a season.
      price_mode: String(pricingRow?.price_mode ?? 'base').trim().toLowerCase() === 'seasonal' ? 'seasonal' : 'base',
    }
    const extraGuestPrice = pricingSettings.extra_guest_price
    const baseGuests = pricingSettings.base_guests
    const maxGuests = pricingSettings.max_guests
    const guestsCount = parseInt(guests) || 1

    // Validate guest count
    if (guestsCount > maxGuests) {
      return NextResponse.json(
        { ok: false, error: 'too_many_guests', max: maxGuests },
        { status: 400 },
      )
    }

    const botToken = settings?.telegram_bot_token ?? ''
    const chatId = settings?.telegram_chat_id ?? ''
    const avitoUrl = settings?.avito_ics_url ?? ''
    const siteUrl = settings?.site_url ?? ''

    // --- Check Supabase confirmed bookings ---
    const { data: existing } = await supabase
      .from('bookings')
      .select('check_in, check_out')
      .eq('status', 'confirmed')

    const supabaseConflict = (existing ?? []).some((b) =>
      rangesOverlap(arrival, departure, b.check_in, b.check_out),
    )
    if (supabaseConflict) {
      return NextResponse.json({ ok: false, error: 'dates_unavailable' }, { status: 409 })
    }

    // --- Check Avito ICS ---
    const { ranges: avitoRanges, error: icsError } = await fetchAvitoRanges(avitoUrl)
    if (icsError && avitoRanges.length === 0 && avitoUrl) {
      // ICS completely unreachable — safer to block
      return NextResponse.json({ ok: false, error: 'availability_unknown' }, { status: 503 })
    }
    const avitoConflict = avitoRanges.some((r) => rangesOverlap(arrival, departure, r.start, r.end))
    if (avitoConflict) {
      return NextResponse.json({ ok: false, error: 'dates_unavailable' }, { status: 409 })
    }

    // --- Calculate price ---
    const activeSeasons = pricingSettings.price_mode === 'seasonal' ? (seasons ?? []) : []
    const { total: accommodationTotal, nights, nightsList } = calcPrice(
      arrival,
      departure,
      pricingSettings,
      activeSeasons,
    )
    const minimumNights = Math.max(
      pricingSettings.minimum_nights,
      ...nightsList.map((night) => minimumNightsForDate(night.date, activeSeasons, pricingSettings.minimum_nights)),
    )
    if (nights < minimumNights) {
      return NextResponse.json(
        { ok: false, error: 'minimum_nights', minimum_nights: minimumNights },
        { status: 400 },
      )
    }
    const extraGuests = Math.max(0, guestsCount - baseGuests)
    const extraGuestTotal = extraGuests * extraGuestPrice * nights
    const spaTotal = spaCount * spaSurcharge.price
    const total = accommodationTotal + extraGuestTotal + spaTotal

    // Баня — допуслуга, отдельного поля в bookings нет, поэтому дописываем её
    // в комментарий: так заказ виден и в админке, и в выгрузке.
    const spaNote = spaCount > 0 ? `Баня и чан: ${spaCount} × ${formatRub(spaSurcharge.price)} = ${formatRub(spaTotal)}` : null
    const fullComment = [comment?.trim() || null, spaNote].filter(Boolean).join('\n') || null

    // --- Save to Supabase ---
    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert({
        guest_name: name.trim(),
        phone: phone.trim(),
        guests_count: parseInt(guests) || 1,
        check_in: arrival,
        check_out: departure,
        total_price: total,
        comment: fullComment,
        source: 'site',
        status: 'pending',
      })
      .select('id')
      .single()

    if (insertError) {
      console.error('[booking] Insert error:', insertError.message)
      return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
    }

    const bookingId = booking?.id

    // --- Send Telegram notification ---
    const priceLines = [
      `💰 *Стоимость:*`,
      ...buildPriceBreakdown(nightsList),
      extraGuests > 0
        ? `   Доп. гостей: ${extraGuests} × ${formatRub(extraGuestPrice)} × ${nights} н. = ${formatRub(extraGuestTotal)}`
        : null,
      spaCount > 0
        ? `   Баня и чан: ${spaCount} × ${formatRub(spaSurcharge.price)} = ${formatRub(spaTotal)}`
        : null,
      `   Итого за ${nights} ${nightsWord(nights)}: *${formatRub(total)}*`,
    ].filter(Boolean)

    const text = [
      '🏡 *Новая заявка на бронирование*',
      '',
      `📅 Заезд: *${formatDate(arrival)}*`,
      `📅 Выезд: *${formatDate(departure)}*`,
      `👥 Гостей: *${guests}*`,
      spaCount > 0 ? `🔥 Баня и чан: *${spaCount} ${spaCount === 1 ? 'топка' : spaCount < 5 ? 'топки' : 'топок'}*` : null,
      '',
      ...priceLines,
      '',
      `👤 Имя: *${name.trim()}*`,
      `📞 Телефон: *${phone.trim()}*`,
      comment ? `💬 Комментарий: ${comment.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    const confirmUrl = siteUrl
      ? `${siteUrl}/api/telegram/confirm?id=${bookingId}&action=confirm`
      : null
    const cancelUrl = siteUrl
      ? `${siteUrl}/api/telegram/confirm?id=${bookingId}&action=cancel`
      : null

    const keyboard =
      confirmUrl && cancelUrl
        ? [[
            { text: '✅ Подтвердить', url: confirmUrl },
            { text: '❌ Отклонить', url: cancelUrl },
          ]]
        : null

    await sendTelegramMessage(botToken, chatId, text, keyboard ?? undefined)

    return NextResponse.json({ ok: true, id: bookingId })
  } catch (err) {
    console.error('[booking] Unexpected error:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
