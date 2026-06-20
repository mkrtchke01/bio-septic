"use client";

export type MetricGoal =
  | "form_submit"
  | "quiz_submit"
  | "phone_click"
  | "whatsapp_click"
  | "product_click"
  | "consultation_click";

export function reachGoal(goal: MetricGoal) {
  if (typeof window === "undefined") return;
  const ym = (window as Window & { ym?: (id: number, method: string, goal: string) => void }).ym;
  const counterId = Number(process.env.NEXT_PUBLIC_YM_COUNTER_ID);
  if (ym && counterId) ym(counterId, "reachGoal", goal);
}
