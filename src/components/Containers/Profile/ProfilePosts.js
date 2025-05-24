import React, { useEffect, useState } from "react";
import PostWrapper from "../Home/PostWrapper";
import ProfilePostsTabMenu from "./ProfilePostsTabMenu";
import { HeartIconFilled, PenIcon } from "@/components/Icons/Icons";

export default function ProfilePosts({ profile }) {
  const [tabMenu, setTabMenu] = useState([
    {
      id: "created_by_me",
      name: "Posts",
      icon: (isActive) => <PenIcon color={isActive ? "#2563eb" : "#c9c9c9"} size="20px" />,
      posts: profile ? profile?.posts : [],
      active: true,
    },
    {
      id: "liked_by_me",
      name: "Liked Posts",
      icon: (isActive) => <HeartIconFilled color={isActive ? "#2563eb" : "#c9c9c9"} fill={isActive ? "#2563eb" : "#c9c9c9"} />,
      posts: profile ? profile?.likes?.map((item) => item?.post) : [],
      active: false,
    },
  ]);

  useEffect(() => {
    if (!profile) return;

    setTabMenu((prev) =>
      prev.map((tab) => {
        if (tab.id === "created_by_me") {
          return { ...tab, posts: profile.posts || [] };
        }
        if (tab.id === "liked_by_me") {
          return { ...tab, posts: profile.likes?.map((item) => item?.post) || [] };
        }
        return tab;
      })
    );
  }, [profile]);

  return (
    profile?.posts?.length > 0 && (
      <div className="mt-12 border-t border-t-gray-200 pt-12">
        <ProfilePostsTabMenu tabMenu={tabMenu} setTabMenu={setTabMenu} />
        {tabMenu?.map((item) => item?.active && <PostWrapper posts={item?.posts} />)}
      </div>
    )
  );
}
