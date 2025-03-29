"use client";
import { listUniquePostService } from "@/services/postServices";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PostDetail() {
  const params = useParams();
  const [postDetail, setPostDetail] = useState({});

  useEffect(() => {
    if (params?.postSlug) {
      const fetchPostDetail = async () => {
        const { success, post } = await listUniquePostService(params?.postSlug);
        if (success) {
          setPostDetail(post);
        }
      };
      fetchPostDetail();
    }
  }, []);

  console.log(postDetail);

  return (
    postDetail?.id && (
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <div className="mb-8">
          <h3 className="text-3xl">{postDetail?.title}</h3>
          <p className="mt-2">{postDetail?.excerpt}</p>
          <p className="text-sm text-gray-400 mt-2">{postDetail?.createdAt}</p>
        </div>
        <img src="https://www.hisglobal.com.tr/assets/images/1641278654.jpg" className="object-cover rounded-2xl w-full" alt="" />
        <div className="flex items-center gap-2 mt-8">
          <button className="flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <span className="text-sm">{postDetail?.liked}</span>
          </button>
          <button className="flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>

            <span className="text-sm">3</span>
          </button>
        </div>
        <div className="mt-8 border-b border-b-gray-300 pb-4">
          <p>{postDetail?.content}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <img src="https://www.hisglobal.com.tr/assets/images/1641278654.jpg" className="w-10 h-10 rounded-full" alt="" />

          <div>
            <p className="text-sm">{postDetail?.author?.fullname}</p>
            <span className="text-sm text-gray-500">{postDetail?.author?.username}</span>
          </div>
        </div>
      </div>
    )
  );
}
