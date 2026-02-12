import Header from "@/components/Header";
import Hero from "@/components/Hero";
import USPGrid from "@/components/USPGrid";
import HowItWorks from "@/components/HowItWorks";
import CoverageMap from "@/components/CoverageMap";
import Rates from "@/components/Rates";
import DownloadCTA from "@/components/DownloadCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import GlowOrbs from "@/components/GlowOrbs";
import NoiseOverlay from "@/components/NoiseOverlay";

export default function Home() {
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
        <CoverageMap />
        <Rates />
        <DownloadCTA />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
