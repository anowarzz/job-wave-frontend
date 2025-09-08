"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  BarChart3,
  Briefcase,
  RefreshCw,
  Users,
} from "lucide-react";
import useSWR from "swr";

interface AnalyticsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    totalJobsPosted: number;
    totalApplications: number;
  };
}

const RecruiterAnalytics = () => {
  const { data, error, isLoading, mutate } = useSWR<AnalyticsResponse>(
    "/recruiter/analytics"
  );

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-muted-foreground" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-destructive">
                  Failed to Load Analytics
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  {error.message ||
                    "Something went wrong while loading your analytics data. Please try again."}
                </p>
              </div>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Refreshing data...
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Recruiter Analytics</h1>
        </div>
        <Button
          onClick={() => mutate()}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Jobs Posted
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {data?.data.totalJobsPosted || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Jobs you've posted
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {data?.data.totalApplications || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Applications received
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterAnalytics;
