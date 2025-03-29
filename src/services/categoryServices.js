import axiosInstance from "@/utils/axiosInstance";

export const listCategoriesService = async () => {
  try {
    const res = await axiosInstance.get("/category/list");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const listPostsByCategory = async (slug) => {
  try {
    const res = await axiosInstance.get(`/category/${slug}/posts`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
