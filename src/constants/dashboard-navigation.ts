 
import { UserRole } from "@/types";
import {
  BarChart3,
  Briefcase,
  Building2,
  File,
  PlusCircle,
  User,
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
        title: "All Jobs",
        url: "/admin/all-jobs",
        icon: Briefcase,
      },
      {
        title: "All Recruiters",
        url: "/admin/all-recruiters",
        icon: Building2,
      },
    ],
  },

  // Candidate Navigation
  {
    role: UserRole.CANDIDATE,
    items: [
      {
        title: "My Applications",
        url: "/candidate/applications",
        icon: File,
      },
    ],
  },

  // Recruiter Navigation
  {
    role: UserRole.RECRUITER,
    items: [
      {
        title: "Analytics",
        url: "/recruiter/analytics",
        icon: BarChart3,
      },
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
      // {
      //   title: "Applications",
      //   url: "/recruiter/applications",
      //   icon: FileText,
      // },
    ],
  },
];

export const getNavigationForRole = (role: UserRole): NavigationItem[] => {
  const navigation = DASHBOARD_NAVIGATION.find((nav) => nav.role === role);
  return navigation?.items || [];
};
