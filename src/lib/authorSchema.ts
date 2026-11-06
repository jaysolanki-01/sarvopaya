export const AUTHOR_PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.sarvopaya.com/about#jay-solanki",
  name: "Jay Solanki",
  jobTitle: "Founder & Growth Architect",
  worksFor: {
    "@type": "Organization",
    "@id": "https://www.sarvopaya.com/#organization",
    name: "Sarvopaya",
    url: "https://www.sarvopaya.com",
    logo: "https://www.sarvopaya.com/images/Logo_black.png",
  },
  url: "https://www.sarvopaya.com/about",
  image: "https://www.sarvopaya.com/images/jay-solanki.png",
  description:
    "Founder and Growth Architect at Sarvopaya. Advises direct-to-consumer and ecommerce brands on full-funnel marketing strategy, contribution margin economics, creative testing velocity, and automated customer retention systems.",
  knowsAbout: [
    "D2C Marketing Strategy",
    "Performance Marketing",
    "Customer Retention & LTV Optimization",
    "Conversion Rate Optimization (CRO)",
    "E-commerce Unit Economics (CM1, CM2, CM3)",
    "Meta Ads & Creative Testing",
    "Direct-to-Consumer Growth",
    "Lifecycle Automation",
  ],
  sameAs: [
    "https://www.sarvopaya.com/about",
    "https://www.sarvopaya.com/resources/founders-pov",
  ],
};

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.sarvopaya.com/#organization",
  name: "Sarvopaya",
  url: "https://www.sarvopaya.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.sarvopaya.com/images/Logo_black.png",
  },
  founder: {
    "@type": "Person",
    "@id": "https://www.sarvopaya.com/about#jay-solanki",
    name: "Jay Solanki",
  },
};
