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

export interface IJob {
  title: string;
  description: string;
  jobType: TJobType;
  requiredSkills: string[];
  location: string;
  salaryRange: string;
}
