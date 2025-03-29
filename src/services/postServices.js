import axiosInstance from "@/utils/axiosInstance";

export const listUniquePostService = async (slug) => {
  try {
    const res = await axiosInstance.get(`/post/${slug}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createPostService = async (data) => {
  try {
    const res = await axiosInstance.post(`/post`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
