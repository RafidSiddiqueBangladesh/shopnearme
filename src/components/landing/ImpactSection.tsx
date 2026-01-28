import { Heart, Leaf, Users, TrendingUp, Award, Globe } from "lucide-react";

const sdgImpacts = [
  {
    icon: Heart,
    number: "SDG 5",
    title: "Gender Equality",
    description: "500+ women-led shops empowered with digital tools and market access.",
    stat: "45%",
    statLabel: "Women Entrepreneurs",
    color: "secondary",
  },
  {
    icon: Users,
    number: "SDG 8",
    title: "Decent Work",
    description: "Creating sustainable livelihoods for rural shopkeepers and their families.",
    stat: "10K+",
    statLabel: "Jobs Supported",
    color: "primary",
  },
  {
    icon: TrendingUp,
    number: "SDG 9",
    title: "Industry Innovation",
    description: "IoT and AI making infrastructure accessible to the smallest businesses.",
    stat: "98%",
    statLabel: "Digital Accuracy",
    color: "accent",
  },
  {
    icon: Leaf,
    number: "SDG 12",
    title: "Responsible Consumption",
    description: "Reducing food & medicine waste through smart inventory and expiry tracking.",
    stat: "30%",
    statLabel: "Waste Reduced",
    color: "primary",
  },
];

const ImpactSection = () => {
  return (
    <section id="impact" className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-dots-pattern" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 border border-background/20 mb-6">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">SDG-Aligned Impact</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Building a More{" "}
            <span className="text-secondary">Equitable</span> Economy
          </h2>
          <p className="text-lg text-background/70">
            Every shop we digitize creates ripples of positive change—empowering women, 
            reducing waste, and building sustainable communities.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sdgImpacts.map((impact, index) => (
            <div
              key={impact.number}
              className="group bg-background/5 backdrop-blur-sm rounded-2xl p-6 border border-background/10 hover:bg-background/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    impact.color === "primary" ? "bg-primary" :
                    impact.color === "secondary" ? "bg-secondary" :
                    "bg-accent"
                  }`}
                >
                  <impact.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-medium text-background/60">{impact.number}</div>
              </div>
              
              <h3 className="font-display text-xl font-semibold mb-2">{impact.title}</h3>
              <p className="text-background/70 text-sm mb-6">{impact.description}</p>
              
              <div className="pt-4 border-t border-background/10">
                <div 
                  className={`text-3xl font-bold ${
                    impact.color === "primary" ? "text-primary" :
                    impact.color === "secondary" ? "text-secondary" :
                    "text-accent"
                  }`}
                >
                  {impact.stat}
                </div>
                <div className="text-sm text-background/60">{impact.statLabel}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-background/5 border border-background/10">
            <Globe className="w-6 h-6 text-primary" />
            <span className="text-background/80">
              Scaling across emerging markets in South Asia and beyond
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
