"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IJob } from "@/types";
import {
  ArrowLeft,
  Bookmark,
  Building,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";

const JobDetails = () => {
  const params = useParams();
  const jobId = params.id as string;

  // Fetch job details using SWR
  const { data, error, isLoading } = useSWR(`/jobs/${jobId}`);

  const job: IJob = data?.data;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500">
            Failed to load job details. Please try again later.
          </p>
          <Link href="/all-jobs">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Job not found.</p>
          <Link href="/all-jobs">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Format salary range
  const formatSalary = (salaryRange: string) => {
    return salaryRange || "Negotiable";
  };

  // Format job type
  const formatJobType = (jobType: string) => {
    return jobType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/all-jobs">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Jobs
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center">
                      <Building className="mr-1 h-4 w-4" />
                      Company Name
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString()
                        : "Posted recently"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {job.description}
              </p>
            </CardContent>
          </Card>

          {/* Required Skills */}
          {job.requiredSkills && job.requiredSkills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">
                    {job.location}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Job Type</p>
                  <p className="text-sm text-muted-foreground">
                    {formatJobType(job.jobType)}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Salary Range</p>
                  <p className="text-sm text-muted-foreground">
                    {formatSalary(job.salaryRange)}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Status</p>
                  <Badge
                    variant={job.status === "open" ? "default" : "secondary"}
                  >
                    {job.status === "open" ? "Open" : "Closed"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Apply Button */}
          <Card>
            <CardContent className="pt-6">
              <Button
                className="w-full"
                size="lg"
                disabled={job.status !== "open"}
              >
                {job.status === "open" ? "Apply Now" : "Job Closed"}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Quick and easy application process
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
