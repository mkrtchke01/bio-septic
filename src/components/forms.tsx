"use client";

import { FormEvent, useState } from "react";
import { reachGoal, type MetricGoal } from "@/lib/analytics";

const phonePattern = /^[+\d][\d\s()\-]{9,18}$/;

function useLeadForm(goal: MetricGoal) {
  const [state, setState] = useState<"idle" | "error" | "success" | "loading">("idle");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "").trim();
    const consent = data.get("consent");
    if (!phonePattern.test(phone) || !consent) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      reachGoal(goal);
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  };
  return { state, submit };
}

function Status({ state }: { state: string }) {
  if (state === "error") return <p className="form-status error" role="alert">Проверьте телефон и подтвердите согласие.</p>;
  if (state === "success") return <p className="form-status success" role="status">Заявка принята. Свяжемся с вами для уточнения деталей.</p>;
  return null;
}

function Consent() {
  return <label className="consent"><input type="checkbox" name="consent" /><span>Согласен на обработку персональных данных и с политикой конфиденциальности</span></label>;
}

export function ConsultationForm({ compact = false }: { compact?: boolean }) {
  const { state, submit } = useLeadForm("consultation_click");
  return (
    <form className={compact ? "form compact-form" : "form"} onSubmit={submit} noValidate>
      <input type="hidden" name="type" value="consultation" />
      <label><span>Ваше имя</span><input name="name" placeholder="Александр" /></label>
      <label><span>Телефон*</span><input name="phone" type="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" required /></label>
      <Consent />
      <button className="button button-primary" disabled={state === "loading"} type="submit">{state === "loading" ? "Отправляем…" : "Получить консультацию"}</button>
      <Status state={state} />
    </form>
  );
}

export function QuizForm() {
  const { state, submit } = useLeadForm("quiz_submit");
  return (
    <form className="quiz-form" onSubmit={submit} noValidate>
      <input type="hidden" name="type" value="quiz" />
      <div className="quiz-grid">
        <label><span>Количество проживающих</span><select name="users" defaultValue="4"><option>1–2</option><option>3</option><option>4</option><option>5</option><option>6–8</option><option>Более 8</option></select></label>
        <label><span>Тип проживания</span><select name="living"><option>Постоянное</option><option>Сезонное</option><option>По выходным</option></select></label>
        <label><span>Тип грунта</span><select name="soil"><option>Не знаю</option><option>Песок / супесь</option><option>Суглинок</option><option>Глина</option><option>Торф</option></select></label>
        <label><span>Высокий УГВ</span><select name="water"><option>Не знаю</option><option>Да</option><option>Нет</option></select></label>
        <label><span>Количество санузлов</span><select name="bathrooms"><option>1</option><option>2</option><option>3 и более</option></select></label>
        <label><span>Принудительная откачка</span><select name="pump"><option>Нужна консультация</option><option>Да</option><option>Нет</option></select></label>
      </div>
      <div className="quiz-submit">
        <label><span>Телефон для расчёта*</span><input name="phone" type="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" required /></label>
        <button className="button button-primary" disabled={state === "loading"} type="submit">{state === "loading" ? "Подбираем…" : "Получить 3 варианта"}</button>
      </div>
      <Consent />
      <Status state={state} />
    </form>
  );
}

export function LeadForm({ seriesName }: { seriesName?: string }) {
  const { state, submit } = useLeadForm("form_submit");
  return (
    <form className="form lead-form" onSubmit={submit} noValidate>
      <input type="hidden" name="type" value="calculation" />
      {seriesName && <input type="hidden" name="series" value={seriesName} />}
      <div className="form-grid">
        <label><span>Ваше имя</span><input name="name" placeholder="Имя" /></label>
        <label><span>Телефон*</span><input name="phone" type="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" required /></label>
        {seriesName ? (
          <label><span>Количество проживающих</span><select name="users"><option>1–2</option><option>3–4</option><option>5–6</option><option>7 и более</option></select></label>
        ) : (
          <label><span>Город / район</span><input name="location" placeholder="Например, Истра" /></label>
        )}
        <label className="wide"><span>Комментарий</span><textarea name="comment" rows={3} placeholder="Что важно учесть при подборе?" /></label>
      </div>
      <Consent />
      <button className="button button-light" disabled={state === "loading"} type="submit">{state === "loading" ? "Отправляем…" : seriesName ? "Получить подбор" : "Получить расчёт"}</button>
      <Status state={state} />
    </form>
  );
}
