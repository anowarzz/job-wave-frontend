"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Lottie from "lottie-react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";
import * as z from "zod";
import loginData from "../../../data/login.json";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import baseApi from "@/lib/axios";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const testCredentials = {
    admin: {
      email: process.env.NEXT_PUBLIC_TEST_ADMIN_EMAIL || "",
      password: process.env.NEXT_PUBLIC_TEST_ADMIN_PASSWORD || "",
    },
    recruiter: {
      email: process.env.NEXT_PUBLIC_TEST_RECRUITER_EMAIL || "",
      password: process.env.NEXT_PUBLIC_TEST_RECRUITER_PASSWORD || "",
    },
    candidate: {
      email: process.env.NEXT_PUBLIC_TEST_CANDIDATE_EMAIL || "",
      password: process.env.NEXT_PUBLIC_TEST_CANDIDATE_PASSWORD || "",
    },
  };

  // Handle quick login
  const handleQuickLogin = (role: "admin" | "recruiter" | "candidate") => {
    const credentials = testCredentials[role];

    if (!credentials.email || !credentials.password) {
      toast.error("something went wrong. please use manual loigin", {
        position: "bottom-right",
      });
      return;
    }

    form.setValue("email", credentials.email);
    form.setValue("password", credentials.password);
    setTimeout(() => {
      form.handleSubmit(onSubmit)();
    }, 500);
  };

  // Handle Login
  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      const response = await baseApi.post("/auth/login", {
        email: values.email,
        password: values.password,
      });

      toast.success("Login successful", { position: "bottom-right" });
      mutate("/user/me");

      console.log(response.data);

      // Redirect to home page
      router.push("/");
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message ||
          "Invalid credentials. Please try again.",
        { position: "bottom-right" }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full filter blur-3xl opacity-20 bg-primary animate-pulse-slow"
          style={{ animationDuration: "15s" }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-20 bg-secondary animate-pulse-slow"
          style={{ animationDuration: "20s", animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 relative z-10 mx-auto px-4 sm:px-6">
        <div className="w-full max-w-sm lg:w-2/5">
          <div className="rounded-2xl shadow-xl overflow-hidden bg-card border border-border">
            <div className="px-6 py-6 sm:px-8">
              <h2 className="text-2xl font-bold text-center mb-4 text-foreground">
                Welcome back
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-end">
                    <div className="text-sm">
                      <Link
                        href="/register"
                        className="font-medium text-primary hover:text-primary/80 hover:underline"
                      >
                        Don&apos;t have an account?
                      </Link>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Signing in...
                      </div>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </form>
              </Form>

              {/* Quick Login Section */}
              <div className="mt-6 relative text-muted-foreground">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card">Quick Demo Login</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-sm text-muted-foreground text-center">
                  Test the platform with different roles
                </p>
                <p className="text-xs text-muted-foreground/70 text-center px-2">
                  💡 Enable third-party cookies for optimal experience
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleQuickLogin("admin")}
                    disabled={isLoading}
                    className="w-full text-sm py-2 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Login as Admin
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleQuickLogin("recruiter")}
                    disabled={isLoading}
                    className="w-full text-sm py-2 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Login as Recruiter
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleQuickLogin("candidate")}
                    disabled={isLoading}
                    className="w-full text-sm py-2 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Login as Candidate
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm lg:w-2/5">
          <Lottie animationData={loginData} />
        </div>
      </div>
    </div>
  );
};

export default Login;
