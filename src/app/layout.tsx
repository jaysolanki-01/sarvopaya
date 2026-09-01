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

        {/* WhatsApp floating button */}
        <a
          href="https://wa.me/919265503415"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
          style={{ background: "#25D366" }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.118 1.528 5.845L.057 23.43a.75.75 0 0 0 .924.924l5.594-1.474A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 0 1-4.964-1.357l-.355-.213-3.685.97.986-3.595-.232-.37A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
