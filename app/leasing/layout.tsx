import type { Metadata } from "next";
import LeasingNav from "@/components/leasing/LeasingNav";

const LEASING_HUB_OG =
  "https://res.cloudinary.com/dwo1snivu/image/upload/f_auto,q_auto,w_1200,h_630,c_fill,g_auto/v1776272292/Luxury_hero___202604152227_vta9sw.jpg";

export const metadata: Metadata = {
  title: "Leasing",
  description:
    "Four commercial paths — luxury, retail, dining, and pop-up — each tailored to the brands that lease inside American Dream.",
  openGraph: {
    title: "Leasing — American Dream",
    description:
      "Four commercial paths — luxury, retail, dining, and pop-up — each tailored to the brands that lease inside American Dream.",
    url: "/leasing",
    images: [{ url: LEASING_HUB_OG, width: 1200, height: 630, alt: "Leasing paths at American Dream" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leasing — American Dream",
    images: [LEASING_HUB_OG],
  },
};

export default function LeasingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050510",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <LeasingNav />
      {children}
    </div>
  );
}
