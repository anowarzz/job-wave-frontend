import { UserRole } from "@/types";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Eye,
  FileText,
  Heart,
  Home,
  MessageSquare,
  PlusCircle,
  Search,
  Settings,
  Star,
  User,
  Users,
} from "lucide-react";

export interface NavigationItem {
  title: string;
  url: string;
  icon: any;
  badge?: string;
  items?: NavigationItem[];
}

export interface RoleNavigation {
  role: UserRole;
  items: NavigationItem[];
}

export const DASHBOARD_NAVIGATION: RoleNavigation[] = [
  // Admin Navigation
  {
    role: UserRole.ADMIN,
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
      },
      {
        title: "User Management",
        url: "/admin/users",
        icon: Users,
        items: [
          {
            title: "All Users",
            url: "/admin/users",
            icon: Users,
          },
          {
            title: "Candidates",
            url: "/admin/users/candidates",
            icon: User,
          },
          {
            title: "Recruiters",
            url: "/admin/users/recruiters",
            icon: Building2,
          },
        ],
      },
      {
        title: "Job Management",
        url: "/admin/jobs",
        icon: Briefcase,
        items: [
          {
            title: "All Jobs",
            url: "/admin/jobs",
            icon: Briefcase,
          },
          {
            title: "Pending Approval",
            url: "/admin/jobs/pending",
            icon: Eye,
            badge: "5",
          },
          {
            title: "Job Categories",
            url: "/admin/jobs/categories",
            icon: BookOpen,
          },
        ],
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: BarChart3,
      },
      {
        title: "Reports",
        url: "/admin/reports",
        icon: FileText,
        badge: "3",
      },
      {
        title: "System Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },

  // Candidate Navigation
  {
    role: UserRole.CANDIDATE,
    items: [
      {
        title: "Dashboard",
        url: "/candidate",
        icon: Home,
      },
      {
        title: "Find Jobs",
        url: "/candidate/jobs",
        icon: Search,
        items: [
          {
            title: "Browse Jobs",
            url: "/candidate/jobs",
            icon: Search,
          },
          {
            title: "Recommendations",
            url: "/candidate/jobs/recommendations",
            icon: Star,
          },
          {
            title: "Saved Jobs",
            url: "/candidate/jobs/saved",
            icon: Heart,
            badge: "12",
          },
        ],
      },
      {
        title: "Applications",
        url: "/candidate/applications",
        icon: FileText,
        badge: "8",
        items: [
          {
            title: "All Applications",
            url: "/candidate/applications",
            icon: FileText,
          },
          {
            title: "In Progress",
            url: "/candidate/applications/progress",
            icon: Eye,
            badge: "3",
          },
          {
            title: "Interviews",
            url: "/candidate/applications/interviews",
            icon: Calendar,
            badge: "2",
          },
        ],
      },
      {
        title: "Profile",
        url: "/candidate/profile",
        icon: User,
        items: [
          {
            title: "Edit Profile",
            url: "/candidate/profile",
            icon: User,
          },
          {
            title: "Resume",
            url: "/candidate/profile/resume",
            icon: FileText,
          },
          {
            title: "Skills Assessment",
            url: "/candidate/profile/skills",
            icon: Star,
          },
        ],
      },
      {
        title: "Messages",
        url: "/candidate/messages",
        icon: MessageSquare,
        badge: "4",
      },
      {
        title: "Settings",
        url: "/candidate/settings",
        icon: Settings,
      },
    ],
  },

  // Recruiter Navigation
  {
    role: UserRole.RECRUITER,
    items: [
      {
        title: "Post New Job",
        url: "/recruiter/jobs/add-job",
        icon: PlusCircle,
      },
      {
        title: "My Posted Jobs",
        url: "/recruiter/my-posted-jobs",
        icon: Briefcase,
      },
      {
        title: "Job Applications",
        url: "/recruiter/applications",
        icon: FileText,
      },
      {
        title: "Analytics",
        url: "/recruiter/analytics",
        icon: BarChart3,
      },
    ],
  },
];

export const getNavigationForRole = (role: UserRole): NavigationItem[] => {
  const navigation = DASHBOARD_NAVIGATION.find((nav) => nav.role === role);
  return navigation?.items || [];
};
