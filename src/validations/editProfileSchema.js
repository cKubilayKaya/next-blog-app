import * as Yup from "yup";

const editProfileSchema = Yup.object({
  fullname: Yup.string()
    .min(3, "Fullname must be at least 3 characters long.")
    .max(30, "Fullname must be less than 30 characters.")
    .required("Fullname is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long.")
    .max(30, "Username must be less than 30 characters.")
    .required("Username is required"),
  email: Yup.string().email("Please provide a valid email.").required("Email is required."),
  profileImageUrl: Yup.string(),
  twitterLink: Yup.string().url("Please provide a valid Twitter URL."),
  instagramLink: Yup.string().url("Please provide a valid Instagram URL."),
  linkedinLink: Yup.string().url("Please provide a valid LinkedIn URL."),
  bio: Yup.string().max(160, "Bio must be less than 160 characters."),
});

export default editProfileSchema;
