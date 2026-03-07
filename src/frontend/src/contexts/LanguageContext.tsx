import { createContext, useContext, useState } from "react";

export type Language = "en" | "es" | "fr" | "de" | "it" | "pt";

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
];

export type TranslationKey =
  // Navbar
  | "nav.homepage"
  | "nav.launches"
  | "nav.faq"
  | "nav.admin"
  | "nav.connect_wallet"
  | "nav.wallet_coming_soon"
  | "nav.logout"
  | "nav.theme"
  | "nav.light"
  | "nav.dark"
  | "nav.apply_launch"
  | "nav.buy_doggy"
  // Hero
  | "hero.badge"
  | "hero.title_part1"
  | "hero.title_part2"
  | "hero.title_part3"
  | "hero.subtitle"
  | "hero.view_launches"
  | "hero.learn_more"
  // Stats
  | "stats.launches_live"
  | "stats.payment"
  | "stats.chain"
  // Featured Launch
  | "featured.title"
  | "featured.subtitle"
  | "featured.all_launches"
  | "featured.no_launches"
  // Features
  | "features.title"
  | "features.subtitle"
  | "features.token_launchpad"
  | "features.token_launchpad_desc"
  | "features.secure"
  | "features.secure_desc"
  | "features.payments"
  | "features.payments_desc"
  // Buy PAD
  | "buy_pad.badge"
  | "buy_pad.title"
  | "buy_pad.subtitle"
  | "buy_pad.price"
  | "buy_pad.supply"
  | "buy_pad.market"
  | "buy_pad.token_subtitle"
  | "buy_pad.token_desc"
  | "buy_pad.button"
  | "buy_pad.note"
  // Apply
  | "apply.badge"
  | "apply.title"
  | "apply.subtitle"
  | "apply.verified"
  | "apply.verified_desc"
  | "apply.doge_payments"
  | "apply.doge_payments_desc"
  | "apply.dogechain"
  | "apply.dogechain_desc"
  | "apply.button"
  | "apply.note"
  // FAQ
  | "faq.title"
  | "faq.subtitle"
  | "faq.q1"
  | "faq.a1"
  | "faq.q2"
  | "faq.a2"
  | "faq.q3"
  | "faq.a3"
  | "faq.q4"
  | "faq.a4"
  | "faq.q5"
  | "faq.a5"
  | "faq.q6"
  | "faq.a6"
  | "faq.q7"
  | "faq.a7"
  | "faq.q8"
  | "faq.a8"
  // Launches Page
  | "launches.title"
  | "launches.subtitle"
  | "launches.all"
  | "launches.upcoming"
  | "launches.live"
  | "launches.ended"
  | "launches.search"
  | "launches.no_launches_title"
  | "launches.no_launches_all"
  | "launches.no_launches_filter"
  // Footer
  | "footer.tagline"
  | "footer.access"
  | "footer.home"
  | "footer.community"
  | "footer.chain_info"
  | "footer.copyright";

type Translations = Record<TranslationKey, string>;
type AllTranslations = Record<Language, Translations>;

