import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/site-components";
import { Header, MobileStickyCTA } from "@/components/header";
import { site } from "@/data/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["cyrillic", "latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Септики Евролос под ключ — подбор, монтаж и обслуживание", template: `%s | ${site.name}` },
  description: "Подбор, продажа и монтаж станций биологической очистки Евролос под ключ. Рассчитайте стоимость септика для частного дома, дачи или коммерческого объекта.",
  openGraph: { type: "website", locale: "ru_RU", siteName: site.name, title: site.name, description: "Инженерный подбор и монтаж автономной канализации под ключ." },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: site.address },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileStickyCTA />
        <Script id="organization" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        {/* Вставьте код Яндекс Метрики через NEXT_PUBLIC_YM_COUNTER_ID или отдельный Script после согласования cookies. */}
      </body>
    </html>
  );
}
