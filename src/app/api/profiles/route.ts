import { NextRequest, NextResponse } from "next/server";
import { profileSchema } from "@/lib/validations";
import { dbService } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/auth";
import { Gender, MaritalStatus, ProfileFilter } from "@/types/database";

export async function GET(request: NextRequest) {
  try {
    // Biodata listings include pending/unapproved profiles and guardian contact
    // details, so they are admin-only. Public visitors still submit via POST.
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    const filter: ProfileFilter = {
      gender: (searchParams.get("gender") as Gender) || undefined,
      status: (searchParams.get("status") as any) || undefined,
      city: searchParams.get("city") || undefined,
      ageMin: searchParams.get("ageMin") ? parseInt(searchParams.get("ageMin")!) : undefined,
      ageMax: searchParams.get("ageMax") ? parseInt(searchParams.get("ageMax")!) : undefined,
      maritalStatus: (searchParams.get("maritalStatus") as MaritalStatus) || undefined,
      sect: searchParams.get("sect") || undefined,
      query: searchParams.get("q") || undefined,
    };

    const profiles = await dbService.getProfiles(filter);

    return NextResponse.json({
      success: true,
      data: profiles,
      count: profiles.length,
    });
  } catch (error) {
    console.error("GET /api/profiles error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = profileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
        },
        { status: 400 }
      );
    }

    const newProfile = await dbService.createProfile({
      ...parsed.data,
      status: "pending", // Newly submitted profiles require admin moderation
      is_verified: false,
      is_featured: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Biodata submitted successfully! Our moderation team will verify before publishing.",
        data: newProfile,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/profiles error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit profile" },
      { status: 500 }
    );
  }
}
