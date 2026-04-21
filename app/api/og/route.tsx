import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "edge";

export function GET() {
  const ogPath = join(process.cwd(), "public", "hero.png");

  return new Response(readFileSync(ogPath), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, must-revalidate",
    },
  });
}
