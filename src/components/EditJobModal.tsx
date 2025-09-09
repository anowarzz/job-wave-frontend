"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import baseApi from "@/lib/axios";
import { IJob, JobCategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
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
  category: z.nativeEnum(JobCategory, {
    message: "Please select a job category",
  }),
  requiredSkills: z.string().min(1, "At least one skill is required"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location must be less than 100 characters"),
  salaryRange: z.string().min(1, "Salary range is required"),
});

type JobFormData = z.infer<typeof jobSchema>;

interface EditJobModalProps {
  job: IJob | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJobUpdated: () => void;
}

export const EditJobModal = ({
  job,
  open,
  onOpenChange,
  onJobUpdated,
}: EditJobModalProps) => {
  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      jobType: "full-time",
      category: JobCategory.WEB_DEVELOPMENT,
      requiredSkills: "",
      location: "",
      salaryRange: "",
    },
  });

  // Reset and populate form when job changes
  useEffect(() => {
    if (job) {
      form.reset({
        title: job.title,
        description: job.description,
        jobType: job.jobType,
        category: job.category || JobCategory.WEB_DEVELOPMENT,
        requiredSkills: job.requiredSkills.join(", "),
        location: job.location,
        salaryRange: job.salaryRange,
      });
    }
  }, [job, form]);

  const onSubmit = async (data: JobFormData) => {
    if (!job) return;

    try {
      // Convert requiredSkills string to array
      const updateData = {
        ...data,
        requiredSkills: data.requiredSkills
          ? data.requiredSkills
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill.length > 0)
          : [],
      };

      // Make PATCH request to update job
      await baseApi.patch(`/jobs/${job._id}`, updateData);

      // Show success toast
      toast.success("Job updated successfully!", {
        description: `The job "${data.title}" has been updated.`,
      });

      // Close modal and refresh data
      onOpenChange(false);
      onJobUpdated();
    } catch (error) {
      console.error("Error updating job:", error);

      // Show error toast
      let errorMessage = "Failed to update job";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      toast.error("Failed to update job", {
        description: errorMessage,
      });
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form when closing
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
          <DialogDescription>
            Update any job details below. Only modified fields will be updated.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="freelance">Freelance</option>
                        <option value="internship">Internship</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a job category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(JobCategory).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Updating..." : "Update Job"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
