"use client";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import useForm from "@/hooks/useForm";
import createPostSchema from "@/validations/createPostSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SelectBox from "../UI/SelectBox";
import { useEffect, useState } from "react";
import { listCategoriesService } from "@/services/categoryServices";
import { createPostService } from "@/services/postServices";
import InputFile from "../UI/InputFile";

export default function CreatePostForm() {
  const [categoryData, setCategories] = useState();
  const [selected, setSelected] = useState();

  const { formData, errors, touched, handleChange, handleFocus, handleSubmit, loading } = useForm(
    {
      title: "",
      content: "",
      categories: [],
      excerpt: "",
      featuredImageUrl: "",
    },
    createPostSchema
  );

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const { success, categories } = await listCategoriesService();
      if (success) {
        setCategories(categories);
      }
    };

    fetchCategories();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formObject = new FormData();

    formObject.append("title", formData.title);
    formObject.append("content", formData.content);
    formObject.append("excerpt", formData.excerpt);

    formData.categories.forEach((category) => {
      formObject.append("categories[]", category);
    });

    if (formData.featuredImageUrl instanceof File) {
      formObject.append("featuredImageUrl", formData.featuredImageUrl);
    } else {
      toast.error("Geçerli bir dosya seçilmedi!");
    }

    await handleSubmit(async () => {
      try {
        const { success } = await createPostService(formObject);
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
        <div>
          <InputFile
            label="Image"
            name="featuredImageUrl"
            // value={formData.featuredImageUrl}
            onChange={handleChange}
            onFocus={handleFocus}
            touched={touched?.featuredImageUrl}
            errors={errors?.featuredImageUrl}
          />
          {formData?.featuredImageUrl && <img src={URL.createObjectURL(formData?.featuredImageUrl)} className="w-1/2 mt-4 rounded" alt="" />}
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit" isLoading={loading}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
