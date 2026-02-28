import React, { useState } from "react";
import {
  Mail,
  Bell,
  Star,
  Shield,
  Gift,
  Send,
  CheckCircle,
} from "lucide-react";
import Button from "./ui/Button";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubscribed(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  const benefits = [
    { icon: <Gift className="w-5 h-5" />, text: "Exclusive Discounts" },
    { icon: <Bell className="w-5 h-5" />, text: "Early Access" },
    { icon: <Star className="w-5 h-5" />, text: "Special Offers" },
    { icon: <Shield className="w-5 h-5" />, text: "No Spam" },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full [animation:6s_ease-in-out_infinite_float]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full [animation:8s_ease-in-out_infinite_float_reverse]"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-yellow-400 rounded-full [animation:10s_ease-in-out_infinite_float_slow]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center [animation:1s_ease-out_fade-in-up]">
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center [animation:2s_ease-in-out_infinite_bounce-subtle]">
                <Mail className="w-10 h-10 text-white" />
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center [animation:3s_ease-in-out_infinite_float]">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center [animation:4s_ease-in-out_infinite_float_reverse]">
                <Bell className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Join The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Club
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Get exclusive access to premium deals, early product launches, and
            members-only content
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-blue-100 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl [animation:0.8s_ease-out_${index * 100 + 300}ms_both_fade-in-up]"
              >
                {benefit.icon}
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Subscription Form */}
          <div className="max-w-2xl mx-auto">
            {isSubscribed ? (
              /* Success State */
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 [animation:0.6s_ease-out_success-pop]">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Welcome Aboard! 🎉
                  </h3>
                  <p className="text-blue-100 text-lg">
                    Check your inbox for a special welcome gift from us!
                  </p>
                </div>
              </div>
            ) : (
              /* Subscription Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                      required
                    />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-200 w-5 h-5" />
                  </div>

                  <Button
                    type="submit"
                    variant="light"
                    size="lg"
                    disabled={isLoading}
                    className="min-w-[140px] transition-all duration-300 hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        <span>Subscribe</span>
                      </div>
                    )}
                  </Button>
                </div>

                {/* Privacy Note */}
                <p className="text-blue-200 text-sm">
                  🔒 We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20 max-w-2xl mx-auto">
            {[
              { number: "50K+", label: "Subscribers" },
              { number: "24/7", label: "Support" },
              { number: "99%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center [animation:0.8s_ease-out_${index * 100 + 600}ms_both_fade-in-up]"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default NewsletterSection;
