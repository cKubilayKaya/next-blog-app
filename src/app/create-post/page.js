import CreatePostForm from "@/components/Forms/CreatePostForm";
import React from "react";

export const metadata = {
  title: "Create Post",
};

export default function CreatePost() {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      <CreatePostForm />
    </div>
  );
}
