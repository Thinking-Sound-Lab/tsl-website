import { useState, useEffect } from "react";
import Image from "next/image";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError("Failed to join waitlist. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(null); // Clear error when user starts typing
    }
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!open) {
    return null;
  }

  if (success) {
    return (
      <div
        className={`fixed inset-0 bg-[#f7f7f5]/80 flex items-center justify-center z-50 transition-opacity duration-200 ease-out ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleOverlayClick}
      >
        <div className={`bg-white rounded-2xl shadow-md p-8 max-w-md w-full mx-4 relative border border-black/10 transition-all duration-200 ease-out ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'}`}>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/svgs/web_logo.svg"
                alt="Invook logo"
                width={64}
                height={64}
                className="rounded-md"
              />
            </div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100">
              <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mt-4">Success!</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                You&apos;re on the waitlist — we&apos;ll notify you soon
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={handleClose}
                disabled={loading}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 text-base font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 bg-[#f7f7f5]/80 flex items-center justify-center z-50 transition-opacity duration-200 ease-out ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleOverlayClick}
    >
      <div className={`bg-white rounded-2xl shadow-md p-8 max-w-md w-full mx-4 relative border border-black/10 transition-all duration-200 ease-out ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'}`}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/svgs/web_logo.svg"
              alt="Invook logo"
              width={64}
              height={64}
              className="rounded-md"
            />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight leading-tight">Join the Invook Waitlist</h3>
          <div className="mt-3">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Be the first to know when we launch. Early access and updates coming soon.
            </p>
          </div>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 h-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 focus:border-emerald-500 text-base"
              disabled={loading}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className={`w-full px-4 py-3 h-12 text-white text-base font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${loading || success
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
              }`}
          >
            {loading ? "Joining..." : "Join Waitlist"}
          </button>
        </form>
      </div>
    </div>
  );
}