import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { SWRProvider } from "@/components/providers/swr-provider";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Wave - Job Portal",
  description: "A job portal for finding your dream job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SWRProvider>
            <main className="min-h-screen flex flex-col">
              <Toaster position="top-center"/>
              <Navbar />

              <div className="flex-1">{children}</div>

              <Footer />
            </main>
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
