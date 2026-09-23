import { createServiceClient } from '@/lib/supabase/server'
import { galleryPhotos } from '@/lib/site'

export async function getGalleryPhotos() {
  const fallback = galleryPhotos.map((photo, index) => ({
    ...photo,
    id: `static:${encodeURIComponent(photo.src)}`,
    url: photo.src,
    sort_order: index,
    is_main: index === 0,
    created_at: '',
  }))

  try {
    const { data, error } = await createServiceClient()
      .from('gallery')
      .select('id,url,alt,sort_order,is_main,created_at')
      .order('sort_order', { ascending: true })

    if (error || !data) return fallback

    const deletedUrls = new Set(data.filter((item) => item.sort_order === -1).map((item) => item.url))
    const savedByUrl = new Map(data.filter((item) => item.sort_order !== -1).map((item) => [item.url, item]))
    const merged = fallback.filter((photo) => !deletedUrls.has(photo.src)).map((photo) => {
      const saved = savedByUrl.get(photo.src)
      if (!saved) return photo
      return {
        ...photo,
        id: saved.id,
        caption: saved.alt,
        sort_order: saved.sort_order,
        is_main: saved.is_main,
        created_at: saved.created_at,
      }
    })

    const staticUrls = new Set(fallback.map((photo) => photo.src))
    const uploaded = data
      .filter((item) => item.sort_order !== -1 && !staticUrls.has(item.url))
      .map((item) => ({
        category: 'house' as const,
        src: item.url,
        url: item.url,
        alt: item.alt || 'Фото усадьбы',
        caption: item.alt || undefined,
        id: item.id,
        sort_order: item.sort_order,
        is_main: item.is_main,
        created_at: item.created_at,
      }))

    return [...merged, ...uploaded]
  } catch {
    return fallback
  }
}
