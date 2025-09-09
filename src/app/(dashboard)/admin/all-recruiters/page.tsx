"use client";

import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import baseApi from "@/lib/axios";
import {
  Building2,
  ExternalLink,
  Mail,
  MapPin,
  Search,
  Shield,
  ShieldOff,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

const AllRecruiters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blockingUserId, setBlockingUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const { data, error, isLoading, mutate } = useSWR("/admin/all-recruiters");

  const recruiters = data?.data || [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can use searchQuery here for your search functionality
    console.log("Search query:", searchQuery);
  };

  // block recruiter
  const handleBlockUser = async (userId: string, userName: string) => {
    try {
      setBlockingUserId(userId);
      await baseApi.patch(`/admin/users/block/${userId}`);

      mutate();

      toast.success(`${userName} has been blocked successfully`);
    } catch (error: any) {
      console.error("Error blocking user:", error);
      toast.error(error?.response?.data?.message || "Failed to block user");
    } finally {
      setBlockingUserId(null);
    }
  };

  // unblock recruiter
  const handleUnblockUser = async (userId: string, userName: string) => {
    try {
      setBlockingUserId(userId);
      await baseApi.patch(`/admin/users/unblock/${userId}`);

      // Update the local data optimistically
      mutate();

      toast.success(`${userName} has been unblocked successfully`);
    } catch (error: any) {
      console.error("Error unblocking user:", error);
      toast.error(error?.response?.data?.message || "Failed to unblock user");
    } finally {
      setBlockingUserId(null);
    }
  };

  // delete recruiter
  const handleDeleteUser = async (userId: string, userName: string) => {
    try {
      setDeletingUserId(userId);
      await baseApi.delete(`/admin/users/delete/${userId}`);

      // Update the local data optimistically
      mutate();

      toast.success(`${userName} has been deleted successfully`);
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast.error(error?.response?.data?.message || "Failed to delete user");
    } finally {
      setDeletingUserId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Loading recruiters...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              Error loading recruiters: {error.message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Recruiters
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recruiters.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Recruiters
            </CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recruiters.filter((r: any) => !r.isBlocked).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blocked Recruiters
            </CardTitle>
            <Building2 className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recruiters.filter((r: any) => r.isBlocked).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recruiters List */}
      <Card>
        <CardHeader>
          <CardTitle>Recruiters List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search recruiters by name, email, or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recruiters.length > 0 ? (
                recruiters.map((recruiter: any) => (
                  <TableRow key={recruiter._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="font-medium">{recruiter.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {recruiter.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {recruiter.location || recruiter.address || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          recruiter.isBlocked ? "destructive" : "secondary"
                        }
                      >
                        {recruiter.isBlocked ? "Blocked" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/user/${recruiter._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <User className="h-3 w-3" />
                          View Profile
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          variant={
                            recruiter.isBlocked ? "default" : "destructive"
                          }
                          size="sm"
                          disabled={blockingUserId === recruiter._id}
                          onClick={() =>
                            recruiter.isBlocked
                              ? handleUnblockUser(recruiter._id, recruiter.name)
                              : handleBlockUser(recruiter._id, recruiter.name)
                          }
                        >
                          {blockingUserId === recruiter._id ? (
                            <>
                              <div className="animate-spin h-3 w-3 border border-current border-t-transparent rounded-full mr-1" />
                              {recruiter.isBlocked
                                ? "Unblocking..."
                                : "Blocking..."}
                            </>
                          ) : recruiter.isBlocked ? (
                            <>
                              <Shield className="h-3 w-3 mr-1" />
                              Unblock
                            </>
                          ) : (
                            <>
                              <ShieldOff className="h-3 w-3 mr-1" />
                              Block
                            </>
                          )}
                        </Button>
                        <ConfirmationDialog
                          description={`This will permanently delete ${recruiter.name} from the system. This action cannot be undone.`}
                          onConfirm={() =>
                            handleDeleteUser(recruiter._id, recruiter.name)
                          }
                        >
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={deletingUserId === recruiter._id}
                          >
                            {deletingUserId === recruiter._id ? (
                              <>
                                <div className="animate-spin h-3 w-3 border border-current border-t-transparent rounded-full mr-1" />
                                Deleting...
                              </>
                            ) : (
                              <>
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                              </>
                            )}
                          </Button>
                        </ConfirmationDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No recruiters found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllRecruiters;
