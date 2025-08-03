import { ArrowRight, Target, TrendingUp, FileText, Download, Monitor, Smartphone, Container, Copy, Check, Shield, Zap, Users, Globe, Gauge, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, User, Mail, Building } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Navigation from "@/components/Navigation";
import SimpleFooter from "@/components/SimpleFooter";
import lighthouseLogo from "@/assets/LighthouseLogo.png";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Lighthouse = () => {
  const [latestVersion, setLatestVersion] = useState<string>("");
  const [isLoadingVersion, setIsLoadingVersion] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showLicenseDetails, setShowLicenseDetails] = useState(false);
  const [purchaseForm, setPurchaseForm] = useState({
    name: '',
    email: '',
    organization: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { toast } = useToast();
  
  // Fetch latest version from GitHub releases
  useEffect(() => {
    const fetchLatestVersion = async () => {
      setIsLoadingVersion(true);
      try {
        const response = await fetch('https://api.github.com/repos/LetPeopleWork/Lighthouse/releases/latest');
        const data = await response.json();
        setLatestVersion(data.tag_name);
      } catch (error) {
        console.error('Failed to fetch latest version:', error);
        // Fallback version if API fails
        setLatestVersion('v25.7.27.1729');
      } finally {
        setIsLoadingVersion(false);
      }
    };

    fetchLatestVersion();
  }, []);

  const getPlatformDownloadUrl = (platform: string) => {
    const baseUrl = `https://github.com/LetPeopleWork/Lighthouse/releases/download/${latestVersion}`;
    switch (platform) {
      case 'windows':
        return `${baseUrl}/Lighthouse-win-x64.zip`;
      case 'macos':
        return `${baseUrl}/Lighthouse-osx-x64.zip`;
      case 'linux':
        return `${baseUrl}/Lighthouse-linux-x64.zip`;
      default:
        return '';
    }
  };

  const dockerCommand = `docker run -d -p 8081:443 -p 8080:80 -v ".:/app/Data" -v "./logs:/app/logs" -e "Database__ConnectionString=Data Source=/app/Data/LighthouseAppContext.db" ghcr.io/letpeoplework/lighthouse:latest`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const platforms = [
    {
      id: 'windows',
      name: 'Windows',
      icon: <Monitor className="h-4 w-4" />,
      action: () => window.open(getPlatformDownloadUrl('windows'), '_blank')
    },
    {
      id: 'macos',
      name: 'macOS',
      icon: <Smartphone className="h-4 w-4" />,
      action: () => window.open(getPlatformDownloadUrl('macos'), '_blank')
    },
    {
      id: 'linux',
      name: 'Linux',
      icon: <Monitor className="h-4 w-4" />,
      action: () => window.open(getPlatformDownloadUrl('linux'), '_blank')
    },
    {
      id: 'docker',
      name: 'Docker',
      icon: <Container className="h-4 w-4" />,
      action: () => copyToClipboard(dockerCommand)
    }
  ];

  const premiumFeatures = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Advanced security features including SSO integration, role-based access control, and audit logging for compliance requirements."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Scaling",
      description: "Support for unlimited teams, portfolios, and hierarchical views. Perfect for large organizations with complex structures."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Multi-Platform Integration",
      description: "Connect to multiple project management tools simultaneously. Azure DevOps, Jira, GitHub, and more."
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "Deep dive analytics, custom reporting, and advanced forecasting models with machine learning capabilities."
    }
  ];

  const detailedFeatures = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Fully Open Source",
      description: "Core functionality freely available. No vendor lock-in. Full transparency and community-driven development.",
      details: [
        "Complete source code available on GitHub",
        "Community contributions welcomed and encouraged", 
        "No licensing fees for core features",
        "Self-hosted deployment options",
        "Full control over your data and infrastructure"
      ]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Flow Metrics & Forecasting",
      description: "Real-time insights and predictive delivery dates based on your team's actual performance data.",
      details: [
        "Cycle time tracking and analysis",
        "Throughput measurement and trends",
        "Monte Carlo forecasting simulations",
        "Historical performance baselines",
        "Predictive delivery date calculations",
        "Flow efficiency measurements"
      ]
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "100% Swiss Made",
      description: "Developed in Switzerland with precision, quality, and data privacy as core principles.",
      details: [
        "GDPR compliance built-in by design",
        "Swiss data protection standards",
        "Privacy-first architecture",
        "No data collection or tracking",
        "European hosting options available"
      ]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Dashboard",
      description: "Live updates and interactive visualizations that keep your team informed and aligned.",
      details: [
        "Real-time work item status updates",
        "Interactive charts and graphs",
        "Customizable dashboard layouts",
        "Team performance scorecards",
        "Automated alert notifications",
        "Mobile-responsive design"
      ]
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
    },
    {
      quote: "The Swiss quality and privacy standards give us confidence in using Lighthouse for sensitive projects.",
      author: "Hans Mueller",
      role: "CTO",
      company: "SecureFlow AG"
    },
    {
      quote: "Open source core with premium enterprise features - exactly what we needed for our scaling organization.",
      author: "Lisa Wang",
      role: "VP Engineering",
      company: "GrowthTech"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handlePurchase = async (licenseType: 'premium' | 'enterprise') => {
    if (!purchaseForm.name || !purchaseForm.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email address.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingPayment(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          name: purchaseForm.name,
          email: purchaseForm.email,
          organization: purchaseForm.organization,
          licenseType: licenseType,
        },
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to create payment session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <img 
                src={lighthouseLogo} 
                alt="Lighthouse Logo" 
                className="h-20 w-auto"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Lighthouse
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
              Make your Flow transparent from team to portfolio level. Get data-driven insights instead of gut feelings. 
              Forecast delivery dates in seconds based on your real performance and drive actionable improvements.
            </p>
            
            {/* Download CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="hero" size="lg" className="group">
                    <Download className="mr-2 h-4 w-4" />
                    Download Free Version
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-64">
                  {platforms.map((platform) => (
                    <DropdownMenuItem
                      key={platform.id}
                      onClick={platform.action}
                      className="flex items-center space-x-3 p-3 cursor-pointer"
                    >
                      {platform.icon}
                      <div className="flex-1">
                        <div className="font-medium">{platform.name}</div>
                        {platform.id === 'docker' ? (
                          <div className="text-xs text-muted-foreground">
                            {copiedCommand ? 'Copied!' : 'Copy command'}
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground">
                            {isLoadingVersion ? 'Loading...' : `Version ${latestVersion}`}
                          </div>
                        )}
                      </div>
                      {platform.id === 'docker' && copiedCommand && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                      {platform.id === 'docker' && !copiedCommand && (
                        <Copy className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                  <div className="px-3 py-2 border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => window.open('https://github.com/LetPeopleWork/Lighthouse', '_blank')}
                    >
                      View on GitHub
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="lg" asChild>
                <a href="https://docs.lighthouse.letpeople.work" target="_blank" rel="noopener noreferrer">
                  View Documentation
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">No credit card required • Base Version Free forever</p>
          </div>
        </div>
      </section>

      {/* Overview Section with Screenshots */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              See Lighthouse in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the intuitive interface and powerful features that make flow visualization effortless.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Real-time Flow Visualization
              </h3>
              <p className="text-muted-foreground">
                Watch your work items flow through your process in real-time. Identify bottlenecks, track progress, 
                and get instant insights into your team's performance.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Interactive flow diagrams and charts</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Live work item tracking across teams</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Automated performance calculations</span>
                </li>
              </ul>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-primary rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                alt="Lighthouse Dashboard Preview"
                className="relative rounded-lg shadow-medium hover:shadow-glow transition-all duration-300 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Premium Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose Premium?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              While our open-source version provides powerful flow metrics, Premium unlocks enterprise-grade 
              capabilities that scale with your organization's growth and complexity.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Enterprise-Ready Features
              </h3>
              <div className="space-y-6">
                {premiumFeatures.map((feature) => (
                  <div key={feature.title} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-primary flex-shrink-0">
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
              </div>
            </div>
            
            <div className="bg-background rounded-2xl p-8 shadow-soft border border-border">
              <h4 className="text-xl font-bold text-foreground mb-6 text-center">
                What You Get with Premium
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground">Unlimited teams and portfolios</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground">Advanced security & compliance features</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground">Multiple platform integrations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground">Machine learning-powered analytics</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground">Priority support & training</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-muted-foreground">Custom reporting & dashboards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* License Purchase Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Get Your Premium License
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Purchase your Lighthouse Premium license and unlock enterprise-grade features for your organization.
            </p>
          </div>
          
          <Card className="border-0 shadow-medium hover:shadow-glow transition-all duration-300">
            <CardContent className="p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* License Info */}
                <div>
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Lighthouse Premium License
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    One-year premium license with enterprise features and unlimited users.
                  </p>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-foreground mb-2">
                      $999 <span className="text-lg font-normal text-muted-foreground">USD</span>
                    </div>
                    <p className="text-muted-foreground">One-time payment • Valid for 1 year</p>
                  </div>

                  {/* License Highlights */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-muted-foreground">Use in up to 50 instances</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-muted-foreground">Valid for 1 year</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-muted-foreground">Unlimited users</span>
                    </div>
                  </div>

                  {/* License Details Collapsible */}
                  <Collapsible open={showLicenseDetails} onOpenChange={setShowLicenseDetails}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" size="sm" className="mb-4">
                        License Details
                        {showLicenseDetails ? (
                          <ChevronUp className="ml-2 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2">
                      <div className="p-4 bg-accent/20 rounded-lg text-sm text-muted-foreground">
                        <h4 className="font-semibold text-foreground mb-2">Full License Terms:</h4>
                        <ul className="space-y-1">
                          <li>• License valid for 365 days from purchase date</li>
                          <li>• Maximum 50 concurrent Lighthouse instances</li>
                          <li>• Unlimited user accounts per instance</li>
                          <li>• Includes all premium features and integrations</li>
                          <li>• Commercial use permitted within licensed organization</li>
                          <li>• No redistribution or resale allowed</li>
                          <li>• Priority email support included</li>
                          <li>• License renewal required after expiration</li>
                        </ul>
                        <p className="mt-3 text-xs">
                          For trial licenses or custom enterprise agreements, please contact us at sales@letpeople.work
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                {/* Purchase Form */}
                <div className="bg-gradient-subtle rounded-xl p-8">
                  <h4 className="text-xl font-bold text-foreground mb-6">
                    License Information
                  </h4>
                  
                  <div className="space-y-4 mb-8">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Full Name</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={purchaseForm.name}
                        onChange={(e) => setPurchaseForm({...purchaseForm, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Email Address</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={purchaseForm.email}
                        onChange={(e) => setPurchaseForm({...purchaseForm, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="organization" className="flex items-center space-x-2">
                        <Building className="h-4 w-4" />
                        <span>Organization</span>
                      </Label>
                      <Input
                        id="organization"
                        placeholder="Enter your organization name"
                        value={purchaseForm.organization}
                        onChange={(e) => setPurchaseForm({...purchaseForm, organization: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-white"
                    disabled={!purchaseForm.name || !purchaseForm.email || isProcessingPayment}
                    onClick={() => handlePurchase('premium')}
                  >
                    {isProcessingPayment ? 'Processing...' : 'Purchase License Now'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Secure payment via Stripe • Need a trial? Email us at sales@letpeople.work
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Deep Dive into Key Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore what makes Lighthouse the leading choice for flow-based project management.
            </p>
          </div>
          
          <div className="space-y-16">
            {detailedFeatures.map((feature, index) => (
              <div key={feature.title} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <Card className="border-0 shadow-soft">
                    <CardContent className="p-8">
                      <ul className="space-y-4">
                        {feature.details.map((detail) => (
                          <li key={detail} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Trusted by Flow Leaders Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how teams across the globe are transforming their delivery with Lighthouse.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-12">
                <blockquote className="text-xl text-muted-foreground mb-8 italic text-center">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="text-center">
                  <div className="font-semibold text-foreground text-lg">{testimonials[currentTestimonial].author}</div>
                  <div className="text-muted-foreground">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial navigation */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-3 hover:bg-background transition-colors shadow-soft"
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-3 hover:bg-background transition-colors shadow-soft"
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((testimonial, testimonialIndex) => (
                <button
                  key={`dot-${testimonial.author}`}
                  onClick={() => setCurrentTestimonial(testimonialIndex)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    testimonialIndex === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Flow?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join thousands of teams already using Lighthouse to deliver better, faster, and with more predictability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="hero" size="lg" className="group">
                  <Download className="mr-2 h-4 w-4" />
                  Get Started Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-64">
                {platforms.map((platform) => (
                  <DropdownMenuItem
                    key={platform.id}
                    onClick={platform.action}
                    className="flex items-center space-x-3 p-3 cursor-pointer"
                  >
                    {platform.icon}
                    <div className="flex-1">
                      <div className="font-medium">{platform.name}</div>
                      {platform.id === 'docker' ? (
                        <div className="text-xs text-muted-foreground">
                          {copiedCommand ? 'Copied!' : 'Copy command'}
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground">
                          {isLoadingVersion ? 'Loading...' : `Version ${latestVersion}`}
                        </div>
                      )}
                    </div>
                    {platform.id === 'docker' && copiedCommand && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                    {platform.id === 'docker' && !copiedCommand && (
                      <Copy className="h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
                <div className="px-3 py-2 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => window.open('https://github.com/LetPeopleWork/Lighthouse', '_blank')}
                  >
                    View on GitHub
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="lg" asChild>
              <a href="https://docs.lighthouse.letpeople.work" target="_blank" rel="noopener noreferrer">
                View Documentation
              </a>
            </Button>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
};

export default Lighthouse;
