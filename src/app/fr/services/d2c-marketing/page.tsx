"use client";
import PerformanceMarketing from "@/app/services/d2c-marketing/page";
import { translations } from "@/lib/d2c-translations";

export default function Page() {
  return <PerformanceMarketing t={translations["fr"]} />;
}
