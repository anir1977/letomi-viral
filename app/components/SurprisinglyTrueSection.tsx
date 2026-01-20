import Link from "next/link";

interface SurprisingFact {
  title: string;
  fact: string;
  slug: string;
}

interface SurprisinglyTrueSectionProps {
  facts: SurprisingFact[];
}

export default function SurprisinglyTrueSection({ facts }: SurprisinglyTrueSectionProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🤯 Surprisingly True
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Facts so incredible, you'll want to share them immediately
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facts.map((item, index) => (
          <Link
            key={item.slug}
            href={`/post/${item.slug}`}
            className="group bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-6 hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="text-4xl flex-shrink-0">🤯</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition">
                  {item.title}
                </h3>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4 line-clamp-3">
              {item.fact}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">
                Read Full Story →
              </span>
              <span className="bg-orange-200 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full text-xs font-bold">
                MIND-BLOWING
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
