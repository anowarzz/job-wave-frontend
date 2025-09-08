"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "@/components/ui/sidebar";
import { BarChart3, Briefcase, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";

// Simple admin navigation
const adminNavItems = [
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },

  {
    title: "All Candidates",
    url: "/admin/all-candidates",
    icon: User,
  },
  {
    title: "All Recruiters",
    url: "/admin/all-recruiters",
    icon: Users,
  },
  {
    title: "All Jobs",
    url: "/admin/all-jobs",
    icon: Briefcase,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const { data, isLoading } = useSWR("/user/me");
  const user = data?.data;

  return (
    <Sidebar variant="sidebar" className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="text-xl font-bold">
              <span className="text-gray-800 dark:text-gray-200">Job</span>
              <span className="bg-gradient-to-r from-primary to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Wave
              </span>
            </div>
          </Link>
        </div>
        <div className="text-xs text-muted-foreground">Admin Dashboard</div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="w-full"
                  >
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.jpg" alt="Admin" />
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
