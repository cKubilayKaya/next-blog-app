import React from "react";

export default function HomeBanner({ category }) {
  console.log(category);
  return (
    <div className="p-14 rounded-2xl relative min-h-[280px] max-h-[280px] flex items-center mb-8 bg-[url(http://localhost:5000/uploads/posts/16072849260-scaled-1743602336111.jpg)] bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:rounded-2xl">
      <div className="relative max-md:flex items-center flex-col w-full text-white">
        <h1 className="text-3xl font-bold mb-2">{category?.name}</h1>
        <p className="text-sm">{category?.description}</p>
      </div>
    </div>
  );
}
