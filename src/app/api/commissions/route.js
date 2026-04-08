import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

// In-memory store: { ip -> [timestamps] }
const requestLog = new Map();

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const timestamps = requestLog.get(ip) || [];
  const recentRequests = timestamps.filter((timestamp) => timestamp > windowStart);

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  return false;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      preferredSize,
      budget,
      projectIdea,
      company, // honeypot field if you add it
    } = body;

    // Honeypot check: silently accept fake bot submission
    if (company) {
      return NextResponse.json(
        { message: "Commission request received successfully." },
        { status: 200 }
      );
    }

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

    const { error: dbError } = await supabase.from("commission_requests").insert([
      {
        name: name.trim(),
        email: email.trim(),
        preferred_size: preferredSize.trim(),
        budget: budget.trim(),
        project_idea: projectIdea.trim(),
      },
    ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Could not save commission request." },
        { status: 500 }
      );
    }

    const { error: emailError } = await resend.emails.send({
      from: process.env.COMMISSION_FROM_EMAIL,
      to: [process.env.COMMISSION_NOTIFICATION_TO],
      replyTo: email.trim(),
      subject: `New commission request from ${name.trim()}`,
      html: `
        <h2>New Commission Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Preferred Size:</strong> ${escapeHtml(preferredSize.trim())}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget.trim())}</p>
        <p><strong>Project Idea:</strong></p>
        <p>${escapeHtml(projectIdea.trim()).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
      return NextResponse.json(
        {
          error: "Request was saved, but email notification could not be sent.",
        },
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