// Demonstration data: an illustrative source file for the hero's code skyline.
// Each line carries the lowest detail level that keeps it:
// k = skeleton, s = signatures, f = full text only.

export interface DemoSourceLine {
  text: string;
  level: "k" | "s" | "f";
}

export const DEMO_SOURCE: DemoSourceLine[] = [
  { level: "k", text: 'import { verify, sign } from "../lib/token";' },
  { level: "k", text: 'import { sessions } from "../db/schema";' },
  { level: "s", text: "const ROTATE_AFTER = 15 * 60;" },
  { level: "k", text: "export async function authenticate(req, res, next) {" },
  { level: "f", text: "  const header = req.headers.authorization;" },
  { level: "f", text: '  if (!header?.startsWith("Bearer ")) {' },
  { level: "f", text: "    return res.status(401).end();" },
  { level: "f", text: "  }" },
  { level: "f", text: "  const claims = await verify(header.slice(7));" },
  { level: "f", text: "  if (!claims) return res.status(401).end();" },
  { level: "f", text: "  req.user = claims.sub;" },
  { level: "f", text: "  if (age(claims) > ROTATE_AFTER) {" },
  { level: "f", text: '    res.setHeader("x-token", await rotate(claims));' },
  { level: "f", text: "  }" },
  { level: "f", text: "  next();" },
  { level: "s", text: "}" },
  { level: "s", text: "async function rotate(claims) {" },
  { level: "f", text: "  const s = await sessions.find(claims.sid);" },
  { level: "f", text: '  if (!s || s.revoked) throw new Error("revoked");' },
  { level: "f", text: "  await sessions.touch(s.id);" },
  { level: "f", text: "  return sign({ sub: claims.sub, sid: s.id });" },
  { level: "s", text: "}" },
  { level: "s", text: "function age(claims) {" },
  { level: "f", text: "  return Date.now() / 1000 - claims.iat;" },
  { level: "s", text: "}" },
  { level: "k", text: "export function requireRole(role) {" },
  { level: "f", text: "  return (req, res, next) =>" },
  { level: "f", text: "    req.user?.roles?.includes(role) ? next() : res.status(403).end();" },
  { level: "s", text: "}" },
];
