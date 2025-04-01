import { likePostService } from "@/services/postServices";
import classNames from "classnames";
import React from "react";
import toast from "react-hot-toast";
import { CommentIcon, HeartIcon, HeartIconFilled } from "../../Icons/Icons";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function PostLikeComment({ slug, isLiked, liked, _count, setUpdatePosts }) {
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  const likePost = async (slug) => {
    if (!user) {
      router.push("/login");
    } else {
      const { success, message } = await likePostService(slug);
      if (success) {
        setUpdatePosts(Date.now());
        toast.success(message);
      }
    }
  };

  return (
    <div className="flex items-center gap-2 mt-8">
      <button className="flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-[#ffe5e5]" onClick={() => likePost(slug)}>
        {isLiked ? <HeartIconFilled color="red" /> : <HeartIcon color="#000" />}
        <span className={classNames({ "text-sm": true, "text-[#ff0000]": isLiked })}>{liked}</span>
      </button>
      <button className="flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-gray-100">
        <CommentIcon color="#000" />
        <span className="text-sm">{_count?.comments}</span>
      </button>
    </div>
  );
}
