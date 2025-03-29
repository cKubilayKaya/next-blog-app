"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useForm from "@/hooks/useForm";
import createPostSchema from "@/validations/loginSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SelectBox from "../ui/SelectBox";
import { useEffect, useState } from "react";
import { listCategoriesService } from "@/services/categoryServices";
import { createPostService } from "@/services/postServices";

export default function CreatePostForm() {
  const [categoryData, setCategories] = useState();
  const [selected, setSelected] = useState();

  const { formData, errors, touched, handleChange, handleFocus, handleSubmit, loading } = useForm(
    {
      title: "",
      content: "",
      categories: [],
      excerpt: "",
    },
    createPostSchema
  );

  const router = useRouter();

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(async () => {
      try {
        const { success } = await createPostService(formData);
        if (success) {
          router.push("/");
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.message;
        toast.error(errorMessage);
      }
    });
  };

  useEffect(() => {
    setSelected(categoryData?.[0]);
  }, [categoryData]);

  return (
    <div className="mt-10 w-full">
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.title}
          errors={errors?.title}
        />
        <Input
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.content}
          errors={errors?.content}
        />

        <Input
          type="excerpt"
          label="Excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.excerpt}
          errors={errors?.excerpt}
        />

        <SelectBox
          label="Category"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.categories}
          errors={errors?.categories}
          data={categoryData}
          selected={selected}
          setSelected={setSelected}
        />

        <div className="flex items-center justify-between">
          <Button type="submit" isLoading={loading}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
