import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fact-Checking Policy - CurioSpark",
  description: "CurioSpark's comprehensive fact-checking policy ensuring accuracy and credibility.",
};

export default function FactCheckingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            ✓ Fact-Checking Policy
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            Accuracy is our top priority. Here's how we ensure every fact is verified.
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2>🎯 Our Commitment</h2>
              <p>
                At CurioSpark, we believe that interesting content must also be accurate content. 
                Every claim, statistic, and fact in our articles undergoes rigorous verification 
                before publication.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2>🔍 Fact-Checking Process</h2>
              
              <div className="space-y-6 mt-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Primary Source Verification</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Whenever possible, we verify information against primary sources:
                  </p>
                  <ul className="mt-2 text-gray-600 dark:text-gray-400">
                    <li>Original research papers and studies</li>
                    <li>Official government reports and data</li>
                    <li>Direct expert interviews</li>
                    <li>Official organizational statements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Multiple Source Confirmation</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We require multiple independent, credible sources to confirm significant claims. 
                    A single source is never sufficient for important facts.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Expert Review</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    For specialized topics, we consult with subject matter experts to ensure 
                    accuracy and proper context.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">4. Statistical Verification</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All numbers, percentages, and statistics are:
                  </p>
                  <ul className="mt-2 text-gray-600 dark:text-gray-400">
                    <li>Traced to their original source</li>
                    <li>Verified for accuracy</li>
                    <li>Checked for proper context</li>
                    <li>Updated if more recent data is available</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2>✅ Trusted Sources</h2>
              <p>We prioritize information from:</p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Academic & Research</h4>
                  <ul className="text-gray-600 dark:text-gray-400">
                    <li>Peer-reviewed journals</li>
                    <li>University research departments</li>
                    <li>Scientific institutions</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Government & Official</h4>
                  <ul className="text-gray-600 dark:text-gray-400">
                    <li>CDC, NIH, WHO</li>
                    <li>National statistics offices</li>
                    <li>Government agencies</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Reputable Media</h4>
                  <ul className="text-gray-600 dark:text-gray-400">
                    <li>Major news organizations</li>
                    <li>Established science publications</li>
                    <li>Industry trade journals</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Expert Authorities</h4>
                  <ul className="text-gray-600 dark:text-gray-400">
                    <li>Subject matter experts</li>
                    <li>Professional organizations</li>
                    <li>Credentialed specialists</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2>🚫 What We Avoid</h2>
              <p>We do NOT use or trust:</p>
              <ul>
                <li>Unverified social media claims</li>
                <li>Anonymous sources without corroboration</li>
                <li>Dubious websites or "news" sites</li>
                <li>Outdated information presented as current</li>
                <li>Cherry-picked data that lacks context</li>
                <li>Sensationalized or clickbait sources</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2>🔄 Corrections & Updates</h2>
              <p>
                Despite our rigorous process, errors can occur. When they do:
              </p>
              <ul>
                <li><strong>We correct immediately:</strong> Errors are fixed as soon as we're aware of them</li>
                <li><strong>We're transparent:</strong> Significant corrections are noted in the article</li>
                <li><strong>We learn:</strong> Each error informs process improvements</li>
                <li><strong>We welcome feedback:</strong> Readers can report concerns anytime</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2>⚠️ Limitations & Disclaimers</h2>
              <p><strong>CurioSpark provides educational content, not professional advice.</strong></p>
              <ul>
                <li>Our content is for informational purposes only</li>
                <li>We do not provide medical, legal, or financial advice</li>
                <li>Always consult qualified professionals for specific concerns</li>
                <li>Science evolves - we update content as new research emerges</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8">
              <h2>📧 Report a Concern</h2>
              <p>
                If you believe any content on CurioSpark contains an error or needs clarification, 
                we want to know. Contact our editorial team with:
              </p>
              <ul>
                <li>The article URL</li>
                <li>The specific claim in question</li>
                <li>Your source or reasoning</li>
              </ul>
              <p className="mt-4">
                We review all submissions and respond within 48 hours.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link 
              href="/about/editorial-process"
              className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-8 py-4 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition"
            >
              📋 Editorial Process
            </Link>
            <Link 
              href="/author/editorial-team"
              className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-8 py-4 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
            >
              👥 Meet Our Team
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
