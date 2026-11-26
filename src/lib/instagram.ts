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
    return [];
  }

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const opts: RequestInit = { next: { revalidate: 3600 } };

  try {
    // Fast path: user ID already known (try Facebook Graph API, then Instagram Graph API)
    const userId = process.env.INSTAGRAM_USER_ID;
    if (userId) {
      const fbRes = await fetch(
        `https://graph.facebook.com/v21.0/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`,
        opts,
      );
      const fbData = await fbRes.json();
      if (Array.isArray(fbData.data)) return fbData.data as InstagramPost[];

      const igRes = await fetch(
        `https://graph.instagram.com/v21.0/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`,
        opts,
      );
      const igData = await igRes.json();
      if (Array.isArray(igData.data)) return igData.data as InstagramPost[];
    }

    // Discovery path 1: Facebook Pages → Instagram Business Account
    const pagesRes = await fetch(
      `https://graph.facebook.com/v21.0/me/accounts?access_token=${token}`,
      opts,
    );
    const pagesData = await pagesRes.json();

    if (pagesData.data?.length) {
      const pageId = pagesData.data[0].id;
      const pageRes = await fetch(
        `https://graph.facebook.com/v21.0/${pageId}?fields=instagram_business_account&access_token=${token}`,
        opts,
      );
      const pageData = await pageRes.json();
      const igId: string | undefined = pageData.instagram_business_account?.id;

      if (igId) {
        const mediaRes = await fetch(
          `https://graph.facebook.com/v21.0/${igId}/media?fields=${fields}&limit=${limit}&access_token=${token}`,
          opts,
        );
        const mediaData = await mediaRes.json();
        if (Array.isArray(mediaData.data)) return mediaData.data as InstagramPost[];
      }
    }

    // Discovery path 2: Instagram API with Instagram Login
    const igMeRes = await fetch(
      `https://graph.instagram.com/v21.0/me/media?fields=${fields}&limit=${limit}&access_token=${token}`,
      opts,
    );
    const igMeData = await igMeRes.json();
    if (Array.isArray(igMeData.data)) return igMeData.data as InstagramPost[];

    return [];
  } catch (err) {
    console.error("[Instagram] fetch error:", err);
    return [];
  }
}
