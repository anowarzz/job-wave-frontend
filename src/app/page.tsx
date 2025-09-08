import HeroSection from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/HowItWorks";
import JobsCategoryBrowse from "@/components/Home/JobCategories";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <JobsCategoryBrowse />
    </div>
  );
}
