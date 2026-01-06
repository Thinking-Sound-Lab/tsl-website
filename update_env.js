/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

try {
    let content = '';
    if (fs.existsSync(envPath)) {
        content = fs.readFileSync(envPath, 'utf8');
    }

    const lines = content.split('\n');
    const newLines = lines.filter(line => {
        const key = line.split('=')[0].trim();
        return !key.startsWith('AIRTABLE_');
    });

    // Check if RESEND vars exist, if not add them
    const hasResendKey = newLines.some(line => line.startsWith('RESEND_API_KEY='));
    if (!hasResendKey) {
        newLines.push('RESEND_API_KEY=your_resend_api_key_here');
    }

    const hasResendFrom = newLines.some(line => line.startsWith('RESEND_FROM_EMAIL='));
    if (!hasResendFrom) {
        newLines.push('RESEND_FROM_EMAIL=Invook <onboarding@resend.dev>');
    }

    fs.writeFileSync(envPath, newLines.join('\n').trim() + '\n');
    console.log('Updated .env.local');

} catch (e) {
    console.error("Error updating .env.local", e);
}
