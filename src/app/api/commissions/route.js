import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, preferredSize, budget, projectIdea } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const emailIsValid = /\S+@\S+\.\S+/.test(email);
    if (!emailIsValid) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    if (!preferredSize?.trim()) {
      return NextResponse.json(
        { error: "Preferred size is required." },
        { status: 400 }
      );
    }

    if (!budget?.trim()) {
      return NextResponse.json({ error: "Budget is required." }, { status: 400 });
    }

    if (!projectIdea?.trim()) {
      return NextResponse.json(
        { error: "Project idea is required." },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();

    const { error } = await supabase.from("commission_requests").insert([
      {
        name: name.trim(),
        email: email.trim(),
        preferred_size: preferredSize.trim(),
        budget: budget.trim(),
        project_idea: projectIdea.trim(),
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        { error: "Could not save commission request." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Commission request received successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Commission API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while submitting the form." },
      { status: 500 }
    );
  }
}