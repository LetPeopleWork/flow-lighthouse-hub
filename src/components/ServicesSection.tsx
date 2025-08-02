import { GraduationCap, Users, MessageSquare, ArrowRight, Mail, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Tool Support",
      description: "We help you customize Lighthouse to fit your specific organizational needs, ensuring you get the most value from your data.",
      audience: "If you need technical assistance",
      connection: "Don't see the numbers?"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Training",
      description: "Through custom trainings and workshops, we help your team understand and effectively use flow metrics to drive improvements.",
      audience: "If you want to become more data-driven",
      connection: "Don't understand the numbers?"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Consulting",
      description: "Our expert guidance helps you interpret your metrics and develop actionable strategies to achieve better flow and organizational performance.",
      audience: "If you want continuous guidance",
      connection: "Don't like the numbers?"
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
          {services.map((service) => (
            <Card key={service.title} className="group hover:shadow-medium transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm flex flex-col h-full">
              <CardHeader className="text-center pb-4 flex-shrink-0 h-96">
                <div className="mx-auto w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-200 mb-4">
                  {service.icon}
                </div>
                <div className="text-lg font-semibold text-primary mb-4 bg-primary/10 rounded-lg py-2 px-4 border border-primary/20 h-12 flex items-center justify-center">
                  {service.connection}
                </div>
                <CardDescription className="text-muted-foreground flex items-center justify-center flex-grow">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex flex-col justify-end flex-grow h-20">
                <div className="border-t border-border pt-4 flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    {service.audience}
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
            Contact us to discuss how we can help
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