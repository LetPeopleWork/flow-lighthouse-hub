import logo from "@/assets/logo.png";

const SimpleFooter = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <img src={logo} alt="#LetPeople.work" className="h-8 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            © 2024 letpeople.work. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;