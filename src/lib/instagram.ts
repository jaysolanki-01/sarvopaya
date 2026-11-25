export interface InstagramPost {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

export async function fetchInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    console.warn("[Instagram] INSTAGRAM_ACCESS_TOKEN not set");
    return [];
  }

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const opts: RequestInit = { next: { revalidate: 3600 } };

  try {
    // Fast path: user ID already known
    const userId = process.env.INSTAGRAM_USER_ID;
    if (userId) {
      const res = await fetch(
        `https://graph.facebook.com/v19.0/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`,
        opts,
      );
      const data = await res.json();
      if (data.data) return data.data as InstagramPost[];
    }

    // Discovery path 1: Facebook Pages → Instagram Business Account
    const pagesRes = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${token}`,
      opts,
    );
    const pagesData = await pagesRes.json();

    if (pagesData.data?.length) {
      const pageId = pagesData.data[0].id;
      const pageRes = await fetch(
        `https://graph.facebook.com/v19.0/${pageId}?fields=instagram_business_account&access_token=${token}`,
        opts,
      );
      const pageData = await pageRes.json();
      const igId: string | undefined = pageData.instagram_business_account?.id;

      if (igId) {
        console.log("[Instagram] user ID:", igId, "— add as INSTAGRAM_USER_ID in env");
        const mediaRes = await fetch(
          `https://graph.facebook.com/v19.0/${igId}/media?fields=${fields}&limit=${limit}&access_token=${token}`,
          opts,
        );
        const mediaData = await mediaRes.json();
        if (mediaData.data) return mediaData.data as InstagramPost[];
      }
    }

    // Discovery path 2: Instagram Basic Display API (personal/creator accounts)
    const basicRes = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`,
      opts,
    );
    const basicData = await basicRes.json();
    if (basicData.data) return basicData.data as InstagramPost[];

    console.warn("[Instagram] could not fetch posts:", JSON.stringify(basicData));
    return [];
  } catch (err) {
    console.error("[Instagram] fetch error:", err);
    return [];
  }
}
