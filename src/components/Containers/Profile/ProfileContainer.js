"use client";
import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { getUserDataService } from "@/services/userServices";
import { useParams } from "next/navigation";
import ProfilePosts from "./ProfilePosts";

export default function ProfileContainer() {
  const params = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getProfileData = async () => {
      const { success, user } = await getUserDataService(params?.username);
      if (success) {
        setProfile(user);
      }
    };
    getProfileData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      {profile && (
        <>
          <ProfileCard profile={profile} />
          <ProfilePosts profile={profile} />
        </>
      )}
    </div>
  );
}
