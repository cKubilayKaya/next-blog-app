"use client";
import { useEffect, useState } from "react";
import { getUserDataService } from "@/services/userServices";
import EditUserForm from "../../Forms/EditUserForm";
import { useSelector } from "react-redux";

export default function EditProfileContainer() {
  const { user: userState } = useSelector((state) => state.auth);
  const [profileDetail, setProfileDetail] = useState({});

  useEffect(() => {
    const fetchProfileDetail = async () => {
      const { success, user } = await getUserDataService(userState?.username);
      if (success) {
        setProfileDetail(user);
      }
    };
    fetchProfileDetail();
  }, []);

  return <div className="mx-auto max-w-7xl p-6 lg:px-8">{profileDetail && <EditUserForm profileDetail={profileDetail} />}</div>;
}
