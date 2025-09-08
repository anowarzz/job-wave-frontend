"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { getNavigationForRole } from "@/constants/dashboard-navigation";
import { UserRole } from "@/types";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  const { data } = useSWR("/user/me");
  const user = data?.data;

  const navigationItems = user?.role
    ? getNavigationForRole(user.role as UserRole)
    : [];

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
    // On desktop, do nothing - keep sidebar open
  };

  const getDashboardTitle = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "Admin Dashboard";
      case UserRole.RECRUITER:
        return "Recruiter Dashboard";
      case UserRole.CANDIDATE:
        return "Candidate Dashboard";
      default:
        return "Dashboard";
    }
  };

  const renderNavigationItem = (item: any) => {
    const isActive = pathname === item.url;

    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild isActive={isActive} className="w-full">
          <Link
            href={item.url}
            className="flex items-center gap-2"
            onClick={handleLinkClick}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-auto text-xs">
                {item.badge}
              </Badge>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar variant="sidebar" className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Link href="/" onClick={handleLinkClick}>
            <div className="text-xl font-bold">
              <span className="text-gray-800 dark:text-gray-200">Job</span>
              <span className="bg-gradient-to-r from-primary to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Wave
              </span>
            </div>
          </Link>
        </div>
        <div className="text-xs text-muted-foreground">
          {user?.role ? getDashboardTitle(user.role as UserRole) : "Dashboard"}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => renderNavigationItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.jpg" alt={user?.name || "User"} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-sm">
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs text-muted-foreground">{user?.email}</div>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
