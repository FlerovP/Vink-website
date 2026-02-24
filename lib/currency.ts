export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  decimals: number;
}

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: "USD", symbol: "$",   name: "US Dollar",          decimals: 2 },
  { code: "EUR", symbol: "€",   name: "Euro",               decimals: 2 },
  { code: "GBP", symbol: "£",   name: "British Pound",      decimals: 2 },
  { code: "RUB", symbol: "₽",   name: "Russian Ruble",      decimals: 0 },
  { code: "KZT", symbol: "₸",   name: "Kazakh Tenge",       decimals: 0 },
  { code: "TRY", symbol: "₺",   name: "Turkish Lira",       decimals: 2 },
  { code: "THB", symbol: "฿",   name: "Thai Baht",          decimals: 2 },
  { code: "JPY", symbol: "¥",   name: "Japanese Yen",       decimals: 0 },
  { code: "CNY", symbol: "¥",   name: "Chinese Yuan",       decimals: 2 },
  { code: "INR", symbol: "₹",   name: "Indian Rupee",       decimals: 2 },
  { code: "BRL", symbol: "R$",  name: "Brazilian Real",     decimals: 2 },
  { code: "AUD", symbol: "A$",  name: "Australian Dollar",  decimals: 2 },
  { code: "CAD", symbol: "C$",  name: "Canadian Dollar",    decimals: 2 },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc",        decimals: 2 },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham",         decimals: 2 },
  { code: "KRW", symbol: "₩",   name: "South Korean Won",   decimals: 0 },
];

const EXCHANGE_API = "https://open.er-api.com/v6/latest/USD";

export type ExchangeRates = Record<string, number>;

export async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    const res = await fetch(EXCHANGE_API, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Exchange rate API returned ${res.status}`);
    const data = await res.json();
    const rates: ExchangeRates = { USD: 1 };
    for (const c of SUPPORTED_CURRENCIES) {
      if (c.code === "USD") continue;
      if (data.rates?.[c.code]) {
        rates[c.code] = data.rates[c.code];
      }
    }
    return rates;
  } catch (e) {
    console.error("Failed to fetch exchange rates:", e);
    return { USD: 1 };
  }
}

export function convertPrice(usd: number, rate: number): number {
  return usd * rate;
}

export function formatPrice(usd: number, currencyCode: string, rates: ExchangeRates): string {
  const info = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode);
  if (!info) return `$${usd.toFixed(2)}`;

  const rate = rates[currencyCode] ?? 1;
  const converted = convertPrice(usd, rate);
  const formatted = converted.toFixed(info.decimals);

  if (info.symbol.length <= 2) {
    return `${info.symbol}${formatted}`;
  }
  return `${formatted} ${info.symbol}`;
}
