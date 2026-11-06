import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostDetail from "@/components/BlogPostDetail";
import { getFounderPovBySlug, founderPovs } from "@/lib/founderPovs";
import { AUTHOR_PERSON_SCHEMA, ORGANIZATION_SCHEMA } from "@/lib/authorSchema";

export function generateStaticParams() {
  return founderPovs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getFounderPovBySlug(slug);

  if (!post) return { title: "Post Not Found | Sarvopaya" };

  const title = `${post.title} | Sarvopaya Founder's POV`;

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

export default async function FounderPovPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getFounderPovBySlug(slug);

  if (!post) notFound();

  const schemas: object[] = [
    AUTHOR_PERSON_SCHEMA,
    ORGANIZATION_SCHEMA,
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `https://www.sarvopaya.com/resources/founders-pov/${post.slug}#article`,
      mainEntityOfPage: `https://www.sarvopaya.com/resources/founders-pov/${post.slug}`,
      headline: post.title,
      description: post.excerpt,
      url: `https://www.sarvopaya.com/resources/founders-pov/${post.slug}`,
      datePublished: post.date,
      inLanguage: "en-US",
      author: {
        "@type": "Person",
        "@id": "https://www.sarvopaya.com/about#jay-solanki",
        name: post.author,
        jobTitle: "Founder & Growth Architect",
        url: "https://www.sarvopaya.com/about",
        image: "https://www.sarvopaya.com/images/jay-solanki.png",
      },
      publisher: {
        "@type": "Organization",
        "@id": "https://www.sarvopaya.com/#organization",
        name: "Sarvopaya",
        url: "https://www.sarvopaya.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.sarvopaya.com/images/Logo_black.png",
        },
      },
      keywords: post.tag,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <BlogPostDetail
        post={post}
        parentLabel="Founder's POV"
        parentHref="/resources/founders-pov"
        watermark="POV"
      />
    </>
  );
}
