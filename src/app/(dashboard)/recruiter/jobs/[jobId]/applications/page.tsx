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
import { IJobApplication } from "@/types";
import {
  ArrowLeft,
  ChevronDown,
  Download,
  Eye,
  Filter,
  Loader2,
  Mail,
  Phone,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

const JobApplications = () => {
  const params = useParams();
  const jobId = params.jobId as string;
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch applications for this job (using your exact backend route)
  const {
    data: applicationsData,
    error,
    isLoading,
  } = useSWR(`/recruiter/job/${jobId}/applications`, fetcher);

  // Extract data based on your backend structure
  const result = applicationsData?.data || {};
  const job = result.job || null;
  const applications: IJobApplication[] = result.applications || [];
  const totalApplications = result.totalApplications || 0;

  // Filter applications based on status and search
  const filteredApplications = applications.filter((app) => {
    const matchesStatus =
      statusFilter === "all" || app?.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      (app.candidate?.name &&
        app.candidate.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.candidate?.email &&
        app.candidate.email.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Applications
          </h2>
          <p className="text-muted-foreground">
            Failed to load applications. Please try again later.
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
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Link href="/recruiter/my-posted-jobs">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Jobs
          </Button>
        </Link>
      </div>

      {/* Job Info Card - showing available data from backend */}
      {job && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{job.title}</CardTitle>
            <CardDescription>
              Job ID: {job._id} • Total Applications: {totalApplications}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Show basic job info if we only have job ID */}
      {!job && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Job Applications</CardTitle>
            <CardDescription>
              Applications for Job ID: {jobId} • Total Applications:{" "}
              {totalApplications}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Applications Header */}
      <div>
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <p className="text-muted-foreground">
          Manage applications for this job posting
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by candidate name or email..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              Status: {statusFilter === "all" ? "All" : statusFilter}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              All Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("reviewed")}>
              Reviewed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("accepted")}>
              Accepted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
              Rejected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Applications Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {totalApplications}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Applications
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {
                  filteredApplications.filter(
                    (app) => !app?.status || app?.status === "pending"
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {
                  filteredApplications.filter(
                    (app) => app?.status === "accepted"
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">Accepted</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {
                  filteredApplications.filter(
                    (app) => app?.status === "rejected"
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading applications...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Application Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cover Letter</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map(
                    (application) =>
                      application && (
                        <TableRow key={application._id || Math.random()}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {application.candidate?.name || "Unknown"}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {application.candidate?.bio ||
                                  "No bio available"}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Mail className="h-3 w-3 mr-1" />
                                {application.candidate?.email || "No email"}
                              </div>
                              {application.candidate?.phone && (
                                <div className="flex items-center text-sm">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {application.candidate.phone}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {application.createdAt
                              ? new Date(
                                  application.createdAt
                                ).toLocaleDateString()
                              : "Unknown date"}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                application.status || "pending"
                              )}`}
                            >
                              {application.status
                                ? application.status.charAt(0).toUpperCase() +
                                  application.status.slice(1)
                                : "Pending"}
                            </span>
                          </TableCell>
                          <TableCell>
                            {application.coverLetter ? (
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            ) : (
                              <span className="text-muted-foreground text-sm">
                                No cover letter
                              </span>
                            )}
                          </TableCell>
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
                                  Mark as Reviewed
                                </DropdownMenuItem>
                                <DropdownMenuItem>Accept</DropdownMenuItem>
                                <DropdownMenuItem>Reject</DropdownMenuItem>
                                {application.resume && (
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Resume
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Email
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-muted-foreground">
                        {applications.length === 0
                          ? "No applications received yet for this job."
                          : "No applications match your current filters."}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination placeholder */}
      {filteredApplications.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredApplications.length} of {totalApplications}{" "}
            applications
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
    </div>
  );
};

export default JobApplications;
