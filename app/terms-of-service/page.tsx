import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - CurioSpark",
  description: "CurioSpark Terms of Service - Read our terms and conditions for using our website.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Terms of Service
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: January 19, 2026
          </p>

          <div className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Agreement to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              By accessing and using CurioSpark, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use our website.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Use of Website
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You agree to use CurioSpark only for lawful purposes. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>Use the website in any way that violates any applicable laws or regulations</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use of the website</li>
              <li>Attempt to gain unauthorized access to any portion of the website</li>
              <li>Use any automated system to access the website in a manner that sends more requests than a human can reasonably produce</li>
              <li>Copy, reproduce, or distribute content without permission</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Intellectual Property Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              All content on CurioSpark, including text, graphics, logos, images, and software, is the property of CurioSpark or its content suppliers and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without explicit permission.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              User-Generated Content
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              If you submit comments, feedback, or other content to CurioSpark, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute such content.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Accuracy of Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              While we strive to provide accurate and up-to-date information, CurioSpark makes no warranties or representations about the accuracy or completeness of the content. The information is provided "as is" without warranty of any kind.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Third-Party Links
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of these sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Advertising
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              CurioSpark displays advertisements through Google AdSense and other advertising partners. We are not responsible for the content of advertisements or the practices of advertisers.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              To the fullest extent permitted by law, CurioSpark shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our website.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Indemnification
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You agree to indemnify and hold CurioSpark harmless from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of your use of the website or violation of these terms.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We reserve the right to modify these terms at any time. We will notify users of any material changes by updating the "Last updated" date. Your continued use of the website after such changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              These terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              If you have any questions about these Terms of Service, please contact us at legal@curiospark.com.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}
