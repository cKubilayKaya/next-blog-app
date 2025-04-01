import React from "react";
import ProfileSettingsMenu from "./ProfileSettingsMenu";
import imagePath from "@/utils/imagePath";
import Link from "next/link";
import { InstagramIcon, LinkedinIcon, TwitterIcon } from "../../Icons/Icons";
import { useSelector } from "react-redux";

export default function ProfileCard({ profile }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="flex justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
            src={profile?.profileImageUrl ? imagePath(profile?.profileImageUrl) : "/avatar-default.png"}
            alt="Profile"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{profile?.fullname}</h2>
            <p className="text-gray-500">@{profile?.username}</p>
            <div className="flex items-center gap-2 mt-2">
              <Link href={profile?.twitterLink || "/"} target="_blank" className="px-1">
                <TwitterIcon size="22" color="#999999" />
              </Link>
              <Link href={profile?.instagramLink || "/"} target="_blank" className="px-1">
                <InstagramIcon size="22" color="#999999" />
              </Link>
              <Link href={profile?.linkedinLink || "/"} target="_blank" className="px-1">
                <LinkedinIcon size="22" color="#999999" />
              </Link>
            </div>
          </div>
        </div>
        {user?.username === profile?.username && <ProfileSettingsMenu username={profile?.username} />}
      </div>
      {profile?.bio && <p>{profile?.bio}</p>}
    </div>
  );
}
