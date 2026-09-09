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
    image: '/images/estate/living-sofas.jpg',
    description:
      'Общая зона с настоящим кирпичным камином, мягкими диванами, книжными полками и небольшим столом. Здесь удобно собраться вместе после прогулок и отдыха у озера.',
    features: ['Кирпичный камин', 'Мягкие диваны', 'Небольшой стол', 'Книжные полки'],
  },
  {
    id: 'bedrooms',
    name: 'Спальни',
    kind: 'Четыре комнаты',
    image: '/images/estate/room-green.jpg',
    images: [
      '/images/estate/room-green.jpg',
      '/images/estate/room-twin.jpg',
    ],
    description:
      'В доме четыре отдельные спальни. Заранее согласуем удобную схему размещения для вашей компании.',
    features: ['4 отдельные спальни', 'Реальные фотографии комнат', 'Размещение согласуем заранее'],
  },
] as const

export const spaRituals = [
  {
    id: 'banya',
    name: 'Баня на дровах',
    duration: '3–4 часа',
    image: '/images/estate/banya-fire.jpg',
    description:
      'Настоящая баня на дровах на берегу озера — для спокойного отдыха после прогулок и активного дня.',
    includes: ['Парная на дровах', 'Берег озера', 'Комната отдыха'],
  },
  {
    id: 'chan',
    name: 'Сибирский чан',
    duration: '2–3 часа',
    image: '/images/estate/chan-night.jpg',
    description:
      'Сибирский чан под открытым небом с видом на сосновый лес и озеро.',
    includes: ['Под открытым небом', 'Вид на лес', 'Отдых у воды'],
  },
  {
    id: 'winter',
    name: 'Зимний контраст',
    duration: 'по погоде',
    image: '/images/estate/winter-forest.jpg',
    description:
      'Зимой баня и чан особенно хорошо дополняют отдых в тихом заснеженном сосновом лесу.',
    includes: ['Зимний лес', 'Баня на дровах', 'Сибирский чан'],
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
    image: '/images/estate/winter-lights.jpg',
    line: 'Снег по колено, чан под звездами и камин, который не гаснет.',
  },
  {
    id: 'spring',
    name: 'Весна',
    months: 'март — май',
    image: '/images/estate/house-lawn.jpg',
    line: 'Лед уходит с озера, лес просыпается, вечера уже теплые.',
  },
  {
    id: 'summer',
    name: 'Лето',
    months: 'июнь — август',
    image: '/images/estate/terrace-lounge.jpg',
    line: 'Купание с причала, сапы до другого берега, белые ночи.',
  },
  {
    id: 'autumn',
    name: 'Осень',
    months: 'сентябрь — ноябрь',
    image: '/images/estate/house-autumn.jpg',
    line: 'Грибы, туман по воде и самый красивый свет в году.',
  },
] as const

