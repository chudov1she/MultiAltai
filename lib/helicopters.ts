import type { Helicopter } from '@/types/catalog';

export interface HelicopterDetail extends Helicopter {
  full_description: string;
  specs: { label: string; value: string }[];
}

export const helicopterCatalog: HelicopterDetail[] = [
  {
    id: 'helicopter-robinson-r44',
    slug: 'robinson-r44',
    title: 'Вертолёт Robinson R44 R2',
    description:
      'Robinson R44 R2 — один из самых популярных лёгких вертолётов в мире. Идеален для VIP-трансфера, аэрофотосъёмки и обзорных полётов над Горным Алтаем.',
    full_description:
      'Robinson R44 Raven II — четырёхместный лёгкий вертолёт американского производства, оснащённый поршневым двигателем Lycoming IO-540 мощностью 260 л.с. с впрыском топлива. Обеспечивает высокую надёжность, экономичность и комфорт на борту. Идеально подходит для частных и корпоративных перелётов, туристических и обзорных полётов, а также аэрофотосъёмки. Вертолёт базируется в Горно-Алтайске и готов к выполнению рейсов по всему Горному Алтаю и Республике Алтай.',
    price: '25000000',
    listing_status: 'published',
    location: {
      id: 0,
      locality: 'Горно-Алтайск',
      region: 'Республика Алтай',
      address_line: 'VIP-транспорт · Приватные полёты',
      latitude: '',
      longitude: '',
    },
    media_files: [1, 2, 3, 4, 5, 6].map((n) => ({
      id: n,
      url: `/images/helicopter/helicopter-${n}.jpg`,
      file_url: `/images/helicopter/helicopter-${n}.jpg`,
      is_main: n === 1,
      type: 'image',
    })),
    model: 'Robinson R44 Raven II',
    capacity: '4 места',
    engine: 'Lycoming IO-540, 260 л.с.',
    max_speed: '240 км/ч',
    range: '560 км',
    features: [
      'Кондиционер',
      'Панорамный обзор',
      'GPS-навигация',
      'Аудиосистема',
      'Переговорное устройство',
    ],
    specs: [
      { label: 'Модель', value: 'Robinson R44 Raven II' },
      { label: 'Вместимость', value: '4 места (пилот + 3 пассажира)' },
      { label: 'Двигатель', value: 'Lycoming IO-540, 260 л.с.' },
      { label: 'Макс. скорость', value: '240 км/ч' },
      { label: 'Крейсерская скорость', value: '200 км/ч' },
      { label: 'Дальность полёта', value: '560 км' },
      { label: 'Макс. высота', value: '4 300 м' },
      { label: 'Год выпуска', value: '2019' },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function getHelicopterBySlug(slug: string): HelicopterDetail | null {
  return helicopterCatalog.find((h) => h.slug === slug) ?? null;
}
