import type { Metadata } from "next"
import { BookingCta } from "@/components/lux/booking-cta"
import { PageHero } from "@/components/lux/page-hero"
import { PhotoGrid } from "@/components/lux/photo-grid"
import { Container, Section, SectionHeading } from "@/components/lux/ui"
import { getGalleryPhotos } from "@/lib/gallery-public"
import { plural } from "@/lib/availability"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Галерея",
  description:
    "Фотографии усадьбы в Антропково: дом, гостиная с камином, спальни, баня, сибирский чан, озеро, причал и территория.",
}

export default async function GalleryPage() {
  const galleryPhotos = await getGalleryPhotos()
  const gallerySections = [
    {
      eyebrow: "Дом и общие пространства",
      title: "Место, где вся компания собирается вместе",
      lead: "Терраса, гостиная, кухня, столовая и прихожая — от общих планов до деталей интерьера.",
      photos: galleryPhotos.filter((photo) => photo.category === "house"),
    },
    {
      eyebrow: "Спальни",
      title: "Четыре отдельные спальни",
      lead: "Показываем разные варианты размещения и фактическую обстановку спален.",
      photos: galleryPhotos.filter((photo) => photo.category === "bedrooms"),
    },
    {
      eyebrow: "Баня и чан",
      title: "Парная и горячий чан у воды",
      lead: "Светлая парная на дровах, комната отдыха и сибирский чан среди сосен в разные сезоны.",
      photos: galleryPhotos.filter((photo) => photo.category === "spa"),
    },
    {
      eyebrow: "Территория и озёра",
      title: "Усадьба на лесном берегу между двумя озёрами",
      lead: "Живые кадры у воды, причал, сосновый лес и несколько панорам, которые показывают расположение усадьбы.",
      photos: galleryPhotos.filter((photo) => photo.category === "grounds"),
    },
  ] as const

  return (
    <>
      <PageHero
        eyebrow="Галерея"
        title="Усадьба без ретуши"
        lead="Все фотографии сделаны здесь. В подборке — дом, разные спальни, баня, чан, озёра и территория усадьбы."
        image="/images/drive/house/terrace-table.webp"
        imageAlt="Терраса усадьбы с видом на осенний лес"
        meta={[`${galleryPhotos.length} ${plural(galleryPhotos.length, "фотография", "фотографии", "фотографий")}`, "тематические альбомы", "дом, озёра, баня и территория"]}
      />

      {gallerySections.map((section, index) => (
        <Section key={section.eyebrow} tone={index % 2 === 0 ? "base" : "raised"}>
          <Container size="wide">
            <div data-reveal>
              <SectionHeading eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
            </div>
            <div data-reveal className="mt-8 sm:mt-14">
              <PhotoGrid photos={section.photos} />
            </div>
          </Container>
        </Section>
      ))}

      <BookingCta
        title="Хотите увидеть больше?"
        lead="Напишите нам — пришлём свежие фотографии и видео с территории."
        image="/images/drive/grounds/aerial-estate.webp"
        imageAlt="Усадьба среди соснового леса у озера с высоты"
      />
    </>
  )
}
