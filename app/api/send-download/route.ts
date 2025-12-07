import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

// Email validation regex (RFC 5322 compliant)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateEmailHTML(
  downloadUrl: string,
  platform: "mac" | "windows"
): string {
  const platformName = platform === "mac" ? "macOS" : "Windows";
  const fileName = platform === "mac" ? "Invook.dmg" : "InvookSetup.exe";

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #374151;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px;
            border: 1px solid #e5e7eb;
          }
          h1 {
            color: #047857;
            font-size: 24px;
            margin-bottom: 16px;
            font-weight: 600;
          }
          p {
            margin-bottom: 16px;
            color: #4b5563;
          }
          .button {
            display: inline-block;
            background-color: #047857;
            color: #ffffff;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 20px 0;
          }
          .button:hover {
            background-color: #065f46;
          }
          .instructions {
            background-color: #f9fafb;
            border-left: 4px solid #047857;
            padding: 16px;
            margin: 24px 0;
          }
          .footer {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Your Invook Download is Ready!</h1>

          <p>Thanks for choosing Invook. Click the button below to download Invook for ${platformName}.</p>

          <a href="${downloadUrl}" class="button" style="color: #ffffff !important; text-decoration: none;">Download Invook (${fileName})</a>

          <div class="instructions">
            <strong>Installation Instructions:</strong>
            ${
              platform === "mac"
                ? "<p>1. Open the downloaded .dmg file<br>2. Drag Invook to the Applications folder<br>3. Launch Invook from your Applications or Dock</p>"
                : "<p>1. Open the downloaded .exe file<br>2. Follow the installation wizard<br>3. Launch Invook from the Start menu or Desktop</p>"
            }
          </div>

          <p>If you didn't request this download, you can safely ignore this email.</p>

          <div class="footer">
            <p>© ${new Date().getFullYear()} Thinking Sound Lab. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateEmailText(
  downloadUrl: string,
  platform: "mac" | "windows"
): string {
  const platformName = platform === "mac" ? "macOS" : "Windows";

  return `
Your Invook Download is Ready!

Thanks for choosing Invook. Download Invook for ${platformName} here:

${downloadUrl}

Installation Instructions:
${
  platform === "mac"
    ? "1. Open the downloaded .dmg file\n2. Drag Invook to the Applications folder\n3. Launch Invook from your Applications or Dock"
    : "1. Open the downloaded .exe file\n2. Follow the installation wizard\n3. Launch Invook from the Start menu or Desktop"
}

If you didn't request this download, you can safely ignore this email.

---
© ${new Date().getFullYear()} Thinking Sound Lab. All rights reserved.
  `.trim();
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const { email, platform } = await request.json();

    // Validation
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (!platform || !["mac", "windows"].includes(platform)) {
      return NextResponse.json(
        { success: false, error: "Invalid platform" },
        { status: 400 }
      );
    }

    // Get download URL
    const downloadUrl =
      platform === "mac"
        ? process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL
        : process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL;

    if (!downloadUrl) {
      console.error("Download URL not configured for platform:", platform);
      return NextResponse.json(
        {
          success: false,
          error: "Download temporarily unavailable. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Send email via Resend
    await resend.emails.send({
      from: `Abhishek from Invook <${FROM_EMAIL}>`,
      to: email,
      subject: "Your Invook Download Link",
      html: generateEmailHTML(downloadUrl, platform),
      text: generateEmailText(downloadUrl, platform),
    });

    return NextResponse.json({
      success: true,
      message: "Download link sent successfully",
    });
  } catch (error) {
    console.error("Error sending download email:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send email. Please try again.",
      },
      { status: 500 }
    );
  }
}
