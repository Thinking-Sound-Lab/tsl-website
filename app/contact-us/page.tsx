import type { Metadata } from "next";
import ContactUsContent from "./contact-us-content";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactUsPage() {
  return <ContactUsContent />;
}
