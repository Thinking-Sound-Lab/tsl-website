"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CheckoutSuccessContent() {
	const searchParams = useSearchParams();
	const [email, setEmail] = useState<string>("");

	const buildDeepLink = () => {
		const params = new URLSearchParams();
		const subscriptionId = searchParams.get("subscription_id");
		const status = searchParams.get("status");
		const emailParam = searchParams.get("email");

		if (subscriptionId) params.set("subscription_id", subscriptionId);
		if (status) params.set("status", status);
		if (emailParam) params.set("email", emailParam);

		const query = params.toString();
		return `invook://payment/success${query ? `?${query}` : ""}`;
	};

	useEffect(() => {
		const emailParam = searchParams.get("email");
		if (emailParam) setEmail(emailParam);

		// Redirect to Electron app with payment success deep link
		window.location.href = buildDeepLink();
	}, [searchParams]);

	const handleOpenApp = () => {
		window.location.href = buildDeepLink();
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<div className="text-center max-w-md w-full">
				{/* Logo */}
				<div className="mb-8">
					<span className="text-3xl font-medium text-emerald-700">Invook</span>
				</div>

				{/* Success Message */}
				<div className="mb-6">
					<div className="mx-auto mb-4 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
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
					</div>
					<h1 className="text-2xl font-semibold text-gray-900 mb-2">
						Payment Successful!
					</h1>
					<p className="text-gray-600">
						Your payment has been processed successfully. You can now return to
						the app.
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
					className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-200"
				>
					Open Invook App
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
