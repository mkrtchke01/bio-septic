# EuroSeptic Pro

Современный многостраничный сайт по подбору, продаже, монтажу и обслуживанию автономной канализации.

## Стек

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- React 19

## Запуск

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`.

Production:

```bash
npm run build
npm run start
```

## Контент и настройки

- контакты и спорные маркетинговые цифры: `src/data/site.ts`
- серии и SEO-тексты: `src/data/series.ts`
- модели, цены и характеристики: `src/data/products.ts`
- FAQ: `src/data/faq.ts`
- кейсы: `src/data/cases.ts`

Формы отправляются на заглушку `POST /api/leads`. Перед запуском подключите CRM, Telegram или почтовый сервис в `src/app/api/leads/route.ts`.
