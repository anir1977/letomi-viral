import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/posts";

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
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`} className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.imageAlt || category.name}
                        width={18}
                        height={18}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] font-semibold text-white flex items-center justify-center">
                        {category.name.slice(0, 1)}
                      </span>
                    )}
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/categories"
              className="mt-4 inline-flex text-sm font-semibold text-yellow-300 hover:text-yellow-200 transition-colors duration-200"
            >
              View all categories →
            </Link>
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
