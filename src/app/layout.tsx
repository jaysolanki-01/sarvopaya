import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const siteUrl = "https://sarvopaya.com";
const siteName = "Sarvopaya";
const siteDescription =
  "Sarvopaya is a creative media, technology and AI company helping ambitious brands grow through lead generation, website and digital experience design, AI automation, and growth consulting.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sarvopaya Your Partner For SARV Digital UPAYA",
    template: "%s | Sarvopaya",
  },
  description: siteDescription,
  keywords: [
    "Sarvopaya",
    "lead generation",
    "growth marketing",
    "website design",
    "AI automation",
    "growth consulting",
    "digital marketing agency India",
  ],
  authors: [{ name: "Sarvopaya" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "Sarvopaya Your Partner For SARV Digital UPAYA",
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/images/Main_icon.png",
        width: 500,
        height: 500,
        alt: "Sarvopaya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarvopaya Your Partner For SARV Digital UPAYA",
    description: siteDescription,
    images: ["/images/Main_icon.png"],
  },
  icons: {
    icon: "/images/icon_mark.png",
    shortcut: "/images/icon_mark.png",
    apple: "/images/icon_mark.png",
  },
  verification: {
    google: "2SYm5cFKe3bzUEdnyfyVHLcC2kbqsYrRm4luQ41GMJc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  alternateName: "SARV Digital UPAYA",
  url: siteUrl,
  logo: `${siteUrl}/images/Main_icon.png`,
  description: siteDescription,
  email: "jay.sarvopaya@gmail.com",
  telephone: "+91-92655-03415",
  address: {
    "@type": "PostalAddress",
    streetAddress: "C-1102, PNTC, Times Of India Press Road, Vejalpur",
    addressLocality: "Ahmedabad",
    postalCode: "380015",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "jay.sarvopaya@gmail.com",
      telephone: "+91-92655-03415",
      areaServed: "IN",
      availableLanguage: ["en"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/sarvopaya/",
    "https://www.instagram.com/sarvopaya/",
    "https://www.facebook.com/profile.php?id=61590305765567",
    "https://www.reddit.com/user/sarvopaya/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=satoshi@400,500,700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <div className="relative z-10 bg-background">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
