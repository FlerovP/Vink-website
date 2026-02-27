import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import GlowOrbs from "@/components/GlowOrbs";
import NoiseOverlay from "@/components/NoiseOverlay";

export const metadata: Metadata = {
  title: "Публичная оферта | VINK SIM",
  description:
    "Публичная оферта о заключении договора оказания электронных услуг сервиса VINK SIM.",
};

export default async function OfferPage({
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
              Публичная оферта
            </h1>
            <p className="text-sm text-gray-500 mb-2">
              о заключении договора оказания электронных услуг сервиса VINK SIM
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Редакция № 1 · Дата публикации: 24 февраля 2026 г. · Сайт: vinksim.com
            </p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <p>
                Настоящий документ является публичной офертой Товарищества с ограниченной ответственностью
                «Винк Корп.» (далее — Исполнитель) и определяет условия оказания электронных услуг сервиса
                VINK SIM Пользователям.
              </p>
              <p>
                Акцепт настоящей Оферты означает полное и безоговорочное принятие Пользователем всех ее
                условий и заключение договора присоединения.
              </p>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Сведения об Исполнителе</h2>
                <ul className="space-y-1 text-gray-600">
                  <li><span className="text-gray-800 font-medium">Наименование:</span> ТОО «Винк Корп.»</li>
                  <li><span className="text-gray-800 font-medium">БИН:</span> 260240007600</li>
                  <li><span className="text-gray-800 font-medium">Адрес:</span> Казахстан, г. Алматы, Бостандыкский район, ул. Клочкова, д. 137, кв. 25, индекс 050057</li>
                  <li><span className="text-gray-800 font-medium">Телефон:</span> +7 706 709 67 89</li>
                  <li><span className="text-gray-800 font-medium">E-mail:</span>{" "}
                    <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a>
                  </li>
                  <li><span className="text-gray-800 font-medium">Режим работы поддержки:</span> в будние дни с 10:00 до 18:00 (время Казахстана)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Термины и определения</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">2.1. Пользователь</strong> — дееспособное физическое лицо, использующее Сайт, web-приложение и/или мобильное приложение VINK SIM, а также совершившее акцепт настоящей Оферты.</p>
                  <p><strong className="text-gray-800">2.2. Сервис VINK SIM</strong> — IT-сервис (программно-аппаратный комплекс Исполнителя), позволяющий Пользователю пополнять баланс VINK SIM, управлять eSIM и получать доступ к функционалу, связанному с использованием мобильной передачи данных через партнерскую инфраструктуру.</p>
                  <p><strong className="text-gray-800">2.3. eSIM</strong> — цифровой профиль SIM, устанавливаемый на совместимое устройство Пользователя. В рамках VINK SIM выпуск eSIM предоставляется бесплатно на условиях настоящей Оферты.</p>
                  <p><strong className="text-gray-800">2.4. Баланс VINK SIM (Баланс)</strong> — учетная запись в Сервисе, на которой отражаются зачисленные Пользователем денежные средства (предоплата) для последующего использования в рамках Сервиса.</p>
                  <p><strong className="text-gray-800">2.5. Пополнение Баланса</strong> — внесение Пользователем денежных средств в пользу Исполнителя через доступные платежные способы (включая интернет-эквайринг).</p>
                  <p><strong className="text-gray-800">2.6. Акцепт Оферты</strong> — совершение Пользователем действий, подтверждающих согласие с условиями Оферты, в том числе оплата/пополнение Баланса и/или использование Сервиса.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Предмет Оферты</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">3.1.</strong> Исполнитель предоставляет Пользователю электронные услуги IT-сервиса VINK SIM, включая:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>выпуск eSIM (бесплатно, при наличии технической возможности и совместимого устройства);</li>
                    <li>пополнение Баланса VINK SIM;</li>
                    <li>учет операций по Балансу;</li>
                    <li>предоставление доступа к функционалу Сервиса для использования мобильной передачи данных через партнерскую инфраструктуру.</li>
                  </ul>
                  <p><strong className="text-gray-800">3.2.</strong> Исполнитель является IT-провайдером сервиса и не является оператором связи. Услуги связи/передачи данных предоставляются с использованием инфраструктуры и сетей третьих лиц (партнеров), на которые Исполнитель не влияет напрямую.</p>
                  <p><strong className="text-gray-800">3.3.</strong> Услуга по настоящей Оферте считается оказанной Исполнителем в момент зачисления денежных средств на Баланс VINK SIM Пользователя в Сервисе.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Порядок акцепта и заключения договора</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">4.1.</strong> Настоящая Оферта считается акцептованной, а договор — заключенным с момента совершения Пользователем одного из следующих действий:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>нажатие кнопки подтверждения оплаты/пополнения в интерфейсе Сервиса;</li>
                    <li>успешное совершение платежа (Пополнения Баланса);</li>
                    <li>начало использования Сервиса после ознакомления с настоящей Офертой.</li>
                  </ul>
                  <p><strong className="text-gray-800">4.2.</strong> Совершая акцепт, Пользователь подтверждает, что:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>ознакомился с условиями Оферты;</li>
                    <li>понимает характер услуги как услуги IT-сервиса;</li>
                    <li>имеет совместимое устройство для использования eSIM;</li>
                    <li>соглашается с правилами и ограничениями, установленными настоящей Офертой.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Условия использования Сервиса</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">5.1.</strong> VINK SIM доступен через мобильное приложение и web-приложение.</p>
                  <p><strong className="text-gray-800">5.2.</strong> eSIM предоставляется бесплатно. Минимальное первое пополнение Баланса составляет 5 (пять) долларов США (USD).</p>
                  <p><strong className="text-gray-800">5.3.</strong> Валюта Пополнения Баланса в Сервисе — доллар США (USD).</p>
                  <p><strong className="text-gray-800">5.4.</strong> Комиссия Исполнителя за прием платежа через эквайринг не взимается. При этом Пользователь понимает, что возможные комиссии банка-эмитента карты, платежной системы или конвертация валюты могут применяться третьими лицами и не зависят от Исполнителя.</p>
                  <p><strong className="text-gray-800">5.5.</strong> Факт оплаты подтверждается электронным чеком и/или иным электронным подтверждением платежа, формируемым в рамках платежной инфраструктуры и/или Сервиса.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Порядок оплаты</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">6.1.</strong> Оплата осуществляется Пользователем в безналичной форме с использованием доступных на Сайте / в web-приложении / мобильном приложении платежных инструментов, включая интернет-эквайринг.</p>
                  <p><strong className="text-gray-800">6.2.</strong> Обязательство Пользователя по оплате считается исполненным с момента получения Исполнителем подтверждения успешной платежной операции и отражения суммы на Балансе в Сервисе.</p>
                  <p><strong className="text-gray-800">6.3.</strong> Исполнитель вправе отказать в проведении операции или приостановить зачисление при наличии признаков мошенничества, технического сбоя, ошибки платежного провайдера, требования уполномоченных органов или проведения проверки безопасности.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Возвраты и отмена операций</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">7.1.</strong> По общему правилу, возврат денежных средств за Пополнение Баланса VINK SIM не осуществляется.</p>
                  <p><strong className="text-gray-800">7.2.</strong> Возврат может быть рассмотрен исключительно в индивидуальном порядке по обращению Пользователя, по усмотрению Исполнителя, и не является гарантированным.</p>
                  <p><strong className="text-gray-800">7.3.</strong> Срок рассмотрения обращения о возврате — до 10 (десяти) рабочих дней с даты получения Исполнителем полного комплекта информации по обращению.</p>
                  <p><strong className="text-gray-800">7.4.</strong> Для рассмотрения обращения Пользователь направляет запрос на email:{" "}
                    <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a>, указав:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>ФИО (при наличии);</li>
                    <li>контактные данные;</li>
                    <li>дату и сумму платежа;</li>
                    <li>идентификатор/подтверждение платежа (при наличии);</li>
                    <li>аккаунт/идентификатор в Сервисе;</li>
                    <li>описание причины обращения.</li>
                  </ul>
                  <p><strong className="text-gray-800">7.5.</strong> В случае принятия решения о возврате способ и сроки возврата определяются Исполнителем с учетом технической возможности платежных партнеров и применимых правил платежной системы/банка.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Права и обязанности Пользователя</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">8.1.</strong> Пользователь обязуется:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>указывать достоверные данные при использовании Сервиса;</li>
                    <li>использовать Сервис только в законных целях;</li>
                    <li>самостоятельно проверять совместимость устройства с eSIM;</li>
                    <li>соблюдать инструкции по установке/активации eSIM и настройке устройства;</li>
                    <li>не использовать Сервис способом, нарушающим его работу или права третьих лиц.</li>
                  </ul>
                  <p><strong className="text-gray-800">8.2.</strong> Пользователь понимает и принимает, что:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>качество, покрытие, скорость и доступность передачи данных зависят от третьих лиц (операторов/партнерских сетей), местоположения, устройства и иных факторов;</li>
                    <li>Исполнитель не гарантирует бесперебойную работу внешних сетей связи и оборудования Пользователя.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Права и обязанности Исполнителя</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">9.1.</strong> Исполнитель обязуется:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>обеспечивать функционирование Сервиса в пределах разумной технической возможности;</li>
                    <li>учитывать поступившие Пополнения и операции по Балансу;</li>
                    <li>оказывать информационную поддержку Пользователям по указанным контактам в рабочее время.</li>
                  </ul>
                  <p><strong className="text-gray-800">9.2.</strong> Исполнитель вправе:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>изменять функционал Сервиса, интерфейс и технические параметры;</li>
                    <li>проводить технические работы с временным ограничением доступа;</li>
                    <li>ограничивать/приостанавливать доступ при подозрении на мошенничество, нарушении Оферты или требований безопасности;</li>
                    <li>отказывать в обслуживании в случаях, предусмотренных законодательством и/или правилами платежных партнеров.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Ограничение ответственности</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">10.1.</strong> Исполнитель является IT-провайдером и несет ответственность только в пределах своей зоны контроля.</p>
                  <p><strong className="text-gray-800">10.2.</strong> Исполнитель не несет ответственности за:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>качество, покрытие, доступность, скорость и непрерывность услуг связи/передачи данных, оказываемых третьими лицами;</li>
                    <li>сбои, ограничения и ошибки в работе сетей операторов, партнеров, банков, платежных систем, интернет-провайдеров;</li>
                    <li>несовместимость устройства Пользователя с eSIM;</li>
                    <li>некорректные настройки устройства Пользователя (роуминг, APN, передача данных и т.п.);</li>
                    <li>действия/бездействие Пользователя, приведшие к невозможности использования Сервиса;</li>
                    <li>косвенные убытки, упущенную выгоду, потерю данных, репутационные потери Пользователя.</li>
                  </ul>
                  <p><strong className="text-gray-800">10.3.</strong> При этом ничто в настоящей Оферте не исключает ответственность Исполнителя в случаях, когда такая ответственность не может быть исключена или ограничена в силу применимого законодательства.</p>
                  <p><strong className="text-gray-800">10.4.</strong> Совокупная ответственность Исполнителя по любым требованиям Пользователя, связанным с конкретной операцией Пополнения, в любом случае ограничивается суммой соответствующего Пополнения, если иное прямо не предусмотрено императивными нормами законодательства.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Персональные данные и коммуникации</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">11.1.</strong> Пользователь, акцептуя Оферту, дает согласие на обработку своих персональных данных Исполнителем в объеме, необходимом для:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>исполнения настоящей Оферты;</li>
                    <li>приема и обработки платежей;</li>
                    <li>поддержки Пользователей;</li>
                    <li>предотвращения мошенничества;</li>
                    <li>рассмотрения обращений и претензий.</li>
                  </ul>
                  <p><strong className="text-gray-800">11.2.</strong> Исполнитель вправе передавать необходимые данные третьим лицам (платежным провайдерам, банкам, техническим партнерам и иным лицам, участвующим в оказании Сервиса) исключительно в объеме, необходимом для исполнения настоящей Оферты и соблюдения требований законодательства.</p>
                  <p><strong className="text-gray-800">11.3.</strong> Подробные условия обработки персональных данных могут быть дополнительно определены в отдельной{" "}
                    <Link href="/privacy" className="text-cyan hover:text-aqua transition-colors">Политике конфиденциальности</Link>, размещенной на Сайте.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Претензии и разрешение споров</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">12.1.</strong> До обращения в суд Пользователь обязуется направить претензию Исполнителю по email:{" "}
                    <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a>.</p>
                  <p><strong className="text-gray-800">12.2.</strong> Срок рассмотрения претензии — до 10 (десяти) рабочих дней, если иной срок не требуется по закону или по характеру обращения.</p>
                  <p><strong className="text-gray-800">12.3.</strong> При недостижении согласия спор подлежит рассмотрению в соответствии с законодательством Республики Казахстан в компетентном суде по месту нахождения Исполнителя, если иное не предусмотрено императивными нормами законодательства.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Срок действия, изменение и прекращение Оферты</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">13.1.</strong> Оферта вступает в силу с момента ее размещения на Сайте и действует бессрочно до момента отзыва или замены новой редакцией.</p>
                  <p><strong className="text-gray-800">13.2.</strong> Исполнитель вправе в любое время изменить условия Оферты. Новая редакция вступает в силу с момента публикации на Сайте, если иной срок не указан в самой редакции.</p>
                  <p><strong className="text-gray-800">13.3.</strong> Продолжение использования Сервиса после публикации новой редакции означает согласие Пользователя с обновленными условиями.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Заключительные положения</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">14.1.</strong> Если какое-либо положение настоящей Оферты будет признано недействительным, это не влияет на действительность остальных положений.</p>
                  <p><strong className="text-gray-800">14.2.</strong> Во всем, что не урегулировано настоящей Офертой, стороны руководствуются законодательством Республики Казахстан.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">15. Реквизиты Исполнителя</h2>
                <ul className="space-y-1 text-gray-600">
                  <li><span className="text-gray-800 font-medium">ТОО «Винк Корп.»</span></li>
                  <li><span className="text-gray-800 font-medium">БИН:</span> 260240007600</li>
                  <li><span className="text-gray-800 font-medium">Адрес:</span> Казахстан, г. Алматы, Бостандыкский район, ул. Клочкова, д. 137, кв. 25, индекс 050057</li>
                  <li><span className="text-gray-800 font-medium">Телефон:</span> +7 706 709 67 89</li>
                  <li><span className="text-gray-800 font-medium">E-mail:</span>{" "}
                    <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a>
                  </li>
                  <li><span className="text-gray-800 font-medium">Сайт:</span>{" "}
                    <a className="text-cyan hover:text-aqua transition-colors" href="https://vinksim.com">vinksim.com</a>
                  </li>
                </ul>
              </section>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
