"use client";
import { listUniquePostService } from "@/services/postServices";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PostLikeComment from "./PostLikeComment";
import CommentSection from "./CommentSection";
import dayjs from "dayjs";
import LinkElement from "../ui/LinkElement";
import PostSettingsMenu from "./PostSettingsMenu";
import { useSelector } from "react-redux";
import imagePath from "@/utils/imagePath";

export default function PostDetail() {
  const params = useParams();
  const [postDetail, setPostDetail] = useState({});
  const [updatePosts, setUpdatePosts] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (params?.postSlug) {
      const fetchPostDetail = async () => {
        const { success, post } = await listUniquePostService(params?.postSlug, true);
        if (success) {
          setPostDetail(post);
        }
      };
      fetchPostDetail();
    }
  }, [updatePosts]);

  return (
    postDetail?.id && (
      <div className="mx-auto max-w-7xl p-6 mt-16 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between">
            <h3 className="text-3xl">{postDetail?.title}</h3>
            {user && user?.email === postDetail?.author?.email && <PostSettingsMenu postSlug={postDetail?.slug} />}
          </div>
          <p className="mt-4">{postDetail?.excerpt}</p>
          <p className="text-sm text-gray-400 mt-2">{dayjs(postDetail?.createdAt).format("DD MMMM YYYY • HH:mm")}</p>
        </div>
        <img src={imagePath(postDetail?.featuredImageUrl)} className="object-cover rounded-2xl w-full" alt="" />
        <PostLikeComment
          slug={postDetail?.slug}
          isLiked={postDetail?.isLiked}
          liked={postDetail?.liked}
          _count={postDetail?._count}
          setUpdatePosts={setUpdatePosts}
        />
        <div className="mt-8 border-b border-b-gray-300 pb-8">
          <p>{postDetail?.content}</p>
        </div>
        <div className="flex items-center gap-2 mt-8">
          <img src="http://localhost:5000/uploads/posts/59e500ac-7767-4fb2-ac40-160eef0eeaf7.jpg" className="w-10 h-10 rounded-full object-cover" alt="" />
          <div>
            <LinkElement href="/" link>
              {postDetail?.author?.username}
            </LinkElement>
          </div>
        </div>
        <CommentSection postDetail={postDetail} setUpdatePosts={setUpdatePosts} />
      </div>
    )
  );
}
