import publishedFeed from "@/data/published-feed.json";

export type ImpactLevel =
  | "Practice-changing"
  | "High-yield"
  | "Worth watching"
  | "Background";

export type SourceAccess =
  | "full-text parsed"
  | "abstract + metadata"
  | "editor-uploaded PDF";

export type Article = {
  slug: string;
  title: string;
  source: string;
  link: string;
  published: string;
  publishedAt: string | null;
  impact: ImpactLevel;
  topic: string;
  topics: string[];
  takeaway: string;
  shortSummary: string;
  summary: string;
  critique: string;
  editorialAngle: string;
  studyDesign: string;
  sample: string | null;
  evidenceSignal: string;
  sourceAccess: SourceAccess;
  keyFindings: string[];
  strengths: string[];
  limitations: string[];
  questionsForPractice: string[];
  bottomLine: string;
  analysisProvenance: string;
  score: number;
  importance: string;
  confidence: string | null;
  readingPriority: string | null;
};

export type Topic = {
  slug: string;
  label: string;
  itemCount: number;
};

export type Stat = {
  label: string;
  value: string;
};

export type TrustPillar = {
  title: string;
  text: string;
};

export type FeedMeta = {
  generatedAt: string;
  sourceGeneratedAt: string | null;
  editorialGeneratedAt: string | null;
  sourceWindowDays?: number | null;
  notes?: string | null;
  analysisOverridesPath?: string | null;
};

export type BriefingContent = {
  headline: string;
  summary: string;
  editorialHeadline: string | null;
  editorialSummary: string | null;
};

type PublishedFeed = {
  meta?: Partial<FeedMeta>;
  briefing?: Partial<BriefingContent>;
  stats?: Stat[];
  trustPillars?: TrustPillar[];
  dailyEditorial?: Article[];
  featured?: Article[];
  articles?: Article[];
  topics?: Topic[];
};

const feed = publishedFeed as PublishedFeed;
const NZ_TIME_ZONE = "Pacific/Auckland";

export const feedMeta: FeedMeta = {
  generatedAt: feed.meta?.generatedAt ?? new Date(0).toISOString(),
  sourceGeneratedAt: feed.meta?.sourceGeneratedAt ?? null,
  editorialGeneratedAt: feed.meta?.editorialGeneratedAt ?? null,
  sourceWindowDays: feed.meta?.sourceWindowDays ?? null,
  notes: feed.meta?.notes ?? null,
  analysisOverridesPath: feed.meta?.analysisOverridesPath ?? null,
};

export const briefing: BriefingContent = {
  headline: feed.briefing?.headline ?? "EDCritix briefing",
  summary: feed.briefing?.summary ?? "Current emergency medicine highlights.",
  editorialHeadline: feed.briefing?.editorialHeadline ?? null,
  editorialSummary: feed.briefing?.editorialSummary ?? null,
};

export const stats = feed.stats ?? [];
export const trustPillars = feed.trustPillars ?? [];
export const dailyEditorial = (feed.dailyEditorial ?? feed.featured ?? []) as Article[];
export const featuredArticles = (feed.featured ?? dailyEditorial.slice(0, 6)) as Article[];
export const articles = (feed.articles ?? dailyEditorial) as Article[];
export const topics = (feed.topics ?? []) as Topic[];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function formatDateTime(iso: string | null) {
  if (!iso) return "Date not available";

  return new Intl.DateTimeFormat("en-NZ", {
    timeZone: NZ_TIME_ZONE,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function formatDate(iso: string | null) {
  if (!iso) return "Date not available";

  return new Intl.DateTimeFormat("en-NZ", {
    timeZone: NZ_TIME_ZONE,
    dateStyle: "medium",
  }).format(new Date(iso));
}

export function getTopSources(limit = 5) {
  return Object.entries(
    articles.reduce<Record<string, number>>((acc, article) => {
      acc[article.source] = (acc[article.source] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

export function getImpactCounts() {
  return articles.reduce<Record<ImpactLevel, number>>(
    (acc, article) => {
      acc[article.impact] += 1;
      return acc;
    },
    {
      "Practice-changing": 0,
      "High-yield": 0,
      "Worth watching": 0,
      Background: 0,
    },
  );
}

export function getTopicArticles(topicLabel: string, limit?: number) {
  const matches = articles.filter(
    (article) =>
      article.topic === topicLabel || article.topics.includes(topicLabel),
  );

  return typeof limit === "number" ? matches.slice(0, limit) : matches;
}

export function getTopicHighlights(limit = 6) {
  return topics
    .map((topic) => {
      const matches = getTopicArticles(topic.label);
      const lead = matches[0];
      const practiceChanging = matches.filter(
        (article) => article.impact === "Practice-changing",
      ).length;

      return {
        ...topic,
        lead,
        practiceChanging,
      };
    })
    .filter((topic) => topic.lead)
    .sort((a, b) => b.itemCount - a.itemCount)
    .slice(0, limit);
}

export function getUniqueSources() {
  return Array.from(new Set(articles.map((article) => article.source))).sort();
}

const genericCritiquePrefix = "The current engine flags this as important because ";
const genericCritiqueMiddle =
  "This export is still working from summary-level inputs, so the critical appraisal is provisional rather than a final journal-club grade read.";
const genericPriorityPrefix = "Internal reading priority is set to ";
const genericProvenance =
  "Published from engine ranking plus abstract/metadata-level analysis; deeper appraisal can be layered later.";

export function getDisplayCritique(article: Article) {
  const critique = article.critique?.trim();

  if (!critique) return "";

  if (critique.startsWith(genericCritiquePrefix)) {
    const reason = critique
      .replace(genericCritiquePrefix, "")
      .replace(genericCritiqueMiddle, "")
      .replace(/Internal reading priority is set to [^.]+\./, "")
      .trim();

    const cleanedReason = reason.replace(/\s+/g, " ").replace(/\s+\./g, ".");
    const priority = article.readingPriority
      ? ` Current priority: ${article.readingPriority}.`
      : "";

    return `This is an early appraisal based on the available source layer rather than a full-text journal-club review.${priority}${cleanedReason ? ` ${cleanedReason}` : ""}`.trim();
  }

  return critique;
}

export function getDisplayProvenance(article: Article) {
  if (article.analysisProvenance === genericProvenance) {
    return "Ranked from the live feed and summarised from the available source layer. Full-text appraisal can be added later when more source material is available.";
  }

  return article.analysisProvenance;
}
