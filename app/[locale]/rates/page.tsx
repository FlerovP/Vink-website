import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { fetchRates } from "@/lib/rates";
import RatesSearch from "@/components/RatesSearch";
import GlowOrbs from "@/components/GlowOrbs";
import NoiseOverlay from "@/components/NoiseOverlay";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ratesPage" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AllRatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ratesPage");
  const rates = await fetchRates();

  return (
    <>
      {/* Background layers */}
      <div className="animated-gradient-bg" aria-hidden="true" />
      <GlowOrbs />
      <NoiseOverlay />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-cyan transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t("backToHome")}
            </Link>
            <Link href="/" className="text-lg font-bold text-gray-900">
              VINK<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-aqua"> SIM</span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20">
          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-cyan uppercase tracking-wider mb-3">
              {t("label")}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t("heading")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-aqua">
                {t("headingHighlight", { count: rates.length })}
              </span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              {t("subtitle")}
            </p>

            {/* Price badge */}
            <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-cyan/10 text-cyan text-sm font-semibold">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t("priceBadge")}
            </div>
          </div>

          {/* Search + Grid (client component) */}
          <RatesSearch rates={rates} />

          {/* Disclaimer */}
          <p className="text-center text-xs text-gray-400 mt-12 max-w-xl mx-auto">
            {t("disclaimer")}
          </p>
        </main>
      </div>
    </>
  );
}
