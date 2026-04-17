import type { Metadata } from "next";

const VENUES_HUB_OG =
  "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto,w_1200,h_630,c_fill,g_auto/v1776191272/pexels-jibarofoto-18482996_ivrrqm.jpg";

export const metadata: Metadata = {
  title: "Venues",
  description:
    "Arena, performing arts, expo hall, and private-event venues at American Dream — with turnkey production and the audience already in the building.",
  openGraph: {
    title: "Venues — American Dream",
    description:
      "Arena, performing arts, expo hall, and private-event venues — with turnkey production and an audience of forty million already in the building.",
    url: "/venues",
    images: [{ url: VENUES_HUB_OG, width: 1200, height: 630, alt: "Venues at American Dream" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Venues — American Dream",
    images: [VENUES_HUB_OG],
  },
};

export default function VenuesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
