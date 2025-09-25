"use client";

import Logo from "@/components/navbar-components/logo";
import UserMenu from "@/components/navbar-components/user-menu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserRole } from "@/types";
import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import { ModeToggle } from "../ui/ModeToggle";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/all-jobs", label: "Find Jobs", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/candidate", label: "My Applications", role: UserRole.CANDIDATE },
  { href: "/recruiter", label: "Dashboard", role: UserRole.RECRUITER },
  { href: "/admin", label: "Dashboard", role: UserRole.ADMIN },
];

export default function Navbar() {
  const { data: userData, isLoading, isValidating } = useSWR("/user/me");
  const [sheetOpen, setSheetOpen] = useState(false);

  const user = userData?.data;
  const userRole = user?.role;

  // Only show loading on initial load, not on background revalidations
  const showLoading = isLoading && !userData;

  return (
    <header className="sticky top-0 z-50 border-b px-4 md:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <nav className="flex flex-col space-y-4">
                  {navigationLinks.map((link, index) => (
                    <React.Fragment key={index}>
                      {link.role === "PUBLIC" && (
                        <Link
                          href={link.href}
                          className="text-foreground hover:text-primary transition-colors font-medium py-2 px-4 rounded-md hover:bg-accent"
                          onClick={() => setSheetOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}
                      {link.role === userRole && (
                        <Link
                          href={link.href}
                          className="text-foreground hover:text-primary transition-colors font-medium py-2 px-4 rounded-md hover:bg-accent"
                          onClick={() => setSheetOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t">
                  <div className="flex flex-col space-y-4 px-4">
                    {showLoading ? (
                      <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
                    ) : user && user.email ? (
                      <div className="flex flex-col space-y-3 items-center">
                        <div className="text-sm text-muted-foreground text-center px-2">
                          Signed in as{" "}
                          <span className="font-medium">{user.email}</span>
                        </div>
                        <div className="w-full flex justify-center">
                          <UserMenu user={user} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Link href="/login" onClick={() => setSheetOpen(false)}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            Login
                          </Button>
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setSheetOpen(false)}
                        >
                          <Button size="sm" className="w-full">
                            Register
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Logo />

            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                    {link.role === userRole && (
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>

          {/* Conditional rendering with loading state */}
          {showLoading ? (
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : user && user.email ? (
            <UserMenu user={user} />
          ) : (
            <div className="flex items-center gap-2 ">
              <Link href="/login">
                <Button size="sm" variant="outline">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
