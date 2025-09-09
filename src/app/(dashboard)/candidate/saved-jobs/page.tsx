"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import baseApi from "@/lib/axios";
import { Bookmark, Calendar, Eye, MapPin, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import useSWR from "swr";

const MySavedJobs = () => {
  const {
    data: savedJobsData,
    error,
    isLoading,
    mutate,
  } = useSWR("/candidate/my-saved-jobs");
  const savedJobs = savedJobsData?.data || [];

  // Format date
  const formatDate = (date: string | Date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format job type
  const formatJobType = (jobType: string) => {
    if (!jobType) return "N/A";
    return jobType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Handle remove from saved jobs
  const handleRemoveJob = async (jobId: string) => {
    try {
      await baseApi.delete(`/candidate/remove-saved-job/${jobId}`);

      toast.success("Job removed from saved jobs");

      mutate();
    } catch (error) {
      console.error("Error removing job:", error);
      toast.error("Failed to remove job. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              My Saved Jobs
            </h1>
            <p className="text-muted-foreground">
              Manage your saved job opportunities
            </p>
          </div>
        </div>

        <div className="border rounded-lg">
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading saved jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              My Saved Jobs
            </h1>
            <p className="text-muted-foreground">
              Manage your saved job opportunities
            </p>
          </div>
        </div>

        <div className="border rounded-lg">
          <div className="p-8 text-center">
            <p className="text-destructive">
              Error loading saved jobs. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Saved Jobs</h1>
          <p className="text-muted-foreground">
            You have {savedJobs.length} saved job
            {savedJobs.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            {savedJobs.length} Saved
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-card">
        {savedJobs.length === 0 ? (
          <div className="p-8 text-center">
            <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Saved Jobs
            </h3>
            <p className="text-muted-foreground mb-4">
              You haven't saved any jobs yet. Start exploring and save jobs
              you're interested in.
            </p>
            <Link href="/all-jobs">
              <Button>Browse Jobs</Button>
            </Link>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Saved Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedJobs.map((savedJob: any) => (
                <TableRow key={savedJob._id}>
                  <TableCell className="font-medium">
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">
                        {savedJob?.job?.title}
                      </div>
      
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">
                      {savedJob?.job?.recruiter?.name ||
                        savedJob.company ||
                        "Company Name"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{savedJob?.job.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {formatJobType(savedJob?.job?.jobType)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">
                      {savedJob?.job?.salaryRange || "Negotiable"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(savedJob.createdAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/jobs/${savedJob?.job?._id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveJob(savedJob?.job?._id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Footer Stats */}
      {savedJobs.length > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
          <div>
            Showing {savedJobs.length} saved job
            {savedJobs.length !== 1 ? "s" : ""}
          </div>
          <div>Last updated: {new Date().toLocaleDateString()}</div>
        </div>
      )}
    </div>
  );
};

export default MySavedJobs;
