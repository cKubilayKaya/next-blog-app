"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LinkElement from "@/components/ui/LinkElement";
import useForm from "@/hooks/useForm";
import { registerService } from "@/services/authServices";
import registerSchema from "@/validations/registerSchema";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { formData, errors, touched, handleChange, handleFocus, handleSubmit, loading } = useForm(
    {
      email: "",
      fullname: "",
      username: "",
      password: "",
    },
    registerSchema
  );

  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(async () => {
      const { success, user } = await registerService(formData);
      if (success) {
        localStorage.setItem("email", user.email);
        router.push("/email-verify");
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
          label="Fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.fullname}
          errors={errors?.fullname}
        />
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.username}
          errors={errors?.username}
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
        />
        <div className="flex items-center justify-between">
          <LinkElement href="/login" link>
            Already have an account
          </LinkElement>
          <Button type="submit" isLoading={loading}>
            <span>Register</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
