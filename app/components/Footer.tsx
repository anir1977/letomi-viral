import Link from "next/link";

interface FooterVariant {
  variant?: "full" | "simple";
}

export default function Footer({ variant = "simple" }: FooterVariant) {
  if (variant === "full") {
    // Detailed footer with 3-column grid for About, Privacy, Contact, Terms pages
    return (
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">⚡</span>
                <span className="font-bold text-gray-900 dark:text-white">CurioSpark</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your daily source of fascinating facts and knowledge.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/" className="hover:text-purple-600">Home</Link></li>
                <li><Link href="/categories" className="hover:text-purple-600">Categories</Link></li>
                <li><Link href="/about" className="hover:text-purple-600">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/privacy-policy" className="hover:text-purple-600">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-purple-600">Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-purple-600">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2026 CurioSpark. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }

  // Simple footer for other pages
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; 2026 CurioSpark. All rights reserved.</p>
      </div>
    </footer>
  );
}
