"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const jobSchema = z.object({
  title: z
    .string()
    .min(1, "Job title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be less than 2000 characters"),
  jobType: z.enum([
    "full-time",
    "part-time",
    "contract",
    "freelance",
    "internship",
  ] as const),
  requiredSkills: z.string().min(1, "At least one skill is required"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location must be less than 100 characters"),
  salaryRange: z.string().min(1, "Salary range is required"),
});

type JobFormData = z.infer<typeof jobSchema>;

const AddNewJob = () => {
  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      jobType: "full-time",
      requiredSkills: "",
      location: "",
      salaryRange: "",
    },
  });

  const onSubmit = async (data: JobFormData) => {
    try {
      // Convert requiredSkills string to array
      const jobData = {
        ...data,
        requiredSkills: data.requiredSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0),
      };

      // Get API base URL
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

      // Make POST request to create job
      const response = await fetch(`${API_BASE_URL}/recruiter/jobs/add-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        let errorMessage = "Failed to create job posting";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          errorMessage = `Failed to create job posting: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();

      // Show success toast
      toast.success("Job posting created successfully!", {
        description: `Your job "${data.title}" has been posted.`,
      });

      // Reset form on success
      form.reset();
    } catch (error) {
      console.error("Error creating job:", error);

      // Show error toast
      toast.error("Failed to create job posting", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Job</CardTitle>
          <CardDescription>
            Fill in the details below to create a new job posting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Senior Software Engineer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Describe the job responsibilities, requirements, and what the candidate will be doing..."
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-gray-600 dark:text-foreground dark:border-input"
                        {...field}
                      >
                        <option
                          value="full-time"
                          className="bg-background text-foreground dark:bg-input dark:text-foreground"
                        >
                          Full-time
                        </option>
                        <option
                          value="part-time"
                          className="bg-background text-foreground dark:bg-input dark:text-foreground"
                        >
                          Part-time
                        </option>
                        <option
                          value="contract"
                          className="bg-background text-foreground dark:bg-input dark:text-foreground"
                        >
                          Contract
                        </option>
                        <option
                          value="freelance"
                          className="bg-background text-foreground dark:bg-input dark:text-foreground"
                        >
                          Freelance
                        </option>
                        <option
                          value="internship"
                          className="bg-background text-foreground dark:bg-input dark:text-foreground"
                        >
                          Internship
                        </option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requiredSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Skills</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. JavaScript, React, Node.js (comma-separated)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. New York, NY or Remote"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. $80,000 - $120,000 per year"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Creating Job Posting..."
                  : "Create Job Posting"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewJob;
