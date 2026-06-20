import Link from "next/link";
import Script from "next/script";
import { cases } from "@/data/cases";
import type { FaqItem } from "@/data/faq";
import { formatPrice, type Product } from "@/data/products";
import { series, type Series } from "@/data/series";
import { site } from "@/data/site";
import { LeadForm } from "./forms";
import { Button, Icon, Section, SectionHeading, StationVisual } from "./ui";

export function Hero({ item }: { item?: Series }) {
  const isHome = !item;
  const title = item?.positioning ?? "Станции биологической очистки Евролос под ключ с монтажом за 1 день";
  const text = item?.description ?? "Подберём септик под грунт, уровень воды, количество жильцов и бюджет. Доставка, монтаж, гарантия и сервисное обслуживание.";
  const benefits = item?.benefits.slice(0, 4) ?? Object.values(site.claims);
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">{item?.eyebrow ?? "Автономная канализация без лишнего риска"}</span>
          <h1>{title}</h1>
          <p>{text}</p>
          <div className="hero-actions">
            <Button href={isHome ? "/#quiz" : "#series-form"}>{isHome ? "Рассчитать стоимость" : "Получить подбор"} <Icon name="arrow" /></Button>
            <Button href={isHome ? "/#series" : "#products"} variant="secondary">{isHome ? "Подобрать модель" : "Рассчитать с монтажом"}</Button>
          </div>
          <div className="hero-badges">{benefits.map((benefit) => <span key={benefit}><Icon name="check" />{benefit}</span>)}</div>
        </div>
        <StationVisual label={item?.name ?? "Подбор под ваш участок"} accent={item?.accent} />
      </div>
    </section>
  );
}

export function SeriesCard({ item }: { item: Series }) {
  return (
    <article className="series-card">
      <div className={`series-art accent-${item.accent}`}><span>{item.shortName}</span><StationVisual label="" accent={item.accent} /></div>
      <div className="series-card-body">
        <div className="card-topline"><span>{item.users} пользователей</span><span>{item.energy}</span></div>
        <h3>{item.name}</h3><p>{item.description}</p>
        <div className="series-highlight"><Icon name="check" />{item.highlight}</div>
        <div className="card-footer"><span>от <b>{formatPrice(item.priceFrom)} ₽</b></span><Link href={`/${item.slug}`}>Подробнее <Icon name="arrow" /></Link></div>
      </div>
    </article>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-visual"><span className="product-code">{product.name.replace(/\D+/g, "")}</span><div className="mini-station" /></div>
      <div><span className="product-kicker">до {product.users} пользователей</span><h3>{product.name}</h3></div>
      <dl><div><dt>Производительность</dt><dd>{product.capacity}</dd></div><div><dt>Залповый сброс</dt><dd>{product.discharge}</dd></div><div><dt>Отвод</dt><dd>{product.drainage}</dd></div></dl>
      <p className="editable-note">{product.note}</p>
      <div className="product-bottom"><span>от <b>{formatPrice(product.price)} ₽</b></span><Button href="#series-form">Заказать расчёт</Button></div>
    </article>
  );
}

export function ComparisonTable({ items = series }: { items?: Series[] }) {
  return (
    <div className="table-wrap">
      <table><thead><tr><th>Серия</th><th>Для кого</th><th>Энергия</th><th>Грунт</th><th>Пользователи</th><th>Преимущество</th><th /></tr></thead>
      <tbody>{items.map((item) => <tr key={item.slug}><td><b>{item.name}</b></td><td>{item.scenarios[0]}</td><td>{item.energy}</td><td>{item.soil}</td><td>{item.users}</td><td>{item.highlight}</td><td><Link className="table-link" href={`/${item.slug}`}>Выбрать</Link></td></tr>)}</tbody></table>
    </div>
  );
}

export function TechnicalTable({ products }: { products: Product[] }) {
  return (
    <div className="table-wrap">
      <table><thead><tr><th>Модель</th><th>Пользователей</th><th>Производительность</th><th>Залповый сброс</th><th>Габариты</th><th>Отвод</th><th>Цена от</th><th /></tr></thead>
      <tbody>{products.map((item) => <tr key={item.id}><td><b>{item.name}</b></td><td>{item.users}</td><td>{item.capacity}</td><td>{item.discharge}</td><td>{item.dimensions}</td><td>{item.drainage}</td><td>{formatPrice(item.price)} ₽</td><td><Link className="table-link" href="#series-form">Расчёт</Link></td></tr>)}</tbody></table>
    </div>
  );
}

export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return <div className="steps">{items.map((item, index) => <article className="step" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>;
}

export function CaseCard({ item, index }: { item: (typeof cases)[number]; index: number }) {
  return <article className="case-card"><div className={`case-image case-${(index % 3) + 1}`}><span>Объект {String(index + 1).padStart(2, "0")}</span><div className="case-land" /><div className="case-unit" /></div><div className="case-body"><span className="case-object">{item.object}</span><h3>{item.model}</h3><dl><div><dt>Условия</dt><dd>{item.conditions}</dd></div><div><dt>Срок</dt><dd>{item.duration}</dd></div><div><dt>Результат</dt><dd>{item.result}</dd></div></dl></div></article>;
}

export function FAQ({ items, title = "Вопросы об автономной канализации" }: { items: FaqItem[]; title?: string }) {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return (
    <Section tone="soft"><SectionHeading eyebrow="FAQ" title={title} text="Коротко отвечаем на вопросы, которые влияют на выбор оборудования и смету." />
      <div className="faq-list">{items.map((item, index) => <details key={item.question} open={index === 0}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
      <Script id={`faq-${title}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </Section>
  );
}

export function SeoText({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return <Section><div className="seo-text"><div><span className="eyebrow">Полезно знать</span><h2>{title}</h2></div><div>{paragraphs.map((text) => <p key={text}>{text}</p>)}</div></div></Section>;
}

export function FinalCTA({ seriesName }: { seriesName?: string }) {
  return <Section id={seriesName ? "series-form" : "final-form"} tone="dark"><div className="cta-grid"><div><span className="eyebrow">Расчёт без обязательств</span><h2>{seriesName ? "Оставьте заявку — инженер подберёт модель под ваш участок" : "Подберём станцию под ваш участок и рассчитаем стоимость под ключ"}</h2><p>Ответим на технические вопросы, сравним подходящие варианты и подготовим понятную смету.</p></div><LeadForm seriesName={seriesName} /></div></Section>;
}

export function Footer() {
  return (
    <footer className="footer" id="contacts"><div className="container"><div className="footer-grid">
      <div><Link className="logo logo-light" href="/"><span className="logo-mark"><span /></span><span><b>EuroSeptic</b><small>PRO · инженерные системы</small></span></Link><p>Подбор, поставка, монтаж и обслуживание автономной канализации.</p><div className="socials"><a href={site.whatsapp}>WhatsApp</a><a href={site.telegram}>Telegram</a></div></div>
      <div><h3>Навигация</h3>{site.menu.slice(0, 6).map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}</div>
      <div><h3>Серии</h3>{site.seriesLinks.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}</div>
      <div><h3>Контакты</h3><a className="footer-phone" href={site.phoneHref}>{site.phone}</a><a href={`mailto:${site.email}`}>{site.email}</a><p>{site.address}<br />{site.hours}</p></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>{site.requisites}</span><Link href="/privacy">Политика конфиденциальности</Link><span>Информация на сайте не является публичной офертой.</span></div></div></footer>
  );
}
