"use client";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import useForm from "@/hooks/useForm";
import { emailVerifyService } from "@/services/authServices";
import emailVerifySchema from "@/validations/emailVerifySchema";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function EmailVerifyForm() {
  const { formData, errors, touched, handleChange, setFormData, handleFocus, handleSubmit, loading } = useForm(
    {
      email: "",
      code: "",
    },
    emailVerifySchema
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    let emailData = localStorage.getItem("email");

    if (emailData) {
      setFormData((prev) => ({
        ...prev,
        email: emailData,
      }));
    }
  }, [user]);

  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(async () => {
      const { success } = await emailVerifyService(formData);
      if (success) {
        router.push("/login");
      }
    });
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <Input label="Code" name="code" value={formData.code} onChange={handleChange} onFocus={handleFocus} touched={touched?.code} errors={errors?.code} />
        <div className="flex items-center justify-between">
          <Button type="submit" isLoading={loading}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
