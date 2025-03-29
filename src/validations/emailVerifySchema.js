import * as Yup from "yup";

const emailVerifySchema = Yup.object({
  code: Yup.string().min(6, "Code must be at least 6 characters long.").max(6, "Code must be less than 6 characters.").required("Code is required"),
});

export default emailVerifySchema;
