import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroFlow from "@/assets/hero-flow.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroFlow} 
          alt="Flow visualization"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Unlock{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Flow, Obeya & Portfolio
            </span>{" "}
            Excellence with{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Tools & Expertise
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            We combine powerful tools like Lighthouse with deep expertise in Flow and Obeya methodologies. 
            Get the complete package: proven tools and the know-how to use them effectively.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="group">
              Explore Lighthouse
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" size="lg" className="group">
              <Play className="mr-2 group-hover:scale-110 transition-transform" />
              Our Services
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Professionals Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Open Source</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;