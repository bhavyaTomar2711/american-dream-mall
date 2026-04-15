import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Bodoni_Moda, Playfair_Display, Fraunces, Raleway, Jura, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import InquiryProvider from "@/providers/InquiryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

// Hero poster — kept in sync with Hero.tsx. Rendered as a <link rel="preload">
// in the layout so the browser fetches it during HTML parsing (drops LCP).
const HERO_POSTER =
  "https://res.cloudinary.com/dwo1snivu/video/upload/so_0,f_auto,q_auto:good,w_1280/v1775988777/InShot_20260412_152744988_ocz9ev.jpg";

// Social share image — same source as HERO_POSTER but cropped to the OG
// standard 1200×630. Shown on Slack, LinkedIn, Twitter, iMessage previews, etc.
const OG_IMAGE =
  "https://res.cloudinary.com/dwo1snivu/video/upload/so_0,f_auto,q_auto:good,w_1200,h_630,c_fill,g_auto/v1775988777/InShot_20260412_152744988_ocz9ev.jpg";

const SITE_TITLE = "American Dream — The Platform";
const SITE_DESCRIPTION =
  "The western hemisphere's most immersive retail, entertainment, and event destination. Home to the world's leading brands.";

export const metadata: Metadata = {
  // Update to the live domain post-deploy so all relative URLs resolve
  // correctly on preview crawlers.
  metadataBase: new URL("https://american-dream.vercel.app"),
  title: {
    default: SITE_TITLE,
    template: "%s · American Dream",
  },
  description: SITE_DESCRIPTION,
  applicationName: "American Dream",
  keywords: [
    "American Dream Meadowlands",
    "Leasing",
    "Retail Flagship",
    "Luxury Wing",
    "Event Venue",
    "Arena",
    "Expo Hall",
    "Brand Activation",
    "Pop-up",
  ],
  authors: [{ name: "American Dream" }],
  creator: "American Dream",
  publisher: "American Dream",
  openGraph: {
    type: "website",
    siteName: "American Dream",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "American Dream — cinematic view of the property",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    // SVG favicon — scales crisp at every DPI
    icon: [
      {
        url: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776278785/American_Dream__Symbol_ldufrd.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "https://res.cloudinary.com/dwo1snivu/image/upload/f_png,w_180,h_180,c_pad,b_white/v1776278785/American_Dream__Symbol_ldufrd.svg",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${bodoni.variable} ${playfair.variable} ${fraunces.variable} ${raleway.variable} ${jura.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        {/* React 19 hoists this; ensures the hero LCP image starts downloading
            before the video element is hydrated. */}
        <link
          rel="preload"
          as="image"
          href={HERO_POSTER}
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#020612] text-white">
        <SmoothScrollProvider>
          <InquiryProvider>{children}</InquiryProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
