// Keycaps are only for keys.
export function Keycap({ children, lit, size }: { children: React.ReactNode; lit?: boolean; size?: "sm" }) {
  return (
    <kbd className="ins-cap" data-lit={lit || undefined} data-size={size}>
      {children}
    </kbd>
  );
}

export function KeyChord({ keys, label, size }: { keys: string[]; label?: string; size?: "sm" }) {
  return (
    <span className="ins-chord">
      {keys.map((k, i) => (
        <Keycap key={i} size={size}>
          {k}
        </Keycap>
      ))}
      {label && <span className="ml-1.5 text-muted-foreground">{label}</span>}
    </span>
  );
}
