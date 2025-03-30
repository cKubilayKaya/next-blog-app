"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LinkElement from "@/components/ui/LinkElement";
import useForm from "@/hooks/useForm";
import { loginService } from "@/services/authServices";
import { useAuth } from "@/store/slices/authSlice";
import loginSchema from "@/validations/loginSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm() {
  const { formData, errors, touched, handleChange, handleFocus, handleSubmit, loading } = useForm(
    {
      email: "",
      password: "",
    },
    loginSchema
  );

  const router = useRouter();
  const { loginAction } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(async () => {
      try {
        const { success, token, user } = await loginService(formData);
        if (success) {
          loginAction({ token, user });
          router.push("/");
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.message;
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.email}
          errors={errors?.email}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.password}
          errors={errors?.password}
          forgotpassword
        />

        <div className="flex items-center justify-between">
          <LinkElement href="/register" link>
            Don't have an account
          </LinkElement>
          <Button type="submit" isLoading={loading} disabled={loading}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
