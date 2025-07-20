import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EventsSection = () => {
  const upcomingEvents = [
    {
      type: "Training",
      title: "Flow Fundamentals Certification",
      date: "March 15-17, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "San Francisco, CA",
      attendees: "25 spots",
      status: "open",
      description: "A comprehensive 3-day certification program covering the core principles and practical applications of Flow methodology."
    },
    {
      type: "Workshop",
      title: "Obeya Implementation Workshop", 
      date: "April 8, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Virtual",
      attendees: "50 spots",
      status: "filling",
      description: "Hands-on workshop focusing on implementing Obeya practices in your organization for improved visual management."
    },
    {
      type: "Conference",
      title: "FlowCon 2024 Keynote",
      date: "May 20, 2024", 
      time: "2:00 PM - 3:00 PM",
      location: "Austin, TX",
      attendees: "1000+ expected",
      status: "speaking",
      description: "Join our keynote presentation on 'The Future of Flow: AI-Powered Productivity Insights' at FlowCon 2024."
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Open Registration</Badge>;
      case "filling":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Filling Fast</Badge>;
      case "speaking":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Speaking Event</Badge>;
      default:
        return null;
    }
  };

  return (
    <section id="events" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Upcoming{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Events
            </span>{" "}
            & Training
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our community of Flow practitioners through training sessions, workshops, 
            and conference presentations. Stay ahead with the latest methodologies and insights.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {upcomingEvents.map((event, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-0 shadow-soft">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-primary border-primary">
                    {event.type}
                  </Badge>
                  {getStatusBadge(event.status)}
                </div>
                
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {event.title}
                </CardTitle>
                
                <CardDescription className="text-muted-foreground">
                  {event.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-3 text-primary" />
                    {event.date}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-3 text-primary" />
                    {event.time}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-3 text-primary" />
                    {event.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-3 text-primary" />
                    {event.attendees}
                  </div>
                </div>
                
                <Button 
                  variant={event.status === "speaking" ? "outline" : "default"} 
                  className="w-full group"
                >
                  {event.status === "speaking" ? "Learn More" : "Register Now"}
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-12 border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Stay Connected with Our Community
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get notified about upcoming events, new training programs, and exclusive insights 
            from our Flow and Obeya experts. Join our growing community of practitioners.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button variant="hero" className="sm:px-8">
              Subscribe
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;