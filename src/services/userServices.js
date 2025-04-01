import axiosInstance from "@/utils/axiosInstance";

export const getUserDataService = async (username) => {
  try {
    const res = await axiosInstance.get(`/auth/find/${username}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfileService = async (data) => {
  try {
    const res = await axiosInstance.patch("/auth/profile", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
