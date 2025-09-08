"use client"

import {
  Briefcase,
  Calculator,
  Code,
  GraduationCap,
  Mic,
  Palette,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const JobsCategoryBrowse = () => {
  const [categories] = useState([
    {
      id: 1,
      title: "Marketing & Sales",
      icon: <TrendingUp />,
      count: 43,
      gradient: "from-teal-400 to-cyan-400",
      popular: true,
    },
    {
      id: 2,
      title: "Customer Service",
      icon: <Mic />,
      count: 35,
      gradient: "from-orange-300 to-yellow-300",
    },
    {
      id: 3,
      title: "Web Development",
      icon: <Code />,
      count: 67,
      gradient: "from-purple-400 to-indigo-400",
      popular: true,
    },
    {
      id: 4,
      title: "Finance & Accounting",
      icon: <Calculator />,
      count: 28,
      gradient: "from-red-400 to-pink-400",
    },
    {
      id: 5,
      title: "Human Resource",
      icon: <Briefcase />,
      count: 15,
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      id: 6,
      title: "Design & Creative",
      icon: <Palette />,
      count: 57,
      gradient: "from-orange-400 to-amber-400",
      popular: true,
    },
    {
      id: 7,
      title: "Retail & Products",
      icon: <ShoppingBag />,
      count: 32,
      gradient: "from-green-400 to-emerald-400",
    },
    {
      id: 8,
      title: "Education & Training",
      icon: <GraduationCap />,
      count: 25,
      gradient: "from-purple-400 to-violet-400",
    },
  ]);

  return (
    <div className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-slate-100/80 to-indigo-50/80 dark:from-gray-900/80 dark:via-slate-900/80 dark:to-indigo-950/80"></div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full filter blur-3xl opacity-20 bg-primary dark:bg-purple-700 animate-pulse-slow"
          style={{ animationDuration: "15s" }}
        ></div>

        <div
          className="absolute top-1/3 -right-32 w-96 h-96 rounded-full filter blur-3xl opacity-20 bg-blue-500 dark:bg-blue-700 animate-pulse-slow"
          style={{ animationDuration: "20s", animationDelay: "2s" }}
        ></div>

        <div
          className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20 bg-teal-500 dark:bg-teal-700 animate-pulse-slow"
          style={{ animationDuration: "18s", animationDelay: "1s" }}
        ></div>

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-5"
          style={{
            backgroundImage: `linear-gradient(to right, #00000010 1px, transparent 1px), 
                             linear-gradient(to bottom, #00000010 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div
          className="absolute inset-0 bg-grid-pattern opacity-5 dark:block hidden"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff10 1px, transparent 1px), 
                             linear-gradient(to bottom, #ffffff10 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 transition-colors bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-gray-200 dark:via-amber-800 dark:to-gray-300 bg-clip-text text-transparent">
            Find Jobs in Popular Categories
          </h2>
          <p className="max-w-2xl mx-auto text-gray-900 dark:text-gray-300 transition-colors">
            Browse job opportunities by categories and find the perfect role
            that matches your skills and interests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 items-start">
          {categories.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-xl transition-all duration-700 group cursor-pointer z-10 backdrop-blur-sm backdrop-saturate-150 hover:z-20 relative bg-white/70 border border-gray-100 shadow-lg shadow-gray-300/20 dark:bg-gray-800 dark:border-gray-700 dark:shadow-lg dark:shadow-gray-900/30"
            >
              {/* Card inner content */}
              <div className="relative w-full transition-all duration-700 ease-in-out">
                {/* Popular badge with enhanced animation */}
                {category.popular && (
                  <div
                    className={`absolute -top-3 -right-3 px-3 py-1.5 text-xs font-semibold rounded-full shadow-md transition-all duration-500 bg-gradient-to-r ${category.gradient} text-white group-hover:shadow-lg group-hover:scale-110 origin-center`}
                  >
                    Popular
                  </div>
                )}

                {/* Icon with enhanced hover effect */}
                <div
                  className={`w-20 h-20 mx-auto rounded-xl flex items-center justify-center mb-5 text-3xl transition-all duration-500 bg-gradient-to-br ${category.gradient} text-white relative overflow-hidden group-hover:scale-110 transform-gpu`}
                  style={{
                    boxShadow: `0 10px 25px -5px rgba(59, 130, 246, 0.4)`,
                  }}
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                    <div className="absolute -inset-full top-0 h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                  </div>
                  <span className="relative z-10">{category.icon}</span>
                </div>

                {/* Title with animated underline */}
                <h3 className="font-semibold text-xl mb-2 transition-colors group-hover:font-bold text-gray-800 group-hover:text-primary dark:text-white dark:group-hover:text-purple-300 relative inline-block">
                  {category.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 ease-out group-hover:w-full bg-primary dark:bg-purple-400"></span>
                </h3>

                {/* Jobs count with enhanced design */}
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-all duration-500">
                  <span className="font-medium text-base text-primary dark:text-purple-300 group-hover:text-lg transition-all duration-500">
                    {category.count}
                  </span>{" "}
                  Jobs Available
                </p>

                {/* View Jobs button with fixed height to prevent card stretching */}
                <div className="h-10 mt-4 flex justify-center items-center">
                  <button className="text-sm font-medium py-1.5 px-4 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 bg-gray-100 text-primary hover:bg-primary hover:text-white dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-purple-700 dark:hover:text-white">
                    View Jobs
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button className="font-medium py-3.5 px-12 rounded-full relative overflow-hidden group bg-gradient-to-r from-primary to-blue-600 dark:from-purple-600 dark:to-indigo-600 text-white">
            <span className="relative z-10">View All Categories</span>
            <span className="absolute inset-0 w-0 h-full transition-all duration-300 ease-out bg-blue-500 dark:bg-indigo-500 left-0 group-hover:w-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsCategoryBrowse;
