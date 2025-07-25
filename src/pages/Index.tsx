import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import LighthouseSection from "@/components/LighthouseSection";
import ServicesSection from "@/components/ServicesSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import EventsSection from "@/components/EventsSection";
import StayConnected from "@/components/StayConnected";
import SimpleFooter from "@/components/SimpleFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <LighthouseSection />
      <ServicesSection />
      <ExpertiseSection />
      <EventsSection />
      <StayConnected />
      <SimpleFooter />
    </div>
  );
};

export default Index;
