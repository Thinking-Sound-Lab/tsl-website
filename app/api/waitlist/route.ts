import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getWaitlistEmailHtml } from "@/lib/templates/waitlist";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 1️⃣ Save to Google Sheet (critical)
    if (process.env.GSHEET_WEBHOOK_URL) {
      const sheetResponse = await fetch(process.env.GSHEET_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "invook-waitlist",
        }),
      });

      if (!sheetResponse.ok) {
        throw new Error(`Google Sheet API failed with status: ${sheetResponse.status}`);
      }
    }

    // 2️⃣ Try sending email (non-blocking, Production ONLY)
    try {
      if (process.env.RESEND_FROM_EMAIL) {
        const { error } = await resend.emails.send({
          from: `Invook Team <${process.env.RESEND_FROM_EMAIL}>`,
          to: email,
          subject: "The operating system for your mind",
          html: getWaitlistEmailHtml(email),
        });

        if (error) {
          console.warn("Resend API returned an error:", error);
        }
      } else {
        console.log("Waitlist email skipped (Dev/Test mode)");
      }
    } catch (emailErr) {
      console.warn("Email failed, but waitlist saved:", emailErr);
    }

    // ✅ Always return success if sheet worked
    return NextResponse.json(
      { success: true, message: "You've been added to the waitlist!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}