import { fetchInstagramPosts } from "@/lib/instagram";
import { InstagramStrip, type InstagramStripProps } from "./InstagramStrip";

interface InstagramFeedProps extends Omit<InstagramStripProps, "posts"> {
  limit?: number;
}

export async function InstagramFeed({
  limit = 6,
  ...stripProps
}: InstagramFeedProps) {
  const posts = await fetchInstagramPosts(limit);
  return <InstagramStrip posts={posts} {...stripProps} />;
}
