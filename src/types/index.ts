export enum UserRole {
  CANDIDATE = "CANDIDATE",
  RECRUITER = "RECRUITER",
  ADMIN = "ADMIN",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  address?: string;
  bio?: string;
  username?: string;
  phone?: string;
  role: UserRole;
  isBlocked?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type TJobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance"
  | "internship";

export enum JobCategory {
  MARKETING_SALES = "Marketing & Sales",
  CUSTOMER_SERVICE = "Customer Service",
  WEB_DEVELOPMENT = "Web Development",
  FINANCE_ACCOUNTING = "Finance & Accounting",
  HUMAN_RESOURCE = "Human Resource",
  DESIGN_CREATIVE = "Design & Creative",
  RETAIL_PRODUCTS = "Retail & Products",
  EDUCATION_TRAINING = "Education & Training",
}

export type TJobStatus = "open" | "closed";

export interface IJob {
  _id: string;
  title: string;
  description: string;
  recruiter?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  company?: string;
  jobType: TJobType;
  category?: JobCategory;
  requiredSkills: string[];
  location: string;
  status: TJobStatus;
  salaryRange: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type TApplicationStatus =
  | "pending"
  | "reviewed"
  | "accepted"
  | "rejected";

export interface IJobApplication {
  _id: string;
  job: IJob;
  candidate: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    bio?: string;
    address?: string;
  };
  status: TApplicationStatus;
  coverLetter?: string;
  resume?: string;
  appliedAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
