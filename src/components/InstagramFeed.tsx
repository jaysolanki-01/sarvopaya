import { fetchInstagramPosts } from "@/lib/instagram";
import { InstagramStrip } from "./InstagramStrip";

interface InstagramFeedProps {
  limit?: number;
}

export async function InstagramFeed({ limit = 6 }: InstagramFeedProps) {
  const posts = await fetchInstagramPosts(limit);
  if (!posts.length) return null;
  return <InstagramStrip posts={posts} />;
}
