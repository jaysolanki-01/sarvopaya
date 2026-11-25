import { NextResponse } from "next/server";
import { fetchInstagramPosts } from "@/lib/instagram";

export const revalidate = 3600;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Math.min(Number(url.searchParams.get("limit") ?? "6"), 12);

  const posts = await fetchInstagramPosts(limit);
  return NextResponse.json(posts);
}
