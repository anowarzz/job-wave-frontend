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

export type TJobStatus = "open" | "closed";

export interface IJob {
  _id: string;
  title: string;
  description: string;
  recruiter?: string;
  jobType: TJobType;
  requiredSkills: string[];
  location: string;
  status: TJobStatus;
  salaryRange: string;
  createdAt: Date;
  updatedAt: Date;
}
