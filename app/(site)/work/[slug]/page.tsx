import { permanentRedirect } from "next/navigation";

interface ProjectRedirectProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectRedirect({ params }: ProjectRedirectProps) {
  const { slug } = await params;
  permanentRedirect(`/ru/work/${slug}`);
}
