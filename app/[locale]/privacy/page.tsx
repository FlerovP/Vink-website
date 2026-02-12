import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import GlowOrbs from "@/components/GlowOrbs";
import NoiseOverlay from "@/components/NoiseOverlay";

export const metadata: Metadata = {
  title: "Privacy Policy | VINK SIM",
  description:
    "Learn how VINK SIM collects, uses, stores, and protects personal data in accordance with privacy principles.",
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="animated-gradient-bg" aria-hidden="true" />
      <GlowOrbs />
      <NoiseOverlay />

      <div className="relative z-10 min-h-screen">
        <header className="sticky top-0 z-50 glass border-b border-white/10">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-cyan transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to home
            </Link>
            <Link href="/" className="text-lg font-bold text-gray-900">
              VINK
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-aqua"> SIM</span>
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-20">
          <article className="glass rounded-3xl border border-white/20 p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: February 12, 2026</p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Scope</h2>
                <p>
                  This Privacy Policy explains how VINK SIM collects, uses, stores, and protects personal data
                  when you use our website, app, and eSIM connectivity services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Data We Collect</h2>
                <p>
                  We may collect account details, contact information, payment-related metadata, usage data,
                  technical diagnostics, and support communications needed to provide and improve our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">3. How We Use Data</h2>
                <p>
                  We use personal data to deliver connectivity, process payments, prevent abuse, provide support,
                  comply with legal obligations, and improve platform performance and reliability.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Legal Basis</h2>
                <p>
                  Depending on your location, we process data based on contract performance, legitimate interests,
                  consent where required, and compliance with legal and regulatory obligations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Data Sharing</h2>
                <p>
                  We may share limited data with trusted service providers, payment processors, telecom partners,
                  and legal authorities where required. We do not sell personal data to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Data Retention</h2>
                <p>
                  We retain data only for as long as necessary for service delivery, accounting, security,
                  dispute resolution, and legal compliance, then delete or anonymize it where possible.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Security</h2>
                <p>
                  We implement reasonable technical and organizational safeguards to protect personal data from
                  unauthorized access, loss, misuse, alteration, or disclosure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">8. International Transfers</h2>
                <p>
                  Your data may be processed in countries other than your own. Where applicable, we use
                  appropriate safeguards for cross-border transfers in line with legal requirements.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">9. Your Rights</h2>
                <p>
                  Depending on your jurisdiction, you may have rights to access, correct, delete, restrict, or
                  object to processing of your personal data, and to request data portability.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">10. Cookies and Analytics</h2>
                <p>
                  We may use cookies and similar technologies for essential functionality, security, analytics,
                  and performance optimization. You can manage browser cookie settings at any time.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">11. Contact</h2>
                <p>
                  If you have privacy questions or requests, contact{" "}
                  <a className="text-cyan hover:text-aqua transition-colors" href="mailto:support@vinksim.com">
                    support@vinksim.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
