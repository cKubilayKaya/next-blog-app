"use client";
import LinkElement from "../../UI/LinkElement";

export default function CategoryWrapper({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {categories?.map(({ id, name, slug, _count }) => (
        <LinkElement
          key={id}
          onClick={() => setActiveCategory(slug)}
          href={`/category/${slug}`}
          primary={slug === activeCategory}
          secondary={slug !== activeCategory}
        >
          {name} ({_count?.posts})
        </LinkElement>
      ))}
    </div>
  );
}
