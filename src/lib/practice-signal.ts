export type PracticeVote = "up" | "down";

export type PracticeSignalState = {
  up: number;
  down: number;
  userVote: PracticeVote | null;
  available: boolean;
};

type PracticeSignalStore = {
  votes?: Record<string, { up?: number; down?: number; voters?: Record<string, PracticeVote> }>;
};

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

function countsKey(slug: string) {
  return `practice-signal:counts:${slug}`;
}

function voterKey(slug: string, voterId: string) {
  return `practice-signal:voter:${slug}:${voterId}`;
}

function normalizeSlug(slug: string) {
  return slug.trim().toLowerCase();
}

function emptyState(): PracticeSignalState {
  return { up: 0, down: 0, userVote: null, available: true };
}

function canUseKv() {
  return Boolean(KV_URL && KV_TOKEN);
}

async function kvRequest(command: string[], method: "GET" | "POST" = "GET") {
  if (!KV_URL || !KV_TOKEN) {
    throw new Error("KV is not configured");
  }

  const url = `${KV_URL}/${command.map((part) => encodeURIComponent(part)).join("/")}`;
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`KV request failed: ${response.status}`);
  }

  return (await response.json()) as { result?: unknown };
}

async function getKvState(slug: string, voterId?: string | null): Promise<PracticeSignalState> {
  const countsResponse = await kvRequest(["hmget", countsKey(slug), "up", "down"]);
  const [upRaw, downRaw] = Array.isArray(countsResponse.result) ? countsResponse.result : [0, 0];
  let userVote: PracticeVote | null = null;

  if (voterId) {
    const voteResponse = await kvRequest(["get", voterKey(slug, voterId)]);
    userVote = voteResponse.result === "up" || voteResponse.result === "down" ? (voteResponse.result as PracticeVote) : null;
  }

  return {
    up: Number(upRaw ?? 0),
    down: Number(downRaw ?? 0),
    userVote,
    available: true,
  };
}

async function castKvVote(slug: string, voterId: string, vote: PracticeVote): Promise<PracticeSignalState> {
  const existing = await kvRequest(["get", voterKey(slug, voterId)]);
  const existingVote = existing.result === "up" || existing.result === "down" ? (existing.result as PracticeVote) : null;

  if (!existingVote) {
    await kvRequest(["set", voterKey(slug, voterId), vote]);
    await kvRequest(["hincrby", countsKey(slug), vote, "1"]);
  }

  return getKvState(slug, voterId);
}

async function getLocalStorePath() {
  if (process.env.EDCRITIX_PRACTICE_SIGNAL_LOCAL_FILE) {
    return process.env.EDCRITIX_PRACTICE_SIGNAL_LOCAL_FILE;
  }

  const path = await import("node:path");
  return path.resolve(/* turbopackIgnore: true */ process.cwd(), "../../../data/edcritix/practice-signals.json");
}

async function readLocalStore(): Promise<PracticeSignalStore> {
  const fs = await import("node:fs/promises");
  const localStorePath = await getLocalStorePath();
  try {
    const raw = await fs.readFile(localStorePath, "utf8");
    return JSON.parse(raw) as PracticeSignalStore;
  } catch {
    return { votes: {} };
  }
}

async function writeLocalStore(store: PracticeSignalStore) {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const localStorePath = await getLocalStorePath();
  await fs.mkdir(path.dirname(localStorePath), { recursive: true });
  await fs.writeFile(localStorePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

async function getLocalState(slug: string, voterId?: string | null): Promise<PracticeSignalState> {
  const store = await readLocalStore();
  const entry = store.votes?.[slug];
  return {
    up: Number(entry?.up ?? 0),
    down: Number(entry?.down ?? 0),
    userVote: voterId ? entry?.voters?.[voterId] ?? null : null,
    available: true,
  };
}

async function castLocalVote(slug: string, voterId: string, vote: PracticeVote): Promise<PracticeSignalState> {
  const store = await readLocalStore();
  const entry = store.votes?.[slug] ?? { up: 0, down: 0, voters: {} };
  const existingVote = entry.voters?.[voterId] ?? null;

  if (!existingVote) {
    entry.voters = entry.voters ?? {};
    entry.voters[voterId] = vote;
    entry[vote] = Number(entry[vote] ?? 0) + 1;
    store.votes = store.votes ?? {};
    store.votes[slug] = entry;
    await writeLocalStore(store);
  }

  return {
    up: Number(entry.up ?? 0),
    down: Number(entry.down ?? 0),
    userVote: entry.voters?.[voterId] ?? null,
    available: true,
  };
}

export function practiceSignalAvailable() {
  return canUseKv() || process.env.VERCEL !== "1";
}

export async function getPracticeSignalState(slugValue: string, voterId?: string | null): Promise<PracticeSignalState> {
  const slug = normalizeSlug(slugValue);
  if (!slug) return emptyState();

  if (canUseKv()) {
    return getKvState(slug, voterId);
  }

  if (process.env.VERCEL === "1") {
    return { up: 0, down: 0, userVote: null, available: false };
  }

  return getLocalState(slug, voterId);
}

export async function castPracticeSignalVote(slugValue: string, voterId: string, vote: PracticeVote): Promise<PracticeSignalState> {
  const slug = normalizeSlug(slugValue);
  if (!slug || !voterId) return emptyState();

  if (canUseKv()) {
    return castKvVote(slug, voterId, vote);
  }

  if (process.env.VERCEL === "1") {
    return { up: 0, down: 0, userVote: null, available: false };
  }

  return castLocalVote(slug, voterId, vote);
}
