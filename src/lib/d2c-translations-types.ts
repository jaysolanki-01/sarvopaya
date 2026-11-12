export type D2CTranslations = {
  heroLabel: string;
  heroH1: string;
  heroSub: string;
  heroCta1: string;
  heroCta2: string;
  heroBcHome: string;
  heroBcServices: string;
  heroBcCurrent: string;

  navJumpTo: string;
  navWhyUs: string;
  navStack: string;
  navTracking: string;
  navCreative: string;
  navRevenue: string;
  navRetention: string;
  navProcess: string;
  navFaqs: string;
  navAudit: string;

  vanityLabel: string;
  vanityH2: string;
  vanityBody: string;
  vanityColA: string;
  vanityColB: string;
  vanityRows: [string, string][];

  whyLabel: string;
  whyH2: string;
  whyBody: string;
  whyCards: { title: string; body: string }[];
  whyBadges: string[];

  stackLabel: string;
  stackH2: string;
  stackBody: string;
  stackPhases: { num: string; label: string; headline: string; body: string; items: string[] }[];

  toolEcosystemLabel: string;
  toolEcosystemH2: string;
  toolEcosystemBody: string;

  funnelLabel: string;
  funnelH2: string;
  funnelBody: string;
  funnelMeasureLabel: string;
  funnelOptimizeLabel: string;
  funnelRiskLabel: string;
  funnelStages: { label: string; measure: string[]; optimize: string; risk: string }[];

  pipelineNodes: { label: string; detail: string }[];

  trackingLabel: string;
  trackingH2: string;
  trackingBody1: string;
  trackingBody2: string;
  trackingCards: { title: string; desc: string }[];

  serverLabel: string;
  serverH2: string;
  serverBody1: string;
  serverBody2: string;
  serverCards: { label: string; desc: string }[];
  serverDisclaimer: string;
  serverDataFlowLabel: string;
  serverLiveReportingLabel: string;
  serverAnalyticsCards: { label: string; sub: string }[];

  creativeLabel: string;
  creativeH2: string;
  creativeBody: string;
  creativeSteps: { step: string; label: string; desc: string }[];

  testingLabel: string;
  testingH2: string;
  testingBody: string;
  testingColA: string;
  testingColB: string;
  testingColC: string;
  testingRows: [string, string, string][];

  croLabel: string;
  croH2: string;
  croBody: string;
  croFormulaLabel: string;
  croFormula: string;
  croFormulaNote: string;
  croItems: string[];

  revenueLabel: string;
  revenueH2: string;
  revenueBody: string;
  revenueColMetric: string;
  revenueColA: string;
  revenueColB: string;
  revenueRows: [string, string, string][];
  revenueDisclaimer: string;

  roasEyebrow: string;
  roasH2: string;
  roasBody: string;

  retentionLabel: string;
  retentionH2: string;
  retentionBody: string;
  retentionStats: { stat: string; label: string; desc: string }[];
  retentionHubEyebrow: string;
  retentionHubH3: string;
  retentionHubByline: string;
  retentionGuides: { tag: string; title: string; desc: string; cta: string }[];

  attributionLabel: string;
  attributionH2: string;
  attributionBody: string;
  attributionBestFor: string;
  attributionLimitation: string;
  attributionMethods: { label: string; description: string; use: string; caveat: string }[];

  dataLoopLabel: string;
  dataLoopH2: string;
  dataLoopSteps: { step: string; label: string; desc: string }[];

  reportingLabel: string;
  reportingH2: string;
  reportingBody: string;
  reportingMetrics: { metric: string; label: string }[];

  scopeLabel: string;
  scopeH2: string;
  scopeCategories: { label: string; items: string[] }[];

  growthLabel: string;
  growthH2: string;
  growthPhases: { num: string; phase: string; timeline: string; desc: string }[];

  auditEyebrow: string;
  auditH2: string;
  auditBody: string;
  auditCta1: string;
  auditCta2: string;
  auditBadges: string[];

  whoLabel: string;
  whoH2: string;
  whoItems: { label: string; desc: string }[];

  faqLabel: string;
  faqH2: string;
  faqs: { q: string; a: string }[];

  finalH2: string;
  finalBody: string;
  finalCta1: string;
  finalCta2: string;

  reWidget: {
    title: string;
    disclaimer: string;
    inputs: string;
    outputs: string;
    adSpend: string;
    roas: string;
    cvr: string;
    aov: string;
    revenue: string;
    orders: string;
    cac: string;
    traffic: string;
  };
};
