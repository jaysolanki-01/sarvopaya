"use client";

import { useEffect, useState } from "react";
import type { InstagramPost } from "@/lib/instagram";
import { InstagramStrip } from "./InstagramStrip";

interface InstagramFeedWidgetProps {
  limit?: number;
}

export function InstagramFeedWidget({ limit = 6 }: InstagramFeedWidgetProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/instagram?limit=${limit}`)
      .then((r) => r.json())
      .then((data: InstagramPost[]) => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [limit]);

  if (!loaded || !posts.length) return null;
  return <InstagramStrip posts={posts} />;
}
