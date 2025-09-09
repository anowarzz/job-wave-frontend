/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import { Briefcase, FireExtinguisher } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { Button } from "../ui/button";
import HotJobsCard from "./JobCard";

const HotJobs = () => {
  const { data: allJobs, error, isLoading } = useSWR("/jobs/all-jobs");
  const jobs = allJobs?.data?.slice(0, 6) || [];
  const loading = isLoading;

  // Loading skeletons for hot jobs
  const LoadingUI = () => (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden bg-card border shadow-lg transition-all duration-300 h-[320px]"
          >
            <div className="p-5 h-full">
              {/* Company logo skeleton */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg animate-pulse bg-muted"></div>
                <div className="flex-1">
                  <div className="h-4 w-3/4 mb-2 rounded animate-pulse bg-muted"></div>
                  <div className="h-3 w-1/2 rounded animate-pulse bg-muted"></div>
                </div>
              </div>

              {/* Job title skeleton */}
              <div className="h-6 w-full mb-4 rounded animate-pulse bg-muted"></div>

              {/* Tags skeleton */}
              <div className="flex flex-wrap gap-2 mb-5">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-7 w-16 rounded-full animate-pulse bg-muted"
                    style={{ animationDelay: `${i * 150}ms` }}
                  ></div>
                ))}
              </div>

              {/* Description skeleton */}
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 rounded animate-pulse bg-muted"
                    style={{
                      width: `${85 - i * 15}%`,
                      animationDelay: `${i * 200}ms`,
                    }}
                  ></div>
                ))}
              </div>

              {/* Button skeleton */}
              <div className="mt-6 flex justify-end">
                <div className="h-9 w-28 rounded-full animate-pulse bg-primary/30"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Floating briefcase animation during loading
  const LoadingAnimation = () => (
    <div className="flex justify-center items-center my-12">
      <div className="relative">
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary to-blue-500"
        >
          <Briefcase className="text-white text-2xl" />
        </motion.div>

        {/* Decorative dots */}
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-400"
        ></motion.div>

        {/* Shadow underneath */}
        <motion.div
          animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 rounded-full bg-primary/50 blur-sm"
        ></motion.div>
      </div>
    </div>
  );

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background with improved dark mode pattern */}
      <div className="absolute inset-0 bg-background/95">
        <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-grid-pattern"></div>
      </div>

      {/* Decorative elements with enhanced dark mode styling */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full opacity-10 dark:opacity-5 bg-gradient-to-br from-primary to-blue-500 dark:from-purple-600 dark:to-blue-700 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full opacity-10 dark:opacity-5 bg-gradient-to-tr from-purple-500 to-pink-500 dark:from-indigo-700 dark:to-purple-800 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          {/* Section title with icon */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <FireExtinguisher className="text-xl text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground transition-colors">
              Hot Jobs <span className="text-primary">Today</span>
            </h2>
          </div>
          <p className="max-w-2xl mx-auto text-muted-foreground transition-colors">
            Discover the most sought-after positions currently available. These
            opportunities are in high demand and won't last long!
          </p>
        </div>

        {/* Jobs grid */}
        {loading ? (
          <>
            <LoadingAnimation />
            <LoadingUI />
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3  gap-6 md:gap-8">
            {jobs?.map((job: any) => (
              <HotJobsCard key={job?._id} job={job} />
            ))}
          </div>
        )}

        {/* View all jobs button */}
        <div className="text-center mt-12">
          <Link href={"/all-jobs"}>
            <Button className="font-medium py-3.5 px-12 rounded-full relative overflow-hidden group bg-gradient-to-r from-primary to-blue-600 dark:from-purple-600 dark:to-blue-500 text-white shadow-lg hover:shadow-xl dark:shadow-purple-500/25 dark:hover:shadow-purple-500/40 transition-all duration-300 border border-transparent dark:border-purple-400/30">
              <span className="relative z-10 drop-shadow-sm">
                View All Job Openings
              </span>
              <span className="absolute inset-0 w-0 h-full transition-all duration-300 ease-out bg-blue-500 dark:bg-gradient-to-r dark:from-purple-500 dark:to-blue-400 left-0 group-hover:w-full"></span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotJobs;
