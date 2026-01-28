import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Phone, User, Store, Building2, Users, ArrowLeft, Eye, EyeOff, Check } from "lucide-react";

const userTypes = [
  {
    id: "shopkeeper",
    icon: Store,
    title: "Shopkeeper",
    subtitle: "দোকানদার",
    description: "I own or manage a small shop",
  },
  {
    id: "brand",
    icon: Building2,
    title: "Brand / Company",
    subtitle: "ব্র্যান্ড",
    description: "I represent a brand or manufacturer",
  },
  {
    id: "customer",
    icon: Users,
    title: "Customer",
    subtitle: "গ্রাহক",
    description: "I want to find products nearby",
  },
];

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          {/* Back Link */}
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-display font-bold text-xl">ShopSync</span>
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground">Start digitizing your shop in minutes</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm ${
              step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {step > 1 ? <Check className="w-4 h-4" /> : "1"}
            </div>
            <div className={`flex-1 h-1 rounded-full ${step > 1 ? "bg-primary" : "bg-muted"}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm ${
              step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              2
            </div>
          </div>

          {step === 1 ? (
            /* Step 1: Select User Type */
            <div>
              <h2 className="font-semibold text-lg mb-4">Who are you?</h2>
              <div className="space-y-3">
                {userTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedType === type.id
                        ? "border-primary bg-primary-light"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedType === type.id ? "bg-primary" : "bg-muted"
                      }`}>
                        <type.icon className={`w-6 h-6 ${
                          selectedType === type.id ? "text-primary-foreground" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{type.title}</span>
                          <span className="text-sm text-muted-foreground">({type.subtitle})</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                      {selectedType === type.id && (
                        <div className="ml-auto w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <Button 
                onClick={() => setStep(2)} 
                disabled={!selectedType}
                size="lg" 
                className="w-full mt-6"
              >
                Continue
              </Button>
            </div>
          ) : (
            /* Step 2: Account Details */
            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">Full Name</Label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">Email (Optional)</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10 h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {selectedType === "shopkeeper" && (
                <div>
                  <Label htmlFor="shopname" className="text-foreground">Shop Name</Label>
                  <div className="relative mt-1.5">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="shopname"
                      type="text"
                      placeholder="Your shop name"
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" id="terms" className="rounded border-border mt-1" />
                <label htmlFor="terms" className="text-muted-foreground">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </label>
              </div>

              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button type="submit" size="lg" className="flex-1">
                  Create Account
                </Button>
              </div>
            </form>
          )}

          {/* Sign In Link */}
          <p className="mt-8 text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-accent text-background items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-10" />
        
        <div className="relative z-10 max-w-md text-center">
          <div className="text-4xl font-bold font-display mb-4">Join the Revolution</div>
          <p className="text-lg text-background/80 mb-8">
            ShopSync is digitizing small shops across Bangladesh. Be part of the change.
          </p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-background/20 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">Free to Start</div>
                <div className="text-sm text-background/70">No credit card required</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-background/20 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">Works on Any Phone</div>
                <div className="text-sm text-background/70">Even button phones supported</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-background/20 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">24/7 Voice Support</div>
                <div className="text-sm text-background/70">In Bangla and English</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
