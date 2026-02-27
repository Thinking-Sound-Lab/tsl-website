import type { Metadata } from "next";
import PrivacyPolicyContent from "./privacy-policy-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Invook Privacy Policy - How we collect, use, store, share, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
