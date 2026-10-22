// Split green/red bar; length is log-scaled above 200 lines.
export function DiffBar({ added, removed, width = 48 }: { added: number; removed: number; width?: number }) {
  const total = added + removed;
  const scale = total > 200 ? Math.log10(total) / Math.log10(200) : total / 200;
  const len = Math.max(4, Math.round(Math.min(1, scale) * width));
  const a = total ? Math.round((added / total) * len) : 0;
  return (
    <span className="inline-flex items-center gap-2 tabular-nums" aria-label={`${added} lines added, ${removed} removed`}>
      <span className="inline-flex h-[5px]" style={{ width: len }} aria-hidden="true">
        <span style={{ width: a, background: "var(--git-added)" }} />
        <span style={{ width: len - a, background: "var(--git-deleted)" }} />
      </span>
      <span className="text-[12px]">
        <span style={{ color: "var(--git-added)" }}>+{added}</span>{" "}
        <span style={{ color: "var(--git-deleted)" }}>-{removed}</span>
      </span>
    </span>
  );
}
