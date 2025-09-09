import CallToAction from "@/components/Home/CallToAction";
import HeroSection from "@/components/Home/HeroSection";
import HotJobs from "@/components/Home/HotJobs";
import HowItWorks from "@/components/Home/HowItWorks";
import JobsCategoryBrowse from "@/components/Home/JobCategories";
import FAQ from "./faq/page";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <JobsCategoryBrowse />
      <HotJobs />
      <FAQ />
      <CallToAction />
    </div>
  );
}
