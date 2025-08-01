import { MessageSquare, Linkedin, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const StayConnected = () => {
  const connections = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Slack Community",
      description: "Join our vibrant community for discussions, questions, and direct access to our experts and other practitioners.",
      cta: "Join Slack",
      link: "#"
    },
    {
      icon: <Linkedin className="h-8 w-8" />,
      title: "LinkedIn",
      description: "Follow us for industry insights, case studies, and updates on Flow and Obeya methodologies.",
      cta: "Follow on LinkedIn",
      link: "#"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Blog",
      description: "Read our free blog for in-depth articles, insights, and practical tips on Flow and Obeya methodologies.",
      cta: "Read Blog",
      link: "https://blog.letpeople.work"
    }
  ];

  return (
    <section id="stay-connected" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Stay Connected
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Keep in touch with us through our various channels.
          </p>
        </div>

        {/* Connection Options */}
        <div className="grid md:grid-cols-3 gap-8">
          {connections.map((connection, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm flex flex-col h-full">
              <CardHeader className="text-center pb-4 flex-shrink-0">
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
              
              <CardContent className="flex-grow flex flex-col justify-end">
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