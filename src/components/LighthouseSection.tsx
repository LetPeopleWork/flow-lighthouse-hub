import { ArrowRight, BarChart3, Zap, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import lighthouseDashboard from "@/assets/lighthouse-dashboard.jpg";

const LighthouseSection = () => {
  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Flow Metrics",
      description: "Real-time insights into your team's flow state with comprehensive analytics and reporting."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Feedback",
      description: "Get immediate alerts when flow is disrupted, enabling quick intervention and optimization."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Insights",
      description: "Understand team dynamics and collaboration patterns to improve collective performance."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Goal Tracking",
      description: "Track progress towards flow objectives with clear milestones and success metrics."
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
    }
  ];

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
            The definitive Flow tool that provides deep insights into your team's productivity, 
            helping you identify, measure, and optimize flow states for peak performance.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Screenshot */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-primary rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <img 
                src={lighthouseDashboard} 
                alt="Lighthouse Dashboard"
                className="relative rounded-lg shadow-medium hover:shadow-glow transition-all duration-300"
              />
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

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-12">
            Trusted by Flow Leaders
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                <CardContent className="p-8">
                  <blockquote className="text-lg text-muted-foreground mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-12 border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Transform Your Team's Flow?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Lighthouse to optimize their workflow and achieve peak productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LighthouseSection;