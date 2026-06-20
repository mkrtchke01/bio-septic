import Link from "next/link";
import type { ReactNode } from "react";

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "light";
  className?: string;
  type?: "button" | "submit";
}) {
  const classes = `button button-${variant} ${className}`;
  return href ? <Link className={classes} href={href}>{children}</Link> : <button className={classes} type={type ?? "button"}>{children}</button>;
}

export function Section({
  children,
  id,
  tone = "white",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: "white" | "soft" | "dark" | "mint";
  className?: string;
}) {
  return <section id={id} className={`section section-${tone} ${className}`}><div className="container">{children}</div></section>;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading ${align === "center" ? "section-heading-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function Icon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    check: <path d="m5 12 4 4L19 6" />,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    shield: <path d="M12 3 4 6v5c0 5 3.4 8.2 8 10 4.6-1.8 8-5 8-10V6l-8-3Z" />,
    wrench: <path d="M14 6a4 4 0 0 0-5 5L3 17l4 4 6-6a4 4 0 0 0 5-5l-3 3-3-3 2-4Z" />,
    drop: <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />,
    leaf: <><path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z" /><path d="M4 21c3-6 7-9 13-12" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2" /><path d="M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2" /></>,
    phone: <path d="M6 3h4l2 5-3 2a14 14 0 0 0 5 5l2-3 5 2v4c0 2-2 3-4 3A17 17 0 0 1 3 7c0-2 1-4 3-4Z" />,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    ruler: <><path d="M4 20 20 4l-4-2L2 16l2 4Z" /><path d="m12 8 2 2M9 11l2 2M6 14l2 2" /></>,
  };
  return <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name] ?? paths.check}</svg>;
}

export function FeatureCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return <article className="feature-card"><span className="icon-box"><Icon name={icon} /></span><h3>{title}</h3><p>{text}</p></article>;
}

export function Breadcrumbs({ current }: { current: string }) {
  return <nav className="breadcrumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><span aria-current="page">{current}</span></nav>;
}

export function StationVisual({ label = "Инженерная станция", accent = "blue" }: { label?: string; accent?: string }) {
  return (
    <div className={`station-visual station-${accent}`}>
      <div className="visual-grid" />
      <div className="pipe pipe-left" />
      <div className="pipe pipe-right" />
      <div className="station-body">
        <div className="station-lid" />
        <div className="station-rib rib-1" />
        <div className="station-rib rib-2" />
        <div className="station-rib rib-3" />
        <div className="station-window"><span /><span /><span /></div>
      </div>
      <div className="visual-chip"><span className="pulse" /> {label}</div>
      <div className="visual-note">Схема оборудования</div>
    </div>
  );
}
