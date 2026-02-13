/* ─── Types ─── */
export interface RawRate {
  PLMN: string;
  NetworkName: string;
  CountryName: string;
  DataRate: string; // USD per 1 MB
}

export interface CountryRate {
  country: string;
  flag: string;
  pricePerGB: number; // USD per 1 GB
  operatorCount: number;
}

/* ─── Country → Flag Emoji map ─── */
const FLAGS: Record<string, string> = {
  "Afghanistan": "🇦🇫",
  "Albania": "🇦🇱",
  "Algeria": "🇩🇿",
  "Andorra": "🇦🇩",
  "Angola": "🇦🇴",
  "Anguilla": "🇦🇮",
  "Antigua and Barbuda": "🇦🇬",
  "Argentina": "🇦🇷",
  "Armenia": "🇦🇲",
  "Australia": "🇦🇺",
  "Austria": "🇦🇹",
  "Azerbaijan": "🇦🇿",
  "Bahamas": "🇧🇸",
  "Bahrain": "🇧🇭",
  "Bangladesh": "🇧🇩",
  "Barbados": "🇧🇧",
  "Belarus": "🇧🇾",
  "Belgium": "🇧🇪",
  "Belize": "🇧🇿",
  "Benin": "🇧🇯",
  "Bermuda": "🇧🇲",
  "Bhutan": "🇧🇹",
  "Bolivia": "🇧🇴",
  "Bosnia and Herzegovina": "🇧🇦",
  "Brazil": "🇧🇷",
  "British Virgin Islands": "🇻🇬",
  "Brunei": "🇧🇳",
  "Bulgaria": "🇧🇬",
  "Cambodia": "🇰🇭",
  "Cameroon": "🇨🇲",
  "Canada": "🇨🇦",
  "Cape Verde": "🇨🇻",
  "Cayman Islands": "🇰🇾",
  "Chad": "🇹🇩",
  "Chile": "🇨🇱",
  "China": "🇨🇳",
  "Colombia": "🇨🇴",
  "Congo Dem. Rep": "🇨🇩",
  "Congo Republic": "🇨🇬",
  "Costa Rica": "🇨🇷",
  "Croatia": "🇭🇷",
  "Cuba": "🇨🇺",
  "Curacao": "🇨🇼",
  "Cyprus": "🇨🇾",
  "Czech Republic": "🇨🇿",
  "Denmark": "🇩🇰",
  "Dominica": "🇩🇲",
  "Dominican Republic": "🇩🇴",
  "Ecuador": "🇪🇨",
  "Egypt": "🇪🇬",
  "El Salvador": "🇸🇻",
  "Estonia": "🇪🇪",
  "Eswatini": "🇸🇿",
  "Ethiopia": "🇪🇹",
  "Faroe Islands": "🇫🇴",
  "Fiji": "🇫🇯",
  "Finland": "🇫🇮",
  "France": "🇫🇷",
  "French Guiana": "🇬🇫",
  "French Polynesia": "🇵🇫",
  "Gabon": "🇬🇦",
  "Georgia": "🇬🇪",
  "Germany": "🇩🇪",
  "Ghana": "🇬🇭",
  "Gibraltar": "🇬🇮",
  "Greece": "🇬🇷",
  "Greenland": "🇬🇱",
  "Grenada": "🇬🇩",
  "Guadeloupe": "🇬🇵",
  "Guam": "🇬🇺",
  "Guatemala": "🇬🇹",
  "Guyana": "🇬🇾",
  "Honduras": "🇭🇳",
  "Hong Kong": "🇭🇰",
  "Hungary": "🇭🇺",
  "Iceland": "🇮🇸",
  "India": "🇮🇳",
  "Indonesia": "🇮🇩",
  "Iran": "🇮🇷",
  "Iraq": "🇮🇶",
  "Ireland": "🇮🇪",
  "Israel": "🇮🇱",
  "Italy": "🇮🇹",
  "Ivory Coast": "🇨🇮",
  "Jamaica": "🇯🇲",
  "Japan": "🇯🇵",
  "Jordan": "🇯🇴",
  "Kazakhstan": "🇰🇿",
  "Kenya": "🇰🇪",
  "Kosovo": "🇽🇰",
  "Kuwait": "🇰🇼",
  "Kyrgyzstan": "🇰🇬",
  "Laos": "🇱🇦",
  "Latvia": "🇱🇻",
  "Lesotho": "🇱🇸",
  "Liberia": "🇱🇷",
  "Liechtenstein": "🇱🇮",
  "Lithuania": "🇱🇹",
  "Luxembourg": "🇱🇺",
  "Macao China": "🇲🇴",
  "Macedonia": "🇲🇰",
  "Madagascar": "🇲🇬",
  "Malawi": "🇲🇼",
  "Malaysia": "🇲🇾",
  "Maldives": "🇲🇻",
  "Malta": "🇲🇹",
  "Mauritania": "🇲🇷",
  "Mauritius": "🇲🇺",
  "Mexico": "🇲🇽",
  "Moldova": "🇲🇩",
  "Monaco": "🇲🇨",
  "Mongolia": "🇲🇳",
  "Montenegro": "🇲🇪",
  "Montserrat": "🇲🇸",
  "Morocco": "🇲🇦",
  "Mozambique": "🇲🇿",
  "Nepal": "🇳🇵",
  "Netherlands": "🇳🇱",
  "Netherlands Antilles": "🇧🇶",
  "New Zealand": "🇳🇿",
  "Nicaragua": "🇳🇮",
  "Niger": "🇳🇪",
  "Nigeria": "🇳🇬",
  "Norway": "🇳🇴",
  "Oman": "🇴🇲",
  "Pakistan": "🇵🇰",
  "Panama": "🇵🇦",
  "Papua New Guinea": "🇵🇬",
  "Paraguay": "🇵🇾",
  "Peru": "🇵🇪",
  "Philippines": "🇵🇭",
  "Poland": "🇵🇱",
  "Portugal": "🇵🇹",
  "Puerto Rico": "🇵🇷",
  "Qatar": "🇶🇦",
  "Reunion": "🇷🇪",
  "Romania": "🇷🇴",
  "Russian Federation": "🇷🇺",
  "Rwanda": "🇷🇼",
  "Saint Kitts and Nevis": "🇰🇳",
  "Saint Lucia": "🇱🇨",
  "Saint Vincent and Grenadines": "🇻🇨",
  "Samoa": "🇼🇸",
  "Saudi Arabia": "🇸🇦",
  "Senegal": "🇸🇳",
  "Serbia": "🇷🇸",
  "Seychelles": "🇸🇨",
  "Singapore": "🇸🇬",
  "Slovakia": "🇸🇰",
  "Slovenia": "🇸🇮",
  "South Africa": "🇿🇦",
  "South Korea": "🇰🇷",
  "South Sudan": "🇸🇸",
  "Spain": "🇪🇸",
  "Sri Lanka": "🇱🇰",
  "Sudan": "🇸🇩",
  "Suriname": "🇸🇷",
  "Sweden": "🇸🇪",
  "Switzerland": "🇨🇭",
  "Taiwan": "🇹🇼",
  "Tajikistan": "🇹🇯",
  "Tanzania": "🇹🇿",
  "Thailand": "🇹🇭",
  "Tonga": "🇹🇴",
  "Trinidad and Tobago": "🇹🇹",
  "Tunisia": "🇹🇳",
  "Turkey": "🇹🇷",
  "Turks and Caicos Islands": "🇹🇨",
  "Uganda": "🇺🇬",
  "Ukraine": "🇺🇦",
  "United Arab Emirates": "🇦🇪",
  "United Kingdom": "🇬🇧",
  "United States": "🇺🇸",
  "Uruguay": "🇺🇾",
  "Uzbekistan": "🇺🇿",
  "Vanuatu": "🇻🇺",
  "Venezuela": "🇻🇪",
  "Vietnam": "🇻🇳",
  "Zambia": "🇿🇲",
  "Zimbabwe": "🇿🇼",
};

