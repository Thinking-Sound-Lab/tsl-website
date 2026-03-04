"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";

// Get protocol based on environment (dev vs prod)
const getProtocol = (searchParams: URLSearchParams): string => {
	const isDev = searchParams.get("env") === "dev";
	return isDev ? "invook-dev" : "invook";
};

function CheckoutSuccessContent() {
	const searchParams = useSearchParams();
	const [email, setEmail] = useState<string>("");
	const [isDev, setIsDev] = useState<boolean>(false);

	const buildDeepLink = useCallback(() => {
		const params = new URLSearchParams();
		const subscriptionId = searchParams.get("subscription_id");
		const status = searchParams.get("status");
		const emailParam = searchParams.get("email");

		if (subscriptionId) params.set("subscription_id", subscriptionId);
		if (status) params.set("status", status);
		if (emailParam) params.set("email", emailParam);

		const protocol = getProtocol(searchParams);
		const query = params.toString();
		return `${protocol}://payment/success${query ? `?${query}` : ""}`;
	}, [searchParams]);

	const statusParam = searchParams.get("status");
	const isFailed = statusParam === "failed";

	useEffect(() => {
		const emailParam = searchParams.get("email");
		if (emailParam) setEmail(emailParam);

		// Check if dev environment
		setIsDev(searchParams.get("env") === "dev");

		// Redirect to Electron app with payment success/failure deep link
		window.location.href = buildDeepLink();
	}, [searchParams, buildDeepLink]);

	const handleOpenApp = () => {
		window.location.href = buildDeepLink();
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<div className="text-center max-w-md w-full">
				{/* Status Message */}
				<div className="mb-6">
					<div
						className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center ${isFailed ? "bg-red-100" : "bg-emerald-100"}`}
					>
						{isFailed ? (
							<svg
								className="w-8 h-8 text-red-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								className="w-8 h-8 text-emerald-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						)}
					</div>
					<h1 className="text-2xl font-semibold text-gray-900 mb-2">
						{isFailed ? "Payment Failed" : "Payment Successful!"}
					</h1>
					<p className="text-gray-600">
						{isFailed
							? "Your payment could not be processed. Please try again."
							: "Your payment has been processed successfully. You can now return to the app."}
					</p>
				</div>

				{/* User Email */}
				{email && (
					<div className="mb-4">
						<p className="text-gray-600">Logged in as:</p>
						<p className="font-mono text-lg text-gray-900">{email}</p>
					</div>
				)}

				{/* Open App Button */}
				<button
					onClick={handleOpenApp}
					className={`font-medium py-3 px-8 rounded-md transition-colors duration-200 text-white ${isFailed ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"}`}
				>
					Open {isDev ? "Invook Dev" : "Invook"} App
				</button>
			</div>
		</div>
	);
}

export default function CheckoutSuccessPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-gray-50 flex items-center justify-center">
					<span className="text-gray-500">Loading...</span>
				</div>
			}
		>
			<CheckoutSuccessContent />
		</Suspense>
	);
}
