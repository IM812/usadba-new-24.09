import { createServiceClient } from '@/lib/supabase/server'
import { getRates, type RateSettings } from '@/lib/rates'
import { contacts } from '@/lib/site'

export type FaqItem = { question: string; answer: string }

/**
 * Резервный список вопросов. Числа берутся из настроек базы,
 * чтобы ответы не расходились с ценами и правилами заезда.
 */
function fallbackFaq(s: RateSettings): FaqItem[] {
  return [
    {
      question: 'Сколько человек вмещает усадьба?',
      answer:
        `Усадьба рассчитана максимум на ${s.max_guests} гостей. В базовую стоимость входит проживание до ${s.base_guests} человек, за каждого дополнительного гостя предусмотрена доплата.`,
    },
    {
      question: 'Как далеко усадьба от Москвы и Петербурга?',
      answer:
        'Дорога из Москвы занимает около пяти часов, из Санкт-Петербурга — около четырёх. Усадьба находится в Новосокольническом районе Псковской области.',
    },
    {
      question: 'Что включено в стоимость аренды?',
      answer:
        'В стоимость входит аренда дома целиком, оборудованная кухня, Wi-Fi, постельное бельё и полотенца. После 8 гостей доплата составляет 1 650 ₽ за каждого гостя за ночь; баня и чан стоят 7 700 ₽ за топку; лодка и сап-борды оплачиваются отдельно, стоимость уточняется при бронировании.',
    },
    {
      question: 'Можно ли приехать с домашними животными?',
      answer:
        'Возможность приезда с питомцем согласуйте заранее — сообщите об этом при отправке заявки.',
    },
    {
      question: 'Есть ли минимальный срок аренды?',
      answer:
        s.minimum_nights === 1
          ? 'Минимальный срок аренды — одни сутки.'
          : `Минимальный срок аренды — ${s.minimum_nights} ночи.`,
    },
    {
      question: 'Как забронировать?',
      answer: `Выберите даты и отправьте заявку. Мы проверим доступность и подтвердим условия до оплаты. Быстрее всего ответим по телефону ${contacts.phoneLabel}.`,
    },
  ]
}

/** FAQ из базы; если таблица пуста — согласованный резервный список. */
export async function getFaq(): Promise<FaqItem[]> {
  const { settings } = await getRates()

  try {
    const supabase = createServiceClient()
    const { data } = await supabase
      .from('faq')
      .select('question, answer, sort_order')
      .order('sort_order', { ascending: true })

    if (data?.length) {
      const verifiedAnswers = new Map(
        fallbackFaq(settings).map((item) => [item.question, item.answer]),
      )

      return data.map((r) => ({
        question: r.question,
        answer: verifiedAnswers.get(r.question) ?? r.answer,
      }))
    }
  } catch {
    // тихо переходим на резервный список
  }

  return fallbackFaq(settings)
}
