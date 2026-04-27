import Link from "next/link";

const footerCategories = [
  { name: "Psychology", slug: "psychology" },
  { name: "Science", slug: "science" },
  { name: "Human Behavior", slug: "human-behavior" },
  { name: "Nature", slug: "nature" },
  { name: "Technology", slug: "technology" },
  { name: "Space", slug: "space" },
];

interface FooterVariant {
  variant?: "full" | "simple";
}

export default function Footer({ variant = "full" }: FooterVariant) {
  if (variant === "simple") {
    return (
      <footer className="border-t border-slate-200 bg-white">
        <div className="section-wrap py-8">
          <p className="text-center text-sm text-slate-500">
            &copy; 2026 <span className="font-bold text-slate-900">CurioSpark</span>. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="section-wrap py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
                CS
              </span>
              <span className="font-black text-slate-950">CurioSpark</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Clear, source-aware articles about psychology, technology, health, nature, and everyday science.
            </p>
            <span className="mt-5 inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800">
              Editorially reviewed
            </span>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Categories</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {footerCategories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`} className="font-semibold text-slate-600 hover:text-teal-800">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Discover</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/trending" className="font-semibold text-slate-600 hover:text-teal-800">Editor's Picks</Link></li>
              <li><Link href="/latest" className="font-semibold text-slate-600 hover:text-teal-800">Latest Articles</Link></li>
              <li><Link href="/articles" className="font-semibold text-slate-600 hover:text-teal-800">All Articles</Link></li>
              <li><Link href="/about/editorial-process" className="font-semibold text-slate-600 hover:text-teal-800">Editorial Process</Link></li>
              <li><Link href="/about/fact-checking" className="font-semibold text-slate-600 hover:text-teal-800">Fact-Checking</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="font-semibold text-slate-600 hover:text-teal-800">About Us</Link></li>
              <li><Link href="/privacy-policy" className="font-semibold text-slate-600 hover:text-teal-800">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="font-semibold text-slate-600 hover:text-teal-800">Terms of Service</Link></li>
              <li><Link href="/contact" className="font-semibold text-slate-600 hover:text-teal-800">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-500">
            &copy; 2026 <span className="font-bold text-slate-900">CurioSpark</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
