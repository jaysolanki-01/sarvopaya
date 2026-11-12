import type { D2CTranslations } from "./d2c-translations-types";

export const fr: D2CTranslations = {
  heroLabel: "Agence marketing D2C",
  heroH1: "Agence marketing D2C construite autour des résultats business.",
  heroSub:
    'En tant qu\'agence marketing D2C, nous construisons la couche tracking, achetons les médias avec précision, testons les créatifs à grande échelle et optimisons chaque étape de votre funnel — car un "bon ROAS" ne signifie rien sans données fiables.',
  heroCta1: "Obtenir un audit de performance",
  heroCta2: "Parler à un stratège croissance",
  heroBcHome: "Accueil",
  heroBcServices: "Services",
  heroBcCurrent: "Agence marketing D2C",

  navJumpTo: "Aller à :",
  navWhyUs: "Pourquoi nous",
  navStack: "Performance Stack",
  navTracking: "Tracking",
  navCreative: "Moteur créatif",
  navRevenue: "Économie du revenu",
  navRetention: "Rétention",
  navProcess: "Processus de croissance",
  navFaqs: "FAQ",
  navAudit: "Audit gratuit →",

  vanityLabel: "Ce que nous optimisons",
  vanityH2: "N'optimisez pas pour les clics. Optimisez pour le chiffre d'affaires.",
  vanityBody:
    "La plupart des agences reportent sur les métriques qui font paraître leurs tableaux de bord performants. Nous reportons sur les métriques qui font croître votre business.",
  vanityColA: "Métriques de vanité",
  vanityColB: "Métriques business",
  vanityRows: [
    ["Clics", "Chiffre d'affaires"],
    ["Impressions", "Commandes"],
    ["Portée", "CAC"],
    ["CPC", "MER"],
    ["CTR", "LTV"],
    ["ROAS plateforme", "Marge sur contribution"],
    ["Abonnés", "Taux de rachat"],
    ["Taux d'engagement", "Période de remboursement"],
  ],

  whyLabel: "La différence",
  whyH2: "Pourquoi Sarvopaya pour votre marque D2C.",
  whyBody:
    "La plupart des agences répartissent tracking, médias et créatifs entre différentes équipes. Nous construisons un système connecté où chaque couche alimente la suivante — pour que vos dépenses se capitalisent au lieu de fuir.",
  whyCards: [
    {
      title: "Focus exclusif D2C",
      body: "Nous travaillons exclusivement avec des marques direct-to-consumer. Chaque framework, benchmark et playbook est conçu pour le chiffre d'affaires e-commerce — pas pour la génération de leads, le SaaS ou la notoriété de marque.",
    },
    {
      title: "Tracking avant la dépense",
      body: "Nous corrigeons votre mesure avant de toucher votre budget média. Les événements côté serveur, la déduplication et la précision GA4 e-commerce passent en premier — pour que chaque roupie soit correctement trackée.",
    },
    {
      title: "Créatifs à grande échelle",
      body: "Hooks, angles et variantes statiques + vidéo livrés chaque semaine. Nous testons les créatifs comme un acheteur média — structuré, axé sur le volume et directement lié aux objectifs CPA et ROAS.",
    },
    {
      title: "MER plutôt que ROAS plateforme",
      body: "Nous reportons sur le Marketing Efficiency Ratio et la marge sur contribution — pas sur des chiffres plateforme gonflés. Si votre business global ne croît pas, nous vous le disons.",
    },
    {
      title: "Rétention intégrée",
      body: "L'acquisition sans rétention est un seau percé. Nous construisons des flows Klaviyo, des séquences post-achat et des programmes LTV en parallèle des médias payants — pas comme une réflexion après coup.",
    },
    {
      title: "Une équipe, full-stack",
      body: "Pas d'externalisation, pas de silos. La personne qui gère votre compte Meta comprend votre setup GTM. La personne qui construit vos rapports lit le même P&L que vous.",
    },
  ],
  whyBadges: [
    "Meta Business Partner",
    "Google Partner",
    "Marques D2C uniquement",
    "Sans engagement contractuel",
    "Pleine propriété des données",
  ],

  stackLabel: "Le système",
  stackH2: "La Performance Stack",
  stackBody: "Cinq phases. Un système. Construit en séquence, car l'ordre compte.",
  stackPhases: [
    {
      num: "01",
      label: "Tracker",
      headline: "Poser les fondations en premier.",
      body: "On ne peut pas optimiser ce qu'on ne mesure pas. Avant le lancement de toute campagne, nous nous assurons que chaque événement, conversion et signal est capturé avec précision.",
      items: [
        "Google Tag Manager",
        "GA4 E-commerce",
        "Meta Pixel + CAPI",
        "Google Ads Conversions",
        "Enhanced Conversions",
        "GTM côté serveur",
        "Purchase Event Tracking",
        "Architecture UTM",
        "Déduplication des événements",
      ],
    },
    {
      num: "02",
      label: "Comprendre",
      headline: "Les données sans insight sont du bruit.",
      body: "Les données brutes vous disent ce qui s'est passé. L'analyse vous dit pourquoi. Nous construisons la couche de reporting qui transforme vos chiffres en décisions.",
      items: [
        "Attribution multi-touch",
        "Customer Journey Mapping",
        "Analyse de funnel",
        "Analyse de cohortes",
        "Comportement des audiences",
        "Performance par canal",
        "Performance au niveau produit",
        "CAC par segment",
      ],
    },
    {
      num: "03",
      label: "Acquérir",
      headline: "Atteindre les bonnes personnes, au bon coût.",
      body: "Stratégie plateforme, architecture d'audience et media buying optimisés autour de votre cible CAC et structure de marge — pas seulement les taux de clics.",
      items: [
        "Meta Ads (Prospecting + Retargeting)",
        "Google Shopping",
        "Performance Max",
        "YouTube Ads",
        "Campagnes Search",
        "Catalog Ads",
        "Advantage+ Shopping",
        "Stratégie d'audience",
        "Allocation budgétaire",
      ],
    },
    {
      num: "04",
      label: "Convertir",
      headline: "Le trafic est sans valeur si le site ne convertit pas.",
      body: "Nous auditons et améliorons l'intégralité du parcours de conversion, de la page d'atterrissage au paiement — car votre ROAS vaut ce que vaut votre CVR.",
      items: [
        "Optimisation de la page d'atterrissage",
        "CRO des pages produit",
        "Audit UX mobile",
        "Optimisation de la vitesse de page",
        "Stratégie d'offre",
        "Intégration de la preuve sociale",
        "Optimisation du flux de paiement",
        "Récupération de panier abandonné",
      ],
    },
    {
      num: "05",
      label: "Scaler",
      headline: "Scaler ce que les données montrent qui fonctionne.",
      body: "Une fois le système fonctionnel, nous développons systématiquement. Nouveaux créatifs, nouvelles audiences, budgets élargis — tous informés par les données de performance que nous avons construites.",
      items: [
        "Creative Testing & Itération",
        "Expansion d'audience",
        "Budget Scaling Framework",
        "Reporting & Dashboards",
        "Automatisation",
        "Optimisation cross-canal",
        "Bidding basé sur le LTV",
        "Optimisation continue",
      ],
    },
  ],

  toolEcosystemLabel: "La Performance Stack",
  toolEcosystemH2: "Chaque outil. Travaillant ensemble.",
  toolEcosystemBody:
    "L'écosystème technologique derrière une marque D2C orientée performance — de l'infrastructure de tracking aux plateformes médias, jusqu'à l'analytics et le CRO.",

  funnelLabel: "Le funnel D2C",
  funnelH2: "Chaque étape est une opportunité d'optimisation",
  funnelBody:
    "Nous mesurons, optimisons et surveillons chaque étape du parcours client D2C. Sélectionnez une étape pour voir ce que nous trackons et où les problèmes surviennent.",
  funnelMeasureLabel: "Mesurer",
  funnelOptimizeLabel: "Optimiser",
  funnelRiskLabel: "Risque",
  funnelStages: [
    {
      label: "Découverte",
      measure: ["Portée", "CPM", "Fréquence", "Impressions"],
      optimize: "Ciblage d'audience, hooks créatifs, sélection de plateforme et de format",
      risk: "Mauvais segments d'audience, créatif faible, mauvaise combinaison plateforme-format",
    },
    {
      label: "Impression publicitaire",
      measure: ["CTR", "CPC", "Hook Rate", "Thumb-Stop Rate"],
      optimize: "Créatif publicitaire, copy, cadrage de l'offre, format visuel",
      risk: "CTR faible, fatigue publicitaire, hook trompeur ou faible",
    },
    {
      label: "Clic",
      measure: ["CVR page d'atterrissage", "Taux de rebond", "Temps avant engagement"],
      optimize: "Pertinence de la page d'atterrissage, vitesse, cohérence message-annonce",
      risk: "Décalage entre la promesse de l'annonce et l'expérience de la page d'atterrissage",
    },
    {
      label: "Vue produit",
      measure: ["Taux vue-panier", "Temps sur page", "Profondeur de défilement"],
      optimize: "Images produit, copy, avis, signaux de confiance",
      risk: "Preuve sociale insuffisante, présentation produit faible",
    },
    {
      label: "Ajout au panier",
      measure: ["Taux ATC", "Taux d'abandon de panier"],
      optimize: "Prix, urgence, offres groupées, seuil de livraison gratuite",
      risk: "Sensibilité au prix, absence d'urgence, friction excessive",
    },
    {
      label: "Paiement",
      measure: ["Taux de finalisation du paiement", "Taux de succès du paiement"],
      optimize: "UX du paiement, options de paiement, confiance au moment de l'achat",
      risk: "Paiement complexe, méthodes de paiement limitées, manque de confiance",
    },
    {
      label: "Achat",
      measure: ["CVR", "AOV", "CAC", "ROAS"],
      optimize: "Upsells, cross-sells, expérience de confirmation de commande",
      risk: "AOV faible, mauvaise économie unitaire, CAC non viable",
    },
    {
      label: "Rachat",
      measure: ["LTV", "Taux de rachat", "Taux de rétention", "MER"],
      optimize: "Flows de rétention email / WhatsApp, fidélité, publicités de réengagement",
      risk: "Acheteurs uniques, absence de système de rétention post-achat",
    },
  ],

  pipelineNodes: [
    { label: "Utilisateur", detail: "Événement d'achat déclenché sur votre boutique" },
    { label: "Site web", detail: "La couche de données capture les données de transaction" },
    { label: "Tag côté client", detail: "Le navigateur déclenche le tag via GTM" },
    { label: "Serveur / GTM-SS", detail: "Événement transmis de serveur à serveur" },
    { label: "Validation", detail: "Qualité et format des données vérifiés" },
    { label: "Déduplication", detail: "ID d'événement vérifié pour éviter le double comptage" },
    { label: "Meta CAPI · Google EC · GA4", detail: "Les plateformes reçoivent un signal propre" },
    { label: "Reporting", detail: "Les modèles d'attribution traitent l'événement" },
    { label: "Décision", detail: "Allocation budgétaire informée par des données vérifiées" },
  ],

  trackingLabel: "Tracking & Measurement",
  trackingH2: "Si les données sont fausses, tout ce qui suit l'est aussi.",
  trackingBody1:
    "Le tracking n'est pas configuré une fois pour toutes et oublié. C'est l'infrastructure dont dépend l'intégralité de votre système de performance. Des événements défectueux signifient une attribution défectueuse. Une attribution défectueuse signifie des décisions défectueuses.",
  trackingBody2:
    "Avant le lancement de toute campagne, nous auditons votre tracking existant, reconstruisons ce qui est cassé et mettons en place l'architecture d'événements qui rend les données de chaque plateforme fiables.",
  trackingCards: [
    { title: "Google Tag Manager", desc: "Configuration du container, déclencheurs, événements personnalisés" },
    { title: "GA4 E-commerce", desc: "Tracking complet des événements du funnel d'achat" },
    { title: "Meta Pixel + CAPI", desc: "Implémentation du Pixel avec Conversions API" },
    { title: "Google Ads Conversions", desc: "Basé sur les tags + Enhanced Conversions" },
    { title: "GTM côté serveur", desc: "Transmission d'événements via le container serveur GTM" },
    { title: "Architecture UTM", desc: "Taxonomie de campagne cohérente à la source" },
  ],

  serverLabel: "Tracking côté serveur",
  serverH2: "Vos données ne devraient pas dépendre d'un navigateur.",
  serverBody1:
    "Le tracking basé sur le navigateur a des limites. Les bloqueurs de publicités, l'ITP et les restrictions des navigateurs réduisent tous le signal sur lequel vos plateformes s'appuient pour optimiser la diffusion et reporter les résultats.",
  serverBody2:
    "Le tracking côté serveur envoie les événements directement depuis votre infrastructure vers Meta, Google et GA4, en contournant entièrement la couche navigateur. Combiné à une déduplication correcte des événements, cela peut améliorer la qualité et la complétude de votre signal de mesure.",
  serverCards: [
    { label: "Meta Conversions API", desc: "Transmission d'événements serveur vers Meta" },
    { label: "Google Enhanced Conversions", desc: "Données first-party vers Google Ads" },
    { label: "GTM Server Container", desc: "Gestion centralisée des tags côté serveur" },
  ],
  serverDisclaimer:
    "Le tracking côté serveur complète mais ne remplace pas la mesure côté client. Il ne garantit pas une précision de données à 100 %.",
  serverDataFlowLabel: "Flux de données",
  serverLiveReportingLabel: "Reporting en temps réel",
  serverAnalyticsCards: [
    { label: "Activité utilisateurs", sub: "Tendance glissante 30 jours" },
    { label: "Audience", sub: "Utilisateurs actifs vs nouveaux · session moy. 28s" },
    { label: "Sessions", sub: "Répartition du trafic multi-canal" },
  ],

  creativeLabel: "Créatif & Médias",
  creativeH2: "Le créatif est la variable qui fait bouger le ROAS.",
  creativeBody:
    "À grande échelle, le principal levier de performance n'est pas le budget — c'est le créatif. Nous construisons, testons et itérons les créatifs publicitaires avec un framework data-first, pas de l'intuition.",
  creativeSteps: [
    {
      step: "01",
      label: "Hook",
      desc: "Les 3 premières secondes. Thumb-stop. Pattern interrupt. Pertinent pour l'audience.",
    },
    {
      step: "02",
      label: "Problème",
      desc: "Faire surface la douleur. Se connecter au contexte spécifique de votre client.",
    },
    {
      step: "03",
      label: "Solution",
      desc: "Votre produit comme mécanisme. Les bénéfices, pas les fonctionnalités.",
    },
    {
      step: "04",
      label: "Preuve",
      desc: "Preuve sociale, UGC, avis, démonstration. La confiance au moment du doute.",
    },
  ],

  testingLabel: "Tests créatifs",
  testingH2: "Tester. Apprendre. Itérer. Ne pas deviner.",
  testingBody:
    "Nous conduisons des tests créatifs structurés au niveau de l'annonce — pas de la campagne — pour isoler les variables et comprendre ce qui génère des améliorations de performance.",
  testingColA: "Variable",
  testingColB: "Ce que nous testons",
  testingColC: "Ce que nous mesurons",
  testingRows: [
    ["Hook", "Statique vs vidéo vs UGC, image première frame", "CTR, Hook Rate"],
    ["Titre", "Axé bénéfice vs axé problème vs preuve sociale", "CTR, CVR"],
    ["Format", "Reels, Carousels, Image unique, Stories", "CPM, CTR"],
    ["Offre", "Livraison gratuite vs % de réduction vs cadeau à l'achat", "CVR, AOV"],
    ["CTA", "Acheter maintenant vs En savoir plus vs Obtenir l'offre", "CTR, CVR"],
    ["Audience", "Large vs LAL vs basée sur les intérêts", "ROAS, CAC"],
    ["Page d'atterrissage", "Homepage vs PDP vs lander personnalisé", "CVR, Rebond"],
  ],

  croLabel: "Optimisation du taux de conversion",
  croH2: "Doublez votre CVR. Divisez votre CAC par deux. Sans toucher votre budget.",
  croBody:
    "Une amélioration du CVR de 1% à 2% sur le même trafic double vos commandes sans ajouter une roupie à vos dépenses publicitaires. Grâce à une CRO dédiée, nous éliminons les frictions sur les pages d'atterrissage, optimisons les paiements mobiles et maximisons la vélocité de chiffre d'affaires.",
  croFormulaLabel: "Formule de revenu",
  croFormula: "Trafic × CVR × AOV = Chiffre d'affaires",
  croFormulaNote:
    "Améliorer l'une de ces trois variables augmente le chiffre d'affaires. Nous optimisons les trois.",
  croItems: [
    "Audit et refonte de la page d'atterrissage",
    "Optimisation de la conversion des pages produit",
    "Revue de l'UX mobile",
    "Évaluation de la vitesse de page",
    "Messaging above-the-fold",
    "Intégration de la preuve sociale et des signaux de confiance",
    "Réduction des frictions au paiement",
    "Flow d'abandon de panier",
    "Stratégie d'upsell et de cross-sell",
    "A/B testing des éléments de page",
  ],

  revenueLabel: "Économie du revenu",
  revenueH2: "ROAS élevé. Zéro profit. Comment ça arrive.",
  revenueBody:
    "Le ROAS ne tient pas compte des retours, des marges, des frais de plateforme ou des coûts de fulfillment. Nous optimisons pour la marge sur contribution — le chiffre qui détermine si le business est réellement rentable.",
  revenueColMetric: "Métrique",
  revenueColA: "Marque A",
  revenueColB: "Marque B",
  revenueRows: [
    ["Dépenses publicitaires", "₹2,00,000", "₹2,00,000"],
    ["ROAS plateforme", "4.5×", "3.0×"],
    ["Chiffre d'affaires (attribué)", "₹9,00,000", "₹6,00,000"],
    ["Marge brute", "25%", "55%"],
    ["Bénéfice brut", "₹2,25,000", "₹3,30,000"],
    ["Dépenses publicitaires", "−₹2,00,000", "−₹2,00,000"],
    ["Marge sur contribution", "₹25,000 ✗", "₹1,30,000 ✓"],
  ],
  revenueDisclaimer:
    "Exemple illustratif. Les résultats réels dépendent de votre catégorie de produit, des taux de retour, des coûts de fulfillment et de la structure de marge.",

  roasEyebrow: "Sur le ROAS",
  roasH2: "Le ROAS est un signal. Pas la destination.",
  roasBody:
    "Le ROAS reporté par la plateforme vous dit ce qu'une plateforme s'est attribué. Il ne vous dit pas ce que votre business a réellement gagné. MER, marge sur contribution et LTV vous le disent. Nous aidons les marques à construire des frameworks de mesure qui vont au-delà du tableau de bord.",

  retentionLabel: "Rétention client & LTV",
  retentionH2: "La deuxième commande est là où le profit commence.",
  retentionBody:
    "Les enchères publicitaires froides sur Meta et Google deviennent plus chères chaque trimestre. Si votre marque D2C repose uniquement sur la marge du premier achat, la hausse des Customer Acquisition Costs comprimera inévitablement votre EBITDA. La vraie croissance arrive quand les rachats se capitalisent à ₹0 de dépense publicitaire supplémentaire.",
  retentionStats: [
    {
      stat: "₹0 CAC",
      label: "Coût média rachat",
      desc: "Les deuxième et troisième transactions contournent entièrement les enchères publicitaires payantes, transformant les dépenses marketing en marge sur contribution nette pure.",
    },
    {
      stat: "60%+",
      label: "Marge sur contribution 3",
      desc: "Alors que la commande #1 génère ~15–22% de CM3 en raison des dépenses d'acquisition, les commandes lifecycle répétées font croître la marge sur contribution au-delà de 60%.",
    },
    {
      stat: "+42%",
      label: "Hausse moyenne du LTV sur 90 jours",
      desc: "Un séquençage discipliné des cohortes post-achat via WhatsApp, email et SMS transforme les acheteurs uniques en rentes capitalisées.",
    },
  ],
  retentionHubEyebrow: "Hub de connaissances thématiques",
  retentionHubH3: "Frameworks essentiels de croissance & rétention D2C",
  retentionHubByline: "Rédigé par Jay Solanki, Fondateur & Growth Architect",
  retentionGuides: [
    {
      tag: "Guide principal",
      title: "Pourquoi la rétention client est importante pour les marques D2C",
      desc: "Comment les séquences post-achat automatisées, l'analyse de remboursement par cohorte et l'économie de rétention protègent votre marque contre la hausse des enchères publicitaires.",
      cta: "Lire le guide rétention →",
    },
    {
      tag: "Framework stratégique",
      title: "Comment créer une stratégie marketing D2C gagnante pour votre marque",
      desc: "La feuille de route performance de bout en bout : calcul du ROAS break-even, cadences de sprints créatifs et distribution média full-funnel.",
      cta: "Explorer le guide stratégie →",
    },
    {
      tag: "Synergie des canaux",
      title: "Canaux marketing D2C & architecture d'attribution",
      desc: "Comment équilibrer Meta Ads, Google Performance Max et YouTube aux côtés de nos services de publicité payante.",
      cta: "Voir le guide canaux →",
    },
  ],

  attributionLabel: "Attribution",
  attributionH2: "Aucun modèle d'attribution n'est parfait. La plupart l'ignorent.",
  attributionBody:
    "Nous travaillons avec plusieurs perspectives d'attribution pour prendre de meilleures décisions — pas pour trouver le chiffre qui fait paraître notre performance la meilleure.",
  attributionBestFor: "Idéal pour",
  attributionLimitation: "Limite",
  attributionMethods: [
    {
      label: "Attribution plateforme",
      description:
        "Ce que Meta et Google revendiquent chacun. Utile pour l'optimisation au niveau plateforme, pas pour la vérité cross-canal.",
      use: "Bidding et allocation budgétaire au niveau campagne au sein d'une plateforme",
      caveat:
        "Les plateformes sur-attribuent en leur faveur ; les totaux dépasseront le chiffre d'affaires réel",
    },
    {
      label: "MER (Blended)",
      description:
        "Chiffre d'affaires total divisé par les dépenses marketing totales. Agnostique aux canaux. Le signal d'efficacité top-level le plus clair.",
      use: "Évaluation de l'efficacité marketing globale semaine après semaine",
      caveat: "Ne vous dit pas dans quel canal investir davantage",
    },
    {
      label: "Test d'incrémentalité",
      description:
        "Tests holdout qui mesurent si les publicités ont réellement généré du chiffre d'affaires supplémentaire par rapport à ce qui se serait passé de toute façon.",
      use: "Mesure de l'impact causal réel d'un canal ou d'une campagne",
      caveat:
        "Nécessite une échelle suffisante et des périodes de test pour produire des résultats statistiquement valides",
    },
  ],

  dataLoopLabel: "Comment nous opérons",
  dataLoopH2: "La boucle qui génère une performance capitalisée",
  dataLoopSteps: [
    {
      step: "01",
      label: "Collecter",
      desc: "Un tracking propre capture chaque événement sur chaque canal",
    },
    {
      step: "02",
      label: "Analyser",
      desc: "Les données sont traitées en signaux lisibles et patterns de performance",
    },
    {
      step: "03",
      label: "Décider",
      desc: "Décisions de dépenses, créatifs, audience et CRO prises à partir de preuves",
    },
    {
      step: "04",
      label: "Tester",
      desc: "Changements implémentés, résultats mesurés, la boucle recommence",
    },
  ],

  reportingLabel: "Reporting",
  reportingH2: "Un tableau de bord conçu pour la prise de décision, pas la décoration.",
  reportingBody:
    "Rapports hebdomadaires organisés autour des métriques qui déclenchent l'action. Pas de chiffres de vanité. Pas de murs de graphiques. Juste ce dont vous avez besoin pour prendre la prochaine décision.",
  reportingMetrics: [
    { metric: "MER", label: "Marketing Efficiency Ratio" },
    { metric: "ROAS", label: "Par plateforme & campagne" },
    { metric: "CAC", label: "Par canal & segment" },
    { metric: "AOV", label: "Par source & campagne" },
    { metric: "CVR", label: "Répartition par étape du funnel" },
    { metric: "CTR", label: "Par annonce, format & audience" },
    { metric: "CPM", label: "Benchmarks plateforme" },
    { metric: "LTV", label: "Tracking par cohorte" },
    { metric: "Commandes", label: "Chiffre d'affaires par campagne" },
    { metric: "Dépenses", label: "Pacing & vue budget" },
    { metric: "CPC", label: "Efficacité par placement" },
    { metric: "Taux de rachat", label: "Vue d'ensemble rétention" },
  ],

  scopeLabel: "Périmètre d'intervention",
  scopeH2: "Ce que nous prenons en charge",
  scopeCategories: [
    {
      label: "Tracking & Measurement",
      items: [
        "GTM, GA4, Pixel, CAPI, Enhanced Conversions",
        "Configuration et maintenance côté serveur",
        "Framework d'attribution et reporting",
      ],
    },
    {
      label: "Médias payants",
      items: [
        "Gestion complète Meta Ads",
        "Google Ads (Shopping, Search, PMax, YouTube)",
        "Pacing budgétaire, bidding, structure de campagne",
      ],
    },
    {
      label: "Créatif",
      items: [
        "Briefs créatifs et feedback",
        "Framework de tests créatifs",
        "Itérations créatives de performance",
      ],
    },
    {
      label: "Funnel & CRO",
      items: [
        "Revue et optimisation des pages d'atterrissage",
        "Analyse du flux de paiement",
        "Recommandations d'amélioration des pages produit",
      ],
    },
    {
      label: "Reporting",
      items: [
        "Rapports de performance hebdomadaires",
        "Decks de revue business mensuelle",
        "Tableaux de bord personnalisés (Looker Studio / GA4)",
      ],
    },
    {
      label: "Stratégie & Croissance",
      items: [
        "Stratégie de canaux et allocation budgétaire",
        "Stratégie d'audience et d'offre",
        "Frameworks de scaling à mesure que la performance croît",
      ],
    },
  ],

  growthLabel: "Comment nous travaillons",
  growthH2: "De l'onboarding à l'optimisation continue",
  growthPhases: [
    {
      num: "01",
      phase: "Audit",
      timeline: "Semaine 1",
      desc: "Audit complet du tracking existant, des campagnes, des créatifs et du funnel. Baseline établie. Lacunes identifiées. Priorités définies.",
    },
    {
      num: "02",
      phase: "Setup",
      timeline: "Semaines 2–3",
      desc: "Tracking reconstruit ou vérifié. Structure de campagne revue et restructurée si nécessaire. Brief créatif développé sur la base des conclusions de l'audit.",
    },
    {
      num: "03",
      phase: "Lancement",
      timeline: "Semaine 4",
      desc: "Campagnes activées avec tracking vérifié avant le lancement. Premier ensemble créatif mis en ligne sur Meta et Google.",
    },
    {
      num: "04",
      phase: "Apprentissage",
      timeline: "Semaines 4–8",
      desc: "Collecte des données de performance. Les campagnes sortent de la phase d'apprentissage. Premiers tests créatifs en cours. Données du funnel revues.",
    },
    {
      num: "05",
      phase: "Optimisation",
      timeline: "Mois 2–3",
      desc: "Les patterns exploitables émergent. Les créatifs gagnants sont scalés. Les segments sous-performants sont réduits ou restructurés. Les améliorations CRO sont mises en œuvre.",
    },
    {
      num: "06",
      phase: "Scaling",
      timeline: "Mois 3+",
      desc: "Ce qui fonctionne reçoit plus de budget. De nouveaux tests créatifs élargissent le playbook gagnant. Le reporting est affiné à mesure que le business croît.",
    },
  ],

  auditEyebrow: "Audit de performance gratuit",
  auditH2: "Vos dépenses publicitaires méritent de meilleures données.",
  auditBody:
    "Nous examinons votre setup de tracking, la structure de vos campagnes, la performance créative et votre funnel, et nous vous indiquons exactement où vous perdez de l'argent. Pas de pitch. Juste des conclusions.",
  auditCta1: "Obtenir un audit de performance",
  auditCta2: "Parler à un stratège croissance",
  auditBadges: [
    "Gratuit, sans engagement",
    "Livré sous 5 jours ouvrés",
    "Revue tracking + campagne + funnel",
  ],

  whoLabel: "Pour qui c'est",
  whoH2: "Conçu pour les marques D2C prêtes à maîtriser leurs données de performance",
  whoItems: [
    {
      label: "Marques D2C e-commerce sur Shopify ou WooCommerce",
      desc: "Marques orientées produit qui vendent en direct et souhaitent scaler l'acquisition payante de façon rentable",
    },
    {
      label: "Marques dépensant ₹50K/mois ou plus en publicités",
      desc: "À cette échelle, les lacunes de mesure et les inefficacités coûtent de l'argent réel",
    },
    {
      label: "Marques avec un tracking cassé ou peu fiable",
      desc: "Si vos chiffres plateforme ne s'additionnent pas, vos décisions non plus",
    },
    {
      label: "Marques D2C en transition de la notoriété à la performance",
      desc: "Passer d'une approche awareness-first à revenue-first avec la bonne infrastructure",
    },
    {
      label: "Marques frustrées par le reporting ROAS uniquement",
      desc: "Prêtes à mesurer de vrais résultats business plutôt que l'attribution plateforme",
    },
    {
      label: "Marques qui scalent les créatifs à volume",
      desc: "Ont besoin d'un framework de test qui indique quoi scaler et quoi couper",
    },
  ],

  faqLabel: "FAQ",
  faqH2: "Questions sur le performance marketing",
  faqs: [
    {
      q: "Que fait une agence marketing D2C ?",
      a: "Une agence marketing D2C planifie, exécute et optimise l'ensemble du système de croissance payante pour les marques direct-to-consumer. Cela comprend la construction de l'infrastructure de tracking, la gestion de Meta Ads et Google Ads, la production et le test de créatifs, l'optimisation du funnel de conversion et le reporting sur les métriques business comme ROAS, CAC et MER.",
    },
    {
      q: "Qu'est-ce que le performance marketing ?",
      a: "Le performance marketing est une forme de publicité digitale où les dépenses sont liées à des résultats business mesurables — généralement chiffre d'affaires, commandes, leads ou conversions. Chaque roupie dépensée est tracée contre un résultat spécifique, pas seulement la portée ou la notoriété de marque.",
    },
    {
      q: "Qu'est-ce que le D2C performance marketing ?",
      a: "Le D2C performance marketing désigne les stratégies d'acquisition payante construites spécifiquement pour les marques direct-to-consumer. Il couvre Meta Ads, Google Ads, l'infrastructure de tracking, l'attribution, les tests créatifs et l'optimisation de la conversion — tous mesurés par rapport aux métriques de chiffre d'affaires e-commerce comme ROAS, CAC et AOV.",
    },
    {
      q: "Qu'est-ce que le ROAS ?",
      a: "Le ROAS (Return on Ad Spend) est le chiffre d'affaires attribué à la publicité divisé par ce que vous avez dépensé en publicité. Un ROAS de 3× signifie ₹3 de chiffre d'affaires attribué pour chaque ₹1 dépensé. Le ROAS reporté par la plateforme et le ROAS blended peuvent différer significativement selon les fenêtres et modèles d'attribution.",
    },
    {
      q: "Le ROAS suffit-il pour mesurer la performance ?",
      a: "Non. Le ROAS est un signal utile mais une image incomplète. Une marque avec 4× ROAS peut être moins rentable qu'une avec 3× ROAS si les marges, le CAC et le LTV diffèrent. Nous regardons le ROAS aux côtés du MER, de la marge sur contribution et du taux de rachat.",
    },
    {
      q: "Qu'est-ce que le MER ?",
      a: "Le MER (Marketing Efficiency Ratio) est le chiffre d'affaires total divisé par les dépenses marketing totales sur tous les canaux. Contrairement au ROAS plateforme, le MER est une vision mixte de l'efficacité média qui n'est pas faussée par les différences de fenêtres d'attribution entre plateformes.",
    },
    {
      q: "Qu'est-ce que le CAC ?",
      a: "Le CAC (Customer Acquisition Cost) est la dépense totale requise pour acquérir un client payant. Un business durable a besoin d'un CAC qui permette un remboursement rentable dans un délai acceptable étant donné le LTV et les marges brutes.",
    },
    {
      q: "Qu'est-ce que le tracking côté serveur ?",
      a: "Le tracking côté serveur envoie les événements de conversion directement depuis votre serveur vers des plateformes publicitaires comme Meta et Google, en contournant entièrement le navigateur. Il améliore la qualité du signal car il n'est pas affecté par les bloqueurs de publicités, les restrictions iOS ou les limitations des navigateurs.",
    },
    {
      q: "Qu'est-ce que l'API Conversions Meta (CAPI) ?",
      a: "L'API Conversions Meta est une intégration côté serveur qui envoie les événements d'achat et de conversion directement depuis votre serveur vers l'infrastructure de données de Meta. Elle complète ou remplace les événements pixel basés sur le navigateur pour améliorer les taux de correspondance, la précision de l'attribution et l'optimisation des campagnes dans Meta Ads Manager.",
    },
    {
      q: "Quelle est la différence entre Meta Pixel et CAPI ?",
      a: "Le Meta Pixel se déclenche depuis le navigateur du visiteur via JavaScript. CAPI se déclenche depuis votre serveur. CAPI n'est pas affecté par les bloqueurs de publicités, les restrictions du navigateur ou les limitations de tracking iOS. La meilleure pratique est d'exécuter les deux en parallèle avec déduplication des événements.",
    },
    {
      q: "Que sont les Google Enhanced Conversions ?",
      a: "Google Enhanced Conversions complète les tags de conversion existants en hachant de façon sécurisée les données clients first-party (email, téléphone) au moment de la conversion et en les envoyant à Google. Cela améliore la précision de la mesure des conversions, en particulier dans les environnements où les cookies sont limités.",
    },
    {
      q: "Qu'est-ce que l'attribution en performance marketing ?",
      a: "L'attribution est le processus d'assignation du crédit aux points de contact marketing qui ont contribué à une conversion. Les modèles vont du last-click au data-driven. Aucun modèle n'est parfait, c'est pourquoi nous utilisons MER et les tests d'incrémentalité aux côtés des données plateforme.",
    },
    {
      q: "Pouvez-vous garantir un ROAS ?",
      a: "Non. Toute agence qui garantit un ROAS spécifique n'est pas précise. Le ROAS dépend de votre produit, vos marges, vos prix, la qualité créative, la demande du marché et l'environnement d'enchères compétitif. Nous nous concentrons sur la construction du système et des processus qui donnent à la performance la meilleure chance de s'améliorer de façon constante.",
    },
    {
      q: "Combien une marque D2C devrait-elle dépenser en publicités ?",
      a: "Il n'y a pas de réponse universelle, mais en général un minimum de ₹50 000–₹1 00 000/mois est nécessaire pour générer suffisamment de données pour une optimisation significative. En dessous, les campagnes ne sortent souvent pas de la phase d'apprentissage et vous prenez des décisions sur des données insuffisantes.",
    },
    {
      q: "Combien de temps faut-il pour optimiser le performance marketing ?",
      a: "La plupart des campagnes ont besoin de 4 à 8 semaines pour sortir de la phase d'apprentissage et générer des données exploitables. Les tendances de performance significatives émergent généralement à 60–90 jours. Les attentes réalistes sur les délais d'optimisation comptent plus que les pics de ROAS précoces.",
    },
    {
      q: "Comment GA4 s'intègre dans le performance marketing ?",
      a: "GA4 fournit des analyses au niveau session, des données de funnel, le comportement des audiences et des informations sur le parcours de conversion que les tableaux de bord plateforme ne montrent pas. C'est un complément essentiel au reporting des médias payants, en particulier pour comprendre les abandons de funnel, la performance des pages produit et l'attribution multi-canal.",
    },
  ],

  finalH2: "Arrêtez d'optimiser pour les métriques de plateforme.",
  finalBody:
    "Construisez l'infrastructure de mesure, le système média et le moteur créatif dont votre marque D2C a besoin pour croître sur de vrais chiffres.",
  finalCta1: "Commencer par un audit de performance",
  finalCta2: "Explorer tous les services",

  reWidget: {
    title: "Simulation de performance",
    disclaimer: "Modèle illustratif – pas une garantie",
    inputs: "Entrées",
    outputs: "Sorties",
    adSpend: "Dépenses publicitaires",
    roas: "ROAS",
    cvr: "Taux de conversion",
    aov: "Valeur moyenne de commande",
    revenue: "Chiffre d'affaires",
    orders: "Commandes",
    cac: "CAC",
    traffic: "Trafic nécessaire",
  },
};
