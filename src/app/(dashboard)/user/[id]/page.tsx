"use client";

import { fetcher } from "@/lib/fetcher";
import { User } from "lucide-react";
import { useParams } from "next/navigation";
import useSWR from "swr";

const UserProfile = () => {
  const params = useParams();
  const userId = params.id as string;

  console.log("User ID:", userId);

  const { data, error, isLoading } = useSWR(`/user/${userId}`, fetcher);

  const user = data?.data;

  console.log("User data:", user);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load profile data</p>
          <p className="text-sm text-red-500 mt-2">
            {error?.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        {/* Header Card */}
        <div className="bg-card rounded-lg border p-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>

            {/* Basic User Info */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold">
                {user?.name || "Not available"}
              </h1>
              <p className="text-muted-foreground">
                {user?.email || "Not available"}
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                {user?.role || "Not available"}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Username
              </label>
              <p className="text-sm">{user?.username || "Not available"}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Phone
              </label>
              <p className="text-sm">{user?.phone || "Not available"}</p>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">
                Address
              </label>
              <p className="text-sm">{user?.address || "Not available"}</p>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">
                Bio
              </label>
              <p className="text-sm">{user?.bio || "Not available"}</p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Account Status
              </label>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    user?.isBlocked ? "bg-red-500" : "bg-green-500"
                  }`}
                ></div>
                <p className="text-sm">
                  {user?.isBlocked ? "Blocked" : "Active"}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Member Since
              </label>
              <p className="text-sm">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Not available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
