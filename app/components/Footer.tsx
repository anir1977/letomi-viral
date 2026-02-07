import Link from "next/link";

const categories = [
  { name: "Psychology", slug: "psychology", icon: "🧠" },
  { name: "Science", slug: "science", icon: "🔬" },
  { name: "Human Body", slug: "human-body", icon: "💪" },
  { name: "Nature", slug: "nature", icon: "🌿" },
];

interface FooterVariant {
  variant?: "full" | "simple";
}

export default function Footer({ variant = "full" }: FooterVariant) {
  // Simple footer for specific pages (if needed)
  if (variant === "simple") {
    return (
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="border-t border-white/20 pt-8">
            <p className="text-center text-sm text-gray-300">
              &copy; 2026 <span className="font-bold text-white">CurioSpark</span>. All rights reserved. | Made with 💜 for the curious minds.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  // Full professional footer (default)
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">⚡</span>
              <span className="font-bold text-white text-lg">CurioSpark</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your daily source of fascinating facts and mind-blowing knowledge. Feed your curiosity, one spark at a time.
            </p>
            <div className="mt-4">
              <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                ⭐ Premium Content
              </span>
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`} className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover Section */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Discover</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/trending" className="hover:text-yellow-300 transition-colors duration-200">🔥 Trending Facts</Link></li>
              <li><Link href="/latest" className="hover:text-yellow-300 transition-colors duration-200">🆕 Latest Facts</Link></li>
              <li><Link href="/facts" className="hover:text-yellow-300 transition-colors duration-200">📚 All Facts</Link></li>
              <li><Link href="/about/editorial-process" className="hover:text-yellow-300 transition-colors duration-200">✅ Editorial Process</Link></li>
              <li><Link href="/about/fact-checking" className="hover:text-yellow-300 transition-colors duration-200">🔍 Fact-Checking</Link></li>
            </ul>
          </div>

          {/* Legal & Social Section */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Legal & Social</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-yellow-300 transition-colors duration-200">About Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-yellow-300 transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-yellow-300 transition-colors duration-200">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-300 transition-colors duration-200">Contact</Link></li>
            </ul>
            <h3 className="font-bold text-white mt-6 mb-4 text-sm uppercase tracking-wider">Follow Us</h3>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-blue-600 p-3 rounded-lg transition-all duration-200 transform hover:scale-110 group" aria-label="Facebook">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-sky-500 p-3 rounded-lg transition-all duration-200 transform hover:scale-110 group" aria-label="Twitter">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 p-3 rounded-lg transition-all duration-200 transform hover:scale-110 group" aria-label="Instagram">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-red-600 p-3 rounded-lg transition-all duration-200 transform hover:scale-110 group" aria-label="YouTube">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <p className="text-center text-sm text-gray-300">
            &copy; 2026 <span className="font-bold text-white">CurioSpark</span>. All rights reserved. | Made with 💜 for the curious minds.
          </p>
        </div>
      </div>
    </footer>
  );
}
