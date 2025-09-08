/* eslint-disable no-explicit-any */

import { IJob } from "@/types";
import { Bookmark, Clock, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

const HotJobsCard = ({ job }: { job: IJob }) => {
  // Format salary range
  const formatSalary = (salaryRange: string) => {
    return salaryRange || "Negotiable";
  };

  return (
    <div className="p-6 rounded-xl transition-all duration-300 group cursor-pointer hover:shadow-xl relative overflow-hidden bg-card border shadow-lg hover:shadow-card/30 backdrop-blur-sm">
      <div className="flex flex-col h-full">
        {/* Header with bookmark */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg mb-1 text-foreground">
              {job?.title || "Job Title"}
            </h3>
          </div>
          <button className="p-2 rounded-full transition-all duration-300 text-muted-foreground hover:text-primary hover:bg-muted">
            <Bookmark />
          </button>
        </div>

        {/* Key skills badges */}
        {job?.requiredSkills && job?.requiredSkills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {job?.requiredSkills?.map((skill: any, index: number) => (
              <div
                key={index}
                className="text-xs font-medium px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/30"
              >
                {skill}
              </div>
            ))}
          </div>
        )}

        {/* Job details */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground">
            <MapPin className="mr-1 text-xs" />
            {job?.location || "Location"}
          </div>
          <div className="flex items-center text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground">
            <Clock className="mr-1 text-xs" />
            {job?.jobType
              ? job.jobType
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())
              : "Job Type"}
          </div>
          <div className="flex items-center text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground">
            <DollarSign className="mr-1 text-xs" />
            {job?.salaryRange ? formatSalary(job?.salaryRange) : "Salary"}
          </div>
        </div>

        {/* Job description */}
        <p className="text-sm mb-5 flex-grow text-muted-foreground">
          {job?.description || "No description available"}
        </p>

        {/* Footer with apply button */}
        <div className="flex justify-between items-center mt-auto">
          <div className="text-sm text-muted-foreground">
            {job?.createdAt
              ? new Date(job.createdAt).toLocaleDateString()
              : "Posted recently"}
          </div>
          <Link href={`/jobs/${job?._id}`}>
            <button className="text-sm font-medium py-1.5 px-4 rounded-full transition-all duration-300 bg-primary text-white hover:bg-primary/90">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotJobsCard;
