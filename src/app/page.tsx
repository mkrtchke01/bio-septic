import type { Metadata } from "next";
import { CaseCard, ComparisonTable, FAQ, FinalCTA, Hero, SeriesCard, Steps } from "@/components/site-components";
import { QuizForm } from "@/components/forms";
import { Button, FeatureCard, Icon, Section, SectionHeading, StationVisual } from "@/components/ui";
import { cases } from "@/data/cases";
import { homeFaq } from "@/data/faq";
import { series } from "@/data/series";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Септики Евролос под ключ — подбор, монтаж и обслуживание",
  description: "Подбор, продажа и монтаж станций биологической очистки Евролос под ключ. Рассчитайте стоимость септика для частного дома, дачи или коммерческого объекта.",
};

const trust = [
  ["ruler", "Бесплатный подбор", "Сравним модели под нагрузку и бюджет."],
  ["users", "Выезд инженера", "Проверим участок перед сложным монтажом."],
  ["wrench", "Монтаж под ключ", "Одна команда отвечает за весь цикл."],
  ["shield", "Гарантия", "Условия фиксируются в документах."],
  ["leaf", "Сервис", "Подскажем регламент и выполним обслуживание."],
  ["drop", "Сложный грунт", "Решения для глины и высокого УГВ."],
];

const reasons = [
  ["ruler", "Подбор под участок", "Грунт, УГВ, рельеф и нагрузка — до выбора модели."],
  ["shield", "Фиксированная смета", "Согласуем объём и стоимость до начала работ."],
  ["users", "Опытные бригады", "Монтаж по технологической карте и контроль отметок."],
  ["wrench", "Доставка и разгрузка", "Организуем логистику оборудования на объект."],
  ["check", "Гарантийные обязательства", "Разделяем гарантию на оборудование и работы."],
  ["leaf", "Сервис после запуска", "Регламентное обслуживание и рекомендации владельцу."],
  ["drop", "Расчёт залпового сброса", "Учитываем сантехнику, а не только число жильцов."],
  ["home", "Высокий УГВ", "Проектируем устойчивое основание и отвод воды."],
];

const steps = [
  { title: "Заявка", text: "Получаем исходные данные." },
  { title: "Консультация", text: "Сравниваем подходящие серии." },
  { title: "Выезд инженера", text: "Проверяем сложные условия." },
  { title: "Смета", text: "Фиксируем работы и материалы." },
  { title: "Доставка", text: "Привозим станцию на объект." },
  { title: "Монтаж", text: "Устанавливаем и подключаем." },
  { title: "Запуск", text: "Проверяем и инструктируем." },
];

export default function Home() {
  return (
    <>
      <Hero />
      <section className="trust-strip"><div className="container trust-grid">{trust.map(([icon, title, text]) => <div key={title}><span><Icon name={icon} /></span><div><b>{title}</b><small>{text}</small></div></div>)}</div></section>

      <Section id="quiz" tone="dark">
        <div className="quiz-layout"><div><span className="eyebrow">Инженерный подбор</span><h2>Ответьте на 6 вопросов — предложим 3 подходящих варианта</h2><p>Учтём режим проживания, грунт, воду и сантехнику. Результат уточнит специалист, чтобы не заложить недостаточную или избыточную модель.</p><div className="quiz-points"><span><Icon name="check" />Без обязательств</span><span><Icon name="check" />Сравнение по бюджету</span><span><Icon name="check" />Предварительная смета</span></div></div><QuizForm /></div>
      </Section>

      <Section id="series">
        <SectionHeading eyebrow="Популярные серии" title="Решение под сценарий, а не просто по числу жильцов" text="Сравните назначение линеек. Все цены — редактируемые ориентиры до подтверждения комплектации." />
        <div className="series-grid">{series.map((item) => <SeriesCard item={item} key={item.slug} />)}</div>
      </Section>

      <Section tone="mint">
        <SectionHeading eyebrow="Контроль результата" title="Почему выбирают комплексный подход" text="Снижаем риск ошибок на стыке подбора, доставки и земляных работ." />
        <div className="feature-grid">{reasons.map(([icon, title, text]) => <FeatureCard key={title} icon={icon} title={title} text={text} />)}</div>
      </Section>

      <Section id="comparison">
        <SectionHeading eyebrow="Быстрое сравнение" title="Какая серия ближе к вашей задаче" text="Таблица помогает сузить выбор. Финальную модель определяем по фактической нагрузке и участку." />
        <ComparisonTable />
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="7 понятных шагов" title="От первой консультации до запуска" />
        <Steps items={steps} />
      </Section>

      <Section id="installation">
        <div className="installation-grid home-install">
          <div><span className="eyebrow">Монтаж под ключ</span><h2>Одна смета на оборудование, материалы и работы</h2><p>Подготовим котлован и песчаное основание, установим станцию, подключим трубы, выполним обратную засыпку, пусконаладку и инструктаж.</p><div className="install-checks">{["Котлован", "Песчаная подушка", "Установка станции", "Подключение труб", "Обратная засыпка", "Пусконаладка"].map((text) => <span key={text}><Icon name="check" />{text}</span>)}</div><Button href="#final-form">Рассчитать монтаж <Icon name="arrow" /></Button><small className="disclaimer">{site.disclaimer}</small></div>
          <StationVisual label="Монтаж по схеме участка" accent="green" />
        </div>
      </Section>

      <Section id="works" tone="soft">
        <SectionHeading eyebrow="Примеры решений" title="Типовые задачи наших клиентов" text="Демонстрационные кейсы для замены на реальные объекты, фото и подтверждённые результаты." />
        <div className="case-grid">{cases.map((item, index) => <CaseCard item={item} index={index} key={item.model} />)}</div>
      </Section>

      <FAQ items={homeFaq} />
      <FinalCTA />
    </>
  );
}
