"use client";

import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { EditJobModal } from "@/components/EditJobModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetcher } from "@/lib/fetcher";
import { IJob } from "@/types";
import { ChevronDown, Filter, Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

const MyPostedJobs = () => {
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);
  const [editingJob, setEditingJob] = useState<IJob | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    "/recruiter/my-posted-jobs",
    fetcher
  );

  const jobs = data?.data || [];

  // Delete  a job post
  const handleDeleteJob = async (jobId: string, jobTitle: string) => {
    if (deletingJobId) return;

    setDeletingJobId(jobId);

    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

      const response = await fetch(`${API_BASE_URL}/recruiter/jobs/${jobId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        let errorMessage = "Failed to delete job";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Failed to delete job: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Show success message
      toast.success("Job deleted successfully", {
        description: `"${jobTitle}" has been permanently deleted.`,
      });

      // Refresh the jobs list
      mutate();
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    } finally {
      setDeletingJobId(null);
    }
  };

  // edit a job
  const handleEditJob = (job: IJob) => {
    setEditingJob(job);
    setIsEditModalOpen(true);
  };

  const handleJobUpdated = () => {
    mutate(); // Refresh the jobs list
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Jobs
          </h2>
          <p className="text-muted-foreground">
            Failed to load your posted jobs. Please try again later.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Posted Jobs</h1>
        <p className="text-muted-foreground">
          Manage and track your job postings
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search jobs..." className="pl-10" />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                Status
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Status</DropdownMenuItem>
              <DropdownMenuItem>Open</DropdownMenuItem>
              <DropdownMenuItem>Closed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[140px]">
                Date Posted
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Time</DropdownMenuItem>
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem>Last 3 months</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="border rounded-lg">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading jobs...</span>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Salary Range</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs && jobs.length > 0 ? (
                jobs.map((job: IJob) => (
                  <TableRow key={job._id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell className="capitalize">
                      {job.jobType.replace("-", " ")}
                    </TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>
                      {new Date(job.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === "open"
                            ? "bg-green-100 text-green-800"
                            : job.status === "closed"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.status.charAt(0).toUpperCase() +
                          job.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{job.salaryRange}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                            <ChevronDown className="h-4 w-4 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/jobs/${job._id}`}>View Job</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault();
                              handleEditJob(job);
                            }}
                          >
                            Edit Job
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/recruiter/jobs/${job._id}/applications`}
                            >
                              View Applications
                            </Link>
                          </DropdownMenuItem>
                          <ConfirmationDialog
                            description={`Are you sure you want to delete "${job.title}"? This action cannot be undone and will also delete all associated applications.`}
                            onConfirm={() =>
                              handleDeleteJob(job._id, job.title)
                            }
                          >
                            <DropdownMenuItem
                              className="text-red-600"
                              onSelect={(e) => e.preventDefault()}
                              disabled={deletingJobId === job._id}
                            >
                              {deletingJobId === job._id
                                ? "Deleting..."
                                : "Delete"}
                            </DropdownMenuItem>
                          </ConfirmationDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="text-muted-foreground">
                      No jobs posted yet. Create your first job posting to get
                      started.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination placeholder */}
      {jobs && jobs.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {jobs.length} of {jobs.length} jobs
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      <EditJobModal
        job={editingJob}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onJobUpdated={handleJobUpdated}
      />
    </div>
  );
};

export default MyPostedJobs;
