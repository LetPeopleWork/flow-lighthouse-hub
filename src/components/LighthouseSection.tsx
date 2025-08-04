import { ArrowRight, BarChart3, Target, TrendingUp, FileText, PlayCircle, ChevronLeft, ChevronRight, Download, Monitor, Smartphone, Container, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import lighthouseLogo from "@/assets/LighthouseLogo.png";
import metricsTeam1 from "@/assets/screenshots/Metrics_Team_1.png";
import forecastsTeamManual from "@/assets/screenshots/Forecasts_Team_Manual.png";
import forecastsProjectVideo from "@/assets/videos/Forecasts_Project.mp4";
import LighthouseTestimonials from "@/components/LighthouseTestimonials";

const LighthouseSection = () => {
  const [currentMedia, setCurrentMedia] = useState(0);
  const [latestVersion, setLatestVersion] = useState<string>("");
  const [isLoadingVersion, setIsLoadingVersion] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");
  
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

  const openImageModal = (src: string, alt: string) => {
    setModalImageSrc(src);
    setModalImageAlt(alt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageSrc("");
    setModalImageAlt("");
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
  
  const mediaItems = [
    {
      type: "image",
      src: metricsTeam1,
      alt: "Team Metrics Overview"
    },
    {
      type: "image",
      src: forecastsTeamManual,
      alt: "Team Forecasts Manual"
    },
    {
      type: "video",
      src: forecastsProjectVideo,
      alt: "Project Forecasts Demo"
    }
  ];

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Visualize your Flow",
      description: "Take action based on real data - with Lighthouse you have all relevant Flow Metrics at your disposal"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Forecast Delivery Dates",
      description: "Stop wasting time with guesses - Lighthouse is using your historical data to create realistic timelines in seconds"
    },
    {
      icon: <ArrowRight className="h-6 w-6" />,
      title: "Integrate with most popular ALM Tools",
      description: "No need to maintain multiple data sources - Lighthouse connects to Jira and Azure DevOps"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Full Transparency - Full Control",
      description: "No need to send your data to some cloud provider in a foreign country - Lighthouse is 100% Open-Source, runs fully on your infrastructure and will not send anything to the cloud"
    }
  ];

  return (
    <section id="lighthouse" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <img 
              src={lighthouseLogo} 
              alt="Lighthouse Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Meet{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Lighthouse
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See Your Flow — Predict Your Delivery <br />
            Lighthouse turns your data into flow metrics and date-accurate delivery forecasts <br />
            Most teams see measurable improvements in the first month <br />
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Media Carousel */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-primary rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              
              {mediaItems[currentMedia].type === "image" ? (
                <button
                  onClick={() => openImageModal(mediaItems[currentMedia].src, mediaItems[currentMedia].alt)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openImageModal(mediaItems[currentMedia].src, mediaItems[currentMedia].alt);
                    }
                  }}
                  className="relative rounded-lg shadow-medium hover:shadow-glow transition-all duration-300 w-full cursor-pointer hover:scale-[1.02] bg-transparent border-0 p-0"
                  aria-label={`Expand ${mediaItems[currentMedia].alt}`}
                >
                  <img 
                    src={mediaItems[currentMedia].src} 
                    alt={mediaItems[currentMedia].alt}
                    className="w-full rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-lg">
                    <div className="bg-white/90 rounded-full p-2">
                      <span className="text-sm font-medium text-gray-900">Click to expand</span>
                    </div>
                  </div>
                </button>
              ) : (
                <div className="relative rounded-lg overflow-hidden shadow-medium hover:shadow-glow transition-all duration-300">
                  <video
                    src={mediaItems[currentMedia].src}
                    className="w-full aspect-video"
                    title={mediaItems[currentMedia].alt}
                    controls
                    preload="metadata"
                  >
                    <track kind="captions" />
                  </video>
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
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-primary">
                {mediaItems[currentMedia].type === "video" ? <PlayCircle className="h-4 w-4" /> : "📷"} 
                {currentMedia + 1}/{mediaItems.length}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="order-1 lg:order-2 space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Highlights
            </h3>
            
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start space-x-4 group">
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
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-12 border border-border mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Try the Free Lighthouse Version Today
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            No credit card. No account. No hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="hero" size="lg" className="group">
                  <Download className="mr-2 h-4 w-4" />
                  Download Lighthouse
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
              <a href="/lighthouse">
                Learn more
              </a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Base Version Free forever • All Code is Open Source • Everything runs on your Infrstructure - No Third-Party Cloud Services involved</p>
        </div>

        {/* Testimonials Slider */}
        <LighthouseTestimonials />

        {/* Image Modal */}
        {isModalOpen && (
          <dialog 
            open
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm border-0 p-0 w-full h-full max-w-none max-h-none" 
            aria-labelledby="modal-title"
          >
            <div className="relative max-w-[90vw] max-h-[90vh] p-4">
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={modalImageSrc}
                alt={modalImageAlt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                id="modal-title"
              />
            </div>
            {/* Background overlay that closes modal when clicked */}
            <button 
              className="absolute inset-0 -z-10 bg-transparent border-0 cursor-pointer"
              onClick={closeModal}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  closeModal();
                } else if (e.key === 'Escape') {
                  closeModal();
                }
              }}
              aria-label="Close modal by clicking background"
            />
          </dialog>
        )}
      </div>
    </section>
  );
};

export default LighthouseSection;