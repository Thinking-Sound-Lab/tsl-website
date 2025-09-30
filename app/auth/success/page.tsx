"use client";

import { useEffect, useState } from "react";

export default function AuthSuccessPage() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [hasTokens, setHasTokens] = useState<boolean>(false);

  useEffect(() => {
    // Extract OAuth tokens from URL hash fragment
    const extractTokensAndRedirect = () => {
      try {
        const hash = window.location.hash;
        console.log('OAuth success page - full URL:', window.location.href);
        console.log('OAuth success page - hash fragment:', hash);

        if (hash && hash.length > 1) {
          // Parse the hash to extract user email if available
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get('access_token');

          // If we have an access token, try to get user info
          if (accessToken) {
            // You could make an API call here to get user info
            // For now, we'll just indicate tokens are present
            setHasTokens(true);
          }

          // Create custom protocol URL for Electron app
          const electronCallbackUrl = `invook://oauth/callback${hash}`;
          console.log('Redirecting to Electron app:', electronCallbackUrl);

          // Redirect to Electron app with tokens
          window.location.href = electronCallbackUrl;

          return true;
        } else {
          console.warn('No OAuth tokens found in URL hash');
          return false;
        }
      } catch (error) {
        console.error('Error extracting OAuth tokens:', error);
        return false;
      }
    };

    // Try to extract tokens and redirect
    const tokensFound = extractTokensAndRedirect();
    setHasTokens(tokensFound);

    // Optional: Listen for messages from parent window (if opened as popup)
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'close') {
        window.close();
      }
    };

    window.addEventListener('message', handleMessage);
    console.log('OAuth success page loaded - authentication completed successfully');

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleOpenApp = () => {
    // Fallback button to manually open the app
    const hash = window.location.hash;
    if (hash) {
      const electronCallbackUrl = `invook://oauth/callback${hash}`;
      window.location.href = electronCallbackUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-6">
          <span className="text-2xl font-medium text-emerald-700">Invook</span>
        </div>

        {/* Success Icon */}
        <div className="text-6xl mb-6 animate-bounce">
          ✅
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {hasTokens ? "Redirecting to App..." : "Authentication Successful!"}
        </h1>

        {/* User Email Section */}
        {userEmail && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 mb-1">Logged in as:</p>
            <p className="font-mono text-sm text-gray-900">{userEmail}</p>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {hasTokens
            ? "Opening Invook app with your authentication..."
            : "You have successfully signed in to Invook. You can now return to the app and continue with your voice dictation experience."
          }
        </p>

        {/* Open App Button */}
        <button
          onClick={handleOpenApp}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 mb-4"
        >
          Open Invook App
        </button>

        {/* Status Message */}
        <p className="text-sm text-gray-500">
          {hasTokens
            ? "App should open automatically. If not, use the button above."
            : "Please manually close this tab and return to the Invook app."
          }
        </p>

        {/* Loading Bar */}
        {hasTokens && (
          <div className="mt-6">
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full animate-[fill_3s_ease-in-out_forwards]"
                style={{
                  animation: 'fill 3s ease-in-out forwards',
                }}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}