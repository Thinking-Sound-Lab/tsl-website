"use client";

import { useEffect, useState } from "react";

// Get protocol based on environment (dev vs prod)
const getProtocol = (): string => {
	if (typeof window === "undefined") return "invook";
	const params = new URLSearchParams(window.location.search);
	const isDev = params.get("env") === "dev";
	return isDev ? "invook-dev" : "invook";
};

export default function AuthSuccessPage() {
	const [userEmail, setUserEmail] = useState<string>("");
	const [isDev, setIsDev] = useState<boolean>(false);

	useEffect(() => {
		// Check if dev environment
		const params = new URLSearchParams(window.location.search);
		setIsDev(params.get("env") === "dev");

		// Decode JWT token to extract user info
		const decodeJWT = (token: string) => {
			try {
				// JWT structure: header.payload.signature
				const parts = token.split(".");
				if (parts.length !== 3) {
					throw new Error("Invalid JWT token");
				}

				// Decode the payload (second part)
				const payload = parts[1];
				// Replace URL-safe characters
				const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
				// Decode base64
				const jsonPayload = decodeURIComponent(
					atob(base64)
						.split("")
						.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
						.join("")
				);

				return JSON.parse(jsonPayload);
			} catch (error) {
				console.error("Error decoding JWT:", error);
				return null;
			}
		};

		// Extract OAuth tokens from URL hash fragment
		const extractTokensAndRedirect = () => {
			try {
				const hash = window.location.hash;

				if (hash && hash.length > 1) {
					// Parse the hash to extract user email if available
					const hashParams = new URLSearchParams(hash.substring(1));
					const accessToken = hashParams.get("access_token");

					// If we have an access token, try to get user info
					if (accessToken) {
						// Decode JWT to extract user email
						const decodedToken = decodeJWT(accessToken);
						if (decodedToken && decodedToken.email) {
							setUserEmail(decodedToken.email);
						}
					}

					// Create custom protocol URL for Electron app
					const protocol = getProtocol();
					const electronCallbackUrl = `${protocol}://oauth/callback${hash}`;

					// Redirect to Electron app with tokens
					window.location.href = electronCallbackUrl;

					return true;
				} else {
					console.warn("No OAuth tokens found in URL hash");
					return false;
				}
			} catch (error) {
				console.error("Error extracting OAuth tokens:", error);
				return false;
			}
		};

		// Try to extract tokens and redirect
		extractTokensAndRedirect();

		// Optional: Listen for messages from parent window (if opened as popup)
		const handleMessage = (event: MessageEvent) => {
			if (event.data === "close") {
				window.close();
			}
		};

		window.addEventListener("message", handleMessage);

		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, []);

	const handleOpenApp = () => {
		// Fallback button to manually open the app
		const hash = window.location.hash;
		if (hash) {
			const protocol = getProtocol();
			const electronCallbackUrl = `${protocol}://oauth/callback${hash}`;
			window.location.href = electronCallbackUrl;
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<div className="text-center max-w-md w-full">
				{/* Logo */}
				<div className="mb-8">
					<span className="text-3xl font-medium text-emerald-700">
						{isDev ? "Invook Dev" : "Invook"}
					</span>
				</div>

				{/* User Email Section */}
				{userEmail && (
					<div className="mb-4">
						<p className="text-gray-600">Logged in as:</p>
						<p className="font-mono text-lg text-gray-900">{userEmail}</p>
					</div>
				)}

				{/* Open App Button */}
				<button
					onClick={handleOpenApp}
					className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-200"
				>
					Open {isDev ? "Invook Dev" : "Invook"} App
				</button>
			</div>

			<style jsx>{`
        @keyframes fill {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
		</div>
	);
}
