import {
  GitBranch,
  Bug,
  RefreshCw,
  Gauge,
  FileSearch,
  GitPullRequest,
  FileCode,
  Puzzle,
  Settings,
} from "lucide-react";

const workflows = [
  { icon: GitBranch, label: "Feature", desc: "New feature development" },
  { icon: Bug, label: "Bugfix", desc: "Debug and fix issues" },
  { icon: RefreshCw, label: "Refactor", desc: "Code restructuring" },
  { icon: Gauge, label: "Performance", desc: "Speed optimizations" },
  { icon: FileSearch, label: "Review", desc: "Code review assistance" },
  { icon: GitPullRequest, label: "Pull Request", desc: "PR preparation" },
  { icon: FileCode, label: "Documentation", desc: "Docs generation" },
  { icon: Puzzle, label: "React", desc: "React-specific variants" },
  { icon: Settings, label: "Orchestration", desc: "Enforce custom instructions on every agent prompt" },
];

export function WorkflowsSection() {
  return (
    <section id="workflows" className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#7a9e98]">
            Agentic Dev Workflows
          </p>
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
            Pre-Built Workflows for Agent Builders
          </h2>
          <p className="mx-auto mb-8 sm:mb-12 max-w-2xl text-base sm:text-lg text-[#969696]">
            High-leverage tooling out of the box. Workflow templates designed for real agentic AI users—not demos.
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {workflows.map((workflow) => (
            <div
              key={workflow.label}
              className="group relative rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-3 sm:p-4 transition-colors hover:border-[#7a9e98]/40 hover:bg-[#7a9e98]/5"
            >
              <div className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-[#7a9e98]/50" />
              <div className="absolute -right-1 -top-1 h-2 w-2 border-r border-t border-[#7a9e98]/50" />
              <div className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-[#7a9e98]/50" />
              <div className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-[#7a9e98]/50" />

              <div className="mb-2 sm:mb-3 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded border border-dashed border-[#7a9e98]/30 bg-[#7a9e98]/10">
                <workflow.icon className="h-3 w-3 sm:h-4 sm:w-4 text-[#7a9e98]" />
              </div>
              <h3 className="font-semibold text-white text-sm sm:text-base">{workflow.label}</h3>
              <p className="text-xs sm:text-sm text-[#969696] mt-1">{workflow.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
