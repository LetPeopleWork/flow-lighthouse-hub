import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import logo from "@/assets/LPW_Banner_White.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "#home", isHash: true },
    { name: "Lighthouse", href: location.pathname === "/lighthouse" ? "#lighthouse" : "/lighthouse", isHash: false },
    { name: "Services", href: "#services", isHash: true },
    { name: "Trainings & Workshops", href: "#events", isHash: true },
    { name: "Connect", href: "#stay-connected", isHash: true },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isHash && location.pathname !== "/") {
      // If we're not on home page and clicking a hash link, go to home first
      window.location.href = "/" + item.href;
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img src={logo} alt="#LetPeople.work" className="h-8" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-foreground hover:text-primary hover:bg-accent transition-colors"
                  onClick={() => handleNavClick(item)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;