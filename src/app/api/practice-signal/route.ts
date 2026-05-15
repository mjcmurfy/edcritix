import { NextResponse } from "next/server";
import {
  castPracticeSignalVote,
  getPracticeSignalState,
  practiceSignalAvailable,
  type PracticeVote,
} from "@/lib/practice-signal";

export const dynamic = "force-dynamic";

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug")?.trim();
  const voterId = searchParams.get("voterId")?.trim() || null;

  if (!slug) {
    return badRequest("slug is required");
  }

  const state = await getPracticeSignalState(slug, voterId);
  return NextResponse.json(state, {
    status: practiceSignalAvailable() ? 200 : 503,
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { slug?: string; vote?: PracticeVote; voterId?: string }
    | null;

  const slug = body?.slug?.trim();
  const voterId = body?.voterId?.trim();
  const vote = body?.vote;

  if (!slug) {
    return badRequest("slug is required");
  }

  if (!voterId) {
    return badRequest("voterId is required");
  }

  if (vote !== "up" && vote !== "down") {
    return badRequest("vote must be 'up' or 'down'");
  }

  const state = await castPracticeSignalVote(slug, voterId, vote);
  return NextResponse.json(state, {
    status: state.available ? 200 : 503,
  });
}
