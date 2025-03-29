import axiosInstance from "@/utils/axiosInstance";

export const listUniquePostService = async (slug) => {
  try {
    const res = await axiosInstance.get(`/post/${slug}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
