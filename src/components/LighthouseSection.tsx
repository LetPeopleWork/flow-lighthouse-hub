import { ArrowRight, BarChart3, Zap, Users, Target, TrendingUp, FileText, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import lighthouseDashboard from "@/assets/lighthouse-dashboard.jpg";

const LighthouseSection = () => {
  const [currentMedia, setCurrentMedia] = useState(0);
  
  const mediaItems = [
    {
      type: "image",
      src: lighthouseDashboard,
      alt: "Lighthouse Dashboard"
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      alt: "Demo Video"
    }
  ];

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Flow Metrics",
      description: "Real-time insights into your team's flow state at team and portfolio level."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Show Impact of Too Much Work",
      description: "Visualize how workload affects delivery times and team performance."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Forecast Delivery Dates",
      description: "Predict delivery dates in seconds based on real team performance data."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Actionable Insights",
      description: "Get data-driven recommendations to drive continuous improvement."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team & Portfolio Level",
      description: "Track flow from individual teams up to complete portfolio transparency."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Free & Open Source",
      description: "No vendor lock-in. Full transparency and community-driven development."
    }
  ];

  const testimonials = [
    {
      quote: "Lighthouse transformed how we understand and optimize our team's workflow. The insights are invaluable.",
      author: "Sarah Johnson",
      role: "Engineering Manager",
      company: "TechCorp"
    },
    {
      quote: "The real-time flow metrics helped us identify bottlenecks we never knew existed. Productivity up 40%.",
      author: "Michael Chen",
      role: "Product Director", 
      company: "InnovateLab"
    },
    {
      quote: "Finally, data-driven decisions instead of gut feelings. Our forecasting accuracy improved dramatically.",
      author: "Emma Rodriguez",
      role: "Agile Coach",
      company: "FlowTech Solutions"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="lighthouse" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Meet{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Lighthouse
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Make flow transparent on team and portfolio level. Get data-driven insights instead of gut feelings. 
            Forecast delivery dates in seconds based on real team performance and drive actionable improvements.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Media Carousel */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-primary rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              
              {mediaItems[currentMedia].type === "image" ? (
                <img 
                  src={mediaItems[currentMedia].src} 
                  alt={mediaItems[currentMedia].alt}
                  className="relative rounded-lg shadow-medium hover:shadow-glow transition-all duration-300 w-full"
                />
              ) : (
                <div className="relative rounded-lg overflow-hidden shadow-medium hover:shadow-glow transition-all duration-300">
                  <iframe
                    src={mediaItems[currentMedia].src}
                    className="w-full aspect-video"
                    title={mediaItems[currentMedia].alt}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              
              {/* Navigation buttons */}
              <button
                onClick={() => setCurrentMedia((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-primary" />
              </button>
              <button
                onClick={() => setCurrentMedia((prev) => (prev + 1) % mediaItems.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-primary" />
              </button>
              
              {/* Media type indicator */}
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-primary">
                {mediaItems[currentMedia].type === "video" ? <PlayCircle className="h-4 w-4" /> : "📷"} 
                {currentMedia + 1}/{mediaItems.length}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="order-1 lg:order-2 space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Everything you need to master Flow
            </h3>
            
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-6">
              <Button variant="premium" size="lg" className="group">
                Download Lighthouse
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tool Numbers */}
        <div className="mb-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">Lighthouse by the Numbers</h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground text-sm">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">250+</div>
              <div className="text-muted-foreground text-sm">Teams Using It</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">0€</div>
              <div className="text-muted-foreground text-sm">Cost</div>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-12">
            Trusted by Flow Leaders
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-8">
                <blockquote className="text-lg text-muted-foreground mb-6 italic text-center">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="text-center">
                  <div className="font-semibold text-foreground">{testimonials[currentTestimonial].author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial navigation */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-12 border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Download and Get Started
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Lighthouse is free and open source. Start improving your team's flow today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="group">
              Download Lighthouse
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://docs.lighthouse.letpeople.work" target="_blank" rel="noopener noreferrer">
                View Documentation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LighthouseSection;