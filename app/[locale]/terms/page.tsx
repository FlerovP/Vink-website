import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import GlowOrbs from "@/components/GlowOrbs";
import NoiseOverlay from "@/components/NoiseOverlay";

export const metadata: Metadata = {
  title: "Terms of Service | VINK SIM",
  description:
    "Read the VINK SIM Terms of Service, including account use, rates, payments, and service limitations.",
};

export default async function TermsPage({
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
              Terms of Service
            </h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: February 12, 2026</p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
                <p>
                  These Terms of Service govern your use of VINK SIM services, websites, and applications.
                  By using VINK SIM, you agree to these terms and any applicable laws and regulations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Service Description</h2>
                <p>
                  VINK SIM provides pay-as-you-go eSIM data connectivity in supported countries. You install a
                  single eSIM profile, top up balance, and use mobile data at local country rates without
                  subscription bundles.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Eligibility and Account</h2>
                <p>
                  You are responsible for accurate registration details, account security, and all activity
                  under your account. You must use a compatible device and keep software updated for proper
                  service operation.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Rates and Charging</h2>
                <p>
                  Data is charged per usage according to applicable country and operator rates. Displayed rates
                  may reflect the cheapest available operator and can vary depending on the network selected by
                  your device at the time of use.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Payments and Balance</h2>
                <p>
                  Top-ups are added to your balance and used for eligible services. Unless required by law,
                  completed payments are non-refundable. You are responsible for taxes, fees, and payment method
                  charges that may apply.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Fair Use and Prohibited Activities</h2>
                <p>
                  You may not misuse the service, attempt unauthorized access, interfere with networks, or use
                  VINK SIM for unlawful activity. We may suspend or restrict access to protect service integrity
                  and user safety.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Service Availability</h2>
                <p>
                  Coverage, speed, and quality depend on local operators, device capabilities, and regional
                  conditions. Continuous availability is not guaranteed. Planned or emergency maintenance may
                  temporarily affect service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Limitation of Liability</h2>
                <p>
                  To the maximum extent allowed by law, VINK SIM is not liable for indirect, incidental, or
                  consequential damages arising from service use, network issues, or device configuration
                  problems.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">9. Changes to Terms</h2>
                <p>
                  We may update these Terms of Service from time to time. Updates become effective when posted.
                  Continued use of the service after updates means you accept the revised terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">10. Contact</h2>
                <p>
                  For legal or service questions, contact us at{" "}
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
