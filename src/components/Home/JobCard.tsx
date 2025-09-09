/* eslint-disable @typescript-eslint/no-explicit-any */

import { IJob } from "@/types";
import { Bookmark, Clock, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

const HotJobsCard = ({
  job,
  featured = false,
}: {
  job: IJob;
  featured?: boolean;
}) => {
  // Format salary range
  const formatSalary = (salaryRange: string) => {
    return salaryRange || "₹30,000 - 50,000";
  };

  // Get time ago
  const getTimeAgo = (date: string | Date) => {
    if (!date) return "2 hours ago";
    const now = new Date();
    const posted = typeof date === "string" ? new Date(date) : date;
    const diffInHours = Math.floor(
      (now.getTime() - posted.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return `${diffInDays} days ago`;
      } else {
        const diffInWeeks = Math.floor(diffInDays / 7);
        return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
      }
    }
  };

  return (
    <div className="p-6 rounded-xl transition-all duration-300 group cursor-pointer hover:shadow-xl relative overflow-hidden bg-card border border-border shadow-sm">
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
          Featured
        </div>
      )}

      {/* Bookmark button */}
      <button className="absolute top-4 right-4 p-1 rounded transition-all duration-300 text-muted-foreground hover:text-foreground">
        <Bookmark size={18} />
      </button>

      <div className="flex flex-col h-full">
        {/* Header with logo and title */}
        <div className="flex items-start gap-4 mb-4 pr-8">
          {/* Company Logo */}
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
            {job?.recruiter?.name?.charAt(0) || job?.company?.charAt(0) || "G"}
          </div>

          {/* Job title and company */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1 pr-2">
              {job?.title || "Software Engineer"}
            </h3>
            <p className="text-muted-foreground text-sm">
              {job?.recruiter?.name || job?.company || "Google Inc"}
            </p>
          </div>
        </div>

        {/* Key skills badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job?.requiredSkills && job?.requiredSkills?.length > 0 ? (
            <>
              {job?.requiredSkills
                ?.slice(0, 4)
                .map((skill: any, index: number) => (
                  <span
                    key={index}
                    className="text-xs font-medium px-2 py-1 rounded bg-accent text-accent-foreground border border-border"
                  >
                    {skill}
                  </span>
                ))}
              {job?.requiredSkills?.length > 4 && (
                <span className="text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground">
                  +{job.requiredSkills.length - 4} more
                </span>
              )}
            </>
          ) : (
            <>
              <span className="text-xs font-medium px-2 py-1 rounded bg-accent text-accent-foreground border border-border">
                JavaScript
              </span>
              <span className="text-xs font-medium px-2 py-1 rounded bg-accent text-accent-foreground border border-border">
                React
              </span>
              <span className="text-xs font-medium px-2 py-1 rounded bg-accent text-accent-foreground border border-border">
                Node.js
              </span>
            </>
          )}
        </div>

        {/* Job details */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{job?.location || "Dhaka, Bangladesh"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>
              {job?.jobType
                ? job.jobType
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())
                : "Full-Time"}
            </span>
          </div>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-1 text-sm font-medium text-foreground mb-4">
          <DollarSign size={14} />
          <span>{formatSalary(job?.salaryRange)}</span>
        </div>

        {/* Job description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
          {job?.description ||
            "Join our dynamic team and work on exciting projects that make a real impact in the industry."}
        </p>

        {/* Footer with time and apply button */}
        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm text-muted-foreground">
            {getTimeAgo(job?.createdAt)}
          </span>
          <Link href={`/jobs/${job?._id || "#"}`}>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-6 py-2 rounded-lg transition-colors duration-200">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotJobsCard;
