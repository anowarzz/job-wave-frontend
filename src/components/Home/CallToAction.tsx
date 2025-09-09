"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

const CallToAction = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubscribed(true);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Ahead of the{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Job Market
            </span>
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Get job opportunities and career insights delivered to your inbox.
          </p>

          {/* Subscription Form */}
          <div className="max-w-md mx-auto mb-6">
            {isSubscribed ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <h3 className="text-base font-semibold text-green-800 dark:text-green-400 mb-1">
                  Successfully Subscribed!
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Check your inbox for confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || !email}
                    className="font-medium py-3.5 px-12 rounded-full relative overflow-hidden group bg-gradient-to-r from-primary to-blue-600 dark:from-purple-600 dark:to-blue-500 text-white shadow-lg hover:shadow-xl dark:shadow-purple-500/25 dark:hover:shadow-purple-500/40 transition-all duration-300 border border-transparent dark:border-purple-400/30"
                  >
                    <span className="relative z-10 drop-shadow-sm">
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Subscribing...
                        </div>
                      ) : (
                        "Subscribe"
                      )}
                    </span>
                    <span className="absolute inset-0 w-0 h-full transition-all duration-300 ease-out bg-blue-500 dark:bg-gradient-to-r dark:from-purple-500 dark:to-blue-400 left-0 group-hover:w-full"></span>
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No spam, unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            <div className="text-center">
              <div className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400">
                10K+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-xs">
                Subscribers
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl font-bold text-purple-600 dark:text-purple-400">
                500+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-xs">
                Companies
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg md:text-xl font-bold text-green-600 dark:text-green-400">
                98%
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-xs">
                Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
