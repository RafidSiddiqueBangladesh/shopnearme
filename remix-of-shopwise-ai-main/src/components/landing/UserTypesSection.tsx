import { Button } from "@/components/ui/button";
import { ArrowRight, Store, Building2, Users, Check } from "lucide-react";
import { Link } from "react-router-dom";

const userTypes = [
  {
    id: "shops",
    icon: Store,
    title: "For Shopkeepers",
    subtitle: "দোকানদের জন্য",
    description: "Digitize your shop with zero hassle. Track sales, manage inventory, and grow with AI insights.",
    benefits: [
      "Daily sales & profit tracking",
      "Low-stock & expiry alerts",
      "AI reorder suggestions",
      "Voice assistant support",
      "Access to cheaper products",
    ],
    cta: "Open Dashboard",
    ctaLink: "/shopkeeper",
    color: "primary",
  },
  {
    id: "brands",
    icon: Building2,
    title: "For Brands & Companies",
    subtitle: "ব্র্যান্ডের জন্য",
    description: "Real-time market data without field agents. Make smarter production and marketing decisions.",
    benefits: [
      "Live demand heatmaps",
      "Region-wise analytics",
      "Direct shop communication",
      "Targeted promotions",
      "Reduce waste & overstock",
    ],
    cta: "View Analytics",
    ctaLink: "/brand",
    color: "accent",
  },
  {
    id: "customers",
    icon: Users,
    title: "For Customers",
    subtitle: "গ্রাহকদের জন্য",
    description: "Find products nearby in real-time. Support local shops and get authentic products.",
    benefits: [
      "Search by location radius",
      "Live product availability",
      "Shop trust scores",
      "Quick local delivery",
      "Support women-led shops",
    ],
    cta: "Find Shops",
    ctaLink: "/dashboard",
    color: "secondary",
  },
];

const UserTypesSection = () => {
  return (
    <section id="shops" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Built for{" "}
            <span className="text-gradient-warm">Everyone in the Chain</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're a small shop owner, a major brand, or a customer looking for products nearby.
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {userTypes.map((type, index) => (
            <div
              key={type.id}
              id={type.id}
              className="group relative bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >
              {/* Card Header */}
              <div 
                className={`p-6 ${
                  type.color === "primary" ? "bg-primary-light/50" :
                  type.color === "secondary" ? "bg-secondary-light/50" :
                  "bg-accent/5"
                }`}
              >
                <div 
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                    type.color === "primary" ? "bg-primary" :
                    type.color === "secondary" ? "bg-secondary" :
                    "bg-accent"
                  }`}
                >
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                  {type.title}
                </h3>
                <p className="text-muted-foreground text-sm">{type.subtitle}</p>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-muted-foreground mb-6">{type.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {type.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <div 
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          type.color === "primary" ? "bg-primary-light" :
                          type.color === "secondary" ? "bg-secondary-light" :
                          "bg-accent/10"
                        }`}
                      >
                        <Check 
                          className={`w-3 h-3 ${
                            type.color === "primary" ? "text-primary" :
                            type.color === "secondary" ? "text-secondary" :
                            "text-accent"
                          }`} 
                        />
                      </div>
                      <span className="text-sm text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link to={type.ctaLink}>
                  <Button 
                    variant={type.color === "secondary" ? "warm" : "default"}
                    className="w-full group/btn"
                  >
                    {type.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypesSection;
