import { NextRequest, NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validations";
import { createSessionToken, verifyPassword, AUTH_COOKIE_NAME } from "@/lib/auth";
import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

// ponytail: in-memory, per-instance rate limit. Fine for a single server;
// move to Redis/Upstash if this ever runs on multiple instances.
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 10;
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LOGIN_MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  try {
    const ip = (
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown"
    ).trim();

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many login attempts. Please try again in a few minutes.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    let adminUser = null;

    const client = supabaseAdmin || supabase;
    if (isSupabaseConfigured && client) {
      const { data, error } = await client
        .from("admin_users")
        .select("*")
        .eq("email", cleanEmail)
        .single();

      if (!error && data) {
        const isMatch = await verifyPassword(cleanPassword, data.password_hash);
        if (isMatch) {
          adminUser = {
            id: data.id,
            email: data.email,
            name: data.name,
            role: data.role,
          };
        }
      }
    }

    if (!adminUser) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await createSessionToken(adminUser);
    loginAttempts.delete(ip);

    const response = NextResponse.json({
      success: true,
      message: "Admin login successful",
      user: adminUser,
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
