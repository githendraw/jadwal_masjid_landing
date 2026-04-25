import { readFileSync } from "fs";
import { join } from "path";

export function GET() {
  const ogPath = join(process.cwd(), "public", "hero.webp");

  return new Response(readFileSync(ogPath), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=86400, must-revalidate",
    },
  });
}
