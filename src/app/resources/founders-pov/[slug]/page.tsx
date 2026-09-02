import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostDetail from "@/components/BlogPostDetail";
import { getBlogPostBySlug, blogPosts } from "@/lib/blogPosts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return { title: "Post Not Found | Sarvopaya" };

  const title = `${post.title} | Sarvopaya`;

  return {
    title,
    description: post.excerpt,
    alternates: { canonical: `/resources/founders-pov/${post.slug}` },
    openGraph: {
      title,
      description: post.excerpt,
      url: `/resources/founders-pov/${post.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `https://sarvopaya.com/resources/founders-pov/${post.slug}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://sarvopaya.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Sarvopaya",
      url: "https://sarvopaya.com",
    },
    keywords: post.tag,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostDetail post={post} />
    </>
  );
}
