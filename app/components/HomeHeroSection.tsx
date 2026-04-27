import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

const categoryLinks = [
  { name: "Psychology", slug: "psychology" },
  { name: "Science", slug: "science" },
  { name: "Technology", slug: "technology" },
  { name: "Health", slug: "health" },
  { name: "Nature", slug: "nature" },
];

export default function HomeHeroSection() {
  return (
    <section className="border-b border-slate-200 bg-[#f7f5ef]">
      <div className="section-wrap py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="section-kicker mb-5">Independent curiosity journal</p>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-950 md:text-7xl">
              Clear curiosity, carefully explained.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              CurioSpark publishes practical, source-aware articles about psychology, technology,
              health, nature, and everyday science. No hype, no fake metrics, just useful ideas.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/latest"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
              >
                Read latest articles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about/editorial-process"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Editorial standards
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
            <div className="flex items-start gap-3 border-b border-slate-100 pb-5">
              <div className="rounded-md bg-teal-50 p-2 text-teal-700">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-950">What makes it different</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Articles are selected for reader value, reviewed for clarity, and maintained when
                  sources or context change.
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-4 text-sm text-slate-700">
              {[
                "Plain-language explanations with practical examples.",
                "Source notes for claims that deserve verification.",
                "A smaller, cleaner library instead of low-value volume.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-teal-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {categoryLinks.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="quiet-pill hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
