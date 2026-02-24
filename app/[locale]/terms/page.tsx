import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import GlowOrbs from "@/components/GlowOrbs";
import NoiseOverlay from "@/components/NoiseOverlay";

export const metadata: Metadata = {
  title: "Пользовательское соглашение | VINK SIM",
  description:
    "Пользовательское соглашение сервиса VINK SIM — правила использования сайта, приложения и сервиса.",
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
              Пользовательское соглашение
            </h1>
            <p className="text-sm text-gray-500 mb-2">
              для сервиса VINK SIM
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Редакция № 1 · Дата публикации: 24 февраля 2026 г. · Сайт: vinksim.com
            </p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <p>
                Настоящее Пользовательское соглашение (далее — Соглашение) регулирует порядок
                использования сайта, web-приложения, мобильного приложения и иных цифровых
                интерфейсов сервиса VINK SIM.
              </p>
              <p>
                Используя VINK SIM, Пользователь подтверждает, что ознакомился с настоящим Соглашением
                и принимает его условия в полном объеме.
              </p>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Сведения о сервисе и компании</h2>
                <ul className="space-y-1 text-gray-600">
                  <li><span className="text-gray-800 font-medium">Сервис:</span> VINK SIM</li>
                  <li><span className="text-gray-800 font-medium">Оператор сервиса / правообладатель:</span> ТОО «Винк Корп.»</li>
                  <li><span className="text-gray-800 font-medium">БИН:</span> 260240007600</li>
                  <li><span className="text-gray-800 font-medium">Адрес:</span> Казахстан, г. Алматы, Бостандыкский район, ул. Клочкова, д. 137, кв. 25, индекс 050057</li>
                  <li><span className="text-gray-800 font-medium">Телефон:</span> +7 706 709 67 89</li>
                  <li><span className="text-gray-800 font-medium">E-mail:</span>{" "}
                    <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a>
                  </li>
                  <li><span className="text-gray-800 font-medium">Поддержка:</span> в будние дни с 10:00 до 18:00 (время Казахстана)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Термины</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">2.1. Пользователь</strong> — лицо, использующее Сервис VINK SIM через сайт, web-приложение и/или мобильное приложение.</p>
                  <p><strong className="text-gray-800">2.2. Сервис VINK SIM (Сервис)</strong> — IT-сервис, предоставляющий функционал управления eSIM, пополнения баланса VINK SIM, отображения данных использования и иных связанных возможностей.</p>
                  <p><strong className="text-gray-800">2.3. Аккаунт / Личный кабинет</strong> — учетная запись Пользователя в Сервисе.</p>
                  <p><strong className="text-gray-800">2.4. eSIM</strong> — цифровой профиль SIM, используемый на совместимом устройстве Пользователя.</p>
                  <p><strong className="text-gray-800">2.5. Баланс VINK SIM</strong> — учетная запись в Сервисе, на которой отражаются зачисленные средства для использования в рамках функционала VINK SIM.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Предмет Соглашения</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">3.1.</strong> Настоящее Соглашение определяет правила доступа и использования Сервиса VINK SIM, включая:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>регистрацию и использование Аккаунта;</li>
                    <li>использование функционала eSIM и Баланса VINK SIM;</li>
                    <li>правила взаимодействия с интерфейсами Сервиса;</li>
                    <li>ограничения и запреты при использовании Сервиса;</li>
                    <li>основания для ограничения или прекращения доступа к Сервису.</li>
                  </ul>
                  <p><strong className="text-gray-800">3.2.</strong> Настоящее Соглашение не заменяет и не отменяет условия оплаты, возвратов и оказания платных услуг, которые регулируются отдельными документами VINK SIM, включая:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><Link href="/offer" className="text-cyan hover:text-aqua transition-colors">Публичную оферту</Link>;</li>
                    <li><Link href="/refund" className="text-cyan hover:text-aqua transition-colors">Политику возврата (Refund Policy)</Link>;</li>
                    <li><Link href="/privacy" className="text-cyan hover:text-aqua transition-colors">Политику конфиденциальности (Privacy Policy)</Link>.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Принятие Соглашения</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">4.1.</strong> Пользователь принимает настоящее Соглашение с момента начала использования Сервиса, включая (но не ограничиваясь):</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>посещение сайта;</li>
                    <li>регистрацию Аккаунта;</li>
                    <li>вход в Личный кабинет;</li>
                    <li>использование web-приложения или мобильного приложения;</li>
                    <li>использование любого функционала VINK SIM.</li>
                  </ul>
                  <p><strong className="text-gray-800">4.2.</strong> Если Пользователь не согласен с условиями Соглашения, он обязан прекратить использование Сервиса.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Регистрация и Аккаунт</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">5.1.</strong> Для использования отдельных функций Сервиса Пользователю может потребоваться регистрация Аккаунта (Личного кабинета).</p>
                  <p><strong className="text-gray-800">5.2.</strong> Пользователь обязуется предоставлять достоверную и актуальную информацию при регистрации и использовании Сервиса.</p>
                  <p><strong className="text-gray-800">5.3.</strong> Пользователь несет ответственность за:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>сохранность доступа к Аккаунту;</li>
                    <li>конфиденциальность данных входа;</li>
                    <li>все действия, совершенные через его Аккаунт, если не доказано иное.</li>
                  </ul>
                  <p><strong className="text-gray-800">5.4.</strong> Пользователь обязуется незамедлительно сообщить в поддержку VINK SIM о подозрении на несанкционированный доступ к Аккаунту.</p>
                  <p><strong className="text-gray-800">5.5.</strong> Компания вправе применять дополнительные меры безопасности (подтверждение операций, проверка действий, ограничения доступа) в целях предотвращения мошенничества и злоупотреблений.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Использование eSIM и технические условия</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">6.1.</strong> VINK SIM предоставляет функционал, связанный с eSIM, исключительно в рамках технических возможностей Сервиса и партнерской инфраструктуры.</p>
                  <p><strong className="text-gray-800">6.2.</strong> Пользователь самостоятельно отвечает за:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>наличие совместимого устройства с поддержкой eSIM;</li>
                    <li>корректную установку/активацию eSIM;</li>
                    <li>корректные настройки устройства (включая передачу данных, роуминг, системные настройки и др.);</li>
                    <li>доступ к интернету, необходимый для установки/активации и работы отдельных функций Сервиса.</li>
                  </ul>
                  <p><strong className="text-gray-800">6.3.</strong> Компания не гарантирует совместимость Сервиса со всеми устройствами, моделями, версиями операционных систем, прошивками и кастомными настройками Пользователя.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Правила использования Сервиса</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">7.1.</strong> Пользователь вправе использовать Сервис только законным способом и в соответствии с настоящим Соглашением.</p>
                  <p><strong className="text-gray-800">7.2.</strong> Пользователю запрещается:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>использовать Сервис в целях мошенничества, обхода ограничений или совершения незаконных действий;</li>
                    <li>вмешиваться в работу Сервиса, его кода, API, инфраструктуры или механизмов безопасности;</li>
                    <li>осуществлять попытки несанкционированного доступа к системам, данным или аккаунтам других пользователей;</li>
                    <li>использовать автоматизированные средства (боты, скрипты, парсеры и т.п.) без письменного разрешения Компании;</li>
                    <li>передавать, перепродавать, сдавать в аренду, лицензировать или иным образом коммерциализировать доступ к Сервису, если это прямо не разрешено Компанией;</li>
                    <li>использовать Сервис способом, создающим чрезмерную нагрузку на инфраструктуру или нарушающим работу Сервиса;</li>
                    <li>предоставлять ложную, вводящую в заблуждение или чужую информацию при регистрации или обращении в поддержку;</li>
                    <li>нарушать права Компании, партнеров или третьих лиц.</li>
                  </ul>
                  <p><strong className="text-gray-800">7.3.</strong> Компания вправе квалифицировать как злоупотребление и иные действия, прямо не перечисленные выше, если они объективно направлены на нарушение нормальной работы Сервиса, получение необоснованной выгоды или обход правил.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Поддержка пользователей</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">8.1.</strong> Пользователь может обратиться в поддержку VINK SIM по следующим каналам:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>email: <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a></li>
                    <li>телефон: +7 706 709 67 89</li>
                    <li>иные каналы, доступные в интерфейсах Сервиса (если применимо)</li>
                  </ul>
                  <p><strong className="text-gray-800">8.2.</strong> Поддержка осуществляется в будние дни с 10:00 до 18:00 (время Казахстана), если иной режим не указан отдельно.</p>
                  <p><strong className="text-gray-800">8.3.</strong> Компания прилагает разумные усилия для обработки обращений, однако не гарантирует мгновенный ответ или решение в конкретный срок, если иной срок не установлен в отдельном документе (например, в Refund Policy или Публичной оферте).</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Интеллектуальная собственность</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">9.1.</strong> Все права на Сервис VINK SIM, включая (но не ограничиваясь):</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>программный код;</li>
                    <li>дизайн интерфейсов;</li>
                    <li>тексты;</li>
                    <li>графику;</li>
                    <li>элементы бренда, логотипы, обозначения;</li>
                    <li>базы данных (в части, принадлежащей Компании),</li>
                  </ul>
                  <p>принадлежат Компании и/или ее правообладателям, партнерам, поставщикам.</p>
                  <p><strong className="text-gray-800">9.2.</strong> Пользователю предоставляется ограниченное, неисключительное, непередаваемое, отзывное право использовать Сервис исключительно для личного/внутреннего использования по его прямому назначению.</p>
                  <p><strong className="text-gray-800">9.3.</strong> Никакие положения настоящего Соглашения не означают передачу Пользователю каких-либо исключительных прав на Сервис или его элементы.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Доступность Сервиса и изменения</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">10.1.</strong> Компания вправе в любое время:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>изменять функционал Сервиса;</li>
                    <li>добавлять или удалять функции;</li>
                    <li>изменять интерфейс, структуру, технические параметры;</li>
                    <li>проводить обновления и технические работы;</li>
                    <li>временно ограничивать доступ к отдельным функциям или Сервису в целом.</li>
                  </ul>
                  <p><strong className="text-gray-800">10.2.</strong> Компания не гарантирует, что Сервис будет работать непрерывно, без ошибок и в любой момент времени, в том числе в связи с:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>техническими работами;</li>
                    <li>обновлениями;</li>
                    <li>сбоями внешних систем и партнерской инфраструктуры;</li>
                    <li>действиями третьих лиц;</li>
                    <li>обстоятельствами, не зависящими от Компании.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Ограничение и прекращение доступа</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">11.1.</strong> Компания вправе без предварительного уведомления (или с уведомлением — по своему усмотрению) ограничить, приостановить или прекратить доступ Пользователя к Сервису полностью или частично, если:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Пользователь нарушает настоящее Соглашение;</li>
                    <li>имеются признаки мошенничества, злоупотреблений или подозрительной активности;</li>
                    <li>действия Пользователя создают риски для Компании, Сервиса, партнеров или других пользователей;</li>
                    <li>Компания обязана сделать это в силу закона, требований платежных партнеров, технических или безопасностных причин.</li>
                  </ul>
                  <p><strong className="text-gray-800">11.2.</strong> Ограничение доступа к Сервису по настоящему разделу само по себе не означает автоматического возврата денежных средств. Вопросы оплаты и возвратов регулируются{" "}
                    <Link href="/offer" className="text-cyan hover:text-aqua transition-colors">Публичной офертой</Link> и{" "}
                    <Link href="/refund" className="text-cyan hover:text-aqua transition-colors">Refund Policy</Link>.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Отказ от гарантий и ограничение ответственности</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">12.1.</strong> VINK SIM является IT-сервисом, предоставляющим доступ к соответствующему функционалу. Компания не является оператором связи и не контролирует полностью работу внешних сетей, операторов, банков, платежных систем, платформ, производителей устройств и программного обеспечения.</p>
                  <p><strong className="text-gray-800">12.2.</strong> Сервис предоставляется на условиях «как есть» и «по мере доступности» в пределах, допускаемых применимым законодательством.</p>
                  <p><strong className="text-gray-800">12.3.</strong> Компания не гарантирует:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>непрерывную и безошибочную работу Сервиса;</li>
                    <li>совместимость со всеми устройствами и версиями ПО;</li>
                    <li>доступность отдельных функций в любой момент времени;</li>
                    <li>отсутствие сбоев, вызванных внешними системами и третьими лицами.</li>
                  </ul>
                  <p><strong className="text-gray-800">12.4.</strong> Компания не несет ответственности за:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>качество, покрытие, скорость и доступность услуг связи/передачи данных, оказываемых третьими лицами;</li>
                    <li>действия/бездействие операторов связи, платежных провайдеров, банков, платформ и иных третьих лиц;</li>
                    <li>сбои устройств, ОС, приложений и настроек Пользователя;</li>
                    <li>косвенные убытки, упущенную выгоду, потерю данных и иные непрямые последствия использования или невозможности использования Сервиса.</li>
                  </ul>
                  <p><strong className="text-gray-800">12.5.</strong> Ничто в настоящем Соглашении не исключает и не ограничивает ответственность Компании в той части, в которой такое исключение или ограничение запрещено применимым законодательством.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Персональные данные и конфиденциальность</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">13.1.</strong> Вопросы обработки персональных данных регулируются{" "}
                    <Link href="/privacy" className="text-cyan hover:text-aqua transition-colors">Политикой конфиденциальности VINK SIM</Link>, размещенной на сайте vinksim.com.
                  </p>
                  <p><strong className="text-gray-800">13.2.</strong> Используя Сервис, Пользователь подтверждает ознакомление с Политикой конфиденциальности и соглашается с обработкой данных в соответствии с ней.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Коммуникации с Пользователем</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">14.1.</strong> Компания вправе направлять Пользователю сервисные уведомления, связанные с:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>работой Аккаунта;</li>
                    <li>безопасностью;</li>
                    <li>операциями;</li>
                    <li>изменениями функционала;</li>
                    <li>обновлениями документов и условий использования.</li>
                  </ul>
                  <p><strong className="text-gray-800">14.2.</strong> Маркетинговые коммуникации (email, push, SMS, мессенджеры) осуществляются в соответствии с настройками/согласием Пользователя и применимыми правилами. Пользователь может отказаться от маркетинговых сообщений, обратившись в поддержку.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">15. Сторонние сервисы и ссылки</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">15.1.</strong> Сервис может содержать ссылки, интеграции и функции сторонних сервисов (включая платежные системы, платформы аналитики, мессенджеры и иные сервисы).</p>
                  <p><strong className="text-gray-800">15.2.</strong> Компания не несет ответственности за содержание, доступность и правила использования сторонних сервисов, а также за обработку ими данных Пользователя.</p>
                  <p><strong className="text-gray-800">15.3.</strong> Пользователю рекомендуется самостоятельно знакомиться с условиями использования и политиками конфиденциальности таких сервисов.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">16. Изменение Соглашения</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">16.1.</strong> Компания вправе в любое время изменять настоящее Соглашение.</p>
                  <p><strong className="text-gray-800">16.2.</strong> Актуальная редакция размещается на сайте vinksim.com. Новая редакция вступает в силу с момента публикации, если иной срок не указан дополнительно.</p>
                  <p><strong className="text-gray-800">16.3.</strong> Продолжение использования Сервиса после публикации новой редакции означает согласие Пользователя с измененными условиями.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">17. Применимое право и споры</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">17.1.</strong> К настоящему Соглашению применяется законодательство Республики Казахстан.</p>
                  <p><strong className="text-gray-800">17.2.</strong> До обращения в суд Пользователю рекомендуется направить обращение/претензию в поддержку по адресу:{" "}
                    <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a>.
                  </p>
                  <p><strong className="text-gray-800">17.3.</strong> Споры подлежат разрешению в порядке, предусмотренном применимым законодательством Республики Казахстан, с учетом условий{" "}
                    <Link href="/offer" className="text-cyan hover:text-aqua transition-colors">Публичной оферты</Link> (если спор связан с оплатой/оказанием услуг).
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">18. Заключительные положения</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">18.1.</strong> Если отдельные положения настоящего Соглашения будут признаны недействительными или неприменимыми, остальные положения сохраняют силу.</p>
                  <p><strong className="text-gray-800">18.2.</strong> Настоящее Соглашение действует бессрочно до момента его отзыва или замены новой редакцией.</p>
                </div>
              </section>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
