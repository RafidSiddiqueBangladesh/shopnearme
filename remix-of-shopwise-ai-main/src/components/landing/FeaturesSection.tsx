import { 
  Store, 
  Mic, 
  MapPin, 
  BarChart3, 
  Shield, 
  Heart,
  Smartphone,
  Globe,
  Zap
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Real-Time Map Discovery",
    description: "Find shops within your radius. See live inventory, availability, and women-led businesses highlighted.",
    color: "primary",
  },
  {
    icon: Mic,
    title: "AI Voice Assistant",
    description: "Works with button phones. Ask 'How much did I sell today?' in Bangla or English.",
    color: "secondary",
  },
  {
    icon: BarChart3,
    title: "Smart Dashboards",
    description: "Sales, inventory, profits, and dues at a glance. AI suggests what to order tomorrow.",
    color: "accent",
  },
  {
    icon: Shield,
    title: "Product Authenticity",
    description: "Factory-to-shop traceability. Trust badges for verified products and sellers.",
    color: "primary",
  },
  {
    icon: Heart,
    title: "Women Entrepreneur Priority",
    description: "Special visibility for women-led shops. Voice-first onboarding, no app needed.",
    color: "secondary",
  },
  {
    icon: Zap,
    title: "IoT-Powered Data",
    description: "Automatic inventory updates. Real-time sales from connected devices.",
    color: "accent",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary-dark">Platform Features</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient-primary">Digitize & Grow</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for low-tech users, powered by IoT and AI. From button phones to smart insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div 
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  feature.color === "primary" ? "bg-primary-light" :
                  feature.color === "secondary" ? "bg-secondary-light" :
                  "bg-accent/10"
                }`}
              >
                <feature.icon 
                  className={`w-7 h-7 ${
                    feature.color === "primary" ? "text-primary" :
                    feature.color === "secondary" ? "text-secondary" :
                    "text-accent"
                  }`} 
                />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-3">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <div className="font-medium text-foreground">Mobile-First</div>
            <div className="text-sm text-muted-foreground">Optimized for low internet</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center mb-3">
              <Globe className="w-6 h-6 text-secondary" />
            </div>
            <div className="font-medium text-foreground">Multilingual</div>
            <div className="text-sm text-muted-foreground">Bangla + English support</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <div className="font-medium text-foreground">Secure & Trusted</div>
            <div className="text-sm text-muted-foreground">Data privacy guaranteed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
