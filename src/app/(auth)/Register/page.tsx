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
import registerData from "@/data/register.json";
import { zodResolver } from "@hookform/resolvers/zod";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  role: z.enum(["applicant", "recruiter"]),
});

type FormData = z.infer<typeof formSchema>;

const Register = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "applicant",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
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
                Create your account
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
                          <Input
                            type="password"
                            placeholder="Create a password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground">
                          Password must be at least 6 characters with one
                          uppercase letter and one number
                        </p>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I am registering as</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-2 gap-3">
                            <div
                              className={`cursor-pointer rounded-lg transition-all duration-200 p-2 flex flex-col items-center justify-center border-2 ${
                                field.value === "applicant"
                                  ? "bg-primary/10 border-primary text-primary"
                                  : "bg-card border-border hover:bg-accent text-muted-foreground hover:text-foreground"
                              }`}
                              onClick={() => field.onChange("applicant")}
                            >
                              <div className="text-lg mb-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </div>
                              <span className="block text-sm font-medium">
                                Applicant
                              </span>
                              <input
                                type="radio"
                                value="applicant"
                                checked={field.value === "applicant"}
                                onChange={() => field.onChange("applicant")}
                                className="sr-only"
                              />
                            </div>
                            <div
                              className={`cursor-pointer rounded-lg transition-all duration-200 p-2 flex flex-col items-center justify-center border-2 ${
                                field.value === "recruiter"
                                  ? "bg-primary/10 border-primary text-primary"
                                  : "bg-card border-border hover:bg-accent text-muted-foreground hover:text-foreground"
                              }`}
                              onClick={() => field.onChange("recruiter")}
                            >
                              <div className="text-lg mb-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                              <span className="block text-sm font-medium">
                                Recruiter
                              </span>
                              <input
                                type="radio"
                                value="recruiter"
                                checked={field.value === "recruiter"}
                                onChange={() => field.onChange("recruiter")}
                                className="sr-only"
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-end">
                    <div className="text-sm">
                      <a
                        href="/auth/Login"
                        className="font-medium text-primary hover:text-primary/80 hover:underline"
                      >
                        Already have an account?
                      </a>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Create account
                  </Button>
                </form>
              </Form>

              <div className="mt-6 relative text-muted-foreground">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                {/* Social Login Component would go here */}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm lg:w-2/5">
          <Lottie animationData={registerData} />
        </div>
      </div>
    </div>
  );
};

export default Register;
