import { Navigation } from "@/components/Navigation";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { HeroSection } from "@/components/HeroSection";
import { DownloadSection } from "@/components/DownloadSection";
import { ProblemSection } from "@/components/ProblemSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ProjectCompactSection } from "@/components/ProjectCompactSection";
import { PromptingSection } from "@/components/PromptingSection";
import { SyncSection } from "@/components/SyncSection";
import { WorkflowsSection } from "@/components/WorkflowsSection";
import { ROISection } from "@/components/ROISection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { TechStackSection } from "@/components/TechStackSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white antialiased">
      <Navigation />
      <BackgroundPattern />

      <main className="relative z-10">
        <HeroSection />
        <ProblemSection />
        <ProjectCompactSection />
        <ROISection />
        <FeaturesSection />
        <PromptingSection />
        <WorkflowsSection />
        <DownloadSection />
        <TestimonialsSection />
        <CTASection />
        <TechStackSection />
        <Footer />
      </main>
    </div>
  );
}
