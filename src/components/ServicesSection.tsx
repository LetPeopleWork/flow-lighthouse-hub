import { GraduationCap, Users, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Training Programs",
      description: "Comprehensive Flow and Obeya training programs designed to transform your team's understanding and application of these methodologies.",
      features: [
        "Certified Flow practitioners",
        "Hands-on workshops", 
        "Custom curriculum",
        "Progress tracking"
      ],
      cta: "Explore Training"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Workshops & Events",
      description: "Interactive workshops and events that bring teams together to learn, practice, and master Flow and Obeya principles in real-world scenarios.",
      features: [
        "Interactive sessions",
        "Real-world scenarios",
        "Team building",
        "Expert facilitation"
      ],
      cta: "Book Workshop"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Expert Consulting",
      description: "Strategic consulting services to help organizations implement Flow and Obeya methodologies effectively and sustainably.",
      features: [
        "Strategic planning",
        "Implementation guidance",
        "Ongoing support",
        "Measurable results"
      ],
      cta: "Get Consultation"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Expert{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Know-How
            </span>{" "}
            & Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Beyond tools, we offer deep expertise in Flow and Obeya methodologies through 
            comprehensive training, workshops, and strategic consulting services.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-200 mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" className="w-full group">
                  {service.cta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expertise Highlight */}
        <div className="text-center bg-background/80 backdrop-blur-sm rounded-2xl p-12 border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Why Choose Our Expertise?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Professionals Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Organizations Transformed</div>
            </div>
          </div>

          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our deep expertise in Flow and Obeya methodologies, combined with proven training frameworks 
            and real-world implementation experience, ensures your team gets the most effective guidance.
          </p>

          <Button variant="hero" size="lg" className="group">
            Start Your Transformation
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;