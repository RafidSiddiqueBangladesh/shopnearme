import { Button } from "@/components/ui/button";
import { ArrowRight, Store, Users, TrendingUp, Mic, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, hsl(152, 55%, 80%) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(16, 85%, 80%) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/20 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary-dark">
                AI-Powered Shop Digitization
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in delay-100">
              Digitizing{" "}
              <span className="text-gradient-primary">Every Small Shop</span>
              <br />
              Empowering Every Community
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-in delay-200">
              Connect shops, customers, and brands in real-time with IoT-powered insights. 
              Voice-first, low-tech friendly, built for emerging markets.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in delay-300">
              <Link to="/dashboard">
                <Button size="xl" variant="hero" className="gap-2">
                  Explore Map
                  <MapPin className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="xl" variant="outline" className="gap-2">
                <Mic className="w-5 h-5" />
                Try Voice Assistant
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border animate-fade-in delay-400">
              <div>
                <div className="text-3xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Shops Connected</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Women-Led</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Data Accuracy</div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Preview */}
          <div className="relative animate-scale-up delay-200">
            <div className="relative bg-card rounded-3xl shadow-xl border border-border overflow-hidden">
              {/* Map Preview Header */}
              <div className="bg-muted p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="ml-4 text-sm text-muted-foreground">Shop Near Me Dashboard</span>
                </div>
              </div>

              {/* Map Preview */}
              <div className="relative h-80 bg-gradient-to-br from-primary-light to-accent/10 p-6">
                {/* Simulated Map Grid */}
                <div className="absolute inset-0 bg-dots-pattern opacity-30" />
                
                {/* Map Markers */}
                <div className="absolute top-1/4 left-1/3">
                  <div className="relative w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle marker-pulse">
                    <Store className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute top-1/2 right-1/4">
                  <div className="relative w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle delay-200">
                    <Store className="w-4 h-4 text-secondary-foreground" />
                  </div>
                </div>
                <div className="absolute bottom-1/3 left-1/2">
                  <div className="relative w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle delay-300">
                    <Store className="w-4 h-4 text-accent-foreground" />
                  </div>
                </div>

                {/* Radius Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-dashed border-primary/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-primary/40" />

                {/* Info Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-card rounded-xl p-4 shadow-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">12 Shops Nearby</div>
                      <div className="text-xs text-muted-foreground">Within 3km radius</div>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-primary-light text-primary text-xs rounded-full">Grocery</span>
                      <span className="px-2 py-1 bg-secondary-light text-secondary text-xs rounded-full">Medicine</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -left-8 top-1/4 bg-card rounded-xl p-4 shadow-lg border border-border animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">+23% Sales</div>
                  <div className="text-xs text-muted-foreground">This week</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 bg-card rounded-xl p-4 shadow-lg border border-border animate-float delay-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary-light flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Women-Led</div>
                  <div className="text-xs text-muted-foreground">Verified Shop</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
