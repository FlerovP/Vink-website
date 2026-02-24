import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import GlowOrbs from "@/components/GlowOrbs";
import NoiseOverlay from "@/components/NoiseOverlay";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | VINK SIM",
  description:
    "Политика конфиденциальности сервиса VINK SIM — порядок сбора, использования, хранения и защиты персональных данных.",
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
              Политика конфиденциальности
            </h1>
            <p className="text-sm text-gray-500 mb-2">
              для сервиса VINK SIM
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Редакция № 1 · Дата публикации: 24 февраля 2026 г. · Сайт: vinksim.com
            </p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <p>
                Настоящая Политика конфиденциальности (далее — Политика) определяет порядок сбора,
                использования, хранения, передачи и защиты персональных данных и иной информации
                пользователей сервиса VINK SIM.
              </p>
              <p>Политика применяется к использованию:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>сайта vinksim.com;</li>
                <li>web-приложения VINK SIM;</li>
                <li>мобильного приложения VINK SIM;</li>
                <li>каналов поддержки и коммуникаций VINK SIM.</li>
              </ul>
              <p>
                Используя Сервис VINK SIM, Пользователь подтверждает, что ознакомился с настоящей
                Политикой и соглашается с ее условиями.
              </p>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Оператор данных / Сведения о компании</h2>
                <ul className="space-y-1 text-gray-600">
                  <li><span className="text-gray-800 font-medium">Наименование:</span> ТОО «Винк Корп.»</li>
                  <li><span className="text-gray-800 font-medium">БИН:</span> 260240007600</li>
                  <li><span className="text-gray-800 font-medium">Адрес:</span> Казахстан, г. Алматы, Бостандыкский район, ул. Клочкова, д. 137, кв. 25, индекс 050057</li>
                  <li><span className="text-gray-800 font-medium">Телефон:</span> +7 706 709 67 89</li>
                  <li><span className="text-gray-800 font-medium">E-mail:</span>{" "}
                    <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a>
                  </li>
                </ul>
                <p className="mt-2">Далее по тексту — «Компания», «мы».</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Что регулирует эта Политика</h2>
                <p>Настоящая Политика регулирует обработку:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>персональных данных Пользователей;</li>
                  <li>технической информации об использовании Сервиса;</li>
                  <li>данных о платежах и операциях (в необходимом объеме);</li>
                  <li>данных, полученных через обращения в поддержку;</li>
                  <li>cookie-файлов и аналитических данных.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Какие данные мы собираем</h2>
                <p className="mb-3">В зависимости от того, как Пользователь использует Сервис, мы можем собирать и обрабатывать следующие категории данных.</p>

                <h3 className="text-lg font-medium text-gray-800 mb-2">3.1. Контактные данные</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>номер телефона;</li>
                  <li>адрес электронной почты (email).</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">3.2. Данные учетной записи и использования Сервиса</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>данные личного кабинета (аккаунта);</li>
                  <li>идентификаторы профиля в Сервисе;</li>
                  <li>данные eSIM / IMSI / номер профиля (если отображаются и/или обрабатываются в рамках функционала Сервиса);</li>
                  <li>история использования трафика (например: объем, страна, время);</li>
                  <li>данные об операциях в Сервисе.</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">3.3. Платежные и транзакционные данные</h3>
                <ul className="list-disc pl-6 space-y-1 mb-2">
                  <li>информация о транзакциях (сумма, время, статус, идентификатор операции, технические данные платежа);</li>
                  <li>маска банковской карты (например, последние 4 цифры) и токен платежного инструмента (если применимо).</li>
                </ul>
                <p className="text-sm text-gray-500 italic mb-4">
                  Важно: Компания не хранит полные реквизиты банковской карты (например, полный номер карты, CVV/CVC) в своих системах, если иное прямо не указано в интерфейсе платежного провайдера.
                </p>

                <h3 className="text-lg font-medium text-gray-800 mb-2">3.4. Технические данные и данные об устройстве</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>модель устройства;</li>
                  <li>операционная система и версия ОС;</li>
                  <li>device ID / идентификаторы устройства и приложения (если используются);</li>
                  <li>IP-адрес;</li>
                  <li>данные о сеансах, логах, сбоях и технических событиях;</li>
                  <li>примерная геолокация (например, страна/регион, определяемые по IP, данным устройства или иным техническим параметрам).</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">3.5. Данные поддержки и коммуникаций</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>обращения в поддержку;</li>
                  <li>сообщения в чате;</li>
                  <li>переписка по email;</li>
                  <li>сообщения и обращения через WhatsApp Business и иные каналы поддержки.</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">3.6. Cookies и аналитические данные</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>технические (обязательные) cookies;</li>
                  <li>аналитические cookies;</li>
                  <li>рекламные / маркетинговые cookies (если используются на сайте / web-приложении);</li>
                  <li>события использования сайта, web-приложения и мобильного приложения, собираемые через аналитические инструменты.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Источники получения данных</h2>
                <p>Мы можем получать данные:</p>
                <ol className="list-decimal pl-6 space-y-1 mt-2">
                  <li>непосредственно от Пользователя (при регистрации, пополнении, обращении в поддержку, использовании Сервиса);</li>
                  <li>автоматически при использовании сайта / web-приложения / мобильного приложения (cookies, device data, IP, аналитика);</li>
                  <li>от платежных и технических партнеров — в объеме, необходимом для обработки платежей, обеспечения работы Сервиса, аналитики, безопасности и коммуникаций.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Для каких целей мы обрабатываем данные</h2>

                <h3 className="text-lg font-medium text-gray-800 mb-2">5.1. Предоставление Сервиса VINK SIM</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>создание и обслуживание личного кабинета;</li>
                  <li>предоставление доступа к функциям VINK SIM;</li>
                  <li>учет операций и баланса;</li>
                  <li>управление eSIM / профилем и связанными функциями;</li>
                  <li>отображение истории использования и данных по трафику.</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">5.2. Обработка платежей и транзакций</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>прием и обработка платежей;</li>
                  <li>подтверждение и учет транзакций;</li>
                  <li>предотвращение мошенничества;</li>
                  <li>разбор спорных и ошибочных операций.</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">5.3. Поддержка Пользователей</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>обработка запросов, жалоб, обращений;</li>
                  <li>коммуникация по вопросам работы Сервиса, платежей и технических проблем;</li>
                  <li>предоставление инструкций и уведомлений по использованию Сервиса.</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">5.4. Аналитика, улучшение продукта и безопасность</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>анализ работы сайта, web-приложения и мобильного приложения;</li>
                  <li>улучшение функционала, UX и стабильности;</li>
                  <li>диагностика сбоев и ошибок;</li>
                  <li>обеспечение информационной безопасности, мониторинг злоупотреблений и защита от мошенничества.</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">5.5. Коммуникации и маркетинг (при наличии)</h3>
                <ul className="list-disc pl-6 space-y-1 mb-2">
                  <li>email-рассылки;</li>
                  <li>push-уведомления;</li>
                  <li>SMS;</li>
                  <li>сообщения через WhatsApp / Telegram и иные каналы;</li>
                  <li>информирование о новостях Сервиса, изменениях, акциях, обновлениях и предложениях.</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Пользователь может отказаться от маркетинговых коммуникаций, обратившись в поддержку по адресу:{" "}
                  <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Правовые основания обработки данных</h2>
                <p>Мы обрабатываем данные в объеме, необходимом для:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>исполнения договора / публичной оферты и предоставления Пользователю Сервиса;</li>
                  <li>выполнения требований применимого законодательства;</li>
                  <li>обеспечения законных интересов Компании (например, безопасность, предотвращение мошенничества, аналитика и улучшение Сервиса), если это не нарушает права и законные интересы Пользователя;</li>
                  <li>получения согласия Пользователя в случаях, когда такое согласие требуется.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Cookies и аналогичные технологии</h2>
                <h3 className="text-lg font-medium text-gray-800 mb-2">7.1. Что такое cookies</h3>
                <p className="mb-4">Cookies — это небольшие файлы, которые сохраняются на устройстве Пользователя при посещении сайта / web-приложения и помогают обеспечивать корректную работу Сервиса, запоминать настройки и собирать аналитические данные.</p>

                <h3 className="text-lg font-medium text-gray-800 mb-2">7.2. Какие cookies мы можем использовать</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li><strong>Обязательные (технические)</strong> — для работы сайта/web-приложения, авторизации, безопасности;</li>
                  <li><strong>Аналитические</strong> — для анализа использования и улучшения Сервиса;</li>
                  <li><strong>Рекламные / маркетинговые</strong> — для оценки эффективности коммуникаций и рекламных кампаний (если применимо).</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mb-2">7.3. Управление cookies</h3>
                <p>Пользователь может изменить настройки cookies в браузере и/или отказаться от части cookies (кроме обязательных, необходимых для работы сайта/web-приложения). Отключение некоторых cookies может повлиять на корректную работу отдельных функций.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Кому и в каких случаях мы передаем данные</h2>
                <p className="mb-3">Мы не продаем персональные данные Пользователей. Мы можем передавать данные третьим лицам только в объеме, необходимом для работы Сервиса, исполнения обязательств и соблюдения закона.</p>

                <h3 className="text-lg font-medium text-gray-800 mb-2">8.1. Платежные партнеры</h3>
                <p className="mb-4">Для обработки платежей мы можем передавать необходимые данные платежным провайдерам и банкам, включая ePay (Halyk) и связанные платежные/банковские участники.</p>

                <h3 className="text-lg font-medium text-gray-800 mb-2">8.2. Технические и облачные провайдеры</h3>
                <p className="mb-2">Для работы Сервиса, хранения данных, аналитики, уведомлений и технической поддержки мы можем использовать сторонние сервисы и инфраструктуру, включая (но не ограничиваясь):</p>
                <ul className="list-disc pl-6 space-y-1 mb-2">
                  <li>Google Cloud, Firebase, Google Analytics;</li>
                  <li>AppsFlyer, Amplitude;</li>
                  <li>сервисы Google и Apple;</li>
                  <li>WhatsApp Business (для поддержки/коммуникаций).</li>
                </ul>
                <p className="mb-4">Также могут использоваться иные технологические поставщики и подрядчики, если это необходимо для обеспечения работы Сервиса, безопасности, аналитики, коммуникаций и исполнения обязательств перед Пользователями.</p>

                <h3 className="text-lg font-medium text-gray-800 mb-2">8.3. Подрядчики и партнеры</h3>
                <p className="mb-4">Мы можем передавать данные подрядчикам (например, техническая поддержка, разработка, аналитика, коммуникации) при условии, что такая передача необходима и осуществляется в рамках договорных обязательств и требований конфиденциальности.</p>

                <h3 className="text-lg font-medium text-gray-800 mb-2">8.4. По закону и для защиты прав</h3>
                <p className="mb-2">Мы можем раскрыть данные:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>по запросу уполномоченных государственных органов;</li>
                  <li>для выполнения требований законодательства;</li>
                  <li>для защиты прав, безопасности и законных интересов Компании, Пользователей и третьих лиц;</li>
                  <li>для расследования мошенничества, злоупотреблений и нарушений условий использования Сервиса.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Трансграничная передача данных</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">9.1.</strong> С учетом используемой технической инфраструктуры и сервисов (включая облачные, аналитические и платформенные решения), данные Пользователей могут обрабатываться и/или храниться как на территории Республики Казахстан, так и за ее пределами.</p>
                  <p><strong className="text-gray-800">9.2.</strong> Используя Сервис, Пользователь соглашается с возможной трансграничной передачей данных в объеме, необходимом для работы Сервиса, обработки платежей, аналитики, поддержки, обеспечения безопасности и стабильности инфраструктуры.</p>
                  <p><strong className="text-gray-800">9.3.</strong> Компания принимает разумные организационные и технические меры для защиты данных при такой передаче, в пределах своей зоны контроля и с учетом используемых платформ и провайдеров.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Сроки хранения данных</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">10.1.</strong> Мы храним данные Пользователя:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>в течение срока использования Сервиса и существования учетной записи;</li>
                    <li>в течение дополнительного периода после прекращения использования Сервиса, если это необходимо для: соблюдения требований законодательства; бухгалтерского и налогового учета; рассмотрения споров, претензий и обращений; обеспечения безопасности и предотвращения мошенничества; защиты прав и законных интересов Компании.</li>
                  </ul>
                  <p><strong className="text-gray-800">10.2.</strong> Точные сроки хранения отдельных категорий данных могут отличаться в зависимости от их типа, цели обработки, требований законодательства и внутренних процедур Компании.</p>
                  <p><strong className="text-gray-800">10.3.</strong> Пользователь вправе обратиться с запросом на удаление данных. Компания рассматривает такие запросы в разумный срок и удаляет данные в объеме, в котором это возможно, если у Компании отсутствует обязанность или законный интерес хранить их дальше.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Безопасность данных</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">11.1.</strong> Компания принимает разумные технические и организационные меры для защиты данных от несанкционированного доступа, утраты, изменения, раскрытия, уничтожения и иных неправомерных действий.</p>
                  <p><strong className="text-gray-800">11.2.</strong> При этом Пользователь понимает, что ни один способ передачи данных через интернет и ни одна система хранения не могут гарантировать абсолютную безопасность.</p>
                  <p><strong className="text-gray-800">11.3.</strong> Пользователь также обязан принимать разумные меры безопасности со своей стороны, включая: защиту устройства; конфиденциальность данных входа; своевременное обновление программного обеспечения; осторожность при использовании публичных сетей.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Права Пользователя в отношении данных</h2>
                <p className="mb-2">Пользователь вправе (в пределах, предусмотренных применимым законодательством):</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>запрашивать информацию о факте, целях и способах обработки своих данных;</li>
                  <li>запрашивать уточнение/исправление неточных данных;</li>
                  <li>запрашивать удаление данных (если отсутствуют законные основания для дальнейшего хранения);</li>
                  <li>отозвать согласие на обработку данных в случаях, когда обработка основана на согласии;</li>
                  <li>отказаться от маркетинговых коммуникаций;</li>
                  <li>обращаться с жалобами и претензиями по вопросам обработки данных.</li>
                </ul>
                <p className="mt-2">Для реализации указанных прав Пользователь может обратиться по email:{" "}
                  <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Дети и несовершеннолетние</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">13.1.</strong> Сервис VINK SIM не устанавливает отдельные возрастные ограничения в рамках настоящей Политики.</p>
                  <p><strong className="text-gray-800">13.2.</strong> При этом Пользователь и/или его законный представитель несет ответственность за использование Сервиса несовершеннолетним в соответствии с применимым законодательством.</p>
                  <p><strong className="text-gray-800">13.3.</strong> Если законный представитель считает, что несовершеннолетний предоставил данные без необходимого согласия, он может обратиться в поддержку по адресу:{" "}
                    <a className="text-cyan hover:text-aqua transition-colors" href="mailto:info@vinksim.com">info@vinksim.com</a>.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Сторонние сайты, сервисы и платформы</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">14.1.</strong> Сервис может содержать ссылки, интеграции или функции сторонних сервисов (включая платежные провайдеры, платформы аналитики, мессенджеры и др.).</p>
                  <p><strong className="text-gray-800">14.2.</strong> Мы не контролируем полностью правила обработки данных такими третьими лицами. Пользователю рекомендуется самостоятельно знакомиться с их политиками конфиденциальности и условиями использования.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">15. Изменение Политики</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-800">15.1.</strong> Компания вправе в любое время изменять настоящую Политику.</p>
                  <p><strong className="text-gray-800">15.2.</strong> Актуальная редакция публикуется на сайте vinksim.com. Новая редакция вступает в силу с момента публикации, если иное не указано в самой редакции.</p>
                  <p><strong className="text-gray-800">15.3.</strong> Продолжение использования Сервиса после публикации новой редакции означает согласие Пользователя с обновленной Политикой.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">16. Контакты по вопросам конфиденциальности</h2>
                <p className="mb-2">По всем вопросам, связанным с обработкой персональных данных и настоящей Политикой, Пользователь может обратиться:</p>
                <ul className="space-y-1 text-gray-600">
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
