import HomePage from "@/components/Containers/Home/HomePage";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  return {
    title: `${slug}`,
    description: `Browse posts related to ${slug}.`,
  };
}

export default async function Category() {
  return <HomePage />;
}
