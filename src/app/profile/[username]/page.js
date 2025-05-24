import ProfileContainer from "@/components/Containers/Profile/ProfileContainer";
import { getUserDataService } from "@/services/userServices";
import React from "react";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const username = resolvedParams?.username;

  const { success, user } = await getUserDataService(username);

  if (success) {
    return {
      title: `${user?.fullname}`,
    };
  }
}

export default function Profile() {
  return <ProfileContainer />;
}
