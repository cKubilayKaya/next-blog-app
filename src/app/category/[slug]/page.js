import HomePage from "@/components/Containers/Home/HomePage";
import { listUniqueCategoryService } from "@/services/categoryServices";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const { success, category } = await listUniqueCategoryService(slug);

  if (success) {
    return {
      title: `${category?.name}`,
    };
  }
}

export default async function Category() {
  return <HomePage />;
}
