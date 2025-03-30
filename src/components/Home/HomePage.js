"use client";
import React, { useEffect, useState } from "react";
import CategoryWrapper from "./CategoryWrapper";
import PostWrapper from "./PostWrapper";
import { useParams } from "next/navigation";
import { listCategoriesService, listPostsByCategory } from "@/services/categoryServices";

export default function HomePage() {
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [updatePosts, setUpdatePosts] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { success, categories } = await listCategoriesService();
      if (success) {
        console.log("test");
        setCategories(categories);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories?.length >= 1) {
      const fetchPosts = async () => {
        const { success, category, pagination } = await listPostsByCategory(params?.slug || categories[0]?.slug);
        if (success) {
          setPosts(category?.posts);
          setPagination(pagination);
        }
      };

      fetchPosts();
    }
  }, [categories, updatePosts]);

  useEffect(() => {
    if (params) {
      if (Object.keys(params)?.length === 0) {
        setActiveCategory(categories?.[0]?.slug);
      } else {
        setActiveCategory(categories?.find((category) => category?.slug === params?.slug)?.slug);
      }
    }
  }, [params, categories]);

  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      <CategoryWrapper params={params} categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <PostWrapper posts={posts} activeCategory={activeCategory} setUpdatePosts={setUpdatePosts} />
    </div>
  );
}
