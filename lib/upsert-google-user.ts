import "server-only";
import prisma from "./prisma";
import { isAdminEmail } from "./current-user";
import type { GoogleProfile } from "./auth";

/**
 * Temukan atau buat user dari profil Google; promosikan ke ADMIN
 * bila email masuk whitelist. Perbarui data & status profileCompleted.
 */
export async function upsertGoogleUser(
  profile: GoogleProfile
) {
  const existing = await prisma.user.findFirst({
    where: { OR: [{ googleId: profile.googleId }, { email: profile.email }] },
  });

  const role = isAdminEmail(profile.email) ? "ADMIN" : "CUSTOMER";
  const profileCompleted =
    Boolean(profile.email) &&
    Boolean(existing?.phone) &&
    Boolean(existing?.mosqueName);

  if (existing) {
    return prisma.user.update({
      where: { id: existing.id },
      data: {
        googleId: profile.googleId,
        name: profile.name,
        avatarUrl: profile.picture || existing.avatarUrl,
        role: existing.role === "ADMIN" ? "ADMIN" : role,
        // jangan timpa data diri yang sudah diisi user
        profileCompleted,
      },
    });
  }

  return prisma.user.create({
    data: {
      googleId: profile.googleId,
      email: profile.email,
      name: profile.name,
      avatarUrl: profile.picture,
      role,
      profileCompleted,
    },
  });
}