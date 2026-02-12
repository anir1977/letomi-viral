import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - CurioSpark",
  description: "CurioSpark Privacy Policy - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Privacy Policy
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: January 19, 2026
          </p>

          <div className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              CurioSpark ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li><strong>Personal Information:</strong> Email addresses when you subscribe to our newsletter</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and links clicked</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</li>
              <li><strong>Analytics Data:</strong> We use analytics tools to understand user behavior and improve our content</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use the collected information for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>Delivering our newsletter to subscribers</li>
              <li>Improving website functionality and user experience</li>
              <li>Analyzing website traffic and user behavior</li>
              <li>Displaying relevant advertisements through Google AdSense</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may use third-party services that collect, monitor, and analyze data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li><strong>Google AdSense:</strong> We use Google AdSense for displaying advertisements. Google may use cookies to serve ads based on your prior visits to our website.</li>
              <li><strong>Analytics Services:</strong> We may use analytics services to monitor and analyze web traffic.</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We implement appropriate technical and organizational measures to protect your personal data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Unsubscribe from our newsletter at any time</li>
              <li>Object to processing of your personal data</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our website is intended for general audiences and is not directed at children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              If you have any questions about this Privacy Policy, please contact us through our website or email us at info@curiospark.org.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}
