import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Phone, Mic, ArrowLeft, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("phone");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
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
            <h1 className="font-display text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                loginMethod === "phone"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Phone className="w-4 h-4" />
              Phone
            </button>
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                loginMethod === "email"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {loginMethod === "phone" ? (
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
            ) : (
              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
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
            )}

            <div>
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Sign in
            </Button>
          </form>

          {/* Voice Login */}
          <div className="mt-6 p-4 rounded-xl bg-muted border border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Mic className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">Voice Login</div>
                <div className="text-sm text-muted-foreground">Call to login with voice</div>
              </div>
              <Button variant="outline" size="sm">Call Now</Button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-foreground text-background items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-5" />
        <div 
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(152, 55%, 50%) 0%, transparent 70%)" }}
        />
        
        <div className="relative z-10 max-w-md text-center">
          <div className="text-6xl font-bold font-display mb-4">10K+</div>
          <div className="text-xl text-background/80 mb-2">Shops Already Growing</div>
          <p className="text-background/60">
            Join thousands of shopkeepers using ShopSync to digitize, track, and grow their businesses.
          </p>
          
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-xs text-background/60">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">500+</div>
              <div className="text-xs text-background/60">Women-Led</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">24/7</div>
              <div className="text-xs text-background/60">Voice Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
