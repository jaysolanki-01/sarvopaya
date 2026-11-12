import type { D2CTranslations } from "./d2c-translations-types";

export const enIN: D2CTranslations = {
  heroLabel: "D2C Marketing Agency",
  heroH1: "D2C Marketing Agency Built Around Business Outcomes.",
  heroSub:
    'As a D2C marketing agency, we build the tracking layer, buy media with precision, test creative at volume, and optimize every stage of your funnel, because "good ROAS" means nothing without good data.',
  heroCta1: "Get a Performance Audit",
  heroCta2: "Talk to a Growth Strategist",
  heroBcHome: "Home",
  heroBcServices: "Services",
  heroBcCurrent: "D2C Marketing Agency",

  navJumpTo: "Jump to:",
  navWhyUs: "Why Us",
  navStack: "Performance Stack",
  navTracking: "Tracking",
  navCreative: "Creative Engine",
  navRevenue: "Revenue Economics",
  navRetention: "Retention",
  navProcess: "Growth Process",
  navFaqs: "FAQs",
  navAudit: "Free Audit →",

  vanityLabel: "What We Optimize",
  vanityH2: "Don't Optimize for Clicks. Optimize for Revenue.",
  vanityBody:
    "Most agencies report on the metrics that make their dashboards look good. We report on the metrics that make your business grow.",
  vanityColA: "Vanity Metrics",
  vanityColB: "Business Metrics",
  vanityRows: [
    ["Clicks", "Revenue"],
    ["Impressions", "Orders"],
    ["Reach", "CAC"],
    ["CPC", "MER"],
    ["CTR", "LTV"],
    ["Platform ROAS", "Contribution Margin"],
    ["Followers", "Repeat Purchase Rate"],
    ["Engagement Rate", "Payback Period"],
  ],

  whyLabel: "The Difference",
  whyH2: "Why Sarvopaya for Your D2C Brand.",
  whyBody:
    "Most agencies split tracking, media, and creative across different teams. We build one connected system where every layer feeds the next — so your spend compounds instead of leaking.",
  whyCards: [
    {
      title: "D2C-Only Focus",
      body: "We work exclusively with direct-to-consumer brands. Every framework, benchmark, and playbook is built for ecommerce revenue — not lead gen, SaaS, or brand awareness.",
    },
    {
      title: "Tracking Before Spend",
      body: "We fix your measurement before we touch your media budget. Server-side events, deduplication, and GA4 ecommerce accuracy come first — so every rupee is tracked correctly.",
    },
    {
      title: "Creative at Scale",
      body: "Hooks, angles, and static + video variants shipped weekly. We test creative like a media buyer — structured, volume-driven, and tied directly to CPA and ROAS targets.",
    },
    {
      title: "MER Over Platform ROAS",
      body: "We report on Marketing Efficiency Ratio and contribution margin — not inflated in-platform numbers. If your overall business isn't growing, we tell you.",
    },
    {
      title: "Retention Built In",
      body: "Acquisition without retention is a leaking bucket. We build Klaviyo flows, post-purchase sequences, and LTV programmes alongside paid media — not as an afterthought.",
    },
    {
      title: "One Team, Full Stack",
      body: "No outsourcing, no silos. The person running your Meta account understands your GTM setup. The person building your reports reads the same P&L as you.",
    },
  ],
  whyBadges: [
    "Meta Business Partner",
    "Google Partner",
    "D2C Brands Only",
    "No Lock-in Contracts",
    "Full Data Ownership",
  ],

  stackLabel: "The System",
  stackH2: "The Performance Stack",
  stackBody: "Five phases. One system. Built in sequence, because the order matters.",
  stackPhases: [
    {
      num: "01",
      label: "Track",
      headline: "Build the foundation first.",
      body: "You cannot optimize what you cannot measure. Before any campaign launches, we ensure every event, conversion, and signal is captured accurately.",
      items: [
        "Google Tag Manager",
        "GA4 Ecommerce",
        "Meta Pixel + CAPI",
        "Google Ads Conversions",
        "Enhanced Conversions",
        "Server-Side GTM",
        "Purchase Event Tracking",
        "UTM Architecture",
        "Event Deduplication",
      ],
    },
    {
      num: "02",
      label: "Understand",
      headline: "Data without insight is noise.",
      body: "Raw data tells you what happened. Analysis tells you why. We build the reporting layer that turns your numbers into decisions.",
      items: [
        "Multi-touch Attribution",
        "Customer Journey Mapping",
        "Funnel Analysis",
        "Cohort Analysis",
        "Audience Behaviour",
        "Channel Performance",
        "Product-Level Performance",
        "CAC by Segment",
      ],
    },
    {
      num: "03",
      label: "Acquire",
      headline: "Reach the right people, at the right cost.",
      body: "Platform strategy, audience architecture, and media buying optimized around your CAC target and margin structure not just click-through rates.",
      items: [
        "Meta Ads (Prospecting + Retargeting)",
        "Google Shopping",
        "Performance Max",
        "YouTube Ads",
        "Search Campaigns",
        "Catalog Ads",
        "Advantage+ Shopping",
        "Audience Strategy",
        "Budget Allocation",
      ],
    },
    {
      num: "04",
      label: "Convert",
      headline: "Traffic is worthless if the site doesn't convert.",
      body: "We audit and improve the entire conversion path from landing page to checkout because your ROAS is only as good as your CVR.",
      items: [
        "Landing Page Optimization",
        "Product Page CRO",
        "Mobile UX Audit",
        "Page Speed Optimization",
        "Offer Strategy",
        "Social Proof Integration",
        "Checkout Flow Optimization",
        "Cart Recovery",
      ],
    },
    {
      num: "05",
      label: "Scale",
      headline: "Scale what the data shows is working.",
      body: "Once the system is working, we expand systematically. New creatives, new audiences, broader budgets all informed by the performance data we've built.",
      items: [
        "Creative Testing & Iteration",
        "Audience Expansion",
        "Budget Scaling Framework",
        "Reporting & Dashboards",
        "Automation",
        "Cross-Channel Optimization",
        "LTV-based Bidding",
        "Ongoing Optimization",
      ],
    },
  ],

  toolEcosystemLabel: "The Performance Stack",
  toolEcosystemH2: "Every Tool, Working Together.",
  toolEcosystemBody:
    "The technology ecosystem behind a performance-led D2C brand from tracking infrastructure to media platforms to analytics and CRO.",

  funnelLabel: "The D2C Funnel",
  funnelH2: "Every Stage Is an Optimization Opportunity",
  funnelBody:
    "We measure, optimize, and monitor every stage of the D2C customer journey. Select a stage to see what we track and where things go wrong.",
  funnelMeasureLabel: "Measure",
  funnelOptimizeLabel: "Optimize",
  funnelRiskLabel: "Risk",
  funnelStages: [
    {
      label: "Discovery",
      measure: ["Reach", "CPM", "Frequency", "Impressions"],
      optimize: "Audience targeting, creative hooks, platform and format selection",
      risk: "Wrong audience segments, weak creative, poor platform-format fit",
    },
    {
      label: "Ad Impression",
      measure: ["CTR", "CPC", "Hook Rate", "Thumb-Stop Rate"],
      optimize: "Ad creative, copy, offer framing, visual format",
      risk: "Low CTR, ad fatigue, misleading or weak hook",
    },
    {
      label: "Click",
      measure: ["Landing Page CVR", "Bounce Rate", "Time to Engage"],
      optimize: "Landing page relevance, speed, message-to-ad match",
      risk: "Mismatch between ad promise and landing page experience",
    },
    {
      label: "Product View",
      measure: ["View-to-Cart Rate", "Time on Page", "Scroll Depth"],
      optimize: "Product imagery, copy, reviews, trust signals",
      risk: "Insufficient social proof, weak product presentation",
    },
    {
      label: "Add to Cart",
      measure: ["ATC Rate", "Cart Abandonment Rate"],
      optimize: "Pricing, urgency, bundle offers, free shipping threshold",
      risk: "Price sensitivity, no urgency, excessive friction",
    },
    {
      label: "Checkout",
      measure: ["Checkout Completion Rate", "Payment Success Rate"],
      optimize: "Checkout UX, payment options, trust at point of purchase",
      risk: "Complex checkout, limited payment methods, trust gaps",
    },
    {
      label: "Purchase",
      measure: ["CVR", "AOV", "CAC", "ROAS"],
      optimize: "Upsells, cross-sells, order confirmation experience",
      risk: "Low AOV, poor unit economics, unsustainable CAC",
    },
    {
      label: "Repeat Purchase",
      measure: ["LTV", "Repeat Rate", "Retention Rate", "MER"],
      optimize: "Email / WhatsApp retention flows, loyalty, re-engagement ads",
      risk: "One-time buyers, no post-purchase retention system",
    },
  ],

  pipelineNodes: [
    { label: "User", detail: "Purchase event triggered on your store" },
    { label: "Website", detail: "Data layer captures transaction data" },
    { label: "Client-Side Tag", detail: "Browser fires tag via GTM" },
    { label: "Server / GTM-SS", detail: "Event forwarded server-to-server" },
    { label: "Validation", detail: "Data quality and format verified" },
    { label: "Deduplication", detail: "Event ID checked to prevent double-counting" },
    { label: "Meta CAPI · Google EC · GA4", detail: "Platforms receive clean signal" },
    { label: "Reporting", detail: "Attribution models process the event" },
    { label: "Decision", detail: "Budget allocation informed by verified data" },
  ],

  trackingLabel: "Tracking & Measurement",
  trackingH2: "If the Data Is Wrong, Everything Downstream Is Wrong.",
  trackingBody1:
    "Tracking isn't setup once and forgotten. It's the infrastructure your entire performance system depends on. Broken events mean broken attribution. Broken attribution means broken decisions.",
  trackingBody2:
    "Before any campaign goes live, we audit your existing tracking, rebuild what's broken, and put in place the event architecture that makes every platform's data trustworthy.",
  trackingCards: [
    { title: "Google Tag Manager", desc: "Container setup, triggers, custom events" },
    { title: "GA4 Ecommerce", desc: "Full purchase funnel event tracking" },
    { title: "Meta Pixel + CAPI", desc: "Pixel implementation with Conversions API" },
    { title: "Google Ads Conversions", desc: "Tag-based + Enhanced Conversions" },
    { title: "Server-Side GTM", desc: "Event forwarding via GTM server container" },
    { title: "UTM Architecture", desc: "Consistent campaign taxonomy at source" },
  ],

  serverLabel: "Server-Side Tracking",
  serverH2: "Your Data Shouldn't Depend on a Browser.",
  serverBody1:
    "Browser-based tracking has limits. Ad blockers, ITP, browser restrictions all reduce the signal your platforms rely on to optimize delivery and report results.",
  serverBody2:
    "Server-side tracking sends events from your infrastructure directly to Meta, Google and GA4 bypassing the browser layer entirely. Combined with proper event deduplication, this can improve the quality and completeness of your measurement signal.",
  serverCards: [
    { label: "Meta Conversions API", desc: "Server event forwarding to Meta" },
    { label: "Google Enhanced Conversions", desc: "First-party data to Google Ads" },
    { label: "GTM Server Container", desc: "Central server-side tag management" },
  ],
  serverDisclaimer:
    "Server-side tracking supplements but does not replace client-side measurement. It does not guarantee 100% data accuracy.",
  serverDataFlowLabel: "Data Flow",
  serverLiveReportingLabel: "Live Reporting",
  serverAnalyticsCards: [
    { label: "User Activity", sub: "30-day rolling trend" },
    { label: "Audience", sub: "Active vs new users · 28s avg session" },
    { label: "Sessions", sub: "Multi-channel traffic breakdown" },
  ],

  creativeLabel: "Creative & Media",
  creativeH2: "Creative Is the Variable That Moves the ROAS.",
  creativeBody:
    "At scale, the biggest performance lever isn't budget it's creative. We build, test and iterate ad creatives with a data-first framework, not guesswork.",
  creativeSteps: [
    {
      step: "01",
      label: "Hook",
      desc: "First 3 seconds. Thumb-stop. Pattern interrupt. Relevant to audience.",
    },
    {
      step: "02",
      label: "Problem",
      desc: "Surface the pain. Connect with the specific context of your customer.",
    },
    {
      step: "03",
      label: "Solution",
      desc: "Your product as the mechanism. Benefits, not features.",
    },
    {
      step: "04",
      label: "Proof",
      desc: "Social proof, UGC, reviews, demonstration. Trust at the moment of doubt.",
    },
  ],

  testingLabel: "Creative Testing",
  testingH2: "Test. Learn. Iterate. Don't Guess.",
  testingBody:
    "We run structured creative tests at the ad level not the campaign level to isolate variables and understand what drives performance improvements.",
  testingColA: "Variable",
  testingColB: "What We Test",
  testingColC: "We Measure",
  testingRows: [
    ["Hook", "Static vs video vs UGC, first-frame imagery", "CTR, Hook Rate"],
    ["Headline", "Benefit-led vs problem-led vs social proof", "CTR, CVR"],
    ["Format", "Reels, Carousels, Single image, Stories", "CPM, CTR"],
    ["Offer", "Free shipping vs % off vs gift-with-purchase", "CVR, AOV"],
    ["CTA", "Shop Now vs Learn More vs Get Offer", "CTR, CVR"],
    ["Audience", "Broad vs LAL vs interest-based", "ROAS, CAC"],
    ["Landing Page", "Homepage vs PDP vs custom lander", "CVR, Bounce"],
  ],

  croLabel: "Conversion Rate Optimization",
  croH2: "Double Your CVR. Halve Your CAC. Without Touching Your Spend.",
  croBody:
    "A 1% to 2% CVR improvement on the same traffic doubles your orders without adding a rupee to your ad spend. Through dedicated Conversion Rate Optimisation (CRO), we eliminate landing page friction, streamline mobile checkouts, and maximize revenue velocity.",
  croFormulaLabel: "Revenue Formula",
  croFormula: "Traffic × CVR × AOV = Revenue",
  croFormulaNote:
    "Improving any one of these three variables grows revenue. We optimize all three.",
  croItems: [
    "Landing Page Audit and Redesign",
    "Product Page Conversion Optimization",
    "Mobile UX Review",
    "Page Speed Assessment",
    "Above-the-fold Messaging",
    "Social Proof and Trust Signal Integration",
    "Checkout Friction Reduction",
    "Cart Abandonment Flow",
    "Upsell and Cross-sell Strategy",
    "A/B Testing of Page Elements",
  ],

  revenueLabel: "Revenue Economics",
  revenueH2: "High ROAS. Zero Profit. How That Happens.",
  revenueBody:
    "ROAS doesn't account for returns, margins, platform fees, or fulfilment costs. We optimize for contribution margin the number that determines whether the business is actually profitable.",
  revenueColMetric: "Metric",
  revenueColA: "Brand A",
  revenueColB: "Brand B",
  revenueRows: [
    ["Ad Spend", "₹2,00,000", "₹2,00,000"],
    ["Platform ROAS", "4.5×", "3.0×"],
    ["Revenue (attributed)", "₹9,00,000", "₹6,00,000"],
    ["Gross Margin", "25%", "55%"],
    ["Gross Profit", "₹2,25,000", "₹3,30,000"],
    ["Ad Spend", "−₹2,00,000", "−₹2,00,000"],
    ["Contribution Margin", "₹25,000 ✗", "₹1,30,000 ✓"],
  ],
  revenueDisclaimer:
    "Illustrative example. Actual results depend on your product category, return rates, fulfilment costs and margin structure.",

  roasEyebrow: "On ROAS",
  roasH2: "ROAS is a Signal. Not the Destination.",
  roasBody:
    "Platform-reported ROAS tells you what a platform attributed to itself. It doesn't tell you what your business actually made. MER, contribution margin, and LTV tell you that. We work with brands to build measurement frameworks that go beyond the dashboard.",

  retentionLabel: "Customer Retention & LTV",
  retentionH2: "The Second Order Is Where Profit Begins.",
  retentionBody:
    "Cold ad auctions on Meta and Google grow more expensive every quarter. If your D2C brand relies solely on first-purchase margin, rising Customer Acquisition Costs (CAC) will inevitably compress your EBITDA. True scale happens when repeat purchases compound at ₹0 incremental ad spend.",
  retentionStats: [
    {
      stat: "₹0 CAC",
      label: "Repeat Purchase Media Cost",
      desc: "Second and third transactions bypass paid ad auctions entirely, turning marketing expense into pure net contribution margin.",
    },
    {
      stat: "60%+",
      label: "Contribution Margin 3",
      desc: "While order #1 yields ~15–22% CM3 due to acquisition ad spend, repeat lifecycle orders expand contribution margin past 60%.",
    },
    {
      stat: "+42%",
      label: "Average 90-Day LTV Lift",
      desc: "Disciplined post-purchase cohort sequencing across WhatsApp, email, and SMS transforms one-time buyers into compounding annuities.",
    },
  ],
  retentionHubEyebrow: "Topical Knowledge Hub",
  retentionHubH3: "Essential D2C Growth & Retention Frameworks",
  retentionHubByline: "Curated by Jay Solanki, Founder & Growth Architect",
  retentionGuides: [
    {
      tag: "Primary Guide",
      title: "Why Customer Retention Is Important for D2C Brands",
      desc: "How post-purchase automated sequences, cohort payback analysis, and retention economics protect your brand against rising ad auctions.",
      cta: "Read Retention Guide →",
    },
    {
      tag: "Strategy Framework",
      title: "How to Create a Winning D2C Marketing Strategy for Your Brand",
      desc: "The end-to-end performance roadmap: calculating break-even ROAS, creative sprint cadences, and full-funnel media distribution.",
      cta: "Explore Strategy Guide →",
    },
    {
      tag: "Channel Synergy",
      title: "D2C Marketing Channels & Attribution Architecture",
      desc: "How to balance Meta Ads, Google Performance Max, and YouTube alongside our paid advertising services.",
      cta: "View Channels Guide →",
    },
  ],

  attributionLabel: "Attribution",
  attributionH2: "No Attribution Model Is Perfect. Most Ignore That Fact.",
  attributionBody:
    "We work with multiple attribution perspectives to make better decisions not to find the number that makes our performance look best.",
  attributionBestFor: "Best For",
  attributionLimitation: "Limitation",
  attributionMethods: [
    {
      label: "Platform Attribution",
      description:
        "What Meta and Google each claim. Useful for platform-level optimization, not cross-channel truth.",
      use: "Campaign-level bidding and budget allocation within a platform",
      caveat:
        "Platforms over-attribute to themselves; totals will exceed actual revenue",
    },
    {
      label: "MER (Blended)",
      description:
        "Total revenue divided by total marketing spend. Channel-agnostic. The clearest top-level efficiency signal.",
      use: "Evaluating overall marketing efficiency week-over-week",
      caveat: "Doesn't tell you which channel to invest more in",
    },
    {
      label: "Incrementality Testing",
      description:
        "Holdout tests that measure whether ads actually drove additional revenue vs what would have happened anyway.",
      use: "Measuring true causal impact of a channel or campaign",
      caveat:
        "Requires sufficient scale and test periods to produce statistically valid results",
    },
  ],

  dataLoopLabel: "How We Operate",
  dataLoopH2: "The Loop That Drives Compounding Performance",
  dataLoopSteps: [
    {
      step: "01",
      label: "Collect",
      desc: "Clean tracking captures every event across every channel",
    },
    {
      step: "02",
      label: "Analyse",
      desc: "Data is processed into readable signals and performance patterns",
    },
    {
      step: "03",
      label: "Decide",
      desc: "Spend, creative, audience and CRO decisions made from evidence",
    },
    {
      step: "04",
      label: "Test",
      desc: "Changes implemented, results measured, loop begins again",
    },
  ],

  reportingLabel: "Reporting",
  reportingH2: "A Dashboard Built for Decision-Making, Not Decoration.",
  reportingBody:
    "Weekly reports organized around the metrics that drive action. No vanity numbers. No walls of charts. Just what you need to make the next decision.",
  reportingMetrics: [
    { metric: "MER", label: "Marketing Efficiency Ratio" },
    { metric: "ROAS", label: "Per Platform & Campaign" },
    { metric: "CAC", label: "By Channel & Segment" },
    { metric: "AOV", label: "By Source & Campaign" },
    { metric: "CVR", label: "Funnel Stage Breakdown" },
    { metric: "CTR", label: "Per Ad, Format & Audience" },
    { metric: "CPM", label: "Platform Benchmarks" },
    { metric: "LTV", label: "Cohort-Level Tracking" },
    { metric: "Orders", label: "Revenue by Campaign" },
    { metric: "Spend", label: "Pacing & Budget View" },
    { metric: "CPC", label: "Efficiency by Placement" },
    { metric: "Repeat Rate", label: "Retention Overview" },
  ],

  scopeLabel: "Scope of Work",
  scopeH2: "What We Take Off Your Plate",
  scopeCategories: [
    {
      label: "Tracking & Measurement",
      items: [
        "GTM, GA4, Pixel, CAPI, Enhanced Conversions",
        "Server-side setup and maintenance",
        "Attribution framework and reporting",
      ],
    },
    {
      label: "Paid Media",
      items: [
        "Meta Ads full management",
        "Google Ads (Shopping, Search, PMax, YouTube)",
        "Budget pacing, bidding, campaign structure",
      ],
    },
    {
      label: "Creative",
      items: [
        "Ad creative briefs and feedback",
        "Creative testing framework",
        "Performance creative iterations",
      ],
    },
    {
      label: "Funnel & CRO",
      items: [
        "Landing page review and optimization",
        "Checkout flow analysis",
        "Product page improvement recommendations",
      ],
    },
    {
      label: "Reporting",
      items: [
        "Weekly performance reports",
        "Monthly business review decks",
        "Custom dashboards (Looker Studio / GA4)",
      ],
    },
    {
      label: "Strategy & Growth",
      items: [
        "Channel strategy and budget allocation",
        "Audience and offer strategy",
        "Scaling frameworks as performance grows",
      ],
    },
  ],

  growthLabel: "How We Work",
  growthH2: "From Onboarding to Ongoing Optimization",
  growthPhases: [
    {
      num: "01",
      phase: "Audit",
      timeline: "Week 1",
      desc: "Full audit of existing tracking, campaigns, creative, and funnel. Baseline established. Gaps identified. Priorities set.",
    },
    {
      num: "02",
      phase: "Setup",
      timeline: "Weeks 2–3",
      desc: "Tracking rebuilt or verified. Campaign structure reviewed and restructured where needed. Creative brief developed based on audit findings.",
    },
    {
      num: "03",
      phase: "Launch",
      timeline: "Week 4",
      desc: "Campaigns activated with proper tracking verified pre-launch. Initial creative set live across Meta and Google.",
    },
    {
      num: "04",
      phase: "Learn",
      timeline: "Weeks 4–8",
      desc: "Gathering performance data. Campaigns exit learning phase. First creative tests in flight. Funnel data reviewed.",
    },
    {
      num: "05",
      phase: "Optimize",
      timeline: "Month 2–3",
      desc: "Actionable patterns emerge. Winning creatives scaled. Underperforming segments cut or restructured. CRO improvements actioned.",
    },
    {
      num: "06",
      phase: "Scale",
      timeline: "Month 3+",
      desc: "What's working gets more budget. New creative tests expand the winning playbook. Reporting tightened as the business grows.",
    },
  ],

  auditEyebrow: "Free Performance Audit",
  auditH2: "Your Ad Spend Deserves Better Data.",
  auditBody:
    "We review your tracking setup, campaign structure, creative performance and funnel and tell you exactly where you're losing money. No pitch. Just findings.",
  auditCta1: "Get a Performance Audit",
  auditCta2: "Talk to a Growth Strategist",
  auditBadges: [
    "Free no obligation",
    "Delivered within 5 business days",
    "Tracking + campaign + funnel review",
  ],

  whoLabel: "Who It's For",
  whoH2: "Built for D2C Brands Ready to Own Their Performance Data",
  whoItems: [
    {
      label: "D2C ecommerce brands on Shopify or WooCommerce",
      desc: "Product-led brands selling direct, looking to profitably scale paid acquisition",
    },
    {
      label: "Brands spending ₹50K/month or more on ads",
      desc: "At this scale, measurement gaps and inefficiencies cost real money",
    },
    {
      label: "Brands with broken or unreliable tracking",
      desc: "If your platform numbers don't add up, your decisions won't either",
    },
    {
      label: "D2C brands transitioning from brand to performance",
      desc: "Moving from awareness-first to revenue-first with the right infrastructure",
    },
    {
      label: "Brands frustrated with ROAS-only reporting",
      desc: "Ready to measure real business outcomes instead of platform attribution",
    },
    {
      label: "Brands scaling creative at volume",
      desc: "Need a testing framework that tells you what to scale and what to cut",
    },
  ],

  faqLabel: "FAQ",
  faqH2: "Questions About Performance Marketing",
  faqs: [
    {
      q: "What does a D2C marketing agency do?",
      a: "A D2C marketing agency plans, executes and optimises the entire paid growth system for direct-to-consumer brands. This includes building tracking infrastructure, running Meta Ads and Google Ads, producing and testing creative, optimising the conversion funnel, and reporting on business metrics like ROAS, CAC and MER, not just clicks. Unlike a general digital marketing agency, a D2C-focused agency understands the unit economics of ecommerce: margin structures, repeat purchase rates and payback periods.",
    },
    {
      q: "What is performance marketing?",
      a: "Performance marketing is a form of digital advertising where spend is tied to measurable business outcomes typically revenue, orders, leads or conversions. Every rupee spent is tracked against a specific result, not just reach or brand awareness.",
    },
    {
      q: "What is D2C performance marketing?",
      a: "D2C performance marketing refers to paid acquisition strategies built specifically for direct-to-consumer brands. It covers Meta Ads, Google Ads, tracking infrastructure, attribution, creative testing and conversion optimization all measured against ecommerce revenue metrics like ROAS, CAC and AOV.",
    },
    {
      q: "What is ROAS?",
      a: "ROAS (Return on Ad Spend) is the revenue attributed to advertising divided by what you spent on advertising. A ROAS of 3× means ₹3 in attributed revenue for every ₹1 spent. Platform-reported ROAS and blended ROAS can differ significantly depending on attribution windows and models.",
    },
    {
      q: "Is ROAS enough to measure performance?",
      a: "No. ROAS is a useful signal but an incomplete picture. A brand with 4× ROAS can be less profitable than one with 3× ROAS if margins, CAC and LTV differ. We look at ROAS alongside MER, contribution margin and repeat purchase rate to understand true business performance.",
    },
    {
      q: "What is MER?",
      a: "MER (Marketing Efficiency Ratio) is total revenue divided by total marketing spend across all channels. Unlike platform ROAS, MER is a blended view of media efficiency that isn't distorted by attribution window differences between platforms. It's a more reliable top-level performance signal.",
    },
    {
      q: "What is CAC?",
      a: "CAC (Customer Acquisition Cost) is the total spend required to acquire one paying customer. A sustainable business needs a CAC that allows for profitable payback within an acceptable timeframe given LTV and gross margins. Optimizing CAC without understanding LTV often leads to the wrong decisions.",
    },
    {
      q: "What is server-side tracking?",
      a: "Server-side tracking sends conversion events directly from your server to ad platforms like Meta and Google, bypassing the browser entirely. It improves signal quality because it isn't affected by ad blockers, iOS restrictions, or browser limitations that reduce the accuracy of pixel-based tracking.",
    },
    {
      q: "What is Meta Conversions API (CAPI)?",
      a: "Meta Conversions API is a server-side integration that sends purchase and conversion events directly from your server to Meta's data infrastructure. It supplements or replaces browser-based pixel events to improve match rates, attribution accuracy, and campaign optimization in Meta Ads Manager.",
    },
    {
      q: "What is the difference between Meta Pixel and CAPI?",
      a: "The Meta Pixel fires from the visitor's browser using JavaScript. CAPI fires from your server. CAPI is not affected by ad blockers, browser restrictions or iOS tracking limitations. Best practice is to run both in parallel with event deduplication to maximise signal quality without double-counting.",
    },
    {
      q: "What is Google Enhanced Conversions?",
      a: "Google Enhanced Conversions supplements existing conversion tags by securely hashing first-party customer data (email, phone) at the time of conversion and sending it to Google. This improves conversion measurement accuracy, particularly in environments where cookies are limited.",
    },
    {
      q: "What is attribution in performance marketing?",
      a: "Attribution is the process of assigning credit to marketing touchpoints that contributed to a conversion. Models range from last-click (all credit to the final ad) to data-driven (credit distributed across the customer journey). No model is perfect, which is why we use MER and incrementality testing alongside platform data.",
    },
    {
      q: "Can you guarantee ROAS?",
      a: "No. Any agency that guarantees a specific ROAS is not being accurate. ROAS depends on your product, margins, pricing, creative quality, market demand, and the competitive auction environment all factors that vary. We focus on building the system and processes that give performance the best chance of improving consistently.",
    },
    {
      q: "How much should a D2C brand spend on ads?",
      a: "There's no universal answer, but typically a minimum of ₹50,000–₹1,00,000/month is needed to generate enough data for meaningful optimization. Below that, campaigns often don't exit the learning phase and you're making decisions on insufficient data. Budget should scale in line with profitable ROAS targets, not arbitrarily.",
    },
    {
      q: "How long does performance marketing take to optimize?",
      a: "Most campaigns need 4–8 weeks to exit the learning phase and generate actionable data. Meaningful performance trends typically emerge at 60–90 days. This doesn't mean there's no activity before then, but realistic expectations about optimization timelines matter more than early ROAS spikes.",
    },
    {
      q: "How does GA4 fit into performance marketing?",
      a: "GA4 provides session-level analytics, funnel data, audience behaviour and conversion path information that platform-level dashboards don't show. It's a critical complement to paid media reporting, particularly for understanding funnel drop-off, product page performance, and multi-channel attribution.",
    },
  ],

  finalH2: "Stop Optimizing for Platform Metrics.",
  finalBody:
    "Build the measurement infrastructure, media system, and creative engine your D2C brand needs to grow on actual numbers.",
  finalCta1: "Start With a Performance Audit",
  finalCta2: "Explore All Services",

  reWidget: {
    title: "Performance Simulation",
    disclaimer: "Illustrative model not a guarantee",
    inputs: "Inputs",
    outputs: "Outputs",
    adSpend: "Ad Spend",
    roas: "ROAS",
    cvr: "Conversion Rate",
    aov: "Avg Order Value",
    revenue: "Revenue",
    orders: "Orders",
    cac: "CAC",
    traffic: "Traffic Needed",
  },
};

export const enUS: D2CTranslations = {
  ...enIN,
  heroBcCurrent: "D2C Marketing Agency",
};

export const enGB: D2CTranslations = {
  ...enIN,
  croH2: "Double Your CVR. Halve Your CAC. Without Touching Your Spend.",
  croBody:
    "A 1% to 2% CVR improvement on the same traffic doubles your orders without adding a penny to your ad spend. Through dedicated Conversion Rate Optimisation (CRO), we eliminate landing page friction, streamline mobile checkouts, and maximise revenue velocity.",
  revenueDisclaimer:
    "Illustrative example. Actual results depend on your product category, return rates, fulfilment costs and margin structure.",
};

export const enAE: D2CTranslations = {
  ...enIN,
};
