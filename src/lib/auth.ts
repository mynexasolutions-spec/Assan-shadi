import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { AdminUser } from "@/types/database";

export { AUTH_COOKIE_NAME } from "@/lib/auth-constants";
import { AUTH_COOKIE_NAME } from "@/lib/auth-constants";

function getJwtSecretKey(): Uint8Array | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(user: AdminUser): Promise<string> {
  const secret = getJwtSecretKey();
  if (!secret) {
    throw new Error(
      "JWT_SECRET is not set. Set the JWT_SECRET environment variable before issuing admin sessions."
    );
  }
  return new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<AdminUser | null> {
  const secret = getJwtSecretKey();
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    if (!payload || !payload.sub || !payload.email) return null;

    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: (payload.name as string) || "Admin",
      role: (payload.role as "superadmin" | "moderator") || "moderator",
    };
  } catch {
    return null;
  }
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function verifySession(): Promise<AdminUser | null> {
  return getCurrentAdmin();
}


