// Единый источник контента для публичного сайта.
// Никаких секретов — только тексты, ссылки и структура навигации.

/** Канонический адрес сайта — используется в метаданных и sitemap. */
export const SITE_URL = 'https://снять.усадьбу.рф'

export const site = {
  name: 'Усадьба в Антропково',
  shortName: 'Антропково',
  tagline: 'Гостевой дом между двумя озерами',
  region: 'Псковская область',
  rating: { value: '5,0', count: 75, reviewCount: 42, source: 'Яндекс Карты' },
} as const

export const contacts = {
  phoneLabel: '+7 (995) 155-88-42',
  phoneHref: 'tel:+79951558842',
  whatsapp: 'https://wa.me/79951558842',
  telegram: 'https://t.me/usadba_antropkovo',
  vk: 'https://vk.com/usadba_antropkovo',
  email: 'hello@nuzhensite.site',
  emailHref: 'mailto:hello@nuzhensite.site',
  addressShort: 'Антропково, Новосокольнический р-н',
  addressFull: 'Псковская область, Новосокольнический район, д. Антропково',
  mapsUrl: 'https://yandex.ru/maps/org/usadba_v_antropkovo/216703670267/',
  mapWidget:
    'https://yandex.ru/map-widget/v1/?ll=29.902963%2C56.374633&z=14&pt=29.902963%2C56.374633&l=map&org=216703670267',
  coords: { lat: 56.374633, lon: 29.902963 },
} as const

/** Основная навигация. Порядок = порядок в меню и в футере. */
export const navigation = [
  { href: '/estate', label: 'Усадьба', note: 'Дом, спальни, интерьеры' },
  { href: '/spa', label: 'Баня и чан', note: 'Парная на дровах и сибирский чан' },
  { href: '/grounds', label: 'Территория', note: 'Озера, причал, активности' },
  { href: '/gallery', label: 'Галерея', note: 'Фотографии по сезонам' },
  { href: '/prices', label: 'Цены', note: 'Тарифы и что включено' },
  { href: '/reviews', label: 'Отзывы', note: '75 оценок, рейтинг 5,0' },
  { href: '/location', label: 'Как добраться', note: 'Маршруты и карта' },
  { href: '/contacts', label: 'Контакты', note: 'Связь и реквизиты' },
] as const

export const secondaryNavigation = [
  { href: '/booking', label: 'Бронирование' },
  { href: '/faq', label: 'Вопросы и ответы' },
] as const

/** Ключевые факты — используются в хиро и на странице усадьбы. */
export const estateFacts = [
  { value: '250', unit: 'м²', label: 'Площадь дома' },
  { value: '4', unit: '', label: 'Спальни с санузлом' },
  { value: '5', unit: 'ч', label: 'От Москвы' },
  { value: '2', unit: '', label: 'Озера рядом' },
] as const

export const rooms = [
  {
    id: 'hall',
    name: 'Гостиная',
    kind: 'Общее пространство',
    image: '/images/estate/interior-living-new.webp',
    description:
      'Общая зона с настоящим кирпичным камином, мягкими диванами, книжными полками и небольшим столом. Здесь удобно собраться вместе после прогулок и отдыха у озера.',
    features: ['Кирпичный камин', 'Мягкие диваны', 'Небольшой стол', 'Книжные полки'],
  },
  {
    id: 'bedrooms',
    name: 'Спальни',
    kind: 'Четыре отдельные комнаты',
    image: '/images/estate/interior-twin-new.webp',
    images: [
      '/images/estate/interior-twin-new.webp',
      '/images/estate/bedroom-one-new.webp',
    ],
    description:
      'В доме четыре отдельные спальни. Здесь показываем две разные конфигурации: с отдельными и с широкой кроватью. Размещение для вашей компании согласуем заранее.',
    features: ['4 отдельные спальни', 'Две конфигурации кроватей', 'Размещение согласуем заранее'],
  },
] as const

export const spaOptions = [
  {
    id: 'banya',
    name: 'Баня на дровах',
    duration: 'по согласованию',
    image: '/images/estate/summer-banya-new.webp',
    description:
      'Актуальная светлая парная с дровяной печью и отдельной комнатой отдыха находится рядом с озером.',
    includes: ['Парная на дровах', 'Комната отдыха', 'Рядом с озером'],
  },
  {
    id: 'chan',
    name: 'Сибирский чан',
    duration: 'по согласованию',
    image: '/images/estate/chan-close.jpg',
    description:
      'Сибирский чан стоит под открытым небом рядом с баней, среди соснового леса.',
    includes: ['Под открытым небом', 'Рядом с баней', 'Среди сосен'],
  },
] as const

