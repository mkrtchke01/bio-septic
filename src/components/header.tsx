"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/data/site";
import { reachGoal } from "@/lib/analytics";
import { Icon } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="logo" href="/" aria-label="EuroSeptic Pro — главная">
          <span className="logo-mark"><span /></span>
          <span><b>EuroSeptic</b><small>PRO · инженерные системы</small></span>
        </Link>
        <nav className={`main-nav ${open ? "nav-open" : ""}`} aria-label="Основная навигация">
          {site.menu.map((item) => <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        </nav>
        <div className="header-contact">
          <a href={site.phoneHref} onClick={() => reachGoal("phone_click")}><b>{site.phone}</b><small>{site.hours}</small></a>
          <Link className="button button-primary header-button" href="/#final-form">Консультация</Link>
        </div>
        <button className="burger" aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
      </div>
      {open && <button className="nav-backdrop" aria-label="Закрыть меню" onClick={() => setOpen(false)} />}
    </header>
  );
}

export function MobileStickyCTA() {
  return <div className="mobile-sticky"><a href={site.phoneHref} onClick={() => reachGoal("phone_click")}><Icon name="phone" />Позвонить</a><Link href="/#quiz"><Icon name="ruler" />Рассчитать</Link></div>;
}
