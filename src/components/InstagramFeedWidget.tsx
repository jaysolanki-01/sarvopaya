"use client";

import { useEffect, useState } from "react";
import type { InstagramPost } from "@/lib/instagram";
import { InstagramStrip, type InstagramStripProps } from "./InstagramStrip";

interface InstagramFeedWidgetProps extends Omit<InstagramStripProps, "posts"> {
  limit?: number;
}

export function InstagramFeedWidget({
  limit = 6,
  ...stripProps
}: InstagramFeedWidgetProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/instagram?limit=${limit}`)
      .then((r) => r.json())
      .then((data: InstagramPost[]) => {
        if (!cancelled && Array.isArray(data)) setPosts(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [limit]);

  if (!loaded) return null;
  return <InstagramStrip posts={posts} {...stripProps} />;
}
