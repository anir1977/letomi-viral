import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/app/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - CurioSpark",
  description: "Get in touch with CurioSpark. Contact us for questions, feedback, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Contact Us
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
            We'd love to hear from you. Share questions, feedback, or partnership ideas and our team will get back to you.
          </p>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send a message
              </h2>
              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Direct email
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Prefer email? Reach us directly and we will respond within 24-48 hours.
                </p>
                <a
                  href="mailto:info@curiospark.org"
                  className="text-lg font-semibold text-purple-600 hover:text-purple-700 dark:hover:text-purple-400 transition"
                >
                  info@curiospark.org
                </a>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Working hours
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Monday to Friday, 9:00 AM - 6:00 PM (GMT).
                </p>
              </div>

              <div className="rounded-2xl border border-purple-200/70 dark:border-purple-700/60 bg-purple-50/60 dark:bg-purple-900/20 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Editorial guidelines
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Learn how we research, verify, and publish every CurioSpark story.
                </p>
                <Link
                  href="/about/editorial-process"
                  className="text-sm font-semibold text-purple-700 dark:text-purple-300 hover:text-purple-600"
                >
                  Read our process →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
