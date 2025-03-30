import * as Yup from "yup";

const addCommentSchema = Yup.object({
  content: Yup.string().min(3, "Content must be at least 3 characters.").required("Content is required."),
  postId: Yup.string().required("Post ID is required."),
});

export default addCommentSchema;
