import { categories, getAllPosts } from '@/lib/posts';

export default function SiteStats() {
  const posts = getAllPosts();
  const stats = {
    articlesPublished: posts.length,
    topicsCovered: categories.length,
    curatedFacts: posts.filter((post) => post.didYouKnow || post.surprisingFact).length,
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="grid grid-cols-1 divide-y divide-slate-100 text-center md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className="py-4 md:py-0">
          <div className="text-3xl font-black text-slate-950">
            {stats.articlesPublished}
          </div>
          <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Articles Published
          </div>
        </div>
        <div className="py-4 md:py-0">
          <div className="text-3xl font-black text-slate-950">
            {stats.topicsCovered}
          </div>
          <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Topics Covered
          </div>
        </div>
        <div className="py-4 md:py-0">
          <div className="text-3xl font-black text-slate-950">
            {stats.curatedFacts}
          </div>
          <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Curated Facts
          </div>
        </div>
      </div>
    </div>
  );
}
