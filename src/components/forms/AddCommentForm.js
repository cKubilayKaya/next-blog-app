"use client";
import useForm from "@/hooks/useForm";
import { addCommentService } from "@/services/commentServices";
import addCommentSchema from "@/validations/addCommentSchema";
import React, { useEffect } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import toast from "react-hot-toast";

export default function AddCommentForm({ postId, setUpdatePosts }) {
  const { formData, errors, touched, handleChange, handleFocus, setFormData, handleSubmit, loading } = useForm(
    {
      content: "",
      postId: "",
    },
    addCommentSchema
  );

  useEffect(() => {
    if (postId) {
      setFormData((prev) => ({
        ...prev,
        postId: postId,
      }));
    }
  }, [postId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(async () => {
      try {
        const { success } = await addCommentService(formData);
        if (success) {
          setUpdatePosts(Date.now());
          setFormData((prev) => ({
            ...prev,
            content: "",
          }));
          toast.success("Comment added successfully.");
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.message;
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className="w-full bg-gray-100 p-8 rounded-2xl">
      <h3 className="text-xl mb-8">Add Comment</h3>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <Input
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.content}
          errors={errors?.content}
        />

        <div className="flex items-center justify-between">
          <Button type="submit" isLoading={loading} disabled={loading}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
