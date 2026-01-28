import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "For Shops", href: "#shops" },
      { name: "For Brands", href: "#brands" },
      { name: "For Customers", href: "#customers" },
      { name: "Voice Assistant", href: "#voice" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Impact Report", href: "/impact" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    resources: [
      { name: "Help Center", href: "/help" },
      { name: "Documentation", href: "/docs" },
      { name: "Blog", href: "/blog" },
      { name: "API", href: "/api" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-display font-bold text-xl">ShopSync</span>
            </div>
            <p className="text-background/70 mb-6 max-w-xs">
              Digitizing every small shop. Empowering communities with IoT and AI.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="w-4 h-4" />
                hello@shopsync.io
              </div>
              <div className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="w-4 h-4" />
                +880 1XXX-XXXXXX
              </div>
              <div className="flex items-center gap-3 text-sm text-background/70">
                <MapPin className="w-4 h-4" />
                Dhaka, Bangladesh
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-background/70 hover:text-background transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-background/60">
            © 2024 ShopSync. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
