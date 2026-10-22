import { StatusBar } from "@/components/StatusBar";
import { LedgerProvider } from "@/components/ledger/LedgerProvider";
import { HeroSection } from "@/components/HeroSection";
import { AgentsBand } from "@/components/AgentsBand";
import { ContextSection } from "@/components/ContextSection";
import { TokensSection } from "@/components/TokensSection";
import { WorkspaceSection } from "@/components/WorkspaceSection";
import { JobsSection } from "@/components/JobsSection";
import { PlansSection } from "@/components/PlansSection";
import { GitSection } from "@/components/GitSection";
import { KeysSection } from "@/components/KeysSection";
import { SandboxSection } from "@/components/SandboxSection";
import { FaqSection } from "@/components/FaqSection";
import { ProblemSection } from "@/components/ProblemSection";
import { ProofStrip } from "@/components/ProofStrip";
import { DownloadSection } from "@/components/DownloadSection";
import { Footer } from "@/components/Footer";
import { getLatestRelease } from "@/lib/releases";

export const revalidate = 3600;

export default async function Home() {
  const release = await getLatestRelease();

  return (
    <LedgerProvider>
      <StatusBar />
      <main className="mx-auto max-w-[1320px] px-3 sm:px-4">
        <HeroSection release={release} />
        {/* Below the replica the page is a sheet: panes are rules, not boxes. */}
        <div data-sheet>
          <AgentsBand />
          <ProblemSection />
          <ContextSection />
          <TokensSection />
          <WorkspaceSection />
          <JobsSection />
          <PlansSection />
          <GitSection />
          <KeysSection />
          <SandboxSection />
          <ProofStrip />
          <FaqSection />
          <DownloadSection release={release} />
        </div>
      </main>
      <Footer />
    </LedgerProvider>
  );
}
