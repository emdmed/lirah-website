export function BackgroundPattern() {
  return (
    <>
      {/* Layered grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.58]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 1px, transparent 0),
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 0)
          `,
          backgroundSize: '40px 40px, 20px 20px, 20px 20px',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.46]"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.03) 10px,
            rgba(255, 255, 255, 0.03) 20px
          )`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.34]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vertical guide lines */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="mx-auto h-full max-w-7xl">
          <div className="flex h-full justify-between">
            <div className="h-full w-px border-l border-dashed border-white/10" />
            <div className="h-full w-px border-l border-dashed border-white/10" />
          </div>
        </div>
      </div>
    </>
  );
}
