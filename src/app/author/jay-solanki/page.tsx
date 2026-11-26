import type { Metadata } from "next";
import AuthorProfileClient from "@/components/AuthorProfileClient";
import { blogPosts } from "@/lib/blogPosts";
import { founderPovs } from "@/lib/founderPovs";
import { AUTHOR_PERSON_SCHEMA, ORGANIZATION_SCHEMA } from "@/lib/authorSchema";

const AUTHOR_URL = "https://www.sarvopaya.com/author/jay-solanki";

export const metadata: Metadata = {
  title: {
    absolute: "Jay Solanki — Founder, Growth Architect & Author | Sarvopaya",
  },
  description:
    "Official author profile of Jay Solanki, Founder & Growth Architect at Sarvopaya. Explore his biography, D2C unit economics frameworks, conversion tracking audits, GEO playbooks, and full bibliography.",
  keywords: [
    "Jay Solanki",
    "Jay Solanki Sarvopaya",
    "D2C Growth Architect India",
    "Performance Marketing Strategist Ahmedabad",
    "D2C Unit Economics Author",
    "Generative Engine Optimization Expert",
  ],
  authors: [{ name: "Jay Solanki", url: AUTHOR_URL }],
  alternates: {
    canonical: AUTHOR_URL,
    languages: {
      en: AUTHOR_URL,
      "x-default": AUTHOR_URL,
    },
  },
  openGraph: {
    type: "profile",
    firstName: "Jay",
    lastName: "Solanki",
    username: "jaysolanki",
    title: "Jay Solanki — Founder, Growth Architect & Author | Sarvopaya",
    description:
      "Founder and Growth Architect at Sarvopaya. Author of operator-grade playbooks on D2C marketing strategy, conversion tracking audits, customer retention, and GEO.",
    url: AUTHOR_URL,
    siteName: "Sarvopaya",
    images: [
      {
        url: "https://www.sarvopaya.com/images/jay-solanki.png",
        width: 800,
        height: 800,
        alt: "Jay Solanki — Founder & Growth Architect at Sarvopaya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Solanki — Founder, Growth Architect & Author | Sarvopaya",
    description:
      "Founder & Growth Architect at Sarvopaya. Full biography, proprietary D2C growth frameworks, verified outcomes, and complete bibliography.",
    images: ["https://www.sarvopaya.com/images/jay-solanki.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function JaySolankiAuthorPage() {
  const jayArticles = [...blogPosts]
    .reverse()
    .filter((p) => p.author === "Jay Solanki")
    .map(({ slug, title, date, tag, readTime, excerpt }) => ({
      slug,
      title,
      date,
      tag,
      readTime,
      excerpt,
    }));

  const jayPovs = founderPovs
    .filter((p) => p.author === "Jay Solanki")
    .map(({ slug, title, date, tag, readTime, excerpt }) => ({
      slug,
      title,
      date,
      tag,
      readTime,
      excerpt,
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${AUTHOR_URL}#profilepage`,
        url: AUTHOR_URL,
        name: "Jay Solanki — Founder, Growth Architect & Author | Sarvopaya",
        description:
          "Official author page and bibliography for Jay Solanki, Founder & Growth Architect at Sarvopaya.",
        inLanguage: "en-US",
        dateCreated: "2022-01-01",
        dateModified: "2026-11-26",
        mainEntity: {
          "@id": `${AUTHOR_URL}#jay-solanki`,
        },
        breadcrumb: {
          "@id": `${AUTHOR_URL}#breadcrumb`,
        },
      },
      {
        ...AUTHOR_PERSON_SCHEMA,
        "@id": `${AUTHOR_URL}#jay-solanki`,
        url: AUTHOR_URL,
        email: "mailto:jay@sarvopaya.com",
        telephone: "+91-92655-03415",
        homeLocation: {
          "@type": "Place",
          name: "Ahmedabad, Gujarat, India",
        },
        nationality: "Indian",
      },
      ORGANIZATION_SCHEMA,
      {
        "@type": "BreadcrumbList",
        "@id": `${AUTHOR_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.sarvopaya.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Resources",
            item: "https://www.sarvopaya.com/resource/blogs",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Jay Solanki",
            item: AUTHOR_URL,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${AUTHOR_URL}#publications`,
        name: "Published Playbooks & Essays by Jay Solanki",
        numberOfItems: jayArticles.length + jayPovs.length,
        itemListElement: [
          ...jayArticles.map((post, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `https://www.sarvopaya.com/${post.slug}`,
            name: post.title,
          })),
          ...jayPovs.map((pov, idx) => ({
            "@type": "ListItem",
            position: jayArticles.length + idx + 1,
            url: `https://www.sarvopaya.com/resources/founders-pov/${pov.slug}`,
            name: pov.title,
          })),
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is Jay Solanki?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Jay Solanki is the Founder and Growth Architect of Sarvopaya, a creative media, performance marketing, SEO/GEO, and AI automation agency headquartered in Ahmedabad, India. Since 2022, he has helped scale 50+ D2C, ecommerce, B2B, and SaaS brands across 8 global markets.",
            },
          },
          {
            "@type": "Question",
            name: "What topics does Jay Solanki write and advise on?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Jay writes technical playbooks on D2C marketing strategy, contribution margin unit economics (CM1, CM2, CM3), Meta Pixel and server-side Conversion Tracking Audits, Customer Acquisition Cost (CAC) compression, customer retention, and Answer Engine / Generative Engine Optimization (AEO & GEO).",
            },
          },
          {
            "@type": "Question",
            name: "How are Jay Solanki's articles researched and fact-checked?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Every guide published under Jay Solanki's byline is grounded in first-party account diagnostics, live Meta and Google Ads benchmarks, real server-side tracking implementations, and verified ecommerce financial models.",
            },
          },
          {
            "@type": "Question",
            name: "How can founders, podcasts, or publications reach Jay Solanki?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Founders seeking a 30-minute growth diagnostic can book directly via https://cal.com/jaysolanki/30min or email jay@sarvopaya.com for advisory, podcast, or editorial inquiries.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AuthorProfileClient articles={jayArticles} povs={jayPovs} />
    </>
  );
}
