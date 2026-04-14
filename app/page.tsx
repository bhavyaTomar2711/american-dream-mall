import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyProperty from "@/components/WhyProperty";
import StorySlides from "@/components/StorySlides";
import LuxurySection from "@/components/LuxurySection";
import BrandMarquee from "@/components/BrandMarquee";
import ExperienceGrid from "@/components/ExperienceGrid";
import DiningSection from "@/components/DiningSection";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StorySlides />
      <WhyProperty />
      <LuxurySection />
      <ExperienceGrid />
      <BrandMarquee />
      <DiningSection />
      <EventsSection />
      <Footer />
    </main>
  );
}