export const groundExperiences = [
  {
    id: 'lake',
    name: 'Озеро у усадьбы',
    season: 'Круглый год',
    image: '/images/estate/lake-wide.jpg',
    description:
      'Спокойное лесное озеро рядом с домом. У воды можно провести утро, встретить закат или выйти на рыбалку.',
  },
  {
    id: 'chan',
    name: 'Чан у воды',
    season: 'По согласованию',
    image: '/images/estate/chan-lake.jpg',
    description:
      'Сибирский чан стоит среди сосен рядом с озером. Подготовка и время отдыха согласуются при бронировании.',
  },
  {
    id: 'panorama',
    name: 'Усадьба между озерами',
    season: 'Круглый год',
    image: '/images/estate/lake-aerial.jpg',
    description:
      'С высоты видно расположение дома среди соснового бора и озер. До воды можно дойти пешком.',
  },
  {
    id: 'winter-forest',
    name: 'Сосновый лес зимой',
    season: 'Зима',
    image: '/images/estate/winter-forest.jpg',
    description:
      'Заснеженный лес начинается сразу за территорией. Здесь тихо и удобно гулять без долгой дороги.',
  },
] as const

/**
 * Единый источник условий бани и чана для страниц цен, спа и FAQ.
 */
export const spaSurcharge = {
  price: 7700,
  priceLabel: '7 700 ₽',
  unit: 'за топку',
  short: 'Баня и чан — 7 700 ₽ за топку',
  full:
    'Баня и сибирский чан оплачиваются отдельно — 7 700 ₽ за топку. Услугу и время подготовки нужно согласовать при бронировании.',
} as const

export const extraGuestPolicy = {
  baseGuests: 8,
  price: 1650,
  label: 'После 8 гостей — 1 650 ₽ за каждого дополнительного гостя за ночь',
} as const

export const waterEquipmentPolicy =
  'Лодка и сап-борды оплачиваются отдельно; стоимость уточняется при бронировании.'

export const includedInStay = [
  'Дом сдается целиком — других гостей не будет',
  'Постельное белье и полотенца',
  'Полностью оборудованная кухня и посудомоечная машина',
  'Гостиная с камином',
  'Парковка на территории',
  'Wi-Fi в доме',
  'Четыре отдельные спальни',
] as const

export const routes = [
  {
    id: 'msk',
    from: 'Из Москвы',
    duration: '≈ 5 часов',
    distance: 'через Великие Луки',
    description: 'М9 «Балтия» через Великие Луки до Новосокольников. Дорога хорошая.',
    href: 'https://yandex.ru/maps/?rtext=~56.374633%2C29.902963&rtt=auto',
  },
  {
    id: 'spb',
    from: 'Из Санкт-Петербурга',
    duration: '≈ 4 часа',
    distance: 'через Псков',
    description: 'М20 (Е95) через Псков до Новосокольников. Живописный маршрут по Псковской области.',
    href: 'https://yandex.ru/maps/?rtext=~56.374633%2C29.902963&rtt=auto',
  },
  {
    id: 'train',
    from: 'Поездом',
    duration: '30 минут от станции',
    distance: '35 км',
    description:
      'Поезда из Москвы и Петербурга идут до Великих Лук. От вокзала до усадьбы — около 35 км.',
    href: null,
  },
] as const

export const seasons = [
  {
    id: 'winter',
    name: 'Зима',
    months: 'декабрь — февраль',
    image: '/images/estate/winter-house-new.webp',
    line: 'Снег по колено, тихий лес и теплый свет дома зимним вечером.',
  },
  {
    id: 'spring',
    name: 'Весна',
    months: 'март — май',
    image: '/images/estate/spring-daffodils-new.webp',
    line: 'Первая зелень, нарциссы у дома и длинные вечера у воды.',
  },
  {
    id: 'summer',
    name: 'Лето',
    months: 'июнь — август',
    image: '/images/estate/summer-lake-new.webp',
    line: 'Купание с причала, прогулки по лесу и отдых у озера.',
  },
  {
    id: 'autumn',
    name: 'Осень',
    months: 'сентябрь — ноябрь',
    image: '/images/estate/autumn-house-new.webp',
    line: 'Золотые сосны, ягоды у дома и прозрачный свет над озером.',
  },
] as const

