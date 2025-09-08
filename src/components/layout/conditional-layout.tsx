"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if current route is a dashboard route
  const isDashboardRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/candidate") ||
    pathname.startsWith("/recruiter");

  if (isDashboardRoute) {
    // Dashboard layout - no navbar/footer, full height
    return <div className="min-h-screen w-full">{children}</div>;
  }

  // Regular layout with navbar and footer
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
}
