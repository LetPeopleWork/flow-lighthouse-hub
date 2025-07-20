import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import LighthouseSection from "@/components/LighthouseSection";
import ServicesSection from "@/components/ServicesSection";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <LighthouseSection />
      <ServicesSection />
      <EventsSection />
      <Footer />
    </div>
  );
};

export default Index;
