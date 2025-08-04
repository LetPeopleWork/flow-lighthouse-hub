import { ArrowRight, Target, TrendingUp, FileText, Download, Monitor, Smartphone, Container, Copy, Check, Shield, Zap, ChevronDown, ChevronUp, User, Mail, Building, CheckCircle, XCircle, Info, Hammer, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import SimpleFooter from "@/components/SimpleFooter";
import MediaCarousel from "@/components/MediaCarousel";
import lighthouseLogo from "@/assets/LighthouseLogo.png";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import LighthouseTestimonials from "@/components/LighthouseTestimonials";

const Lighthouse = () => {
  const [latestVersion, setLatestVersion] = useState<string>("");
  const [isLoadingVersion, setIsLoadingVersion] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [showLicenseDetails, setShowLicenseDetails] = useState(false);
  const [purchaseForm, setPurchaseForm] = useState({
    name: '',
    email: '',
    organization: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{
    show: boolean;
    type: 'success' | 'canceled';
    title: string;
    description: string;
  }>({
    show: false,
    type: 'success',
    title: '',
    description: ''
  });
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

  // Check for Stripe payment result and show appropriate dialog
  useEffect(() => {
    console.log('Lighthouse component mounted');
    console.log('Current URL:', window.location.href);
    console.log('Pathname:', window.location.pathname);
    console.log('Search:', window.location.search);

    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');

    console.log('Payment status from URL:', paymentStatus);
    console.log('All URL params:', Array.from(urlParams.entries()));

    if (paymentStatus === 'success') {
      console.log('Showing success dialog');
      // Show success dialog first
      setPaymentResult({
        show: true,
        type: 'success',
        title: 'Payment Successful!',
        description: 'You will receive your license by mail from licensing@lighthouse.letpeople.work. Check your inbox. If you don\'t receive it within the next 4h, please reach out to support@letpeople.work'
      });

      // Clear the URL parameters after showing the dialog
      setTimeout(() => {
        console.log('Clearing URL parameters');
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }, 1000); // Increased delay to ensure dialog shows
    } else if (paymentStatus === 'canceled') {
      console.log('Showing canceled dialog');
      // Show canceled dialog first
      setPaymentResult({
        show: true,
        type: 'canceled',
        title: 'Payment Canceled',
        description: 'Your payment was canceled. You can try again anytime.'
      });

      // Clear the URL parameters after showing the dialog
      setTimeout(() => {
        console.log('Clearing URL parameters');
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }, 1000); // Increased delay to ensure dialog shows
    } else {
      console.log('No payment status detected in URL');
    }
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
      // Check if clipboard API is available (requires HTTPS)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopiedCommand(true);
        setTimeout(() => setCopiedCommand(false), 2000);
      } else {
        // Fallback for HTTP sites
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand('copy');
          setCopiedCommand(true);
          setTimeout(() => setCopiedCommand(false), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
          toast({
            title: "Copy failed",
            description: "Please copy the command manually",
            variant: "destructive",
          });
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast({
        title: "Copy failed",
        description: "Please copy the command manually",
        variant: "destructive",
      });
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

  const lighthouseFeatures = [
    {
      title: "Visualize the Flow for Teams",
      description: "Inspect how well work flows through your system and use the data to drive improvements",
      images: [
        "/src/assets/screenshots/Metrics_Team_1.png",
        "/src/assets/screenshots/Metrics_Team_2.png"
      ],
      video: "/src/assets/videos/Metrics_Team.mp4"
    },
    {
      title: "Visualize the Flow on Portfolio Level", 
      description: "Optimize your end to end value delivery by analyzing higher flight levels",
      images: [
        "/src/assets/screenshots/Metrics_Project_1.png",
        "/src/assets/screenshots/Metrics_Project_2.png"
      ],
      video: "/src/assets/videos/Metrics_Projects.mp4"
    },
    {
      title: "Run Forecasts for your Team",
      description: "Make plannings a breeze and get answers to \"When will it be done\" and \"How much can we do\" within seconds",
      images: [
        "/src/assets/screenshots/Forecasts_Team_Manual.png",
        "/src/assets/screenshots/Forecasts_Team_Epics.png"
      ],
      video: "/src/assets/videos/Forecasts_Team.mp4"
    },
    {
      title: "Create Realistic Delivery Timelines",
      description: "Use the power of Monte Carlo Simulations to create timelines that are based on your historical data",
      images: [
        "/src/assets/screenshots/Forecasts_Project.png"
      ],
      video: "/src/assets/videos/Forecasts_Project.mp4"
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

  const handlePurchase = async () => {
    if (!purchaseForm.name || !purchaseForm.email || !purchaseForm.organization) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, email address, and organization.",
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
        },
      });

      if (error) throw error;

      // Redirect to Stripe checkout in the same tab
      window.location.href = data.url;
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to create payment session. Please try again.",
        variant: "destructive",
      });
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
              Discover how Lighthouse can transform your flow metrics and forecasting
            </p>
          </div>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {lighthouseFeatures.map((feature) => {
                // Create media array with both images and video
                const mediaItems = [
                  ...feature.images.map(img => ({ type: 'image', src: img })),
                  ...(feature.video ? [{ type: 'video', src: feature.video }] : [])
                ];

                return (
                  <CarouselItem key={feature.title}>
                    <div className="grid lg:grid-cols-2 gap-12 p-6 min-h-[400px]">
                      <div className="flex flex-col justify-center space-y-6">
                        <h3 className="text-2xl font-bold text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-lg">
                          {feature.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col justify-center items-center space-y-4">
                        {/* Media Carousel */}
                        <MediaCarousel
                          mediaItems={mediaItems.map(media => ({
                            type: media.type as 'image' | 'video',
                            src: media.src,
                            alt: media.type === 'image' 
                              ? `${feature.title} screenshot ${mediaItems.indexOf(media) + 1}`
                              : `${feature.title} demo video`
                          }))}
                          className="w-full max-w-lg h-80"
                          enableModal={true}
                          posterImage={feature.images[0]}
                        />
                        
                        {/* Media indicators */}
                        {mediaItems.length > 1 && (
                          <div className="flex justify-center space-x-2">
                            {mediaItems.map((media, index) => (
                              <div
                                key={`${feature.title}-indicator-${index}`}
                                className="w-2 h-2 rounded-full bg-muted-foreground/30"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LighthouseTestimonials />
        </div>
      </section>

      {/* Why Premium Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Lighthouse{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Premium
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              While our free version provides all the features you need to analyze the flow and forecast delivery dates, Premium unlocks enterprise-grade
              capabilities that help you scale the usage and adoption within your organization and thus lead to a scaled learning.
            </p>
          </div>

          {/* Warning about constraints */}
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <Info className="h-5 w-5 text-amber-600" />
              <p className="text-sm text-amber-800 text-center">
                <span className="font-semibold">Important:</span> Constraints on the free version become effective after Lighthouse v25.7.27.1729
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-background rounded-2xl p-8 shadow-soft border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Free vs Premium Comparison
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Free Version</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground bg-gradient-primary bg-clip-text text-transparent">Premium Version</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {/* Base Functionality */}
                  <tr>
                    <td colSpan={3} className="py-4 px-4 font-semibold text-foreground bg-accent/30">
                      Base Functionality
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Flow Metrics for Teams</td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Flow Metrics for Projects</td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Manual Forecasts for Teams</td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Continuous Forecasts for Projects</td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Connection to Jira and Azure DevOps</td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  
                  {/* Constraints in Free Version */}
                  <tr>
                    <td colSpan={3} className="py-4 px-4 font-semibold text-foreground bg-accent/30">
                      Usage Limits
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Number of Teams</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">Max 3</td>
                    <td className="py-3 px-4 text-center text-foreground font-semibold">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Number of Projects</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">Max 1</td>
                    <td className="py-3 px-4 text-center text-foreground font-semibold">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">Import Configuration from Another Instance</td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  
                  {/* Premium Features */}
                  <tr>
                    <td colSpan={3} className="py-4 px-4 font-semibold text-foreground bg-accent/30">
                      Premium-Only Features
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <span>Flow Consultant</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-blue-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Get actionable tips to improve your flow based on your data</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Hammer className="h-5 w-5 text-blue-500 mx-auto" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm">Work in Progress</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <span>Extended AI/LLM Support</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-blue-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Connect Lighthouse to your AI Chat of choice and interact with the data and forecasts through this interface</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Hammer className="h-5 w-5 text-blue-500 mx-auto" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm">Work in Progress</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <span>Improved Milestones</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-blue-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Define which Features are relevant for which milestone</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Calendar className="h-5 w-5 text-orange-500 mx-auto" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm">On the Roadmap</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-accent/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Note:</span> New premium features may be introduced as premium-only for the first few months before being made available to the free version, ensuring premium users get early access to cutting-edge capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* License Purchase Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Get Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Premium License
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Purchase your Lighthouse Premium license and unlock the full potential of your organization.
            </p>
          </div>          

          {/* Warning about constraints */}
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <Info className="h-5 w-5 text-amber-600" />
              <p className="text-sm text-amber-800 text-center">
                <span className="font-semibold">Premium License is supported in Versions newer than Lighthouse v25.7.27.1729. In previous versions, a license will not have any effect.</span> 
              </p>
            </div>
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
                    Valid for one year from the date of purchase
                  </p>

                  <div className="mb-6">
                    <div className="text-4xl font-bold text-foreground mb-2">
                      CHF 999 <span className="text-lg font-normal text-muted-foreground">.-</span>
                    </div>
                    <p className="text-muted-foreground">• One-time payment</p>
                    <p className="text-muted-foreground">• Valid for 1 Year </p>
                    <p className="text-muted-foreground">• Usable for up to 50 Lighthouse Instances within your Organization</p>
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
                        onChange={(e) => setPurchaseForm({ ...purchaseForm, name: e.target.value })}
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
                        onChange={(e) => setPurchaseForm({ ...purchaseForm, email: e.target.value })}
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
                        onChange={(e) => setPurchaseForm({ ...purchaseForm, organization: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-white"
                    disabled={!purchaseForm.name || !purchaseForm.email || !purchaseForm.organization || isProcessingPayment}
                    onClick={() => handlePurchase()}
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

      <SimpleFooter />

      {/* Payment Result Dialog */}
      <Dialog open={paymentResult.show} onOpenChange={(open) => !open && setPaymentResult({ ...paymentResult, show: false })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              {paymentResult.type === 'success' ? (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              )}
            </div>
            <DialogTitle className={`text-xl font-bold ${paymentResult.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {paymentResult.title}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {paymentResult.description}
            </p>
            <Button
              onClick={() => setPaymentResult({ ...paymentResult, show: false })}
              className={`w-full ${paymentResult.type === 'success'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
            >
              {paymentResult.type === 'success' ? 'Got it!' : 'Understood'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Lighthouse;
