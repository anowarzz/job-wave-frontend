"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Briefcase,
  Building,
  Calendar,
  Clock,
  FileText,
  Filter,
  MapPin,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

const getStatusColor = (status: string) => {
  if (!status) return "secondary";

  switch (status.toLowerCase()) {
    case "accepted":
      return "default";
    case "pending":
    case "under-review":
      return "secondary";
    case "interview-scheduled":
      return "outline";
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
};

const formatStatus = (status: string) => {
  if (!status) return "Unknown";

  switch (status.toLowerCase()) {
    case "pending":
      return "Under Review";
    case "under-review":
      return "Under Review";
    case "interview-scheduled":
      return "Interview Scheduled";
    case "accepted":
      return "Accepted";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
};

const MyApplications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch applications using SWR
  const { data, error, isLoading } = useSWR("/candidate/my-applications");

  const applications = data?.data || [];
  const hasApplications = applications.length > 0;

  console.log(applications);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const filteredApplications = applications.filter((app: any) => {
    const companyName =
      app.job.company?.name || app.job.recruiter?.name || "Unknown Company";
    const matchesSearch =
      app.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (app.status &&
        app.status.toLowerCase().replace("-", "-") === statusFilter);
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    underReview: applications.filter(
      (app: any) =>
        app.status &&
        (app.status === "pending" || app.status === "under-review")
    ).length,
    interviews: applications.filter(
      (app: any) => app.status && app.status === "interview-scheduled"
    ).length,
    accepted: applications.filter(
      (app: any) => app.status && app.status === "accepted"
    ).length,
  };

  // Handle error state
  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-destructive/10 p-6 mb-6">
            <FileText className="h-12 w-12 text-destructive" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Failed to load applications
          </h3>
          <p className="text-muted-foreground mb-6">
            There was an error loading your applications. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Loading Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-32" />
        </div>

        {/* Loading Table */}
        <Card>
          <CardContent className="p-0">
            <div className="space-y-4 p-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Applications
                </p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/20 p-2">
                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Under Review
                </p>
                <p className="text-2xl font-bold">{stats.underReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-2">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Interviews
                </p>
                <p className="text-2xl font-bold">{stats.interviews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-2">
                <Briefcase className="h-4 w-4 text-green-600 dark:text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Accepted
                </p>
                <p className="text-2xl font-bold">{stats.accepted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search jobs or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Status:{" "}
              {statusFilter === "all" ? "All" : formatStatus(statusFilter)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              All Applications
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("under-review")}>
              Under Review
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setStatusFilter("interview-scheduled")}
            >
              Interview Scheduled
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

      {/* Applications Table or Empty State */}
      {hasApplications && filteredApplications.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>
              Showing {filteredApplications.length} of {applications.length}{" "}
              applications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Details</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application: any) => {
                  const companyName =
                    application.job.company?.name ||
                    application.job.recruiter?.name ||
                    "Unknown Company";

                  return (
                    <TableRow key={application._id}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{application.job.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase className="h-3 w-3" />
                            {application.job.jobType}
                            <span>•</span>
                            {application.job.salaryRange}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          {companyName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {application.job.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(
                            application.appliedAt || application.createdAt
                          ).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(application.status)}>
                          {formatStatus(application.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link href={`/jobs/${application.job._id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        // Empty State
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6 mb-6">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {filteredApplications.length === 0 && applications.length > 0
                ? "No applications match your filters"
                : "No applications yet"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {filteredApplications.length === 0 && applications.length > 0
                ? "Try adjusting your search query or filters to find applications."
                : "You haven't applied to any jobs yet. Start exploring job opportunities and submit your applications."}
            </p>
            <div className="flex gap-3">
              {filteredApplications.length === 0 && applications.length > 0 ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              ) : (
                <Button>Browse Jobs</Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyApplications;
