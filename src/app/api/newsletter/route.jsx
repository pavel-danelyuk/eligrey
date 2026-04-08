import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
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
    const { email, company } = body;

    if (company) {
      return NextResponse.json(
        { message: "Subscribed successfully." },
        { status: 200 }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailIsValid = /\S+@\S+\.\S+/.test(email);
    if (!emailIsValid) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();

    const { error: dbError } = await supabase.from("newsletter_subscribers").insert([
      {
        email: email.trim(),
      },
    ]);

    if (dbError) {
      if (dbError.code === "23505") {
        return NextResponse.json(
          { error: "This email is already subscribed." },
          { status: 409 }
        );
      }

      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Could not save newsletter subscription." },
        { status: 500 }
      );
    }

    const { error: emailError } = await resend.emails.send({
      from: process.env.NEWSLETTER_FROM_EMAIL || process.env.COMMISSION_FROM_EMAIL,
      to: [
        process.env.NEWSLETTER_NOTIFICATION_TO ||
          process.env.COMMISSION_NOTIFICATION_TO,
      ],
      replyTo: email.trim(),
      subject: "New newsletter subscription",
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
      `,
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
      return NextResponse.json(
        { error: "Subscription was saved, but email notification could not be sent." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Subscribed successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while subscribing." },
      { status: 500 }
    );
  }
}