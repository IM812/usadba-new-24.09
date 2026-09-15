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
  vk: 'https://vk.com/usadba_antropkovo',
  addressShort: 'Антропково, Новосокольнический р-н',
  addressFull: 'Псковская область, Новосокольнический район, д. Антропково',
  mapsUrl: 'https://yandex.ru/maps/org/usadba_v_antropkovo/216703670267/',
  mapWidget:
    'https://yandex.ru/map-widget/v1/?ll=29.831097%2C56.383947&z=15&pt=29.831097%2C56.383947&l=map&oid=216703670267',
  coords: { lat: 56.383947, lon: 29.831097 },
} as const

/** Основная навигация. Порядок = порядок в меню и в футере. */
export const navigation = [
  { href: '/estate', label: 'Усадьба', note: 'Дом, спальни, интерьеры' },
  { href: '/spa', label: 'Баня и чан', note: 'Парная на дровах и сибирский чан' },
  { href: '/grounds', label: 'Территория', note: 'Озера, причал, активности' },
  { href: '/gallery', label: 'Галерея', note: 'Дом, территория, баня и озёра' },
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
    image: '/images/drive/living/sofas-lake-view.webp',
    description:
      'Общая зона с настоящим кирпичным камином, мягкими диванами, книжными полками и небольшим столом. Здесь удобно собраться вместе после прогулок и отдыха у озера.',
    features: ['Кирпичный камин', 'Мягкие диваны', 'Небольшой стол', 'Книжные полки'],
  },
  {
    id: 'bedrooms',
    name: 'Спальни',
    kind: 'Четыре отдельные комнаты',
    image: '/images/drive/bedrooms/bedroom-twin.webp',
    images: [
      '/images/drive/bedrooms/bedroom-twin.webp',
      '/images/drive/bedrooms/bedroom-lake-view.webp',
      '/images/drive/bedrooms/bedroom-warm.webp',
      '/images/drive/bedrooms/bedroom-detail.webp',
    ],
    description:
      'В доме четыре отдельные спальни с разными вариантами размещения. План комнат и состав спальных мест для вашей компании согласуем заранее.',
    features: ['4 отдельные спальни', 'Разные варианты кроватей', 'Размещение согласуем заранее'],
  },
] as const

export const spaOptions = [
  {
    id: 'banya',
    name: 'Баня на дровах',
    duration: 'по согласованию',
    image: '/images/drive/spa/sauna.webp',
    description:
      'Светлая парная с дровяной печью и отдельной комнатой отдыха находится рядом с озером.',
    includes: ['Парная на дровах', 'Комната отдыха', 'Рядом с озером'],
  },
  {
    id: 'chan',
    name: 'Сибирский чан',
    duration: 'по согласованию',
    image: '/images/drive/spa/hot-tub-lake.webp',
    description:
      'Сибирский чан стоит под открытым небом рядом с баней, среди соснового леса и с видом на воду.',
    includes: ['Под открытым небом', 'Рядом с баней', 'Среди сосен'],
  },
] as const

