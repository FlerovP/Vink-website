import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import USPGrid from "@/components/USPGrid";
import HowItWorks from "@/components/HowItWorks";
import CoverageMap from "@/components/CoverageMap";
import Rates from "@/components/Rates";
import DownloadCTA from "@/components/DownloadCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import TrustpilotBanner from "@/components/TrustpilotBanner";
import GlowOrbs from "@/components/GlowOrbs";
import NoiseOverlay from "@/components/NoiseOverlay";
import { fetchRates, getTopRates } from "@/lib/rates";

export const revalidate = 60;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allRates = await fetchRates();
  const topRates = getTopRates(allRates, 8);

  return (
    <>
      {/* Background layers */}
      <div className="animated-gradient-bg" aria-hidden="true" />
      <GlowOrbs />
      <NoiseOverlay />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <USPGrid />
        <HowItWorks />
        <CoverageMap rates={allRates} />
        <Rates rates={topRates} />
        <DownloadCTA />
        <FAQ />
        <div className="max-w-md mx-auto px-4 py-8">
          <TrustpilotBanner />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
