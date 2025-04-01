import * as Yup from "yup";

const createPostSchema = Yup.object({
  title: Yup.string().min(6, "Title must be at least 6 characters long.").required("Title is required."),
  content: Yup.string().min(6, "Content must be at least 6 characters long.").required("Content is required."),
  categories: Yup.array()
    .of(
      Yup.string()
        .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, "Invalid UUID format.")
        .required("Each category must be a valid UUID.")
    )
    .min(1, "At least one category is required.")
    .required("Categories is required."),
  excerpt: Yup.string().min(6, "Excerpt must be at least 6 characters long.").required("Excerpt is required."),
  featuredImageUrl: Yup.string(),
});

export default createPostSchema;
