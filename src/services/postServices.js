import axiosInstance from "@/utils/axiosInstance";

export const listUniquePostService = async (slug, comments = false) => {
  try {
    const res = await axiosInstance.get(`/post/${slug}`, {
      params: comments ? { comments: true } : {},
    });
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
