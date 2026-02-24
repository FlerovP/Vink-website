"use client";

import { useTranslations } from "next-intl";
import { SUPPORTED_CURRENCIES } from "@/lib/currency";
import { useCurrency } from "@/components/CurrencyProvider";

export default function CurrencySelector() {
  const { currency, setCurrency, isUSD } = useCurrency();
  const t = useTranslations("currency");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="inline-flex items-center gap-2 px-1 py-1 rounded-xl bg-gray-100/80 border border-gray-200/60">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="appearance-none bg-transparent text-sm font-medium text-gray-700 pl-3 pr-7 py-1.5 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan/30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 8px center",
          }}
        >
          {SUPPORTED_CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.symbol} {c.code}
            </option>
          ))}
        </select>
      </div>

      {!isUSD && (
        <p className="text-[11px] text-amber-600/80 bg-amber-50 border border-amber-200/50 rounded-lg px-3 py-1.5 max-w-xs text-center leading-snug">
          <svg className="w-3 h-3 inline-block mr-1 -mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {t("disclaimer")}
        </p>
      )}
    </div>
  );
}
