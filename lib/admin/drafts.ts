import fs from "node:fs";
import path from "node:path";

export interface DraftSource {
  title: string;
  url: string;
  publisher?: string;
}

export interface DraftArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "draft" | "needs_revision" | "approved";
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  excerpt: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  sources: DraftSource[];
  content: string;
  faqs: { question: string; answer: string }[];
  qualityNotes?: string[];
}

const draftsDirectory = path.join(process.cwd(), "CONTENT", "drafts");

export function getDraftArticles(): DraftArticle[] {
  if (!fs.existsSync(draftsDirectory)) return [];

  return fs
    .readdirSync(draftsDirectory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(draftsDirectory, file);
      return JSON.parse(fs.readFileSync(filePath, "utf8")) as DraftArticle;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function analyzeDraft(draft: DraftArticle) {
  const wordCount = draft.content.trim().split(/\s+/).filter(Boolean).length;
  const headingCount = (draft.content.match(/^##\s/gm) || []).length;
  const hasKeyword = draft.title.toLowerCase().includes(draft.focusKeyword.toLowerCase()) ||
    draft.content.toLowerCase().includes(draft.focusKeyword.toLowerCase());
  const checks = [
    { label: "Meta description under 160 characters", passed: draft.metaDescription.length <= 160 },
    { label: "Readable article length", passed: wordCount >= 500 },
    { label: "At least 3 clear sections", passed: headingCount >= 3 },
    { label: "At least 2 credible sources", passed: draft.sources.length >= 2 },
    { label: "FAQ section included", passed: draft.faqs.length >= 2 },
    { label: "Focus keyword appears naturally", passed: hasKeyword },
    { label: "Image alt text is descriptive", passed: draft.imageAlt.length >= 20 },
  ];

  const passed = checks.filter((check) => check.passed).length;
  const score = Math.round((passed / checks.length) * 100);

  return { checks, score, wordCount, headingCount };
}