/* ─── Fallback rates (used when API is unavailable) ─── */
const FALLBACK_RATES: CountryRate[] = [
  { country: "Turkey", flag: "🇹🇷", pricePerGB: 0.82, operatorCount: 3 },
  { country: "Ukraine", flag: "🇺🇦", pricePerGB: 0.84, operatorCount: 2 },
  { country: "Bulgaria", flag: "🇧🇬", pricePerGB: 0.88, operatorCount: 3 },
  { country: "France", flag: "🇫🇷", pricePerGB: 0.90, operatorCount: 4 },
  { country: "Germany", flag: "🇩🇪", pricePerGB: 0.91, operatorCount: 3 },
  { country: "United Kingdom", flag: "🇬🇧", pricePerGB: 0.91, operatorCount: 6 },
  { country: "Spain", flag: "🇪🇸", pricePerGB: 0.92, operatorCount: 3 },
  { country: "Kazakhstan", flag: "🇰🇿", pricePerGB: 1.08, operatorCount: 2 },
];

/* ─── Fetch and process rates ─── */
const API_URL = "https://imsimarket.com/js/data/alternative.rates.json";

export async function fetchRates(): Promise<CountryRate[]> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const raw: RawRate[] = await res.json();

    // Group by country, collect all rates
    const byCountry = new Map<
      string,
      { minRate: number; count: number }
    >();

    for (const entry of raw) {
      const rate = parseFloat(entry.DataRate);
      if (isNaN(rate) || rate <= 0) continue;

      const existing = byCountry.get(entry.CountryName);
      if (existing) {
        existing.minRate = Math.min(existing.minRate, rate);
        existing.count += 1;
      } else {
        byCountry.set(entry.CountryName, { minRate: rate, count: 1 });
      }
    }

    // Convert to CountryRate array
    const rates: CountryRate[] = [];
    for (const [country, { minRate, count }] of byCountry) {
      rates.push({
        country,
        flag: FLAGS[country] || "🏳️",
        pricePerGB: Math.round(minRate * 1024 * 100) / 100, // per GB, 2 decimals
        operatorCount: count,
      });
    }

    // Sort by price ascending
    rates.sort((a, b) => a.pricePerGB - b.pricePerGB);

    return rates;
  } catch (e) {
    console.error("Failed to fetch rates, using fallback:", e);
    return FALLBACK_RATES;
  }
}

/* ─── Helper: get top N cheapest for popular countries ─── */
const POPULAR_COUNTRIES = [
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Turkey",
  "United Arab Emirates",
  "Thailand",
  "Kazakhstan",
  "Spain",
  "Italy",
  "Japan",
  "South Korea",
];

export function getTopRates(
  allRates: CountryRate[],
  count: number = 8
): CountryRate[] {
  // Prioritize popular countries, then fill with cheapest
  const popular = POPULAR_COUNTRIES.map((name) =>
    allRates.find((r) => r.country === name)
  ).filter(Boolean) as CountryRate[];

  // Sort popular by price
  popular.sort((a, b) => a.pricePerGB - b.pricePerGB);

  if (popular.length >= count) return popular.slice(0, count);

  // Fill remaining from cheapest that aren't already included
  const popularSet = new Set(popular.map((r) => r.country));
  const remaining = allRates.filter((r) => !popularSet.has(r.country));
  return [...popular, ...remaining].slice(0, count);
}
