import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { profileSchema } from "@/lib/schemas";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  return NextResponse.json({ user });
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON tidak valid" }, { status: 400 });
  }

  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Data tidak valid", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const d = parsed.data;
  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      phone: d.phone,
      mosqueName: d.mosqueName,
      mosqueAddress: d.mosqueAddress || null,
      city: d.city || null,
      province: d.province || null,
      postalCode: d.postalCode || null,
      profileCompleted: true,
    },
  });
  return NextResponse.json({ user: updated });
}