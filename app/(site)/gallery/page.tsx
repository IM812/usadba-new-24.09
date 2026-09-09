import type { Metadata } from "next"
import { BookingCta } from "@/components/lux/booking-cta"
import { PageHero } from "@/components/lux/page-hero"
import { PhotoGrid } from "@/components/lux/photo-grid"
import { Container, Section, SectionHeading } from "@/components/lux/ui"
import { galleryPhotos } from "@/lib/site"

export const metadata: Metadata = {
  title: "Галерея",
  description:
    "Фотографии усадьбы в Антропково: дом, гостиная с камином, спальни, баня, сибирский чан, озеро, причал и территория.",
}

const gallerySections = [
  {
    eyebrow: "Дом и комнаты",
    title: "Пространство для общей жизни и личной тишины",
    lead: "Гостиная, кухня, столовая и разные спальни — без повторов одного и того же ракурса.",
    photos: galleryPhotos.slice(0, 10),
  },
  {
    eyebrow: "Территория и озеро",
    title: "Дом стоит среди сосен между двумя озёрами",
    lead: "Показываем масштаб с земли и воздуха: берег, причал, лес и расположение усадьбы.",
    photos: galleryPhotos.slice(10, 18),
  },
  {
    eyebrow: "Баня и чан",
    title: "Актуальная баня у воды",
    lead: "Светлая парная, комната отдыха и чан под открытым небом — так пространство выглядит сейчас.",
    photos: galleryPhotos.slice(18, 24),
  },
  {
    eyebrow: "Вокруг дома",
    title: "Территория в деталях",
    lead: "Снег, зелень, вечерний свет и детали вокруг дома — без деления фотографий по сезонам.",
    photos: galleryPhotos.slice(24, 32),
  },
] as const

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Галерея"
        title="Усадьба без ретуши"
        lead="Все фотографии сделаны здесь. В подборке — дом, разные спальни, баня, чан, озёра и территория усадьбы."
        image="/images/estate/autumn-house-wide-new.webp"
        imageAlt="Бревенчатый дом усадьбы среди сосен"
        meta={["32 фотографии", "дом и спальни", "озёра, баня и территория"]}
      />

      {gallerySections.map((section, index) => (
        <Section key={section.eyebrow} tone={index % 2 === 0 ? "base" : "raised"}>
          <Container size="wide">
            <div data-reveal>
              <SectionHeading eyebrow={section.eyebrow} title={section.title} lead={section.lead} />
            </div>
            <div data-reveal className="mt-10 sm:mt-14">
              <PhotoGrid photos={section.photos} />
            </div>
          </Container>
        </Section>
      ))}

      <BookingCta
        title="Хотите увидеть больше?"
        lead="Напишите нам — пришлём свежие фотографии и видео с территории."
        image="/images/estate/aerial-estate-new.webp"
        imageAlt="Усадьба среди соснового леса с высоты"
      />
    </>
  )
}
