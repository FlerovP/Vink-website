import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import GlowOrbs from "@/components/GlowOrbs";
import NoiseOverlay from "@/components/NoiseOverlay";

export const metadata: Metadata = {
  title: "Политика возврата | VINK SIM",
  description:
    "Политика возврата денежных средств сервиса VINK SIM — порядок рассмотрения обращений о возврате.",
};

export default async function RefundPage({
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
              На главную
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
              Политика возврата
            </h1>
            <p className="text-sm text-gray-500 mb-2">
              для сервиса VINK SIM
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Редакция № 1 · Дата публикации: 24 февраля 2026 г. · Сайт: vinksim.com
            </p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <p>
                Настоящая Политика возврата (далее — Политика) определяет порядок рассмотрения
                обращений Пользователей, связанных с возвратом денежных средств при
                использовании сервиса VINK SIM.
              </p>
              <p>
                Политика применяется к операциям пополнения баланса VINK SIM, совершенным
                через сайт, web-приложение и/или мобильное приложение VINK SIM.
              </p>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Общие положения</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">1.1.</strong> VINK SIM является IT-сервисом, предоставляющим Пользователю доступ к функционалу пополнения баланса VINK SIM и связанным сервисным возможностям.</p>
                  <p><strong className="text-gray-800">1.2.</strong> Предметом оплаты в рамках VINK SIM является пополнение баланса VINK SIM.</p>
                  <p><strong className="text-gray-800">1.3.</strong> Услуга считается оказанной Исполнителем в момент зачисления денежных средств на баланс VINK SIM Пользователя.</p>
                  <p><strong className="text-gray-800">1.4.</strong> Факт оплаты подтверждается электронным чеком и/или иным электронным подтверждением платежа.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Общее правило возврата</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">2.1.</strong> Возврат денежных средств за пополнение баланса VINK SIM по общему правилу не осуществляется.</p>
                  <p><strong className="text-gray-800">2.2.</strong> Совершая оплату, Пользователь подтверждает, что:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>ознакомился с настоящей Политикой;</li>
                    <li>понимает, что оплачивает пополнение баланса VINK SIM;</li>
                    <li>соглашается с тем, что услуга считается оказанной в момент зачисления средств на баланс;</li>
                    <li>принимает условия индивидуального рассмотрения обращений о возврате без гарантии положительного решения.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Индивидуальное рассмотрение обращений</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">3.1.</strong> В отдельных случаях Компания вправе по своему усмотрению рассмотреть обращение Пользователя о возврате денежных средств.</p>
                  <p><strong className="text-gray-800">3.2.</strong> Рассмотрение обращения о возврате:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>осуществляется исключительно в индивидуальном порядке;</li>
                    <li>не является обязанностью Компании произвести возврат;</li>
                    <li>не гарантирует принятие положительного решения.</li>
                  </ul>
                  <p><strong className="text-gray-800">3.3.</strong> Решение по обращению принимается с учетом обстоятельств конкретной ситуации, технических данных операции, информации платежного провайдера, истории использования Сервиса и иных значимых факторов.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Срок рассмотрения обращения</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">4.1.</strong> Срок рассмотрения обращения о возврате составляет до 10 (десяти) рабочих дней с даты получения Компанией полного комплекта информации, необходимой для рассмотрения.</p>
                  <p><strong className="text-gray-800">4.2.</strong> Если для рассмотрения обращения требуется дополнительная информация, документы или данные от Пользователя и/или третьих лиц (например, платежного партнера), срок рассмотрения может быть увеличен на период получения такой информации.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Как подать обращение о возврате</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">5.1.</strong> Для подачи обращения Пользователь направляет запрос на email:{" "}
                    <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a>.
                  </p>
                  <p><strong className="text-gray-800">5.2.</strong> В обращении рекомендуется указать:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>номер телефона / email, привязанные к аккаунту;</li>
                    <li>дату и время платежа;</li>
                    <li>сумму платежа;</li>
                    <li>валюту операции (USD);</li>
                    <li>идентификатор транзакции / чек / скриншот подтверждения платежа (при наличии);</li>
                    <li>описание причины обращения;</li>
                    <li>иные данные, которые могут помочь в проверке операции.</li>
                  </ul>
                  <p><strong className="text-gray-800">5.3.</strong> Компания вправе запросить дополнительную информацию, если это необходимо для проверки обращения.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Возможный порядок возврата (если решение одобрено)</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">6.1.</strong> В случае принятия Компанией решения о возврате денежных средств, возврат осуществляется способом, определяемым Компанией с учетом:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>технической возможности;</li>
                    <li>правил платежного провайдера / банка;</li>
                    <li>характера конкретной операции.</li>
                  </ul>
                  <p><strong className="text-gray-800">6.2.</strong> Срок фактического зачисления возвращаемых средств Пользователю зависит от банка, платежной системы, эквайера и иных третьих лиц и находится вне полного контроля Компании.</p>
                  <p><strong className="text-gray-800">6.3.</strong> Компания не несет ответственности за сроки обработки возврата банками, платежными системами и иными финансовыми посредниками после отправки возврата (если применимо).</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Ограничения и важные условия</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">7.1.</strong> Компания вправе отказать в удовлетворении обращения о возврате, если:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>обращение содержит неполные, недостоверные или противоречивые сведения;</li>
                    <li>имеются признаки мошенничества, злоупотребления, попытки неправомерного получения средств;</li>
                    <li>операция была проведена с нарушением правил использования Сервиса;</li>
                    <li>возврат невозможен по техническим, правовым или иным обоснованным причинам.</li>
                  </ul>
                  <p><strong className="text-gray-800">7.2.</strong> Подача обращения о возврате не означает автоматического приостановления рассмотрения спора платежным партнером, банком или платежной системой (если Пользователь параллельно инициировал соответствующую процедуру).</p>
                  <p><strong className="text-gray-800">7.3.</strong> Пользователю рекомендуется до подачи обращения проверить:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>корректность данных аккаунта;</li>
                    <li>статус платежа;</li>
                    <li>факт зачисления средств на баланс VINK SIM;</li>
                    <li>наличие подтверждения платежа (чек/уведомление).</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Связь с публичной офертой</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">8.1.</strong> Настоящая Политика применяется совместно с{" "}
                    <Link href="/offer" className="text-cyan hover:text-aqua transition-colors">Публичной офертой VINK SIM</Link>, размещенной на сайте vinksim.com.
                  </p>
                  <p><strong className="text-gray-800">8.2.</strong> В случае противоречия между настоящей Политикой и Публичной офертой, применяются положения Публичной оферты, если иное прямо не указано в соответствующем разделе.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Изменение Политики</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">9.1.</strong> Компания вправе в любое время изменять настоящую Политику.</p>
                  <p><strong className="text-gray-800">9.2.</strong> Актуальная версия Политики размещается на сайте vinksim.com и вступает в силу с момента публикации, если иной срок не указан дополнительно.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Контакты для обращений</h2>
                <ul className="space-y-1 text-gray-600">
                  <li><span className="text-gray-800 font-medium">ТОО «Винк Корп.»</span></li>
                  <li><span className="text-gray-800 font-medium">E-mail:</span>{" "}
                    <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a>
                  </li>
                  <li><span className="text-gray-800 font-medium">Телефон:</span> +7 706 709 67 89</li>
                  <li><span className="text-gray-800 font-medium">Поддержка:</span> в будние дни с 10:00 до 18:00 (время Казахстана)</li>
                </ul>
              </section>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
