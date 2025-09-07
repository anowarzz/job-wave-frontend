import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-500 flex items-center justify-center text-white">
        <Briefcase className="text-lg" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
      </div>
      <div className="text-xl font-bold whitespace-nowrap">
        <span className="text-gray-800 dark:text-gray-200">Job</span>
        <span className="bg-gradient-to-r from-primary to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
          Wave
        </span>
      </div>
    </Link>
  );
}
