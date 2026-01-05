import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 1️⃣ Save to Google Sheet (critical)
    if (process.env.GSHEET_WEBHOOK_URL) {
      // Inject secret server-side
      const secret = process.env.WAITLIST_SECRET || "";

      await fetch(process.env.GSHEET_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-invook-secret": secret
        },
        body: JSON.stringify({
          email,
          source: "invook-waitlist",
        }),
      });
    }

    // 2️⃣ Try sending email (non-blocking, Production ONLY)
    try {
      if (process.env.NODE_ENV === "production" && process.env.RESEND_FROM_EMAIL) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: email,
          subject: "You're on the Invook Waitlist 🚀",
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>Welcome to Invook 👋</h2>
              <p>Thanks for joining the Invook waitlist.</p>
              <p>You'll be the first to know about:</p>
              <ul>
                <li>Early access</li>
                <li>Product updates</li>
                <li>Exclusive invites</li>
              </ul>
              <p>— Team Invook</p>
            </div>
          `,
        });
      } else {
        console.log("Waitlist email skipped (Dev/Test mode)");
      }
    } catch (emailErr) {
      console.warn("Email failed, but waitlist saved:", emailErr);
    }

    // ✅ Always return success if sheet worked
    return NextResponse.json(
      { success: true, message: "Waitlist entry saved" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Failed to save waitlist" },
      { status: 500 }
    );
  }
}