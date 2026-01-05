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
      if (process.env.RESEND_FROM_EMAIL) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: email,
          subject: "You're on the Invook Waitlist 🚀",
          html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Invook</title>
  </head>

  <body style="margin:0; padding:0; background-color:#f4f6f8;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff; border-radius:12px; overflow:hidden;
                   box-shadow:0 10px 30px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="padding:36px 40px; background:#0f172a; color:#ffffff;">
                <h1 style="margin:0; font-size:26px; font-family:Arial, sans-serif;">
                  Welcome to Invook 👋
                </h1>
                <p style="margin:10px 0 0; font-size:15px; color:#cbd5f5;">
                  You’re officially on the Invook waitlist
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px; font-family:Arial, sans-serif; color:#1f2937;">

                <p style="font-size:16px; line-height:1.6; margin:0 0 16px;">
                  Thanks for signing up for <strong>Invook</strong>.
                </p>

                <p style="font-size:15px; line-height:1.6; margin:0 0 24px;">
                  Invook is being built as a <strong>next-generation AI workspace</strong> —
                  designed to help you think faster, research smarter, and keep context
                  across everything you do.
                </p>

                <p style="font-size:15px; line-height:1.6; margin:0 0 24px;">
                  Instead of juggling tools, tabs, and chats, Invook brings
                  <strong>voice, screen understanding, memory, and AI reasoning</strong>
                  into one continuous experience.
                </p>

                <div style="background:#f9fafb; border-radius:10px; padding:22px; margin-bottom:28px;">
                  <p style="margin:0 0 12px; font-size:14px; font-weight:bold;">
                    As a waitlist member, you’ll get:
                  </p>
                  <ul style="margin:0; padding-left:18px; font-size:14px; line-height:1.7;">
                    <li>🚀 Early access before public release</li>
                    <li>🧠 Sneak peeks into upcoming features</li>
                    <li>🎁 Exclusive invites, experiments & updates</li>
                  </ul>
                </div>

                <p style="font-size:14px; line-height:1.6; color:#4b5563; margin:0 0 20px;">
                  What happens next?
                </p>

                <p style="font-size:14px; line-height:1.6; color:#4b5563; margin:0 0 24px;">
                  We’re onboarding users gradually. As soon as Invook is ready for
                  your batch, you’ll hear directly from us with access details.
                </p>

                <p style="font-size:14px; line-height:1.6; margin:0;">
                  Thanks for being early — it genuinely helps us shape Invook better.
                </p>

                <p style="margin-top:28px; font-size:14px;">
                  — <strong>Team Invook</strong>
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 40px; background:#f9fafb;
                         font-family:Arial, sans-serif; font-size:12px; color:#6b7280;">
                <p style="margin:0;">
                  You received this email because you joined the Invook waitlist.
                </p>
                <p style="margin:8px 0 0;">
                  © ${new Date().getFullYear()} Invook. All rights reserved.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
</html>
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