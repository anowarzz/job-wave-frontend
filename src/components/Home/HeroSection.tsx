"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import useSWR from "swr";

const HeroSection = () => {


const {data}  = useSWR("/jobs/all-jobs");

console.log(data);





  return (
    <div className="relative overflow-hidden min-h-[85vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 z-0"></div>

      <div className="absolute inset-0 opacity-10 bg-grid-pattern z-0"></div>

      <div className="container mx-auto px-4 py-12 z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
          <div className="flex-1 flex flex-col justify-center items-center relative">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-slate-500/20 dark:from-blue-600/15 dark:to-slate-700/15 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-slate-400/15 to-blue-400/15 dark:from-slate-700/15 dark:to-blue-600/15 rounded-full blur-3xl -z-10"></div>

            <motion.div
              animate={{ y: [20, 60, 20] }}
              transition={{
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="max-w-sm w-64 rounded-t-[35px] rounded-br-[35px] border-l-4 border-b-4 border-blue-600 shadow-2xl overflow-hidden"
            >
              <Image
                src="/assets/images/single-man-office.jpg"
                alt="Professional working in office"
                width={256}
                height={320}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              animate={{ x: [100, 150, 100] }}
              transition={{
                duration: 10,
                delay: 5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="hidden md:block md:max-w-sm w-64 rounded-t-[35px] rounded-br-[35px] border-l-4 border-b-4 border-slate-600 shadow-2xl overflow-hidden"
            >
              <Image
                src="/assets/images/office-people.jpg"
                alt="Team collaborating in office"
                width={256}
                height={320}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Text content section */}
          <div className="flex-1 my-6 lg:my-0 max-w-xl">
            <div className="space-y-3 mb-6">
              {/* Enhanced colorful badge with unique shape */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8 }}
                
                className="relative inline-block"
              >
                <div
                  className="px-5 py-2 font-medium text-sm text-white relative z-10 overflow-hidden"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-slate-600 to-blue-700 dark:from-blue-700 dark:via-slate-700 dark:to-blue-800"></div>

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>

                  {/* Badge content */}
                  <span className="relative z-10 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Find Your Dream Career
                  </span>
                </div>

                {/* Decorative shadow/border effect with adjusted colors */}
                <div
                  className="absolute top-1 left-1 right-1 bottom-1 bg-blue-700/40 dark:bg-blue-800/40 -z-10"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%)",
                  }}
                ></div>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: "easeOut",
                }}
                className="text-4xl md:text-5xl font-bold leading-tight whitespace-nowrap"
              >
                <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                  Unlock Your
                </span>{" "}
                <span className="bg-gradient-to-r from-blue-600 via-slate-600 to-blue-700 dark:from-blue-400 dark:to-slate-400 bg-clip-text text-transparent">
                  Career
                </span>{" "}
                <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                  Destiny
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5,
                  ease: "easeOut",
                }}
                className="py-4 text-gray-600 dark:text-gray-300 leading-relaxed text-base"
              >
                Discover career opportunities tailored to your skills and
                aspirations. Our platform connects talented professionals with
                leading companies looking for the perfect match. Take the next
                step in your professional journey today.
              </motion.p>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.7,
                ease: "easeOut",
              }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-slate-600 text-white font-medium rounded-full shadow-md transition-all duration-300 
                focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50
                hover:bg-gradient-to-r hover:from-slate-600 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-700/40"
              >
                Get Started
              </button>

              <button
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-full shadow-sm border border-gray-300 dark:border-gray-600 transition-all duration-300
                hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-md"
              >
                Explore Jobs
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
