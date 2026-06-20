import type { SeriesSlug } from "./series";

export type Product = {
  id: string;
  series: SeriesSlug;
  name: string;
  users: number;
  capacity: string;
  discharge: string;
  dimensions: string;
  drainage: string;
  price: number;
  note: string;
};

const specs: Record<SeriesSlug, { models: number[]; base: number; step: number; drainage: string }> = {
  "evrolos-eko": { models: [3, 4, 5, 6, 8], base: 89400, step: 12500, drainage: "Самотёчный" },
  "evrolos-bio": { models: [3, 4, 5, 6, 8, 10], base: 129900, step: 14500, drainage: "Самотёчный / принудительный" },
  "evrolos-pro": { models: [3, 4, 5, 6, 8, 10], base: 138500, step: 15800, drainage: "Самотёчный / принудительный" },
  "evrolos-grunt": { models: [3, 4, 5, 6, 8, 10], base: 189000, step: 19800, drainage: "Преимущественно принудительный" },
  ekoprom: { models: [15, 20, 30, 50, 100], base: 890000, step: 24500, drainage: "По проекту" },
  "septik-udacha": { models: [1, 2, 3, 4], base: 69900, step: 11900, drainage: "По комплектации" },
};

const labels: Record<SeriesSlug, string> = {
  "evrolos-eko": "Евролос Эко",
  "evrolos-bio": "Евролос Био",
  "evrolos-pro": "Евролос Про",
  "evrolos-grunt": "Евролос Грунт",
  ekoprom: "Экопром",
  "septik-udacha": "Септик Удача",
};

export const products: Product[] = Object.entries(specs).flatMap(([slug, config]) =>
  config.models.map((users, index) => ({
    id: `${slug}-${users}`,
    series: slug as SeriesSlug,
    name: `${labels[slug as SeriesSlug]} ${users}`,
    users,
    capacity: `${Math.max(0.2, users * 0.2).toFixed(1)} м³/сут`,
    discharge: `${Math.round(120 + users * 42)} л`,
    dimensions: index % 2 === 0 ? "Ø 1,5 × 2,1 м" : "Ø 1,7 × 2,3 м",
    drainage: config.drainage,
    price: config.base + index * config.step,
    note: "Ориентировочные характеристики — сверить с актуальным паспортом модели.",
  })),
);

export const productsBySeries = (slug: SeriesSlug) => products.filter((item) => item.series === slug);

export const formatPrice = (price: number) => new Intl.NumberFormat("ru-RU").format(price);
