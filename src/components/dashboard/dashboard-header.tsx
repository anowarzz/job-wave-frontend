"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardHeaderProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

// Mock user data - will be replaced with real user context
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "ADMIN",
};

export function DashboardHeader({
  title,
  description,
  actions,
}: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Auto-generate title from pathname if not provided
  const getPageTitle = () => {
    if (title) return title;

    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    if (
      lastSegment === "admin" ||
      lastSegment === "candidate" ||
      lastSegment === "recruiter"
    ) {
      return "Dashboard";
    }

    return (
      lastSegment
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || "Dashboard"
    );
  };

  const getPageDescription = () => {
    if (description) return description;

    const role = mockUser.role.toLowerCase();
    return `Welcome to your ${role} dashboard`;
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      {/* Left side - Sidebar trigger and page info */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-foreground">
            {getPageTitle()}
          </h1>
          <p className="text-xs text-muted-foreground">
            {getPageDescription()}
          </p>
        </div>
      </div>

      {/* Center - Custom actions */}
      <div className="flex-1 flex justify-center">{actions}</div>

      {/* Right side - Theme toggle, logout, user icon */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Logout Button */}
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          <span className="sr-only">Logout</span>
        </Button>

        {/* User Profile Icon */}
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile">
            <User className="h-4 w-4" />
            <span className="sr-only">Profile</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
