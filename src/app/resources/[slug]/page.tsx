import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { getProjectBySlug, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found Sarvopaya" };
  }

  const title = `${project.title} | Sarvopaya`;

  return {
    title,
    description: project.summary,
    alternates: {
      canonical: `/resources/${project.slug}`,
    },
    openGraph: {
      title,
      description: project.summary,
      url: `/resources/${project.slug}`,
      type: "article",
      images: [{ url: project.image, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    image: project.image,
    url: `https://sarvopaya.com/resources/${project.slug}`,
    about: project.industry,
    keywords: [project.category, project.industry, ...project.services].join(", "),
    creator: {
      "@type": "Organization",
      name: "Sarvopaya",
      url: "https://sarvopaya.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <ProjectDetail project={project} />
    </>
  );
}
