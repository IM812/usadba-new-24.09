import { NextResponse, type NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { galleryPhotos } from '@/lib/site'

// GET is public — the gallery on the site reads from this
export async function GET() {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('gallery')
    .select('id,url,alt,sort_order,is_main,created_at')
    .order('sort_order', { ascending: true })

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  const savedByUrl = new Map((data ?? []).map((item) => [item.url, item]))
  const staticItems = galleryPhotos.map((photo, index) => {
    const saved = savedByUrl.get(photo.src)
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

  const staticUrls = new Set(galleryPhotos.map((photo) => photo.src))
  const uploadedItems = (data ?? [])
    .filter((item) => !staticUrls.has(item.url))
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
  const { error } = await supabase.from('gallery').delete().eq('id', id)
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
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
