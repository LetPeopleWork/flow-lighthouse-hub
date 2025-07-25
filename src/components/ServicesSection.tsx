import { GraduationCap, Users, MessageSquare, ArrowRight, Mail, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Workshops & Trainings",
      description: "Comprehensive Flow and Obeya training programs for teams and organizations ready to transform their way of working.",
      features: [
        "Public workshops for individuals",
        "Private trainings for teams", 
        "Custom curriculum design",
        "Hands-on practical sessions"
      ],
      audience: "For teams wanting to learn and improve",
      connection: "Don't understand what you see in the data?"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Consulting",
      description: "Strategic consulting to transform your organization's approach to Flow and Obeya, from assessment to full implementation.",
      features: [
        "Organizational assessment",
        "Implementation strategy",
        "Change management support",
        "Long-term transformation guidance"
      ],
      audience: "For organizations ready for change",
      connection: "Don't like what you see in your metrics?"
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Tool Support",
      description: "Technical support and customization for Lighthouse and other Flow tools to fit your specific organizational needs.",
      features: [
        "Custom dashboard setup",
        "Integration with existing tools",
        "Advanced configuration",
        "Technical troubleshooting"
      ],
      audience: "For teams needing technical assistance",
      connection: "Don't see any meaningful numbers?"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Our{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Expertise
            </span>{" "}
            & Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive support from tool implementation to organizational transformation. 
            We bring both the technology and the know-how to make it work for you.
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
                <div className="text-sm text-primary font-medium border border-primary/20 rounded-lg p-3 bg-primary/5">
                  {service.audience}
                </div>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground italic">
                    {service.connection}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Get Started CTA */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-12 border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us to discuss how we can help you transform your team's approach to Flow and Obeya.
          </p>
          <Button variant="hero" size="lg" className="group" asChild>
            <a href="mailto:contact@letpeople.work">
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;