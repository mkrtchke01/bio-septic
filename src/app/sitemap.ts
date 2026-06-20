import type { MetadataRoute } from "next";
import { series } from "@/data/series";
import { site } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/privacy", ...series.map((item) => `/${item.slug}`)];
  return routes.map((route) => ({ url: `${site.url}${route}`, lastModified: new Date(), changeFrequency: route ? "monthly" : "weekly", priority: route ? 0.8 : 1 }));
}
