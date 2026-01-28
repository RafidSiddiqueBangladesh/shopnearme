import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, Mic } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "bn">("en");

  const navLinks = [
    { name: language === "en" ? "For Shops" : "দোকানদের জন্য", href: "#shops" },
    { name: language === "en" ? "For Brands" : "ব্র্যান্ডের জন্য", href: "#brands" },
    { name: language === "en" ? "For Customers" : "গ্রাহকদের জন্য", href: "#customers" },
    { name: language === "en" ? "Impact" : "প্রভাব", href: "#impact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              ShopSync
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === "en" ? "বাংলা" : "English"}
            </Button>

            {/* Voice Assistant Hint */}
            <Button variant="outline" size="sm" className="gap-2">
              <Mic className="w-4 h-4" />
              {language === "en" ? "Voice Help" : "ভয়েস সাহায্য"}
            </Button>

            <Link to="/login">
              <Button variant="ghost">
                {language === "en" ? "Log in" : "লগইন"}
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="default">
                {language === "en" ? "Get Started" : "শুরু করুন"}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="border-t border-border my-2" />
              <div className="flex items-center gap-2 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === "en" ? "bn" : "en")}
                  className="flex-1"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === "en" ? "বাংলা" : "English"}
                </Button>
              </div>
              <div className="flex flex-col gap-2 px-4 mt-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    {language === "en" ? "Log in" : "লগইন"}
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">
                    {language === "en" ? "Get Started" : "শুরু করুন"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
