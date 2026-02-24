"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import type { ExchangeRates } from "@/lib/currency";
import { formatPrice } from "@/lib/currency";

interface CurrencyContextValue {
  currency: string;
  setCurrency: (code: string) => void;
  exchangeRates: ExchangeRates;
  format: (usdPrice: number) => string;
  isUSD: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "USD",
  setCurrency: () => {},
  exchangeRates: { USD: 1 },
  format: (p) => `$${p.toFixed(2)}`,
  isUSD: true,
});

const STORAGE_KEY = "vink_currency";

export function CurrencyProvider({
  exchangeRates,
  children,
}: {
  exchangeRates: ExchangeRates;
  children: React.ReactNode;
}) {
  const [currency, setCurrencyState] = useState("USD");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && exchangeRates[saved]) {
      setCurrencyState(saved);
    }
  }, [exchangeRates]);

  const setCurrency = useCallback((code: string) => {
    setCurrencyState(code);
    localStorage.setItem(STORAGE_KEY, code);
  }, []);

  const format = useCallback(
    (usdPrice: number) => formatPrice(usdPrice, currency, exchangeRates),
    [currency, exchangeRates],
  );

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      exchangeRates,
      format,
      isUSD: currency === "USD",
    }),
    [currency, setCurrency, exchangeRates, format],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
