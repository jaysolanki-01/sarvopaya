"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const sections = [
  { id: "introduction", title: "1. Introduction & Overview" },
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "how-we-use-information", title: "3. How We Use Information" },
  { id: "legal-bases", title: "4. Legal Grounds for Processing" },
  { id: "ai-data-security", title: "5. AI Automation & Workflow Data" },
  { id: "third-party-services", title: "6. Sub-processors & Third Parties" },
  { id: "cookies-tracking", title: "7. Cookies & Analytics" },
  { id: "international-transfers", title: "8. International Data Transfers" },
  { id: "data-retention-security", title: "9. Data Retention & Safeguards" },
  { id: "your-rights", title: "10. Your Rights (GDPR, CCPA, DPDPA)" },
  { id: "children-privacy", title: "11. Children's Privacy" },
  { id: "policy-updates", title: "12. Updates to This Policy" },
  { id: "grievance-contact", title: "13. Contact & Grievance Officer" },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [readProgress, setReadProgress] = useState<number>(0);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate reading progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setReadProgress(currentProgress);
      }

      // Track active section
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
      window.history.pushState(null, "", `#${id}`);
      setMobileTocOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.sarvopaya.com/privacy-policy",
        url: "https://www.sarvopaya.com/privacy-policy",
        name: "Privacy Policy | Sarvopaya",
        description:
          "Privacy Policy governing personal data collection, processing, and protection by Sarvopaya.",
        dateModified: "2026-10-01",
        publisher: {
          "@type": "Organization",
          name: "Sarvopaya",
          url: "https://www.sarvopaya.com",
          logo: "https://www.sarvopaya.com/images/Main_icon.png",
        },
      },
      {
        "@type": "BreadcrumbList",
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
            name: "Privacy Policy",
            item: "https://www.sarvopaya.com/privacy-policy",
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

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white pb-14 pt-32 sm:pb-18 sm:pt-36">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 select-none font-black uppercase leading-none text-black/[0.03]"
          style={{ fontSize: "clamp(80px,16vw,220px)" }}
        >
          PRIVACY
        </span>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-black/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Legal & Transparency
            </span>

            <h1 className="font-heading text-4xl font-black tracking-tight text-black sm:text-5xl lg:text-6xl">
              Privacy <span className="text-[var(--accent)]">Policy</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/60 sm:text-lg">
              At Sarvopaya, we take your trust, data security, and confidentiality seriously.
              This document clearly sets out how we collect, handle, protect, and respect your
              personal information.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-black/40">
              <span>Last updated: October 1, 2026</span>
              <span>·</span>
              <span>Effective date: January 1, 2026</span>
              <span>·</span>
              <span>Version: 2.1</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative bg-white pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mobile Table of Contents Accordion */}
          <div className="mb-8 block lg:hidden">
            <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
              <button
                type="button"
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="flex w-full items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span className="font-heading text-sm font-bold text-black">Table of Contents</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-black/40">{readProgress}% read</span>
                  <span className="text-sm font-bold text-black/60">{mobileTocOpen ? "−" : "+"}</span>
                </div>
              </button>

              {mobileTocOpen && (
                <nav className="mt-3 flex flex-col space-y-1 border-t border-black/8 pt-3">
                  {sections.map((s) => {
                    const isActive = activeSection === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={(e) => scrollTo(s.id, e)}
                        className={`text-left rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-black text-white font-bold"
                            : "text-black/65 hover:bg-black/5 hover:text-black"
                        }`}
                      >
                        {s.title}
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Main Policy Body on Left (8 cols) */}
            <main className="prose prose-neutral max-w-none text-black/75 lg:col-span-8">
              {/* Highlight summary card */}
              <div className="mb-12 rounded-3xl border border-black/8 bg-black/[0.02] p-6 sm:p-8">
                <h3 className="font-heading text-lg font-bold text-black">
                  Key Privacy Principles at a Glance
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-black/70">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span><strong>We never sell your data:</strong> We do not broker, rent, or trade your personal details to data brokers or third parties.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span><strong>AI Automation Confidentiality:</strong> Client workflow information processed via automation pipelines (such as n8n or LLMs) is never used to train public generative AI foundation models.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span><strong>Global Standards:</strong> We observe the provisions of GDPR (EU & UK), Indian DPDPA 2023, CCPA/CPRA, and UAE/GCC data privacy frameworks.</span>
                  </li>
                </ul>
              </div>

              {/* 1. Introduction & Overview */}
              <section id="introduction" className="scroll-mt-28 border-b border-black/8 pb-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  1. Introduction & Overview
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  Sarvopaya (&ldquo;Sarvopaya&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website{" "}
                  <Link href="/" className="font-medium text-black underline underline-offset-2 hover:text-[var(--accent)]">
                    https://www.sarvopaya.com
                  </Link>{" "}
                  and delivers growth marketing, creative media, performance advertising, SEO, website development,
                  and AI workflow automation solutions.
                </p>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  This Privacy Policy describes our practices regarding the collection, use, disclosure, and protection
                  of information that identifies or relates to an individual (&ldquo;Personal Data&rdquo;) when you interact with our
                  website, engage our agency services, submit inquiries, or schedule strategy consultations.
                </p>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  <strong>Data Controller:</strong> Sarvopaya is the data controller responsible for personal information
                  collected via this website. When providing AI automation or marketing execution on behalf of our enterprise clients,
                  Sarvopaya typically acts as a <em>Data Processor</em> under contract, with the client acting as the Data Controller.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section id="information-we-collect" className="scroll-mt-28 border-b border-black/8 py-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  2. Information We Collect
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  We collect information across several interaction touchpoints:
                </p>

                <div className="mt-6 space-y-6">
                  <div className="rounded-2xl border border-black/6 bg-black/[0.015] p-5">
                    <h4 className="font-heading text-base font-bold text-black">A. Information You Voluntarily Provide</h4>
                    <ul className="mt-2 space-y-1.5 text-sm text-black/70">
                      <li>• <strong>Inquiry and Contact Forms:</strong> Your name, business email address, phone number, company name, service requirements, and project notes.</li>
                      <li>• <strong>Meeting Scheduling:</strong> Contact information, time zone, and briefing details submitted when scheduling a call via Cal.com or similar appointment tools.</li>
                      <li>• <strong>Client Onboarding:</strong> Billing information, company registration details, VAT/GST numbers, and designated team member contact details.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-black/6 bg-black/[0.015] p-5">
                    <h4 className="font-heading text-base font-bold text-black">B. Automatically Collected Technical Data</h4>
                    <ul className="mt-2 space-y-1.5 text-sm text-black/70">
                      <li>• <strong>Device & Browser Data:</strong> IP address (anonymized where required), browser type and version, language settings, operating system, and screen resolution.</li>
                      <li>• <strong>Usage Metrics:</strong> Pages visited, time spent per page, click paths, referring URLs, and interaction patterns tracked via Google Analytics 4 (GA4).</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-black/6 bg-black/[0.015] p-5">
                    <h4 className="font-heading text-base font-bold text-black">C. Client Operational & Systems Data</h4>
                    <p className="mt-2 text-sm text-black/70">
                      When implementing AI automation (e.g. n8n workflows, CRM synchronization, webhook integrations), clients
                      may provide restricted API access credentials, CRM field mappings, or workflow parameters. All such data is
                      governed by non-disclosure agreements (NDAs) and strict least-privilege access rules.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. How We Use Information */}
              <section id="how-we-use-information" className="scroll-mt-28 border-b border-black/8 py-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  3. How We Use Your Information
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  We process personal information for the following specific and legitimate purposes:
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-black/70">
                  <li>• <strong>Responding to Inquiries:</strong> Reviewing project requests, preparing proposals, and conducting strategy discovery calls.</li>
                  <li>• <strong>Delivering Agency Engagements:</strong> Planning ad campaigns, configuring web platforms, setting up n8n automations, running SEO audits, and issuing performance reports.</li>
                  <li>• <strong>Client Communications:</strong> Sending service updates, project milestone notifications, billing invoices, and critical administrative notices.</li>
                  <li>• <strong>Site Performance & Security:</strong> Monitoring website health, optimizing Core Web Vitals, preventing malicious traffic, and preventing spam submissions.</li>
                  <li>• <strong>Regulatory Compliance:</strong> Complying with applicable tax, financial accounting, and legal requirements.</li>
                </ul>
              </section>

              {/* 4. Legal Grounds */}
              <section id="legal-bases" className="scroll-mt-28 border-b border-black/8 py-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  4. Legal Grounds for Processing (GDPR & Global Frameworks)
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  Under the European Union & UK General Data Protection Regulation (GDPR) and similar frameworks, we rely on the following lawful bases:
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-black/8 p-5">
                    <p className="font-heading text-sm font-bold text-black">Consent</p>
                    <p className="mt-1 text-xs leading-relaxed text-black/60">
                      When you submit our contact form, accept analytical cookies via our cookie consent banner, or opt into direct marketing communications.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-black/8 p-5">
                    <p className="font-heading text-sm font-bold text-black">Contractual Necessity</p>
                    <p className="mt-1 text-xs leading-relaxed text-black/60">
                      To take steps at your request prior to entering into a contract, or to execute and deliver our agreed services under client contracts.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-black/8 p-5">
                    <p className="font-heading text-sm font-bold text-black">Legitimate Interests</p>
                    <p className="mt-1 text-xs leading-relaxed text-black/60">
                      To run and protect our business, conduct business-to-business communications, and improve our services without overriding your fundamental rights.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-black/8 p-5">
                    <p className="font-heading text-sm font-bold text-black">Legal Obligation</p>
                    <p className="mt-1 text-xs leading-relaxed text-black/60">
                      Where compliance with statutory mandates, tax filings, or court orders requires retention of specific transactional records.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. AI Data Security */}
              <section id="ai-data-security" className="scroll-mt-28 border-b border-black/8 py-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  5. AI Automation & Workflow Data Processing
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  Because Sarvopaya builds advanced AI workflow automation (leveraging n8n, Make, and commercial LLM APIs including OpenAI, Anthropic, and Google Gemini), we uphold explicit AI privacy guarantees:
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex gap-3.5 rounded-2xl border border-black/8 bg-black/[0.015] p-5">
                    <span className="font-heading text-lg font-bold text-[var(--accent)]">01</span>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-black">Zero Training on Client Data</h4>
                      <p className="mt-1 text-xs leading-relaxed text-black/60">
                        When using commercial foundation model APIs (e.g. OpenAI Enterprise API, Claude API, or Gemini API), data submitted via API is <strong>not</strong> used to train or fine-tune public models, in strict alignment with provider enterprise terms.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 rounded-2xl border border-black/8 bg-black/[0.015] p-5">
                    <span className="font-heading text-lg font-bold text-[var(--accent)]">02</span>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-black">Private, Isolated Environments</h4>
                      <p className="mt-1 text-xs leading-relaxed text-black/60">
                        Workflows deployed in self-hosted n8n instances run within dedicated, containerized environments. API keys and credentials are encrypted using AES-256 standard encryption at rest.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 rounded-2xl border border-black/8 bg-black/[0.015] p-5">
                    <span className="font-heading text-lg font-bold text-[var(--accent)]">03</span>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-black">Data Minimization</h4>
                      <p className="mt-1 text-xs leading-relaxed text-black/60">
                        We design automated pipelines to pass only the minimum parameters necessary to accomplish the target task (e.g. lead routing or report synthesis), avoiding unnecessary transmission of sensitive personal details.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 6. Sub-processors & Third Parties */}
              <section id="third-party-services" className="scroll-mt-28 border-b border-black/8 py-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  6. Sub-processors & Third-Party Service Providers
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  We utilize carefully vetted third-party vendors to support our business operations. Each provider operates under strict confidentiality obligations:
                </p>
                <div className="mt-6 overflow-hidden rounded-2xl border border-black/8">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-black/8 bg-black/[0.03]">
                      <tr>
                        <th className="px-4 py-3 font-bold text-black">Provider</th>
                        <th className="px-4 py-3 font-bold text-black">Purpose</th>
                        <th className="px-4 py-3 font-bold text-black">Jurisdiction</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/8">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-black">Brevo (Sendinblue)</td>
                        <td className="px-4 py-3 text-black/60">Contact form data processing & email communications</td>
                        <td className="px-4 py-3 text-black/60">EU (France / GDPR-compliant)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-black">Google Analytics / GTM</td>
                        <td className="px-4 py-3 text-black/60">Aggregated site performance and interaction analytics</td>
                        <td className="px-4 py-3 text-black/60">USA / EU (Google Cloud)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-black">Meta Platforms (Pixel)</td>
                        <td className="px-4 py-3 text-black/60">Campaign measurement and conversion verification</td>
                        <td className="px-4 py-3 text-black/60">USA / Global</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-black">Cal.com</td>
                        <td className="px-4 py-3 text-black/60">Strategy consultation scheduling</td>
                        <td className="px-4 py-3 text-black/60">USA / EU</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-black">Cloud Hosting Infrastructure</td>
                        <td className="px-4 py-3 text-black/60">Secure web serving and application hosting</td>
                        <td className="px-4 py-3 text-black/60">Global Cloud Providers</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 7. Cookies & Tracking */}
              <section id="cookies-tracking" className="scroll-mt-28 border-b border-black/8 py-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  7. Cookies & Tracking Technologies
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  Cookies are small text files stored on your device when you browse websites. We use cookies for:
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-black/70">
                  <li>• <strong>Essential Cookies:</strong> Required for the proper functioning and security of the website (e.g. remembering your cookie preferences).</li>
                  <li>• <strong>Analytics Cookies:</strong> Enable us to understand user engagement, bounce rates, and traffic sources so we can improve content.</li>
                  <li>• <strong>Marketing Cookies:</strong> Used to assess the effectiveness of our advertising campaigns across Google and Meta networks.</li>
                </ul>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  You can modify your cookie choices at any time via your browser settings, or by clicking the &ldquo;Decline&rdquo; option in our cookie banner.
                </p>
              </section>

              {/* 8. International Data Transfers */}
              <section id="international-transfers" className="scroll-mt-28 border-b border-black/8 py-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  8. International Data Transfers
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  Sarvopaya is headquartered in Ahmedabad, India, and serves clients across the United States,
                  United Kingdom, United Arab Emirates, Saudi Arabia, Australia, Canada, and Singapore.
                </p>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  When transferring Personal Data outside of your country of residence (such as transferring EEA or UK personal data to India or cloud facilities in the US), we ensure appropriate safeguards are implemented, including:
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-black/70">
                  <li>• Standard Contractual Clauses (SCCs) approved by the European Commission and UK International Data Transfer Agreements (IDTAs).</li>
                  <li>• Encryption of data in transit (TLS 1.3) and at rest (AES-256).</li>
                  <li>• Strict confidentiality agreements binding all internal team members and technical contractors.</li>
                </ul>
              </section>

              {/* 9. Data Retention & Safeguards */}
              <section id="data-retention-security" className="scroll-mt-28 border-b border-black/8 py-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  9. Data Retention & Security Safeguards
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  We retain personal data only for as long as necessary to fulfill the purposes for which it was gathered, including satisfying legal, accounting, tax, or reporting requirements. General sales inquiry records are typically retained for 24 months from the last contact before scheduled deletion or anonymization.
                </p>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  Our security safeguards include firewalls, role-based access restrictions (RBAC), multi-factor authentication (MFA) across all administrative accounts, periodic security reviews, and strict tokenized API management.
                </p>
              </section>

              {/* 10. Your Rights */}
              <section id="your-rights" className="scroll-mt-28 border-b border-black/8 py-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  10. Your Privacy Rights
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  Depending on your jurisdiction (such as the EU, UK, California, India, or Canada), you enjoy specific statutory data rights:
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-black/8 p-5">
                    <p className="font-heading text-sm font-bold text-black">Right of Access</p>
                    <p className="mt-1 text-xs text-black/60">Request confirmation of whether we hold your personal data and obtain a copy.</p>
                  </div>
                  <div className="rounded-2xl border border-black/8 p-5">
                    <p className="font-heading text-sm font-bold text-black">Right to Rectification</p>
                    <p className="mt-1 text-xs text-black/60">Request correction of inaccurate or incomplete personal records.</p>
                  </div>
                  <div className="rounded-2xl border border-black/8 p-5">
                    <p className="font-heading text-sm font-bold text-black">Right to Erasure (&ldquo;Right to be Forgotten&rdquo;)</p>
                    <p className="mt-1 text-xs text-black/60">Request deletion of your data when retention is no longer justified by law.</p>
                  </div>
                  <div className="rounded-2xl border border-black/8 p-5">
                    <p className="font-heading text-sm font-bold text-black">Right to Object & Restrict</p>
                    <p className="mt-1 text-xs text-black/60">Object to direct marketing or request temporary restriction of processing.</p>
                  </div>
                  <div className="rounded-2xl border border-black/8 p-5">
                    <p className="font-heading text-sm font-bold text-black">Data Portability</p>
                    <p className="mt-1 text-xs text-black/60">Receive your data in a structured, commonly used, machine-readable format.</p>
                  </div>
                  <div className="rounded-2xl border border-black/8 p-5">
                    <p className="font-heading text-sm font-bold text-black">Withdraw Consent</p>
                    <p className="mt-1 text-xs text-black/60">Withdraw previously granted consent at any time without impacting prior lawful processing.</p>
                  </div>
                </div>

                <p className="mt-6 text-sm text-black/70">
                  To exercise any of these rights, please email us at{" "}
                  <a href="mailto:jay.sarvopaya@gmail.com" className="font-bold text-[var(--accent)] underline underline-offset-2">
                    jay.sarvopaya@gmail.com
                  </a>
                  . We will respond within 30 days (or within timelines mandated by your local law).
                </p>
              </section>

              {/* 11. Children's Privacy */}
              <section id="children-privacy" className="scroll-mt-28 border-b border-black/8 py-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  11. Children&rsquo;s Privacy
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  Our services and website are intended exclusively for commercial entities and individuals aged 18 and older. We do not knowingly collect personal information from minors. If you believe a child has provided us with personal information, please contact us immediately so we can remove it.
                </p>
              </section>

              {/* 12. Policy Updates */}
              <section id="policy-updates" className="scroll-mt-28 border-b border-black/8 py-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  12. Updates to This Policy
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  We may periodically revise this Privacy Policy to reflect changes in our service offerings, technical architecture, or evolving international legal frameworks. We will update the &ldquo;Last updated&rdquo; date at the top of this page upon making any revisions. Continued use of our site following updates indicates acknowledgment of the revised terms.
                </p>
              </section>

              {/* 13. Contact & Grievance */}
              <section id="grievance-contact" className="scroll-mt-28 py-12">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  13. Contact & Grievance Officer
                </h2>
                <p className="mt-4 text-base leading-relaxed text-black/70">
                  In compliance with the Information Technology Act, 2000, and the Digital Personal Data Protection Act (DPDPA), 2023, the details of our Grievance Officer and Data Protection Contact are provided below:
                </p>

                <div className="mt-6 rounded-3xl border border-black/8 bg-black/[0.02] p-6 sm:p-8">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-black/40">Grievance & Privacy Officer</p>
                      <p className="mt-1 font-heading text-lg font-bold text-black">Jay Solanki</p>
                      <p className="text-xs text-black/50">Founder, Sarvopaya</p>

                      <p className="mt-4 text-xs font-bold uppercase tracking-widest text-black/40">Email</p>
                      <a
                        href="mailto:jay.sarvopaya@gmail.com"
                        className="mt-1 block text-sm font-semibold text-[var(--accent)] underline underline-offset-2"
                      >
                        jay.sarvopaya@gmail.com
                      </a>

                      <p className="mt-4 text-xs font-bold uppercase tracking-widest text-black/40">Telephone</p>
                      <a
                        href="tel:+919265503415"
                        className="mt-1 block text-sm font-semibold text-black hover:text-[var(--accent)]"
                      >
                        +91-92655-03415
                      </a>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-black/40">Corporate Address</p>
                      <address className="mt-1 not-italic text-sm leading-relaxed text-black/70">
                        <strong>Sarvopaya</strong><br />
                        C-1102, PNTC,<br />
                        Times Of India Press Road, Vejalpur,<br />
                        Ahmedabad, Gujarat 380015,<br />
                        India
                      </address>

                      <div className="mt-6">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-xs font-bold text-white transition-colors duration-300 hover:bg-[var(--accent)]"
                        >
                          Send an Inquiry Online →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            {/* Sticky Table of Contents on Right Side for Desktop (4 cols) */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28 flex flex-col rounded-3xl border border-black/8 bg-black/[0.02] p-6 shadow-sm">
                {/* Header & Progress */}
                <div className="border-b border-black/8 pb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-widest text-black/40">
                      Table of Contents
                    </p>
                    <span className="text-[11px] font-bold text-[var(--accent)]">
                      {readProgress}% read
                    </span>
                  </div>
                  {/* Progress bar line */}
                  <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-black/10">
                    <div
                      className="h-full bg-[var(--accent)] transition-all duration-150 ease-out"
                      style={{ width: `${readProgress}%` }}
                    />
                  </div>
                </div>

                {/* Section links with custom slim scrollbar */}
                <nav className="mt-4 flex max-h-[calc(100vh-18rem)] flex-col space-y-1 overflow-y-auto pr-1">
                  {sections.map((s) => {
                    const isActive = activeSection === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={(e) => scrollTo(s.id, e)}
                        className={`group flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-all duration-200 ${
                          isActive
                            ? "bg-black text-white font-bold shadow-sm"
                            : "text-black/60 hover:bg-black/5 hover:text-black font-medium"
                        }`}
                      >
                        <span className="truncate pr-2">{s.title}</span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                          />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Actions: Back to top & Support */}
                <div className="mt-6 border-t border-black/8 pt-4 space-y-3">
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-black/10 py-2 text-xs font-semibold text-black/60 hover:border-black/25 hover:text-black transition-colors"
                  >
                    <span>↑</span>
                    <span>Back to Top</span>
                  </button>

                  <div className="rounded-xl bg-white p-3 border border-black/6">
                    <p className="text-[11px] font-bold text-black">Data Protection Contact</p>
                    <p className="mt-0.5 text-[11px] text-black/50">
                      Grievance Officer:{" "}
                      <a
                        href="mailto:jay.sarvopaya@gmail.com"
                        className="font-medium text-[var(--accent)] underline underline-offset-2"
                      >
                        jay.sarvopaya@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
