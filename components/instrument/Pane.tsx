import { Lamp } from "./Lamp";

// A pane: a face against the gutter with its legend set into the top edge.
// Only the pane holding focus, the pointer or a live session draws a frame.
export function Pane({
  title,
  index,
  lamp,
  live,
  trailing,
  className = "",
  as: Tag = "div",
  labelledBy,
  children,
  ...rest
}: {
  title: string;
  index?: string;
  lamp?: boolean;
  live?: boolean;
  trailing?: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "aside" | "article";
  labelledBy?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={`pane ${className}`} data-live={live || undefined} aria-labelledby={labelledBy} {...rest}>
      <div className="pane-legend">
        <span className="pane-legend-tag">
          {index && <kbd className="ins-cap" data-size="sm">{index}</kbd>}
          <span className="ins-legend">{title}</span>
          {lamp && <Lamp paneLamp />}
        </span>
        {trailing && <span className="pane-legend-trail">{trailing}</span>}
      </div>
      {children}
    </Tag>
  );
}
