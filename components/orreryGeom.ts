// Orrery geometry shared by the server drawing (Orrery.tsx) and the client driver (OrreryMotion).
// The orbital plane is a flat disc seen from above: scaled by FLAT on y, then tilted by TILT.

export const CX = 530;
export const CY = 392;
export const TILT_DEG = -11;
const TILT = (TILT_DEG * Math.PI) / 180;
export const FLAT = 0.47; // sin of the viewing elevation: how far the plane leans back
export const FLAT_RANGE = [0.38, 0.56] as const; // the pointer tilts the plane within this
export const YAW_RANGE = 28; // ± degrees the pointer turns the dial
export const STEM = 22; // how far each body stands above its orbit, at a top-down view

export const ORBITS = [98, 148, 198, 248, 298];
export const SANDBOX = 334;

// Inner orbits run faster, as in a real orrery. Seconds per revolution.
export const PERIOD: Record<number, number> = { 98: 54, 148: 86, 198: 124, 248: 172, 298: 236 };

// `href` is the section of the page that explains the body; clicking it glides there.
export type Body = { rx: number; deg: number; name?: string; note: string; href: string };

export const BODIES: Body[] = [
  { rx: ORBITS[0], deg: -20, name: "Context", note: "EDIT · READ · COPY", href: "#context" },
  { rx: ORBITS[1], deg: -50, name: "Index", note: "grep-first index", href: "#index" },
  { rx: ORBITS[2], deg: 30, name: "Git", note: "commits drafted", href: "#git" },
  { rx: ORBITS[3], deg: -125, name: "Jobs", note: "headless agents", href: "#jobs" },
  { rx: ORBITS[3], deg: 115, name: "Plans", note: "chunk by chunk", href: "#plans" },
  { rx: ORBITS[4], deg: -90, note: "acme-api", href: "#workspace" },
  { rx: ORBITS[4], deg: 165, note: "acme-web", href: "#workspace" },
  { rx: ORBITS[4], deg: 45, note: "infra", href: "#workspace" },
];

export const f = (n: number) => n.toFixed(1);

/** A point on the plane at radius `r`, angle `deg` (90 = nearest the viewer), in screen coordinates. */
export function at(r: number, deg: number, flat = FLAT) {
  const t = (deg * Math.PI) / 180;
  const x = r * Math.cos(t);
  const y = r * flat * Math.sin(t);
  return { x: CX + x * Math.cos(TILT) - y * Math.sin(TILT), y: CY + x * Math.sin(TILT) + y * Math.cos(TILT) };
}

/** Where a body stands: its foot on the orbit, its head raised along the plane's normal, and how near it is (-1 far, 1 near). */
export function pose(r: number, deg: number, flat = FLAT) {
  const foot = at(r, deg, flat);
  const up = STEM * Math.sqrt(1 - flat * flat);
  const near = Math.sin((deg * Math.PI) / 180);
  return { foot, head: { x: foot.x + up * Math.sin(TILT), y: foot.y - up * Math.cos(TILT) }, near, scale: 1 + 0.16 * near };
}

/** The transform that maps unit plane coordinates (circles at the origin) onto the screen. */
export const planeTransform = (flat = FLAT, yaw = 0) =>
  `translate(${CX} ${CY}) rotate(${TILT_DEG}) scale(1 ${flat.toFixed(4)})${yaw ? ` rotate(${yaw.toFixed(2)})` : ""}`;
