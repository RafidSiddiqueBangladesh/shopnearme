import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, hsl(152, 45%, 95%) 0%, hsl(16, 70%, 97%) 50%, hsl(185, 50%, 95%) 100%)" }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to{" "}
              <span className="text-gradient-primary">Digitize Your Shop?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of shopkeepers already growing with ShopSync. 
              Get started in minutes—works with any phone.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link to="/signup">
                <Button size="xl" variant="hero" className="gap-2 min-w-[200px]">
                  Start Free Today
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="xl" variant="outline" className="gap-2 min-w-[200px]">
                <Mic className="w-5 h-5" />
                Call Voice Assistant
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                Works with button phones
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Bangla & English support
              </div>
            </div>
          </div>

          {/* Phone Support Card */}
          <div className="mt-8 bg-foreground text-background rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                <Phone className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold text-lg">Need help getting started?</div>
                <div className="text-background/70">Call us anytime—we speak your language</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-primary">+880 1XXX-XXXXXX</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
