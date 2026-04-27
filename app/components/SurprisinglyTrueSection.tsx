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
    <section className="section-wrap py-16">
      <div className="mb-8">
        <p className="section-kicker">Surprising but useful</p>
        <h2 className="section-title mt-2">Surprisingly true</h2>
        <p className="section-subtitle">
          Short, evidence-aware ideas that make familiar topics feel clearer.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facts.map((item) => (
          <Link
            key={item.slug}
            href={`/post/${item.slug}`}
            className="article-card p-6"
          >
            <p className="section-kicker mb-3">Insight</p>
            <h3 className="mb-3 text-xl font-bold leading-snug text-slate-950 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-base leading-7 text-slate-600 mb-5 line-clamp-3">
              {item.fact}
            </p>
            <span className="text-link">Read full story</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
