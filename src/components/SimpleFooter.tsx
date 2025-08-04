import logo from "@/assets/logo.png";

const SimpleFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Copyright - Left */}
          <p className="text-muted-foreground text-sm">
            © {currentYear} LetPeopleWork GmbH. All rights reserved.
          </p>

          {/* Logo - Center */}
          <div className="flex-shrink-0">
            <img 
              src="/src/assets/LPW_Banner_White.png" 
              alt="LetPeopleWork" 
              className="h-10 w-auto"
            />
          </div>

          {/* Links - Right */}
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
            >
              Impressum
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
            >
              Terms and Conditions
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="/src/assets/LPW_Banner_White.png" 
              alt="LetPeopleWork" 
              className="h-10 w-auto"
            />
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-2 text-center">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
            >
              Impressum
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
            >
              Terms and Conditions
            </a>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm text-center">
            © {currentYear} LetPeopleWork GmbH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;