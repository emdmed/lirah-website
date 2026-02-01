import { Feather } from "lucide-react";

export function Logo({ size = 32 }: { size?: number }) {
  const iconSize = size * 0.48;
  const iconStrokeWidth = 2;
  const borderStrokeWidth = iconStrokeWidth * 0.7;
  const innerSize = size * 0.75;

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="flex items-center justify-center border-[#e4e4e7]"
        style={{
          width: innerSize,
          height: innerSize,
          borderRadius: "4px",
          borderWidth: borderStrokeWidth,
          borderStyle: "solid",
          transform: "rotate(45deg)",
        }}
      >
        <Feather
          style={{ width: iconSize, height: iconSize, transform: "rotate(-90deg)" }}
          strokeWidth={iconStrokeWidth}
          className="text-[#e4e4e7]"
        />
      </div>
    </div>
  );
}
