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
    alternates: { canonical: `https://www.sarvopaya.com/${post.slug}` },
    openGraph: {
      title,
      description: post.excerpt,
      url: `https://www.sarvopaya.com/${post.slug}`,
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

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://www.sarvopaya.com/${post.slug}`,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author,
        url: "https://www.sarvopaya.com/about",
      },
      publisher: {
        "@type": "Organization",
        name: "Sarvopaya",
        url: "https://www.sarvopaya.com",
      },
      keywords: post.tag,
    },
  ];

  if (post.faqs && post.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <BlogPostDetail
        post={post}
        parentLabel="Blogs"
        parentHref="/resource/blogs"
        watermark="BLOG"
      />
    </>
  );
}
