"use client";
import { useParams } from "next/navigation";
import EditPostForm from "../../Forms/EditPostForm";
import { useEffect, useState } from "react";
import { listUniquePostService } from "@/services/postServices";

export default function EditPostContainer() {
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

  return <div className="mx-auto max-w-7xl p-6 lg:px-8">{postDetail && <EditPostForm postDetail={postDetail} />}</div>;
}
