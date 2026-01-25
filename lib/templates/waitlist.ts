export function getWaitlistEmailHtml() {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Invook</title>
  </head>
  <body style="margin: 0; padding: 40px; background-color: #f7f7f4; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #26251e;">
    <div style="max-width: 600px; margin: 0 auto;">
      
      <!-- Greeting -->
      <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 24px; letter-spacing: -0.025em;">
        Welcome to Invook
      </h1>

      <p style="font-size: 16px; line-height: 1.6; letter-spacing: -0.01em; margin-bottom: 24px; color: #26251e;">
        You’ve successfully joined the Invook waitlist. We’ll be the first to let you know when we’re ready to bring you on board.
      </p>

      <p style="font-size: 16px; line-height: 1.6; letter-spacing: -0.01em; margin-bottom: 24px; color: #26251e;">
        Until then, here’s why we’re building this.
      </p>

      <!-- Philosophy / Problem -->
      <p style="font-size: 16px; line-height: 1.6; letter-spacing: -0.01em; margin-bottom: 16px; color: #26251e;">
        Invook started with one question:
      </p>

      <p style="font-size: 16px; line-height: 1.6; letter-spacing: -0.01em; margin-bottom: 24px; font-weight: 500; color: #26251e;">
        Why is it still so hard to find an idea, a video clip, or a file you <em>know</em> you saved, but is lost in a sea of apps and tabs?
      </p>

      <p style="font-size: 16px; line-height: 1.6; letter-spacing: -0.01em; margin-bottom: 16px; color: #26251e;">
        As a creative, how much better would your work be if you never lost a reference?
      </p>

      <p style="font-size: 16px; line-height: 1.6; letter-spacing: -0.01em; margin-bottom: 32px; color: #26251e;">
        As a researcher, why can’t you keep your social saves, YouTube videos, and PDFs in the same place? And why can’t you reference them all in your AI tools?
      </p>

      <p style="font-size: 16px; line-height: 1.6; letter-spacing: -0.01em; margin-bottom: 32px; color: #26251e;">
        We believe the entire creative process belongs in one workspace.
      </p>

      <!-- Mission -->
      <p style="font-size: 16px; line-height: 1.6; letter-spacing: -0.01em; margin-bottom: 32px; color: #26251e;">
        At Invook, we’re building that intuitive workspace with three core pillars:
      </p>

      <!-- Features -->
      <div style="margin-bottom: 40px;">
        
        <!-- Intelligent Drive -->
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 17px; font-weight: 600; margin: 0 0 8px 0;">1) Intelligent Drive</h3>
          <p style="font-size: 15px; line-height: 1.6; margin: 0; color: #444;">
            Upload a PDF, paste a YouTube link, or save a social post. Store all your assets in one place. Everything you add is automatically transcribed, auto-tagged, and organized by AI. No more folder shuffling.
          </p>
        </div>

        <!-- Universal Search -->
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 17px; font-weight: 600; margin: 0 0 8px 0;">2) Universal Search</h3>
          <p style="font-size: 15px; line-height: 1.6; margin: 0; color: #444;">
            What if you could actually find that great idea you thought was lost? With Invook, just describe what you remember. Search for "Pink Sweater" or "Cake cutting" to find the exact video frame, audio clip, or document snippet. Invook never forgets.
          </p>
        </div>

        <!-- Canvas -->
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 17px; font-weight: 600; margin: 0 0 8px 0;">3) Canvas</h3>
          <p style="font-size: 15px; line-height: 1.6; margin: 0; color: #444;">
            You don’t need 20 tabs open. You need one intelligent canvas. Visually map out complex topics, drag in notes and files from your drive, and connect the dots across your entire knowledge base. It’s a single view for deep work.
          </p>
        </div>

      </div>

      <!-- Closing -->
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px; color: #26251e;">
        We’re excited for you to experience it. Thank you for being here at the start.
      </p>

      <p style="font-size: 16px; line-height: 1.5; margin: 0; font-weight: 600;">
        The Invook Team
      </p>
      <p style="font-size: 14px; line-height: 1.5; margin: 4px 0 0 0; color: #666;">
        Building the operating system for your mind
      </p>
      <p style="font-size: 14px; line-height: 1.5; margin: 4px 0 0 0; color: #666;">
        <a href="https://thinkingsoundlab.com" style="color: #666; text-decoration: none;">invook.ai</a>
      </p>

    </div>
  </body>
</html>
  `;
}
