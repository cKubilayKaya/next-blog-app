import axiosInstance from "@/utils/axiosInstance";

export const addCommentService = async (data) => {
  try {
    const res = await axiosInstance.post("/comment", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCommentService = async (commentId) => {
  try {
    const res = await axiosInstance.delete(`/comment/${commentId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
