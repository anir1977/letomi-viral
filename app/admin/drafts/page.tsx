import type { Metadata } from "next";
import { LockKeyhole, SearchCheck } from "lucide-react";
import { analyzeDraft, getDraftArticles } from "@/lib/admin/drafts";
import MarkdownContent from "@/app/components/MarkdownContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Draft Review - CurioSpark",
  robots: {
    index: false,
    follow: false,
  },
};

interface DraftDashboardProps {
  searchParams: {
    token?: string;
  };
}

export default function DraftDashboard({ searchParams }: DraftDashboardProps) {
  const configuredToken = process.env.DRAFT_REVIEW_TOKEN;
  const isAuthorized = Boolean(configuredToken) && searchParams.token === configuredToken;

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-[#f7f5ef] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4 inline-flex rounded-md bg-slate-950 p-3 text-white">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-bold text-slate-950">Draft review is protected</h1>
          <p className="mt-3 leading-7 text-slate-600">
            Add a private token in Vercel named <code>DRAFT_REVIEW_TOKEN</code>, then open this page with
            <code> /admin/drafts?token=YOUR_TOKEN</code>.
          </p>
        </div>
      </main>
    );
  }

  const drafts = getDraftArticles();

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">CurioSpark Admin</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Draft review</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Review draft articles before publishing. Use this page to approve quality, SEO, sources, and tone.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
            {drafts.length} draft{drafts.length === 1 ? "" : "s"}
          </div>
        </div>

        {drafts.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-slate-600">
            No drafts found yet.
          </div>
        ) : (
          <div className="grid gap-6">
            {drafts.map((draft) => {
              const analysis = analyzeDraft(draft);
              const isReady = analysis.score >= 85;

              return (
                <article key={draft.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                          {draft.category}
                        </span>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                          isReady ? "bg-teal-50 text-teal-800" : "bg-amber-50 text-amber-800"
                        }`}>
                          {isReady ? "Ready to publish" : "Needs review"}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold text-slate-950">{draft.title}</h2>
                      <p className="mt-3 max-w-3xl leading-7 text-slate-600">{draft.excerpt}</p>

                      <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
                        <div className="rounded-md bg-slate-50 p-3">
                          <div className="font-bold text-slate-950">SEO title</div>
                          <div className="mt-1 text-slate-600">{draft.seoTitle}</div>
                        </div>
                        <div className="rounded-md bg-slate-50 p-3">
                          <div className="font-bold text-slate-950">Meta description</div>
                          <div className="mt-1 text-slate-600">{draft.metaDescription}</div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <h3 className="font-bold text-slate-950">Sources</h3>
                        <ul className="mt-2 space-y-2 text-sm">
                          {draft.sources.map((source) => (
                            <li key={source.url}>
                              <a className="font-semibold text-teal-800 underline-offset-4 hover:underline" href={source.url}>
                                {source.publisher ? `${source.publisher}: ` : ""}{source.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <aside className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-md bg-white p-2 text-teal-800">
                          <SearchCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-3xl font-black text-slate-950">{analysis.score}%</div>
                          <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Quality score</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {analysis.checks.map((check) => (
                          <div key={check.label} className="flex items-start gap-2 text-sm">
                            <span className={check.passed ? "text-teal-700" : "text-amber-700"}>
                              {check.passed ? "Pass" : "Check"}
                            </span>
                            <span className="text-slate-700">{check.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 rounded-md bg-white p-3 text-sm text-slate-600">
                        <div><strong>Words:</strong> {analysis.wordCount}</div>
                        <div><strong>Sections:</strong> {analysis.headingCount}</div>
                        <div><strong>Keyword:</strong> {draft.focusKeyword}</div>
                      </div>

                      <div className="mt-4 rounded-md border border-slate-200 bg-white p-3 text-sm">
                        <div className="font-bold text-slate-950">Publish command</div>
                        <code className="mt-2 block break-all rounded bg-slate-950 px-3 py-2 text-xs text-white">
                          npm run drafts:publish -- {draft.slug}
                        </code>
                      </div>
                    </aside>
                  </div>

                  <details className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <summary className="cursor-pointer font-bold text-slate-950">Preview full draft</summary>
                    <div className="mt-5 rounded-lg bg-white p-5">
                      <MarkdownContent content={draft.content} />
                    </div>
                  </details>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