const translations: AllTranslations = {
  en: {
    "nav.homepage": "Homepage",
    "nav.launches": "Launches",
    "nav.faq": "FAQ",
    "nav.admin": "Admin",
    "nav.connect_wallet": "Connect Wallet",
    "nav.wallet_coming_soon": "Wallet Integration Coming Soon",
    "nav.logout": "Logout",
    "nav.theme": "Theme",
    "nav.light": "Light",
    "nav.dark": "Dark",
    "nav.apply_launch": "Apply for Launch",
    "nav.buy_doggy": "Buy on Doggy Market",
    "hero.badge": "Live on Dogechain · DRC20 Token Launchpad",
    "hero.title_part1": "The ",
    "hero.title_part2": "#1 DRC20 Token",
    "hero.title_part3": "\nLaunchpad on Dogechain",
    "hero.subtitle":
      "Discover and participate in the latest token launches. Payment in DOGE. Powered by the Dogechain ecosystem.",
    "hero.view_launches": "View Launches",
    "hero.learn_more": "Learn More",
    "stats.launches_live": "Launches Live",
    "stats.payment": "Payment",
    "stats.chain": "Chain",
    "featured.title": "Featured Launch",
    "featured.subtitle": "The inaugural DRC20 token launch on Doginalspad",
    "featured.all_launches": "All Launches",
    "featured.no_launches": "No launches yet. Check back soon!",
    "features.title": "Why Doginalspad?",
    "features.subtitle":
      "The most trusted platform to launch and discover DRC20 tokens on Dogechain.",
    "features.token_launchpad": "Token Launchpad",
    "features.token_launchpad_desc":
      "Launch your DRC20 token with full transparency, real-time tracking, and community trust.",
    "features.secure": "Secure & Verified",
    "features.secure_desc":
      "Every project goes through a verification process. Invest with confidence on Dogechain.",
    "features.payments": "Instant DOGE Payments",
    "features.payments_desc":
      "Participate in launches instantly using DOGE — the fastest, most beloved crypto.",
    "buy_pad.badge": "Now Available",
    "buy_pad.title": "Buy $PAD on Doggy Market",
    "buy_pad.subtitle":
      "$PAD is now live on Doggy Market — the premier DRC20 marketplace on Dogechain. Get your allocation before supply runs out.",
    "buy_pad.price": "Price",
    "buy_pad.supply": "Total Supply",
    "buy_pad.market": "Market",
    "buy_pad.token_subtitle": "DRC20 · Dogechain",
    "buy_pad.token_desc":
      "The official utility token of the DoginalsPad launchpad. Access exclusive project launches, earn ecosystem rewards, and be part of the Dogechain revolution.",
    "buy_pad.button": "Buy $PAD",
    "buy_pad.note": "Opens Doggy Market — the DRC20 marketplace on Dogechain",
    "apply.badge": "Open for Applications",
    "apply.title": "Launch Your Project on DoginalsPad",
    "apply.subtitle":
      "Ready to bring your DRC20 token to the Dogechain community? Apply now and our team will review your project for an upcoming launch slot.",
    "apply.verified": "Verified listing",
    "apply.verified_desc": "Manual review by the team",
    "apply.doge_payments": "DOGE payments",
    "apply.doge_payments_desc": "Seamless participation",
    "apply.dogechain": "Dogechain native",
    "apply.dogechain_desc": "Built for DRC20 tokens",
    "apply.button": "Apply for Launch",
    "apply.note": "Applications reviewed within 3–5 business days",
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle":
      "Everything you need to know about Doginalspad and participating in DRC20 token launches.",
    "faq.q1": "What is Doginalspad?",
    "faq.a1":
      "Doginalspad is the #1 DRC20 token launchpad built on Dogechain. It allows token projects to launch their DRC20 tokens transparently, and enables the community to participate in launches using DOGE.",
    "faq.q2": "What is DRC20?",
    "faq.a2":
      "DRC20 is a token standard on Dogechain — similar to ERC20 on Ethereum. DRC20 tokens enable projects to create fungible tokens on the Dogechain network with full smart contract support.",
    "faq.q3": "What is $PAD?",
    "faq.a3":
      "$PAD is the first token launching on Doginalspad. It serves as the native utility token of the Doginalspad ecosystem, granting holders special access, reduced fees, and governance rights on the platform.",
    "faq.q4": "How do I participate in a launch?",
    "faq.a4":
      "To participate in a launch, connect your wallet on Doginalspad, navigate to the active launch, and click 'Participate with DOGE'. You'll be able to contribute DOGE in exchange for the project's DRC20 tokens. Wallet integration is coming soon!",
    "faq.q5": "Which wallets are supported?",
    "faq.a5":
      "Doginalspad will support major Dogechain-compatible wallets including MetaMask (configured for Dogechain), and dedicated Doge ecosystem wallets. Wallet integration is actively in development.",
    "faq.q6": "Is there a minimum or maximum contribution?",
    "faq.a6":
      "Each launch sets its own contribution limits. These details are displayed on each launch card and detailed view. Always check the specific launch's parameters before participating.",
    "faq.q7": "How are tokens distributed?",
    "faq.a7":
      "Token distribution varies by project. Details including total supply, price per token in DOGE, and fundraise goals are clearly shown on each launch page.",
    "faq.q8": "How do I launch my own project on Doginalspad?",
    "faq.a8":
      "If you're a project team looking to launch on Doginalspad, please reach out to our team through our social media channels. We'll guide you through the vetting process and help set up your launch.",
    "launches.title": "All Launches",
    "launches.subtitle":
      "Browse and participate in DRC20 token launches. Payment in DOGE.",
    "launches.all": "All",
    "launches.upcoming": "Upcoming",
    "launches.live": "Live",
    "launches.ended": "Ended",
    "launches.search": "Search projects...",
    "launches.no_launches_title": "No Launches Found",
    "launches.no_launches_all":
      "No token launches have been created yet. Check back soon!",
    "launches.no_launches_filter": "No {filter} launches at the moment.",
    "footer.tagline":
      "Launching the future of DRC20 tokens on Dogechain. The first and most trusted launchpad in the Doge ecosystem.",
    "footer.access": "Access",
    "footer.home": "Home",
    "footer.community": "Community",
    "footer.chain_info": "Payment: DOGE · Chain: Dogechain",
    "footer.copyright": "© {year} Doginalspad. All rights reserved.",
  },

  es: {
    "nav.homepage": "Inicio",
    "nav.launches": "Lanzamientos",
    "nav.faq": "Preguntas",
    "nav.admin": "Admin",
    "nav.connect_wallet": "Conectar Billetera",
    "nav.wallet_coming_soon": "Integración de Billetera Próximamente",
    "nav.logout": "Cerrar Sesión",
    "nav.theme": "Tema",
    "nav.light": "Claro",
    "nav.dark": "Oscuro",
    "nav.apply_launch": "Solicitar Lanzamiento",
    "nav.buy_doggy": "Comprar en Doggy Market",
    "hero.badge": "En vivo en Dogechain · Plataforma de Tokens DRC20",
    "hero.title_part1": "La ",
    "hero.title_part2": "#1 Plataforma DRC20",
    "hero.title_part3": "\nen Dogechain",
    "hero.subtitle":
      "Descubre y participa en los últimos lanzamientos de tokens. Pago en DOGE. Impulsado por el ecosistema Dogechain.",
    "hero.view_launches": "Ver Lanzamientos",
    "hero.learn_more": "Más Información",
    "stats.launches_live": "Lanzamientos Activos",
    "stats.payment": "Pago",
    "stats.chain": "Red",
    "featured.title": "Lanzamiento Destacado",
    "featured.subtitle": "El primer lanzamiento de token DRC20 en Doginalspad",
    "featured.all_launches": "Todos los Lanzamientos",
    "featured.no_launches": "Aún no hay lanzamientos. ¡Vuelve pronto!",
    "features.title": "¿Por qué Doginalspad?",
    "features.subtitle":
      "La plataforma más confiable para lanzar y descubrir tokens DRC20 en Dogechain.",
    "features.token_launchpad": "Plataforma de Tokens",
    "features.token_launchpad_desc":
      "Lanza tu token DRC20 con total transparencia, seguimiento en tiempo real y confianza comunitaria.",
    "features.secure": "Seguro y Verificado",
    "features.secure_desc":
      "Cada proyecto pasa por un proceso de verificación. Invierte con confianza en Dogechain.",
    "features.payments": "Pagos DOGE Instantáneos",
    "features.payments_desc":
      "Participa en lanzamientos al instante usando DOGE — la criptomoneda más rápida y querida.",
    "buy_pad.badge": "Disponible Ahora",
    "buy_pad.title": "Compra $PAD en Doggy Market",
    "buy_pad.subtitle":
      "$PAD ya está disponible en Doggy Market — el mercado DRC20 principal en Dogechain. Obtén tu asignación antes de que se agote el suministro.",
    "buy_pad.price": "Precio",
    "buy_pad.supply": "Suministro Total",
    "buy_pad.market": "Mercado",
    "buy_pad.token_subtitle": "DRC20 · Dogechain",
    "buy_pad.token_desc":
      "El token de utilidad oficial de la plataforma DoginalsPad. Accede a lanzamientos exclusivos, gana recompensas del ecosistema y sé parte de la revolución Dogechain.",
    "buy_pad.button": "Comprar $PAD",
    "buy_pad.note": "Abre Doggy Market — el mercado DRC20 en Dogechain",
    "apply.badge": "Abierto para Solicitudes",
    "apply.title": "Lanza tu Proyecto en DoginalsPad",
    "apply.subtitle":
      "¿Listo para llevar tu token DRC20 a la comunidad Dogechain? Solicita ahora y nuestro equipo revisará tu proyecto.",
    "apply.verified": "Listado verificado",
    "apply.verified_desc": "Revisión manual por el equipo",
    "apply.doge_payments": "Pagos en DOGE",
    "apply.doge_payments_desc": "Participación sin problemas",
    "apply.dogechain": "Nativo de Dogechain",
    "apply.dogechain_desc": "Construido para tokens DRC20",
    "apply.button": "Solicitar Lanzamiento",
    "apply.note": "Solicitudes revisadas en 3–5 días hábiles",
    "faq.title": "Preguntas Frecuentes",
    "faq.subtitle":
      "Todo lo que necesitas saber sobre Doginalspad y la participación en lanzamientos de tokens DRC20.",
    "faq.q1": "¿Qué es Doginalspad?",
    "faq.a1":
      "Doginalspad es la plataforma de lanzamiento de tokens DRC20 #1 construida en Dogechain. Permite a los proyectos de tokens lanzar sus tokens DRC20 de forma transparente, y permite a la comunidad participar usando DOGE.",
    "faq.q2": "¿Qué es DRC20?",
    "faq.a2":
      "DRC20 es un estándar de token en Dogechain — similar a ERC20 en Ethereum. Los tokens DRC20 permiten a los proyectos crear tokens fungibles en la red Dogechain con soporte completo de contratos inteligentes.",
    "faq.q3": "¿Qué es $PAD?",
    "faq.a3":
      "$PAD es el primer token en Doginalspad. Sirve como token de utilidad nativo del ecosistema Doginalspad, otorgando a los poseedores acceso especial, tarifas reducidas y derechos de gobernanza.",
    "faq.q4": "¿Cómo participo en un lanzamiento?",
    "faq.a4":
      "Para participar en un lanzamiento, conecta tu billetera en Doginalspad, navega al lanzamiento activo y haz clic en 'Participar con DOGE'. Podrás contribuir DOGE a cambio de los tokens DRC20 del proyecto. ¡La integración de billetera llegará pronto!",
    "faq.q5": "¿Qué billeteras son compatibles?",
    "faq.a5":
      "Doginalspad será compatible con las principales billeteras compatibles con Dogechain, incluyendo MetaMask (configurado para Dogechain) y billeteras dedicadas del ecosistema Doge.",
    "faq.q6": "¿Hay contribución mínima o máxima?",
    "faq.a6":
      "Cada lanzamiento establece sus propios límites de contribución. Estos detalles se muestran en cada tarjeta de lanzamiento. Siempre verifica los parámetros específicos antes de participar.",
    "faq.q7": "¿Cómo se distribuyen los tokens?",
    "faq.a7":
      "La distribución de tokens varía según el proyecto. Los detalles, incluido el suministro total, el precio por token en DOGE y los objetivos de recaudación, se muestran claramente en cada página de lanzamiento.",
    "faq.q8": "¿Cómo lanzo mi propio proyecto en Doginalspad?",
    "faq.a8":
      "Si eres un equipo de proyecto que busca lanzarse en Doginalspad, comunícate con nuestro equipo a través de nuestros canales de redes sociales. Te guiaremos a través del proceso de selección.",
    "launches.title": "Todos los Lanzamientos",
    "launches.subtitle":
      "Explora y participa en lanzamientos de tokens DRC20. Pago en DOGE.",
    "launches.all": "Todos",
    "launches.upcoming": "Próximos",
    "launches.live": "En Vivo",
    "launches.ended": "Terminados",
    "launches.search": "Buscar proyectos...",
    "launches.no_launches_title": "No se Encontraron Lanzamientos",
    "launches.no_launches_all":
      "Aún no se han creado lanzamientos de tokens. ¡Vuelve pronto!",
    "launches.no_launches_filter":
      "No hay lanzamientos {filter} en este momento.",
    "footer.tagline":
      "Lanzando el futuro de los tokens DRC20 en Dogechain. La primera y más confiable plataforma en el ecosistema Doge.",
    "footer.access": "Acceso",
    "footer.home": "Inicio",
    "footer.community": "Comunidad",
    "footer.chain_info": "Pago: DOGE · Red: Dogechain",
    "footer.copyright": "© {year} Doginalspad. Todos los derechos reservados.",
  },

  fr: {
    "nav.homepage": "Accueil",
    "nav.launches": "Lancements",
    "nav.faq": "FAQ",
    "nav.admin": "Admin",
    "nav.connect_wallet": "Connecter le Portefeuille",
    "nav.wallet_coming_soon": "Intégration du Portefeuille Bientôt",
    "nav.logout": "Déconnexion",
    "nav.theme": "Thème",
    "nav.light": "Clair",
    "nav.dark": "Sombre",
    "nav.apply_launch": "Demander un Lancement",
    "nav.buy_doggy": "Acheter sur Doggy Market",
    "hero.badge": "En direct sur Dogechain · Plateforme de Tokens DRC20",
    "hero.title_part1": "La ",
    "hero.title_part2": "#1 Plateforme DRC20",
    "hero.title_part3": "\nsur Dogechain",
    "hero.subtitle":
      "Découvrez et participez aux derniers lancements de tokens. Paiement en DOGE. Propulsé par l'écosystème Dogechain.",
    "hero.view_launches": "Voir les Lancements",
    "hero.learn_more": "En Savoir Plus",
    "stats.launches_live": "Lancements Actifs",
    "stats.payment": "Paiement",
    "stats.chain": "Réseau",
    "featured.title": "Lancement Vedette",
    "featured.subtitle": "Le premier lancement de token DRC20 sur Doginalspad",
    "featured.all_launches": "Tous les Lancements",
    "featured.no_launches": "Pas encore de lancements. Revenez bientôt !",
    "features.title": "Pourquoi Doginalspad ?",
    "features.subtitle":
      "La plateforme la plus fiable pour lancer et découvrir des tokens DRC20 sur Dogechain.",
    "features.token_launchpad": "Plateforme de Tokens",
    "features.token_launchpad_desc":
      "Lancez votre token DRC20 avec une transparence totale, un suivi en temps réel et la confiance de la communauté.",
    "features.secure": "Sécurisé et Vérifié",
    "features.secure_desc":
      "Chaque projet passe par un processus de vérification. Investissez en toute confiance sur Dogechain.",
    "features.payments": "Paiements DOGE Instantanés",
    "features.payments_desc":
      "Participez aux lancements instantanément avec DOGE — la crypto la plus rapide et la plus appréciée.",
    "buy_pad.badge": "Disponible Maintenant",
    "buy_pad.title": "Acheter $PAD sur Doggy Market",
    "buy_pad.subtitle":
      "$PAD est maintenant disponible sur Doggy Market — le principal marché DRC20 sur Dogechain. Obtenez votre allocation avant la rupture de stock.",
    "buy_pad.price": "Prix",
    "buy_pad.supply": "Offre Totale",
    "buy_pad.market": "Marché",
    "buy_pad.token_subtitle": "DRC20 · Dogechain",
    "buy_pad.token_desc":
      "Le token utilitaire officiel de la plateforme DoginalsPad. Accédez aux lancements exclusifs, gagnez des récompenses et participez à la révolution Dogechain.",
    "buy_pad.button": "Acheter $PAD",
    "buy_pad.note": "Ouvre Doggy Market — le marché DRC20 sur Dogechain",
    "apply.badge": "Ouvert aux Candidatures",
    "apply.title": "Lancez votre Projet sur DoginalsPad",
    "apply.subtitle":
      "Prêt à amener votre token DRC20 à la communauté Dogechain ? Candidatez maintenant et notre équipe examinera votre projet.",
    "apply.verified": "Listing vérifié",
    "apply.verified_desc": "Examen manuel par l'équipe",
    "apply.doge_payments": "Paiements DOGE",
    "apply.doge_payments_desc": "Participation transparente",
    "apply.dogechain": "Natif Dogechain",
    "apply.dogechain_desc": "Conçu pour les tokens DRC20",
    "apply.button": "Demander un Lancement",
    "apply.note": "Candidatures examinées dans 3–5 jours ouvrables",
    "faq.title": "Questions Fréquemment Posées",
    "faq.subtitle":
      "Tout ce que vous devez savoir sur Doginalspad et la participation aux lancements de tokens DRC20.",
    "faq.q1": "Qu'est-ce que Doginalspad ?",
    "faq.a1":
      "Doginalspad est la plateforme de lancement de tokens DRC20 #1 construite sur Dogechain. Elle permet aux projets de lancer leurs tokens DRC20 de manière transparente et à la communauté de participer avec DOGE.",
    "faq.q2": "Qu'est-ce que DRC20 ?",
    "faq.a2":
      "DRC20 est un standard de token sur Dogechain — similaire à ERC20 sur Ethereum. Les tokens DRC20 permettent aux projets de créer des tokens fongibles sur le réseau Dogechain avec un support complet des contrats intelligents.",
    "faq.q3": "Qu'est-ce que $PAD ?",
    "faq.a3":
      "$PAD est le premier token lancé sur Doginalspad. Il sert de token utilitaire natif de l'écosystème Doginalspad, accordant aux détenteurs un accès spécial, des frais réduits et des droits de gouvernance.",
    "faq.q4": "Comment participer à un lancement ?",
    "faq.a4":
      "Pour participer, connectez votre portefeuille sur Doginalspad, naviguez vers le lancement actif et cliquez sur 'Participer avec DOGE'. L'intégration du portefeuille arrive bientôt !",
    "faq.q5": "Quels portefeuilles sont supportés ?",
    "faq.a5":
      "Doginalspad supportera les principaux portefeuilles compatibles Dogechain, incluant MetaMask (configuré pour Dogechain) et les portefeuilles dédiés à l'écosystème Doge.",
    "faq.q6": "Y a-t-il une contribution minimale ou maximale ?",
    "faq.a6":
      "Chaque lancement définit ses propres limites de contribution. Ces détails sont affichés sur chaque carte de lancement. Vérifiez toujours les paramètres spécifiques avant de participer.",
    "faq.q7": "Comment les tokens sont-ils distribués ?",
    "faq.a7":
      "La distribution des tokens varie selon le projet. Les détails, y compris l'offre totale, le prix par token en DOGE et les objectifs de collecte, sont clairement indiqués sur chaque page de lancement.",
    "faq.q8": "Comment lancer mon propre projet sur Doginalspad ?",
    "faq.a8":
      "Si vous êtes une équipe de projet souhaitant lancer sur Doginalspad, contactez notre équipe via nos canaux de médias sociaux. Nous vous guiderons tout au long du processus.",
    "launches.title": "Tous les Lancements",
    "launches.subtitle":
      "Parcourez et participez aux lancements de tokens DRC20. Paiement en DOGE.",
    "launches.all": "Tous",
    "launches.upcoming": "À Venir",
    "launches.live": "En Direct",
    "launches.ended": "Terminés",
    "launches.search": "Rechercher des projets...",
    "launches.no_launches_title": "Aucun Lancement Trouvé",
    "launches.no_launches_all":
      "Aucun lancement de token n'a encore été créé. Revenez bientôt !",
    "launches.no_launches_filter": "Aucun lancement {filter} pour le moment.",
    "footer.tagline":
      "Lançant l'avenir des tokens DRC20 sur Dogechain. La première et la plus fiable plateforme dans l'écosystème Doge.",
    "footer.access": "Accès",
    "footer.home": "Accueil",
    "footer.community": "Communauté",
    "footer.chain_info": "Paiement: DOGE · Réseau: Dogechain",
    "footer.copyright": "© {year} Doginalspad. Tous droits réservés.",
  },

  de: {
    "nav.homepage": "Startseite",
    "nav.launches": "Launches",
    "nav.faq": "FAQ",
    "nav.admin": "Admin",
    "nav.connect_wallet": "Wallet Verbinden",
    "nav.wallet_coming_soon": "Wallet-Integration Demnächst",
    "nav.logout": "Abmelden",
    "nav.theme": "Design",
    "nav.light": "Hell",
    "nav.dark": "Dunkel",
    "nav.apply_launch": "Launch Beantragen",
    "nav.buy_doggy": "Auf Doggy Market Kaufen",
    "hero.badge": "Live auf Dogechain · DRC20 Token Plattform",
    "hero.title_part1": "Die ",
    "hero.title_part2": "#1 DRC20 Token",
    "hero.title_part3": "\nPlattform auf Dogechain",
    "hero.subtitle":
      "Entdecken und nehmen Sie an den neuesten Token-Launches teil. Zahlung in DOGE. Betrieben vom Dogechain-Ökosystem.",
    "hero.view_launches": "Launches Ansehen",
    "hero.learn_more": "Mehr Erfahren",
    "stats.launches_live": "Aktive Launches",
    "stats.payment": "Zahlung",
    "stats.chain": "Netzwerk",
    "featured.title": "Empfohlener Launch",
    "featured.subtitle": "Der erste DRC20 Token-Launch auf Doginalspad",
    "featured.all_launches": "Alle Launches",
    "featured.no_launches": "Noch keine Launches. Schau bald wieder rein!",
    "features.title": "Warum Doginalspad?",
    "features.subtitle":
      "Die vertrauenswürdigste Plattform zum Launchen und Entdecken von DRC20-Tokens auf Dogechain.",
    "features.token_launchpad": "Token-Plattform",
    "features.token_launchpad_desc":
      "Launche deinen DRC20-Token mit voller Transparenz, Echtzeit-Tracking und Community-Vertrauen.",
    "features.secure": "Sicher & Verifiziert",
    "features.secure_desc":
      "Jedes Projekt durchläuft einen Verifizierungsprozess. Investiere mit Vertrauen auf Dogechain.",
    "features.payments": "Sofortige DOGE-Zahlungen",
    "features.payments_desc":
      "Nimm sofort an Launches mit DOGE teil — der schnellsten und beliebtesten Kryptowährung.",
    "buy_pad.badge": "Jetzt Verfügbar",
    "buy_pad.title": "$PAD auf Doggy Market Kaufen",
    "buy_pad.subtitle":
      "$PAD ist jetzt auf Doggy Market verfügbar — dem führenden DRC20-Marktplatz auf Dogechain. Sichere dir deine Zuteilung, bevor der Vorrat ausgeht.",
    "buy_pad.price": "Preis",
    "buy_pad.supply": "Gesamtangebot",
    "buy_pad.market": "Markt",
    "buy_pad.token_subtitle": "DRC20 · Dogechain",
    "buy_pad.token_desc":
      "Der offizielle Utility-Token der DoginalsPad-Plattform. Greife auf exklusive Projekt-Launches zu, verdiene Ökosystem-Belohnungen und sei Teil der Dogechain-Revolution.",
    "buy_pad.button": "$PAD Kaufen",
    "buy_pad.note": "Öffnet Doggy Market — den DRC20-Marktplatz auf Dogechain",
    "apply.badge": "Bewerbungen Offen",
    "apply.title": "Dein Projekt auf DoginalsPad Launchen",
    "apply.subtitle":
      "Bereit, deinen DRC20-Token der Dogechain-Community vorzustellen? Bewirb dich jetzt und unser Team prüft dein Projekt.",
    "apply.verified": "Verifiziertes Listing",
    "apply.verified_desc": "Manuelle Prüfung durch das Team",
    "apply.doge_payments": "DOGE-Zahlungen",
    "apply.doge_payments_desc": "Nahtlose Teilnahme",
    "apply.dogechain": "Dogechain-nativ",
    "apply.dogechain_desc": "Gebaut für DRC20-Tokens",
    "apply.button": "Launch Beantragen",
    "apply.note": "Bewerbungen werden in 3–5 Werktagen geprüft",
    "faq.title": "Häufig Gestellte Fragen",
    "faq.subtitle":
      "Alles, was du über Doginalspad und die Teilnahme an DRC20-Token-Launches wissen musst.",
    "faq.q1": "Was ist Doginalspad?",
    "faq.a1":
      "Doginalspad ist die #1 DRC20-Token-Launch-Plattform, die auf Dogechain aufgebaut ist. Sie ermöglicht Token-Projekten, ihre DRC20-Tokens transparent zu launchen, und ermöglicht der Community die Teilnahme mit DOGE.",
    "faq.q2": "Was ist DRC20?",
    "faq.a2":
      "DRC20 ist ein Token-Standard auf Dogechain — ähnlich wie ERC20 auf Ethereum. DRC20-Tokens ermöglichen Projekten, fungible Tokens im Dogechain-Netzwerk mit vollständiger Smart-Contract-Unterstützung zu erstellen.",
    "faq.q3": "Was ist $PAD?",
    "faq.a3":
      "$PAD ist der erste Token, der auf Doginalspad gestartet wird. Er dient als nativer Utility-Token des Doginalspad-Ökosystems und gewährt Inhabern besonderen Zugang, reduzierte Gebühren und Governance-Rechte.",
    "faq.q4": "Wie nehme ich an einem Launch teil?",
    "faq.a4":
      "Um an einem Launch teilzunehmen, verbinde deine Wallet auf Doginalspad, navigiere zum aktiven Launch und klicke auf 'Mit DOGE teilnehmen'. Wallet-Integration kommt bald!",
    "faq.q5": "Welche Wallets werden unterstützt?",
    "faq.a5":
      "Doginalspad wird die wichtigsten Dogechain-kompatiblen Wallets unterstützen, einschließlich MetaMask (für Dogechain konfiguriert) und dedizierte Doge-Ökosystem-Wallets.",
    "faq.q6": "Gibt es eine Mindest- oder Höchstbeteiligung?",
    "faq.a6":
      "Jeder Launch legt seine eigenen Beitragslimits fest. Diese Details werden auf jeder Launch-Karte angezeigt. Überprüfe immer die spezifischen Parameter, bevor du teilnimmst.",
    "faq.q7": "Wie werden Tokens verteilt?",
    "faq.a7":
      "Die Token-Verteilung variiert je nach Projekt. Details einschließlich Gesamtangebot, Preis pro Token in DOGE und Fundraising-Ziele werden klar auf jeder Launch-Seite angezeigt.",
    "faq.q8": "Wie launche ich mein eigenes Projekt auf Doginalspad?",
    "faq.a8":
      "Wenn du ein Projektteam bist, das auf Doginalspad launchen möchte, kontaktiere uns über unsere Social-Media-Kanäle. Wir führen dich durch den Vetting-Prozess.",
    "launches.title": "Alle Launches",
    "launches.subtitle":
      "Durchsuche und nimm an DRC20-Token-Launches teil. Zahlung in DOGE.",
    "launches.all": "Alle",
    "launches.upcoming": "Bevorstehend",
    "launches.live": "Live",
    "launches.ended": "Beendet",
    "launches.search": "Projekte suchen...",
    "launches.no_launches_title": "Keine Launches Gefunden",
    "launches.no_launches_all":
      "Es wurden noch keine Token-Launches erstellt. Schau bald wieder rein!",
    "launches.no_launches_filter": "Derzeit keine {filter} Launches.",
    "footer.tagline":
      "Die Zukunft der DRC20-Tokens auf Dogechain launchen. Die erste und vertrauenswürdigste Plattform im Doge-Ökosystem.",
    "footer.access": "Zugang",
    "footer.home": "Startseite",
    "footer.community": "Community",
    "footer.chain_info": "Zahlung: DOGE · Netzwerk: Dogechain",
    "footer.copyright": "© {year} Doginalspad. Alle Rechte vorbehalten.",
  },

  it: {
    "nav.homepage": "Home",
    "nav.launches": "Lanci",
    "nav.faq": "FAQ",
    "nav.admin": "Admin",
    "nav.connect_wallet": "Connetti Portafoglio",
    "nav.wallet_coming_soon": "Integrazione Portafoglio Prossimamente",
    "nav.logout": "Esci",
    "nav.theme": "Tema",
    "nav.light": "Chiaro",
    "nav.dark": "Scuro",
    "nav.apply_launch": "Richiedi un Lancio",
    "nav.buy_doggy": "Acquista su Doggy Market",
    "hero.badge": "Live su Dogechain · Piattaforma Token DRC20",
    "hero.title_part1": "La ",
    "hero.title_part2": "#1 Piattaforma DRC20",
    "hero.title_part3": "\nsu Dogechain",
    "hero.subtitle":
      "Scopri e partecipa agli ultimi lanci di token. Pagamento in DOGE. Alimentato dall'ecosistema Dogechain.",
    "hero.view_launches": "Vedi i Lanci",
    "hero.learn_more": "Scopri di Più",
    "stats.launches_live": "Lanci Attivi",
    "stats.payment": "Pagamento",
    "stats.chain": "Rete",
    "featured.title": "Lancio in Evidenza",
    "featured.subtitle": "Il primo lancio di token DRC20 su Doginalspad",
    "featured.all_launches": "Tutti i Lanci",
    "featured.no_launches": "Nessun lancio ancora. Torna presto!",
    "features.title": "Perché Doginalspad?",
    "features.subtitle":
      "La piattaforma più affidabile per lanciare e scoprire token DRC20 su Dogechain.",
    "features.token_launchpad": "Piattaforma Token",
    "features.token_launchpad_desc":
      "Lancia il tuo token DRC20 con piena trasparenza, tracciamento in tempo reale e fiducia della community.",
    "features.secure": "Sicuro e Verificato",
    "features.secure_desc":
      "Ogni progetto passa attraverso un processo di verifica. Investi con fiducia su Dogechain.",
    "features.payments": "Pagamenti DOGE Istantanei",
    "features.payments_desc":
      "Partecipa ai lanci istantaneamente usando DOGE — la crypto più veloce e amata.",
    "buy_pad.badge": "Ora Disponibile",
    "buy_pad.title": "Acquista $PAD su Doggy Market",
    "buy_pad.subtitle":
      "$PAD è ora disponibile su Doggy Market — il principale mercato DRC20 su Dogechain. Ottieni la tua allocazione prima che l'offerta esaurisca.",
    "buy_pad.price": "Prezzo",
    "buy_pad.supply": "Offerta Totale",
    "buy_pad.market": "Mercato",
    "buy_pad.token_subtitle": "DRC20 · Dogechain",
    "buy_pad.token_desc":
      "Il token di utilità ufficiale della piattaforma DoginalsPad. Accedi a lanci esclusivi, guadagna ricompense dell'ecosistema e fai parte della rivoluzione Dogechain.",
    "buy_pad.button": "Acquista $PAD",
    "buy_pad.note": "Apre Doggy Market — il mercato DRC20 su Dogechain",
    "apply.badge": "Aperto alle Candidature",
    "apply.title": "Lancia il tuo Progetto su DoginalsPad",
    "apply.subtitle":
      "Pronto a portare il tuo token DRC20 alla community Dogechain? Candidati ora e il nostro team esaminerà il tuo progetto.",
    "apply.verified": "Listing verificato",
    "apply.verified_desc": "Revisione manuale dal team",
    "apply.doge_payments": "Pagamenti DOGE",
    "apply.doge_payments_desc": "Partecipazione senza problemi",
    "apply.dogechain": "Nativo Dogechain",
    "apply.dogechain_desc": "Costruito per token DRC20",
    "apply.button": "Richiedi un Lancio",
    "apply.note": "Candidature esaminate entro 3–5 giorni lavorativi",
    "faq.title": "Domande Frequenti",
    "faq.subtitle":
      "Tutto ciò che devi sapere su Doginalspad e sulla partecipazione ai lanci di token DRC20.",
    "faq.q1": "Cos'è Doginalspad?",
    "faq.a1":
      "Doginalspad è la piattaforma di lancio token DRC20 #1 costruita su Dogechain. Consente ai progetti token di lanciare i loro token DRC20 in modo trasparente e alla community di partecipare usando DOGE.",
    "faq.q2": "Cos'è DRC20?",
    "faq.a2":
      "DRC20 è uno standard token su Dogechain — simile a ERC20 su Ethereum. I token DRC20 consentono ai progetti di creare token fungibili sulla rete Dogechain con pieno supporto per contratti intelligenti.",
    "faq.q3": "Cos'è $PAD?",
    "faq.a3":
      "$PAD è il primo token lanciato su Doginalspad. Funge da token di utilità nativo dell'ecosistema Doginalspad, concedendo ai possessori accesso speciale, tariffe ridotte e diritti di governance.",
    "faq.q4": "Come partecipo a un lancio?",
    "faq.a4":
      "Per partecipare a un lancio, connetti il tuo portafoglio su Doginalspad, naviga al lancio attivo e clicca su 'Partecipa con DOGE'. L'integrazione del portafoglio arriverà presto!",
    "faq.q5": "Quali portafogli sono supportati?",
    "faq.a5":
      "Doginalspad supporterà i principali portafogli compatibili con Dogechain, incluso MetaMask (configurato per Dogechain) e portafogli dedicati all'ecosistema Doge.",
    "faq.q6": "C'è un contributo minimo o massimo?",
    "faq.a6":
      "Ogni lancio stabilisce i propri limiti di contribuzione. Questi dettagli sono visualizzati su ogni scheda di lancio. Controlla sempre i parametri specifici prima di partecipare.",
    "faq.q7": "Come vengono distribuiti i token?",
    "faq.a7":
      "La distribuzione dei token varia per progetto. I dettagli, inclusa l'offerta totale, il prezzo per token in DOGE e gli obiettivi di raccolta, sono chiaramente mostrati su ogni pagina di lancio.",
    "faq.q8": "Come lancio il mio progetto su Doginalspad?",
    "faq.a8":
      "Se sei un team di progetto che vuole lanciare su Doginalspad, contatta il nostro team attraverso i nostri canali social. Ti guideremo attraverso il processo di selezione.",
    "launches.title": "Tutti i Lanci",
    "launches.subtitle":
      "Sfoglia e partecipa ai lanci di token DRC20. Pagamento in DOGE.",
    "launches.all": "Tutti",
    "launches.upcoming": "In Arrivo",
    "launches.live": "Live",
    "launches.ended": "Terminati",
    "launches.search": "Cerca progetti...",
    "launches.no_launches_title": "Nessun Lancio Trovato",
    "launches.no_launches_all":
      "Non sono stati ancora creati lanci di token. Torna presto!",
    "launches.no_launches_filter": "Nessun lancio {filter} al momento.",
    "footer.tagline":
      "Lanciando il futuro dei token DRC20 su Dogechain. La prima e più affidabile piattaforma nell'ecosistema Doge.",
    "footer.access": "Accesso",
    "footer.home": "Home",
    "footer.community": "Community",
    "footer.chain_info": "Pagamento: DOGE · Rete: Dogechain",
    "footer.copyright": "© {year} Doginalspad. Tutti i diritti riservati.",
  },

  pt: {
    "nav.homepage": "Início",
    "nav.launches": "Lançamentos",
    "nav.faq": "FAQ",
    "nav.admin": "Admin",
    "nav.connect_wallet": "Conectar Carteira",
    "nav.wallet_coming_soon": "Integração de Carteira Em Breve",
    "nav.logout": "Sair",
    "nav.theme": "Tema",
    "nav.light": "Claro",
    "nav.dark": "Escuro",
    "nav.apply_launch": "Solicitar Lançamento",
    "nav.buy_doggy": "Comprar no Doggy Market",
    "hero.badge": "Ao vivo na Dogechain · Plataforma de Tokens DRC20",
    "hero.title_part1": "A ",
    "hero.title_part2": "#1 Plataforma DRC20",
    "hero.title_part3": "\nna Dogechain",
    "hero.subtitle":
      "Descubra e participe dos últimos lançamentos de tokens. Pagamento em DOGE. Alimentado pelo ecossistema Dogechain.",
    "hero.view_launches": "Ver Lançamentos",
    "hero.learn_more": "Saiba Mais",
    "stats.launches_live": "Lançamentos Ativos",
    "stats.payment": "Pagamento",
    "stats.chain": "Rede",
    "featured.title": "Lançamento em Destaque",
    "featured.subtitle": "O primeiro lançamento de token DRC20 na Doginalspad",
    "featured.all_launches": "Todos os Lançamentos",
    "featured.no_launches": "Nenhum lançamento ainda. Volte em breve!",
    "features.title": "Por que Doginalspad?",
    "features.subtitle":
      "A plataforma mais confiável para lançar e descobrir tokens DRC20 na Dogechain.",
    "features.token_launchpad": "Plataforma de Tokens",
    "features.token_launchpad_desc":
      "Lance seu token DRC20 com total transparência, rastreamento em tempo real e confiança da comunidade.",
    "features.secure": "Seguro e Verificado",
    "features.secure_desc":
      "Cada projeto passa por um processo de verificação. Invista com confiança na Dogechain.",
    "features.payments": "Pagamentos DOGE Instantâneos",
    "features.payments_desc":
      "Participe de lançamentos instantaneamente usando DOGE — a crypto mais rápida e amada.",
    "buy_pad.badge": "Disponível Agora",
    "buy_pad.title": "Comprar $PAD no Doggy Market",
    "buy_pad.subtitle":
      "$PAD já está disponível no Doggy Market — o principal mercado DRC20 na Dogechain. Garanta sua alocação antes que o fornecimento acabe.",
    "buy_pad.price": "Preço",
    "buy_pad.supply": "Fornecimento Total",
    "buy_pad.market": "Mercado",
    "buy_pad.token_subtitle": "DRC20 · Dogechain",
    "buy_pad.token_desc":
      "O token utilitário oficial da plataforma DoginalsPad. Acesse lançamentos exclusivos, ganhe recompensas do ecossistema e faça parte da revolução Dogechain.",
    "buy_pad.button": "Comprar $PAD",
    "buy_pad.note": "Abre Doggy Market — o mercado DRC20 na Dogechain",
    "apply.badge": "Aberto para Candidaturas",
    "apply.title": "Lance seu Projeto na DoginalsPad",
    "apply.subtitle":
      "Pronto para trazer seu token DRC20 para a comunidade Dogechain? Candidate-se agora e nossa equipe analisará seu projeto.",
    "apply.verified": "Listagem verificada",
    "apply.verified_desc": "Revisão manual pela equipe",
    "apply.doge_payments": "Pagamentos DOGE",
    "apply.doge_payments_desc": "Participação sem complicações",
    "apply.dogechain": "Nativo Dogechain",
    "apply.dogechain_desc": "Construído para tokens DRC20",
    "apply.button": "Solicitar Lançamento",
    "apply.note": "Candidaturas analisadas em 3–5 dias úteis",
    "faq.title": "Perguntas Frequentes",
    "faq.subtitle":
      "Tudo que você precisa saber sobre Doginalspad e participação em lançamentos de tokens DRC20.",
    "faq.q1": "O que é Doginalspad?",
    "faq.a1":
      "Doginalspad é a plataforma de lançamento de tokens DRC20 #1 construída na Dogechain. Permite que projetos de tokens lancem seus tokens DRC20 de forma transparente e capacita a comunidade a participar usando DOGE.",
    "faq.q2": "O que é DRC20?",
    "faq.a2":
      "DRC20 é um padrão de token na Dogechain — semelhante ao ERC20 no Ethereum. Os tokens DRC20 permitem que projetos criem tokens fungíveis na rede Dogechain com suporte completo a contratos inteligentes.",
    "faq.q3": "O que é $PAD?",
    "faq.a3":
      "$PAD é o primeiro token lançado na Doginalspad. Ele serve como token utilitário nativo do ecossistema Doginalspad, concedendo aos detentores acesso especial, taxas reduzidas e direitos de governança.",
    "faq.q4": "Como participo de um lançamento?",
    "faq.a4":
      "Para participar de um lançamento, conecte sua carteira na Doginalspad, navegue até o lançamento ativo e clique em 'Participar com DOGE'. A integração de carteira chegará em breve!",
    "faq.q5": "Quais carteiras são suportadas?",
    "faq.a5":
      "Doginalspad suportará as principais carteiras compatíveis com Dogechain, incluindo MetaMask (configurado para Dogechain) e carteiras dedicadas ao ecossistema Doge.",
    "faq.q6": "Há contribuição mínima ou máxima?",
    "faq.a6":
      "Cada lançamento define seus próprios limites de contribuição. Esses detalhes são exibidos em cada cartão de lançamento. Sempre verifique os parâmetros específicos antes de participar.",
    "faq.q7": "Como os tokens são distribuídos?",
    "faq.a7":
      "A distribuição de tokens varia por projeto. Detalhes incluindo fornecimento total, preço por token em DOGE e metas de arrecadação são claramente mostrados em cada página de lançamento.",
    "faq.q8": "Como lanço meu próprio projeto na Doginalspad?",
    "faq.a8":
      "Se você é uma equipe de projeto que deseja lançar na Doginalspad, entre em contato conosco através dos nossos canais de mídia social. Vamos guiá-lo pelo processo de avaliação.",
    "launches.title": "Todos os Lançamentos",
    "launches.subtitle":
      "Navegue e participe de lançamentos de tokens DRC20. Pagamento em DOGE.",
    "launches.all": "Todos",
    "launches.upcoming": "Próximos",
    "launches.live": "Ao Vivo",
    "launches.ended": "Encerrados",
    "launches.search": "Pesquisar projetos...",
    "launches.no_launches_title": "Nenhum Lançamento Encontrado",
    "launches.no_launches_all":
      "Nenhum lançamento de token foi criado ainda. Volte em breve!",
    "launches.no_launches_filter": "Nenhum lançamento {filter} no momento.",
    "footer.tagline":
      "Lançando o futuro dos tokens DRC20 na Dogechain. A primeira e mais confiável plataforma no ecossistema Doge.",
    "footer.access": "Acesso",
    "footer.home": "Início",
    "footer.community": "Comunidade",
    "footer.chain_info": "Pagamento: DOGE · Rede: Dogechain",
    "footer.copyright": "© {year} Doginalspad. Todos os direitos reservados.",
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("doginalspad-language");
      if (stored && stored in translations) return stored as Language;
    } catch {
      // ignore
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("doginalspad-language", lang);
    } catch {
      // ignore
    }
  };

  const t = (key: TranslationKey, vars?: Record<string, string>): string => {
    let text = translations[language][key] ?? translations.en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(`{${k}}`, v);
      }
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
