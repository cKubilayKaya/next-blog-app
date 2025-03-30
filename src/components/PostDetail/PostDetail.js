"use client";
import { listUniquePostService } from "@/services/postServices";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PostLikeComment from "./PostLikeComment";
import CommentSection from "./CommentSection";
import dayjs from "dayjs";

export default function PostDetail() {
  const params = useParams();
  const [postDetail, setPostDetail] = useState({});
  const [updatePosts, setUpdatePosts] = useState(null);

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
          <h3 className="text-3xl">{postDetail?.title}</h3>
          <p className="mt-4">{postDetail?.excerpt}</p>
          <p className="text-sm text-gray-400 mt-2">{dayjs(postDetail?.createdAt).format("DD MMMM YYYY • HH:mm")}</p>
        </div>
        <img src="https://www.hisglobal.com.tr/assets/images/1641278654.jpg" className="object-cover rounded-2xl w-full" alt="" />
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
          <img src="https://www.hisglobal.com.tr/assets/images/1641278654.jpg" className="w-10 h-10 rounded-full" alt="" />
          <div>
            <p className="text-sm">{postDetail?.author?.fullname}</p>
            <span className="text-sm text-gray-500">{postDetail?.author?.username}</span>
          </div>
        </div>
        <CommentSection postDetail={postDetail} setUpdatePosts={setUpdatePosts} />
      </div>
    )
  );
}
