import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { galleryPhotos } from '@/lib/site'
import { revalidatePath } from 'next/cache'

// GET is public — the gallery on the site reads from this
export async function GET() {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('gallery')
    .select('id,url,alt,sort_order,is_main,created_at')
    .order('sort_order', { ascending: true })

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  const normalizeUrl = (url: string) => url.trim()
  const isDeleted = (item: { sort_order: number | string | null }) => Number(item.sort_order) === -1
  const deletedUrls = new Set((data ?? []).filter(isDeleted).map((item) => normalizeUrl(item.url)))
  const savedByUrl = new Map(
    (data ?? []).filter((item) => !isDeleted(item)).map((item) => [normalizeUrl(item.url), item]),
  )
  const staticItems = galleryPhotos.filter((photo) => !deletedUrls.has(normalizeUrl(photo.src))).map((photo, index) => {
    const saved = savedByUrl.get(normalizeUrl(photo.src))
    return {
      id: saved?.id ?? `static:${encodeURIComponent(photo.src)}`,
      url: photo.src,
      alt: photo.alt,
      caption: saved ? saved.alt : photo.caption,
      category: photo.category,
      sort_order: saved?.sort_order ?? index,
      is_main: saved?.is_main ?? index === 0,
      created_at: saved?.created_at ?? '',
      persisted: Boolean(saved),
    }
  })

  const staticUrls = new Set(galleryPhotos.map((photo) => normalizeUrl(photo.src)))
  const uploadedItems = (data ?? [])
    .filter((item) => !isDeleted(item) && !staticUrls.has(normalizeUrl(item.url)))
    .map((item) => ({ ...item, caption: item.alt, persisted: true }))

  return NextResponse.json({ ok: true, data: [...staticItems, ...uploadedItems] })
}

export async function POST(req: NextRequest) {
  const authError = await requireAdminAuth(req)
  if (authError) return authError
  const supabase = createServiceClient()
  const body = await req.json()
  const { data, error } = await supabase.from('gallery').insert(body).select().single()
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, data })
}

export async function DELETE(req: NextRequest) {
  const authError = await requireAdminAuth(req)
  if (authError) return authError
  const supabase = createServiceClient()
  const { id } = await req.json()
  if (!id) return NextResponse.json({ ok: false, error: 'id required' }, { status: 400 })
  if (id.startsWith('static:')) {
    let url: string
    try {
      url = decodeURIComponent(id.slice('static:'.length))
    } catch {
      return NextResponse.json({ ok: false, error: 'Некорректный идентификатор фото' }, { status: 400 })
    }

    const { data: updated, error: updateError } = await supabase
      .from('gallery')
      .update({ alt: '', sort_order: -1, is_main: false })
      .eq('url', url)
      .select('id')

    if (updateError) return NextResponse.json({ ok: false, error: updateError.message }, { status: 500 })

    if (!updated?.length) {
      const { error: insertError } = await supabase
        .from('gallery')
        .insert({ url, alt: '', sort_order: -1, is_main: false })
      if (insertError) return NextResponse.json({ ok: false, error: insertError.message }, { status: 500 })
    }

    revalidatePath('/gallery')
    revalidatePath('/admin/settings/gallery')
    return NextResponse.json({ ok: true })
  }

  const { error } = await supabase.from('gallery').delete().eq('id', id)
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  revalidatePath('/gallery')
  revalidatePath('/admin/settings/gallery')
  return NextResponse.json({ ok: true })
}

export async function PATCH(req: NextRequest) {
  const authError = await requireAdminAuth(req)
  if (authError) return authError
  const supabase = createServiceClient()
  const body = await req.json()
  const { id, url, caption, ...rest } = body
  if (!id) return NextResponse.json({ ok: false, error: 'id required' }, { status: 400 })

  if (typeof caption === 'string' && caption.length > 160) {
    return NextResponse.json({ ok: false, error: 'Подпись не должна быть длиннее 160 символов' }, { status: 400 })
  }

  const updates = {
    ...rest,
    ...(typeof caption === 'string' ? { alt: caption.trim() } : {}),
  }

  if (id.startsWith('static:')) {
    if (!url) return NextResponse.json({ ok: false, error: 'url required' }, { status: 400 })
    const { data, error } = await supabase
      .from('gallery')
      .insert({ url, alt: typeof caption === 'string' ? caption.trim() : '', sort_order: 0, is_main: false })
      .select('id,url,alt,sort_order,is_main,created_at')
      .single()
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true, data: { ...data, caption: data.alt } })
  }

  const { data, error } = await supabase
    .from('gallery')
    .update(updates)
    .eq('id', id)
    .select('id,url,alt,sort_order,is_main,created_at')
    .single()
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, data: { ...data, caption: data.alt } })
}