/** Актуальная подборка для галереи и полноэкранного просмотра. */
export const galleryPhotos = [
  { src: '/images/estate/autumn-house-wide-new.webp', alt: 'Дом усадьбы среди золотых сосен', caption: 'Бревенчатый дом и осенний лес' },
  { src: '/images/estate/interior-twin-new.webp', alt: 'Спальня с двумя отдельными кроватями', caption: 'Спальня с двумя отдельными кроватями' },
  { src: '/images/estate/bedroom-one-new.webp', alt: 'Спальня с широкой кроватью у окна', caption: 'Спальня с широкой кроватью и окном на лес' },
  { src: '/images/estate/interior-kitchen-wide-new.webp', alt: 'Оборудованная кухня с деревянной отделкой', caption: 'Кухня для самостоятельного приготовления еды' },
  { src: '/images/estate/interior-bathroom-new.webp', alt: 'Санузел с душевой в доме усадьбы', caption: 'Один из санузлов дома' },
  { src: '/images/estate/interior-living-new.webp', alt: 'Гостиная с диваном и панорамными окнами', caption: 'Общая гостиная для всей компании' },
  { src: '/images/estate/interior-fireplace-new.webp', alt: 'Кирпичный камин с живым огнём', caption: 'Настоящий дровяной камин в гостиной' },
  { src: '/images/estate/interior-kitchen-new.webp', alt: 'Большая кухня с кирпичной стеной', caption: 'Полностью оборудованная кухня' },
  { src: '/images/estate/interior-dining-new.webp', alt: 'Обеденный стол у окон с видом на лес', caption: 'Столовая рядом с панорамными окнами' },
  { src: '/images/estate/interior-bathroom-new.webp', alt: 'Санузел в доме с деревянной отделкой', caption: 'Один из санузлов усадьбы' },
  { src: '/images/estate/aerial-between-lakes-new.webp', alt: 'Усадьба на лесном полуострове между озёрами', caption: 'Расположение усадьбы между двумя озёрами' },
  { src: '/images/estate/aerial-lake-new.webp', alt: 'Лесное озеро с высоты', caption: 'Озеро и сосновый лес с высоты' },
  { src: '/images/estate/aerial-estate-new.webp', alt: 'Территория усадьбы с высоты', caption: 'Дом, лес и берег в одном кадре' },
  { src: '/images/estate/summer-lake-new.webp', alt: 'Летний вид на озеро с территории', caption: 'Озеро рядом с домом' },
  { src: '/images/estate/autumn-lake-new.webp', alt: 'Осенний берег лесного озера', caption: 'Тихая вода среди осеннего леса' },
  { src: '/images/estate/summer-grounds-new.webp', alt: 'Зелёная территория перед озером', caption: 'Пространство для отдыха у воды' },
  { src: '/images/estate/summer-swing-new.webp', alt: 'Деревянные качели у озера', caption: 'Качели с видом на воду' },
  { src: '/images/estate/spring-lake-evening-new.webp', alt: 'Озеро и причал в апрельских сумерках', caption: 'Вечер у озера в апреле' },
  { src: '/images/estate/spring-banya-exterior-new.webp', alt: 'Современная баня среди молодых сосен', caption: 'Актуальная баня на территории усадьбы' },
  { src: '/images/estate/summer-banya-new.webp', alt: 'Светлая парная с банными принадлежностями', caption: 'Парная в бане у озера' },
  { src: '/images/estate/spring-stove-new.webp', alt: 'Дровяная печь в новой бане', caption: 'Дровяная печь в парной' },
  { src: '/images/estate/autumn-banya-new.webp', alt: 'Комната отдыха в бане с деревянными стенами', caption: 'Комната отдыха в актуальной бане' },
  { src: '/images/estate/chan-close.jpg', alt: 'Сибирский чан с паром на берегу озера', caption: 'Чан под открытым небом у воды' },
  { src: '/images/estate/winter-banya-new.webp', alt: 'Баня под снегом зимним вечером', caption: 'Баня среди зимнего леса' },
  { src: '/images/estate/winter-house-new.webp', alt: 'Дом усадьбы в снегу зимним вечером', caption: 'Зима 2026 — дом после снегопада' },
  { src: '/images/estate/winter-forest-color-new.webp', alt: 'Заснеженные сосны в вечерней подсветке', caption: 'Зима 2026 — подсвеченный сосновый лес' },
  { src: '/images/estate/spring-daffodils-new.webp', alt: 'Нарциссы у каменной стены весной', caption: 'Весна — апрельские цветы у дома' },
  { src: '/images/estate/spring-banya-night-new.webp', alt: 'Баня и сосны весенней ночью', caption: 'Весна — вечер на территории' },
  { src: '/images/estate/summer-house-new.webp', alt: 'Дом на зелёной поляне летом', caption: 'Лето — дом среди зелёных сосен' },
  { src: '/images/estate/aerial-house-new.webp', alt: 'Летний вид на дом и лес с высоты', caption: 'Лето — территория с высоты' },
  { src: '/images/estate/autumn-terrace-new.webp', alt: 'Терраса дома в золотую осень', caption: 'Осень 2025 — терраса у дома' },
  { src: '/images/estate/autumn-berries-new.webp', alt: 'Красные осенние ягоды у бревенчатого дома', caption: 'Осень 2025 — ягоды у фасада' },
] as const

export type Season = (typeof seasons)[number]
export type Room = (typeof rooms)[number]
