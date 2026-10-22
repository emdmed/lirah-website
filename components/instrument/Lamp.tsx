export type LampState = "off" | "on" | "ok" | "warn" | "fault";

// A lamp only shows state: lit when something is live, running or failed.
export function Lamp({
  state = "off",
  blink,
  label,
  paneLamp,
}: {
  state?: LampState;
  blink?: boolean;
  label?: string;
  paneLamp?: boolean;
}) {
  return (
    <span
      className="ins-lamp"
      data-state={state}
      data-blink={blink || undefined}
      data-pane-lamp={paneLamp || undefined}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
