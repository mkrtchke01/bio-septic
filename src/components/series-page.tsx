import Script from "next/script";
import { faqBySeries } from "@/data/faq";
import { productsBySeries } from "@/data/products";
import type { Series } from "@/data/series";
import { installationFactors } from "@/data/site";
import { FAQ, FinalCTA, Hero, ProductCard, SeoText, TechnicalTable } from "./site-components";
import { Breadcrumbs, FeatureCard, Icon, Section, SectionHeading } from "./ui";

export function SeriesPage({ item }: { item: Series }) {
  const products = productsBySeries(item.slug);
  const productSchema = products.map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${item.positioning}. ${product.capacity}, до ${product.users} пользователей.`,
    brand: { "@type": "Brand", name: item.name.startsWith("Евролос") ? "Евролос" : item.name },
    offers: { "@type": "Offer", priceCurrency: "RUB", price: product.price, availability: "https://schema.org/PreOrder" },
  }));
  const process = item.process.map((title, index) => ({ title, text: ["Стоки поступают в первую камеру и нагрузка распределяется.", "Крупные фракции отделяются от жидкой части.", "Микроорганизмы перерабатывают органические загрязнения.", "Вода проходит предусмотренную технологией стабилизацию.", "Очищенная вода отводится по согласованной схеме."][index] }));
  return (
    <>
      <div className="container breadcrumb-wrap"><Breadcrumbs current={item.name} /></div>
      <Hero item={item} />

      <Section>
        <SectionHeading eyebrow="Сценарии" title={`Кому подходит ${item.name}`} text="Финальное решение зависит от нагрузки и инженерных условий участка." />
        <div className="scenario-grid">{item.scenarios.map((scenario, index) => <article key={scenario}><span><Icon name={["home", "users", "drop", "shield"][index % 4]} /></span><h3>{scenario}</h3><p>{["Подберём исполнение под режим использования объекта.", "Учтём расход воды, сантехнику и пиковую нагрузку.", "Проверим грунт, УГВ и доступный способ водоотведения.", "Заложим удобство обслуживания и запас по нагрузке."][index]}</p></article>)}</div>
      </Section>

      <Section id="products" tone="soft">
        <SectionHeading eyebrow="Каталог моделей" title={`Модельный ряд ${item.name}`} text="Цены и характеристики указаны как редактируемые ориентиры. Перед заказом сверим актуальный паспорт и комплектацию." />
        <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Сравнение" title="Технические характеристики моделей" text="Таблица прокручивается горизонтально на мобильных устройствах." />
        <TechnicalTable products={products} />
      </Section>

      <Section tone="mint">
        <SectionHeading eyebrow="Преимущества серии" title={`Почему рассматривают ${item.name}`} />
        <div className="feature-grid four">{item.benefits.map((benefit, index) => <FeatureCard key={benefit} icon={["shield", "leaf", "wrench", "drop"][index]} title={benefit} text={["Решение подбирается под реальные условия эксплуатации.", "Технология рассчитана на понятный бытовой сценарий.", "Конструкция учитывает доступ к ключевым узлам.", "Комплектация согласуется с условиями водоотведения."][index]} />)}</div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Технология" title="Как работает система" text="Упрощённая схема показывает общий путь стоков. Точная технология зависит от серии и модели." />
        <div className="process-flow">{process.map((step, index) => <article key={step.title}><span>{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </Section>

      <Section tone="soft">
        <div className="installation-grid">
          <div><span className="eyebrow">Монтаж серии</span><h2>Сначала инженерная схема, затем земляные работы</h2><p>Согласуем место установки, трассу трубы, отметки и точку отвода. Для сложных условий заранее предусматриваем водопонижение, якорение или насосное оборудование.</p><div className="install-checks">{["Котлован и основание", "Установка по уровню", "Подключение коммуникаций", "Обратная засыпка", "Пусконаладка", "Инструктаж владельца"].map((text) => <span key={text}><Icon name="check" />{text}</span>)}</div></div>
          <aside><h3>Что влияет на стоимость монтажа</h3><ul>{installationFactors.map((factor) => <li key={factor}><Icon name="arrow" />{factor}</li>)}</ul><p className="editable-note">Точная стоимость фиксируется в смете до начала работ.</p></aside>
        </div>
      </Section>

      <FinalCTA seriesName={item.name} />
      <FAQ items={faqBySeries[item.slug]} title={`Вопросы о ${item.name}`} />
      <SeoText title={`${item.name}: подбор, цена и монтаж`} paragraphs={item.seoText} />
      <Script id={`products-${item.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </>
  );
}