/** Фотографии усадьбы для галереи и полноэкранного просмотра. */
export const galleryPhotos = [
  {
    src: '/images/estate/house-autumn.jpg',
    alt: 'Бревенчатый фасад усадьбы среди осенних сосен',
    caption: 'Дом целиком — 250 м² бревенчатых стен и панорамных окон',
  },
  {
    src: '/images/estate/lake-wide.jpg',
    alt: 'Спокойная гладь лесного озера',
    caption: 'Одно из озер рядом с усадьбой',
  },
  {
    src: '/images/estate/chan-night.jpg',
    alt: 'Сибирский чан с живым огнем в вечерних сумерках',
    caption: 'Сибирский чан под открытым небом у озера',
  },
  {
    src: '/images/estate/fireplace.jpg',
    alt: 'Кирпичный камин с горящими дровами в гостиной',
    caption: 'Большая гостиная с настоящим дровяным камином',
  },
  {
    src: '/images/estate/chan-lake.jpg',
    alt: 'Чан на берегу озера среди сосен',
    caption: 'Чан стоит у самой воды — из горячего сразу в озеро',
  },
  {
    src: '/images/estate/chan-close.jpg',
    alt: 'Чугунный чан на фоне осеннего леса',
    caption: 'Чан под открытым небом рядом с баней',
  },
  {
    src: '/images/estate/terrace-lounge.jpg',
    alt: 'Терраса с подвесным креслом в золотую осень',
    caption: 'Терраса, на которой проходит половина отпуска',
  },
  {
    src: '/images/estate/room-green.jpg',
    alt: 'Спальня с широкой кроватью и деревянными стенами',
    caption: 'Просторная спальня с собственным санузлом',
  },
  {
    src: '/images/estate/kitchen.jpg',
    alt: 'Кухня с кирпичной стеной и полным набором техники',
    caption: 'Кухня со всей техникой — готовить удобно на компанию',
  },
  {
    src: '/images/estate/winter-lights.jpg',
    alt: 'Подсвеченный дом усадьбы зимним вечером',
    caption: 'Зимой двор подсвечен, а лес вокруг беззвучен',
  },
  {
    src: '/images/estate/fireplace-reading.jpg',
    alt: 'Кресло с книгой у горящего камина',
    caption: 'Угол для чтения прямо у огня',
  },
  {
    src: '/images/estate/lake-aerial.jpg',
    alt: 'Озеро в сосновом лесу с высоты',
    caption: 'Озеро тихое, без моторных лодок',
  },
  {
    src: '/images/estate/living-sofas.jpg',
    alt: 'Гостиная с диванами и книжными полками',
    caption: 'Общая гостиная собирает всю компанию вечером',
  },
  {
    src: '/images/estate/house-lawn.jpg',
    alt: 'Дом усадьбы на зеленой поляне среди сосен',
    caption: 'Дом на зеленой поляне среди соснового леса',
  },
  {
    src: '/images/estate/dining-window.jpg',
    alt: 'Обеденный стол у панорамных окон',
    caption: 'Завтрак за столом с видом на сосны',
  },
  {
    src: '/images/estate/chan-day.jpg',
    alt: 'Чан и дом усадьбы днем',
    caption: 'Чан во дворе — видно прямо из окон дома',
  },
  {
    src: '/images/estate/room-twin.jpg',
    alt: 'Спальня с двумя раздельными кроватями',
    caption: 'Одна из четырех спален усадьбы',
  },
  {
    src: '/images/estate/string-lights.jpg',
    alt: 'Гирлянды над двором усадьбы в осенний вечер',
    caption: 'Вечером во дворе включается теплая подсветка',
  },
  {
    src: '/images/estate/room-lamp.jpg',
    alt: 'Спальня с торшером и деревянной мебелью',
    caption: 'Одна из четырех спален в бревенчатом доме',
  },
  {
    src: '/images/estate/winter-forest.jpg',
    alt: 'Заснеженный сосновый лес вокруг усадьбы',
    caption: 'Зимой сосновый лес покрыт снегом',
  },
  {
    src: '/images/estate/copper-shelf.jpg',
    alt: 'Полка с медной посудой на кирпичной стене',
    caption: 'Дом собирали руками — из деталей, а не из каталога',
  },
  {
    src: '/images/estate/house-yard.jpg',
    alt: 'Дом усадьбы и двор с парковкой',
    caption: 'Парковка для гостей находится во дворе',
  },
  {
    src: '/images/estate/terrace-table.jpg',
    alt: 'Стол на террасе на фоне осенних деревьев',
    caption: 'Ужины на террасе, пока не стемнеет',
  },
  {
    src: '/images/estate/autumn-berries.jpg',
    alt: 'Красные ягоды у бревенчатой стены дома',
    caption: 'Грибы и ягоды — в сотне метров от дома',
  },
  {
    src: '/images/estate/chan-close.jpg',
    alt: 'Чугунный чан крупным планом на фоне осеннего леса',
    caption: 'Чан чугунный, вода греется живым огнем снизу',
  },
  {
    src: '/images/estate/chan-steam.jpg',
    alt: 'Пар над чаном во дворе усадьбы',
    caption: 'Пар над чаном виден со всего двора',
  },
  {
    src: '/images/estate/room-lake-view.jpg',
    alt: 'Спальня с окном, выходящим на озеро',
    caption: 'Из окон спален видно воду и сосны',
  },
  {
    src: '/images/estate/house-night.jpg',
    alt: 'Светящаяся фигура и гирлянды во дворе усадьбы ночью',
    caption: 'Ночью двор превращается в отдельную декорацию',
  },
] as const

export type Season = (typeof seasons)[number]
export type Room = (typeof rooms)[number]
