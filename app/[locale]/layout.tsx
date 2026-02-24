import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { siteConfig } from "@/config/site";
import SupportChat from "@/components/SupportChat";
import LoadingSplash from "@/components/LoadingSplash";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "ru")) {
    notFound();
  }

  setRequestLocale(locale);

  // Get messages for client provider
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <LoadingSplash />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <SupportChat />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
