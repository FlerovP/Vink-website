"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = locale === "en" ? "ru" : "en";

  const handleSwitch = () => {
    router.replace(pathname, { locale: switchTo });
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-200 hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-200 text-gray-600 hover:text-cyan"
      aria-label={`Switch to ${switchTo === "ru" ? "Russian" : "English"}`}
    >
      <span className={locale === "en" ? "text-cyan" : "text-gray-400"}>EN</span>
      <span className="text-gray-300">/</span>
      <span className={locale === "ru" ? "text-cyan" : "text-gray-400"}>RU</span>
    </button>
  );
}
