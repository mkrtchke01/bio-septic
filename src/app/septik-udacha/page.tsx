import type { Metadata } from "next";
import { SeriesPage } from "@/components/series-page";
import { seriesBySlug } from "@/data/series";
const item = seriesBySlug["septik-udacha"];
export const metadata: Metadata = { title: item.seoTitle, description: item.seoDescription };
export default function Page() { return <SeriesPage item={item} />; }
