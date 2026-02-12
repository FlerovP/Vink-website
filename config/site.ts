export const siteConfig = {
  name: "VINK SIM",
  title: "VINK SIM — Mobile Data in 180+ Countries",
  description:
    "Pay-as-you-go eSIM: top up once, use anywhere, balance never burns. One eSIM for 180+ countries with transparent per-MB pricing.",
  url: "https://vinksim.com",

  loginUrl: "https://app.vinksim.com/login",
  downloadUrl: "https://app.vinksim.com/download",

  nav: [
    { label: "Product", href: "#product" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Coverage", href: "#coverage" },
    { label: "Rates", href: "#rates" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    headline: "Mobile data in 180+ countries.\nNo packages. No expiration.",
    subheadline:
      "Pay-as-you-go eSIM: top up once, use anywhere, balance never burns.",
    primaryCta: "Download App",
    secondaryCta: "See Rates",
  },

  usps: [
    {
      icon: "infinity",
      title: "Forever eSIM",
      description:
        "Your eSIM stays active indefinitely. Balance doesn't expire — ever.",
    },
    {
      icon: "coins",
      title: "Pay-as-you-go",
      description:
        "No bundles, no packages. You're charged per MB at the local country rate.",
    },
    {
      icon: "globe",
      title: "180+ Countries",
      description:
        "One single eSIM for worldwide travel. No swapping, no hassle.",
    },
    {
      icon: "zap",
      title: "Instant Setup",
      description:
        "Download the app, install your eSIM, and get connected in minutes.",
    },
    {
      icon: "eye",
      title: "Transparent Pricing",
      description:
        "See the exact rate per GB for every country before you travel.",
    },
    {
      icon: "activity",
      title: "Real-time Usage",
      description:
        "Track your data usage and balance in real time, right in the app.",
    },
  ],

  steps: [
    {
      number: 1,
      title: "Download & Install",
      description:
        "Get the VINK SIM app and install your eSIM profile in minutes.",
    },
    {
      number: 2,
      title: "Top Up Balance",
      description:
        "Add funds to your balance. No packages to choose — just a simple top-up.",
    },
    {
      number: 3,
      title: "Travel & Stay Connected",
      description:
        "Land in any of 180+ countries and data connects automatically at the local rate.",
    },
  ],

  rates: [
    { country: "Turkey", flag: "🇹🇷", pricePerGB_USD: 2.1 },
    { country: "Kazakhstan", flag: "🇰🇿", pricePerGB_USD: 2.5 },
    { country: "Thailand", flag: "🇹🇭", pricePerGB_USD: 3.2 },
    { country: "UAE", flag: "🇦🇪", pricePerGB_USD: 3.8 },
    { country: "France", flag: "🇫🇷", pricePerGB_USD: 4.2 },
    { country: "Germany", flag: "🇩🇪", pricePerGB_USD: 4.5 },
    { country: "United Kingdom", flag: "🇬🇧", pricePerGB_USD: 4.8 },
    { country: "United States", flag: "🇺🇸", pricePerGB_USD: 5.5 },
  ],

  faq: [
    {
      question: "Do I need to buy a data package?",
      answer:
        "No. VINK SIM is entirely pay-as-you-go. You top up your balance and data is charged per MB at the local country rate. No packages, no commitments.",
    },
    {
      question: "Does my balance expire?",
      answer:
        "Never. Your balance stays on your account indefinitely. Top up once and use it whenever you travel — no rush, no deadlines.",
    },
    {
      question: "How do I know the rate in a country?",
      answer:
        "Open the app and check the Rates section. Every country's price per GB is shown upfront before you connect.",
    },
    {
      question: "Can I keep the same eSIM forever?",
      answer:
        "Yes. Your VINK eSIM never expires. Install it once and use it across all your trips, no matter how far apart they are.",
    },
    {
      question: "How is data billed?",
      answer:
        "Data is billed per megabyte from your balance at the local country rate. You only pay for what you actually use.",
    },
    {
      question: "Does it work on all phones?",
      answer:
        "VINK SIM works on any eSIM-compatible device, including most modern iPhones (XS and later), Samsung Galaxy, Google Pixel, and many more.",
    },
    {
      question: "How fast is the setup?",
      answer:
        "Most users are connected within 5 minutes. Download the app, scan the QR code or install directly, and you're ready to go.",
    },
  ],

  footer: {
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Support", href: "mailto:support@vinksim.com" },
    ],
    copyright: `© ${new Date().getFullYear()} VINK SIM. All rights reserved.`,
  },
};
