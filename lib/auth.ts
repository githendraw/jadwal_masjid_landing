import "server-only";

export interface GoogleProfile {
  email: string;
  name: string;
  picture: string | null;
  googleId: string;
}

export function getBaseUrl(): string {
  return (
    process.env.BASE_URL ||
    `http://localhost:${process.env.PORT || 4001}`
  );
}

function isDummyGoogle(): boolean {
  const allowDummy = process.env.GOOGLE_ALLOW_DUMMY === "true";
  const clientId = process.env.GOOGLE_CLIENT_ID || "";
  return (
    allowDummy ||
    clientId.startsWith("DUMMY") ||
    clientId.trim() === ""
  );
}

export function googleAuthEnabled(): boolean {
  // Login Google hanya aktif bila bukan mode dummy & kredensial terisi.
  return !isDummyGoogle();
}

export async function buildGoogleAuthUrl(state: string): Promise<string> {
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${getBaseUrl()}/api/auth/google/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
    access_type: "online",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * Tukar authorization code -> token -> profil Google.
 * Melempar error bila gagal; di luar mode dummy.
 */
export async function exchangeCodeForProfile(code: string): Promise<GoogleProfile> {
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${getBaseUrl()}/api/auth/google/callback`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenRes.ok) {
    throw new Error(`Token exchange failed: ${tokenRes.status}`);
  }
  const token = await tokenRes.json();
  const accessToken: string = token.access_token;
  if (!accessToken) throw new Error("No access_token");

  const infoRes = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!infoRes.ok) throw new Error(`Userinfo failed: ${infoRes.status}`);

  const info = await infoRes.json();
  return {
    email: info.email,
    name: info.name || info.email?.split("@")[0] || "Pengguna",
    picture: info.picture || null,
    googleId: String(info.id || info.sub || info.email),
  };
}