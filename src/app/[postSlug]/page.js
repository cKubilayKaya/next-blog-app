import PostDetail from "@/components/Containers/PostDetail/PostDetail";
import { listUniquePostService } from "@/services/postServices";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const postSlug = resolvedParams?.postSlug;

  const { success, post } = await listUniquePostService(postSlug);

  if (success) {
    return {
      title: `${post?.title}`,
    };
  }
}

export default function page() {
  return <PostDetail />;
}