export const groundExperiences = [
  {
    id: 'lake',
    name: 'Озеро у усадьбы',
    season: 'Круглый год',
    image: '/images/drive/grounds/aerial-lake.webp',
    description:
      'Спокойное лесное озеро рядом с домом. У воды можно провести утро, встретить закат или выйти на рыбалку.',
  },
  {
    id: 'chan',
    name: 'Чан у воды',
    season: 'По согласованию',
    image: '/images/drive/spa/hot-tub-lake.webp',
    description:
      'Сибирский чан стоит среди сосен рядом с озером. Подготовка и время отдыха согласуются при бронировании.',
  },
  {
    id: 'panorama',
    name: 'Усадьба между озерами',
    season: 'Круглый год',
    image: '/images/drive/grounds/aerial-between-lakes.webp',
    description:
      'С высоты видно расположение дома среди соснового бора и озер. До воды можно дойти пешком.',
  },
  {
    id: 'winter-forest',
    name: 'Сосновый лес зимой',
    season: 'Зима',
    image: '/images/drive/grounds/winter-lake.webp',
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
    href: 'https://yandex.ru/maps/?rtext=~56.383947%2C29.831097&rtt=auto',
  },
  {
    id: 'spb',
    from: 'Из Санкт-Петербурга',
    duration: '≈ 4 часа',
    distance: 'через Псков',
    description: 'М20 (Е95) через Псков до Новосокольников. Живописный маршрут по Псковской области.',
    href: 'https://yandex.ru/maps/?rtext=~56.383947%2C29.831097&rtt=auto',
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

/** Подборка из исходной папки владельца для тематических альбомов галереи. */
export const galleryPhotos = [
  { category: 'house', src: '/images/drive/house/terrace-autumn.webp', alt: 'Открытая терраса бревенчатого дома осенью', caption: 'Терраса среди золотых сосен' },
  { category: 'house', src: '/images/drive/house/house-autumn-wide.webp', alt: 'Бревенчатый дом усадьбы в осеннем лесу', caption: 'Дом среди осеннего леса' },
  { category: 'house', src: '/images/drive/house/house-evening.webp', alt: 'Бревенчатый дом усадьбы вечером', caption: 'Вечер у дома' },
  { category: 'house', src: '/images/drive/living/sofas-lake-view.webp', alt: 'Гостиная с мягкими диванами и видом на озеро', caption: 'Гостиная с видом на воду' },
  { category: 'house', src: '/images/drive/living/sofa-window.webp', alt: 'Диванная зона у больших окон', caption: 'Светлая зона отдыха' },
  { category: 'house', src: '/images/drive/living/fireplace.webp', alt: 'Кирпичный камин в гостиной усадьбы', caption: 'Настоящий дровяной камин' },
  { category: 'house', src: '/images/drive/living/living-room.webp', alt: 'Просторная гостиная бревенчатого дома', caption: 'Общая гостиная' },
  { category: 'house', src: '/images/drive/living/hallway.webp', alt: 'Деревянный холл внутри дома', caption: 'Холл между комнатами' },
  { category: 'house', src: '/images/drive/kitchen/kitchen-wide.webp', alt: 'Оборудованная кухня с деревянной мебелью', caption: 'Большая кухня для гостей' },
  { category: 'house', src: '/images/drive/kitchen/kitchen-corner.webp', alt: 'Рабочая зона кухни в усадьбе', caption: 'Оборудованная рабочая зона' },
  { category: 'house', src: '/images/drive/kitchen/kitchen-dining.webp', alt: 'Кухня и обеденная зона в доме', caption: 'Кухня рядом со столовой' },
  { category: 'house', src: '/images/drive/kitchen/copper-details.webp', alt: 'Медная посуда на кухне', caption: 'Детали кухни' },
  { category: 'house', src: '/images/drive/entry/entry-table.webp', alt: 'Консольный стол в прихожей', caption: 'Прихожая дома' },
  { category: 'house', src: '/images/drive/entry/entry-hall.webp', alt: 'Просторная прихожая бревенчатого дома', caption: 'Входная зона' },
  { category: 'house', src: '/images/drive/dining/festive-table.webp', alt: 'Празднично накрытый стол в усадьбе', caption: 'Большой стол для семейных праздников' },
  { category: 'house', src: '/images/drive/dining/feast.webp', alt: 'Ужин за большим деревянным столом', caption: 'Столовая для всей компании' },
  { category: 'house', src: '/images/drive/dining/dining-brick-wall.webp', alt: 'Столовая у кирпичной стены', caption: 'Столовая рядом с кухней' },
  { category: 'house', src: '/images/drive/dining/piano-window.webp', alt: 'Пианино у окна в столовой', caption: 'Пианино у большого окна' },
  { category: 'house', src: '/images/drive/dining/dining-room.webp', alt: 'Интерьер столовой в деревянном доме', caption: 'Просторная столовая' },
  { category: 'house', src: '/images/drive/dining/piano-detail.webp', alt: 'Пианино и кресло в общей комнате', caption: 'Музыкальный уголок' },
  { category: 'bedrooms', src: '/images/drive/bedrooms/bedroom-twin.webp', alt: 'Спальня с двумя отдельными кроватями', caption: 'Комната с раздельными кроватями' },
  { category: 'bedrooms', src: '/images/drive/bedrooms/bedroom-lake-view.webp', alt: 'Спальня с окном и деревянной отделкой', caption: 'Спальня с видом на лес' },
  { category: 'bedrooms', src: '/images/drive/bedrooms/bedroom-warm.webp', alt: 'Уютная спальня в бревенчатом доме', caption: 'Тёплая спальня' },
  { category: 'bedrooms', src: '/images/drive/bedrooms/bedroom-detail.webp', alt: 'Кровать и текстиль в спальне усадьбы', caption: 'Детали спальни' },
  { category: 'spa', src: '/images/drive/spa/hot-tub-lake.webp', alt: 'Сибирский чан с видом на лесное озеро', caption: 'Чан у самой воды' },
  { category: 'spa', src: '/images/drive/spa/hot-tub-winter.webp', alt: 'Сибирский чан среди заснеженных сосен', caption: 'Зимний отдых в чане' },
  { category: 'spa', src: '/images/drive/spa/steam-room-window.webp', alt: 'Парная с большим окном на лес', caption: 'Парная с видом на сосны' },
  { category: 'spa', src: '/images/drive/spa/sauna.webp', alt: 'Деревянная парная бани', caption: 'Светлая парная на дровах' },
  { category: 'spa', src: '/images/drive/spa/robes.webp', alt: 'Банные халаты в комнате отдыха', caption: 'Всё для банного отдыха' },
  { category: 'spa', src: '/images/drive/spa/sauna-details.webp', alt: 'Детали интерьера бани', caption: 'Банные детали' },
  { category: 'grounds', src: '/images/drive/grounds/aerial-estate.webp', alt: 'Дом усадьбы на лесном берегу с высоты', caption: 'Усадьба у озера' },
  { category: 'grounds', src: '/images/drive/grounds/aerial-lake.webp', alt: 'Большое лесное озеро с высоты', caption: 'Озеро среди соснового леса' },
  { category: 'grounds', src: '/images/drive/grounds/aerial-house-lake.webp', alt: 'Дом и озеро с высоты', caption: 'Дом в нескольких шагах от воды' },
  { category: 'grounds', src: '/images/drive/grounds/aerial-peninsula.webp', alt: 'Лесной полуостров с домом у озера', caption: 'Территория на лесном полуострове' },
  { category: 'grounds', src: '/images/drive/grounds/aerial-between-lakes.webp', alt: 'Усадьба между двумя лесными озёрами', caption: 'Между двумя озёрами' },
  { category: 'grounds', src: '/images/drive/grounds/aerial-two-lakes.webp', alt: 'Два озера и сосновый бор с высоты', caption: 'Два озера вокруг усадьбы' },
  { category: 'grounds', src: '/images/drive/grounds/aerial-wide.webp', alt: 'Панорама лесов и озёр вокруг усадьбы', caption: 'Панорама окрестностей' },
  { category: 'grounds', src: '/images/drive/grounds/forest-lake-path.webp', alt: 'Лесная дорожка от дома к озеру', caption: 'Дорожка к воде' },
  { category: 'grounds', src: '/images/drive/grounds/forest-chapel.webp', alt: 'Небольшая деревянная часовня в лесу', caption: 'Часовня среди сосен' },
  { category: 'grounds', src: '/images/drive/grounds/winter-lake.webp', alt: 'Лесное озеро зимой', caption: 'Зимняя тишина у озера' },
] as const

export type Season = (typeof seasons)[number]
export type Room = (typeof rooms)[number]
