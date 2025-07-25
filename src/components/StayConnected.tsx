import { MessageSquare, Linkedin, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const StayConnected = () => {
  const connections = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Slack Community",
      description: "Join our vibrant community for discussions, questions, and direct access to our experts and other practitioners.",
      benefits: [
        "Ask questions directly to experts",
        "Share experiences with peers",
        "Get real-time support",
        "Access to exclusive content"
      ],
      cta: "Join Slack",
      link: "#"
    },
    {
      icon: <Linkedin className="h-8 w-8" />,
      title: "LinkedIn",
      description: "Follow us for industry insights, case studies, and updates on Flow and Obeya methodologies.",
      benefits: [
        "Industry insights and trends",
        "Case studies and success stories",
        "Professional networking",
        "Event announcements"
      ],
      cta: "Follow on LinkedIn",
      link: "#"
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Newsletter",
      description: "Get monthly insights, tips, and updates delivered directly to your inbox.",
      benefits: [
        "Monthly Flow insights",
        "Tool updates and tips",
        "Event notifications",
        "Exclusive content"
      ],
      cta: "Subscribe",
      link: "mailto:contact@letpeople.work"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Stay Connected
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our community and stay up-to-date with the latest in Flow and Obeya methodologies.
          </p>
        </div>

        {/* Connection Options */}
        <div className="grid md:grid-cols-3 gap-8">
          {connections.map((connection, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-200 mb-4">
                  {connection.icon}
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {connection.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {connection.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-primary mb-3">What you'll get:</h4>
                  <ul className="space-y-2">
                    {connection.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button variant="outline" className="w-full group" asChild>
                  <a href={connection.link}>
                    {connection.cta}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StayConnected;