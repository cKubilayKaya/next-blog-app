import PostDetail from "@/components/Containers/PostDetail/PostDetail";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const postSlug = resolvedParams?.postSlug;

  return {
    title: `${postSlug}`,
    description: `Browse posts related to ${postSlug}.`,
  };
}

export default function page() {
  return <PostDetail />;
}
