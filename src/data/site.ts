export const site = {
  name: "EuroSeptic Pro",
  legalName: "ООО «Название компании»",
  url: "https://example.ru",
  phone: "+7 (495) 000-00-00",
  phoneHref: "tel:+74950000000",
  email: "info@example.ru",
  address: "Москва и Московская область",
  hours: "Ежедневно, 08:00–21:00",
  whatsapp: "#",
  telegram: "#",
  requisites: "ИНН 0000000000 · ОГРН 0000000000000",
  claims: {
    installation: "Монтаж за 1 день*",
    warranty: "Гарантия до 5 лет*",
    lifetime: "Срок службы до 50 лет*",
    selection: "Подбор под грунт",
  },
  disclaimer:
    "*Сроки, гарантия и срок службы зависят от модели, условий монтажа и регламента эксплуатации. Уточняйте параметры в договоре.",
  menu: [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: "/#series" },
    { label: "Подбор", href: "/#quiz" },
    { label: "Монтаж", href: "/#installation" },
    { label: "Цены", href: "/#comparison" },
    { label: "Работы", href: "/#works" },
    { label: "Контакты", href: "/#contacts" },
  ],
  seriesLinks: [
    { label: "Евролос Био", href: "/evrolos-bio" },
    { label: "Евролос Грунт", href: "/evrolos-grunt" },
    { label: "Евролос Про", href: "/evrolos-pro" },
    { label: "Экопром", href: "/ekoprom" },
    { label: "Септик Удача", href: "/septik-udacha" },
    { label: "Евролос Эко", href: "/evrolos-eko" },
  ],
} as const;

export const installationFactors = [
  "тип грунта и уровень грунтовых вод",
  "глубина выхода канализационной трубы",
  "расстояние от дома до станции",
  "способ отвода очищенной воды",
  "необходимость якорения или дренажного колодца",
  "удалённость объекта и условия подъезда",
];
