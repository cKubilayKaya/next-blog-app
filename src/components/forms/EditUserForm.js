"use client";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import useForm from "@/hooks/useForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";
import InputFile from "../UI/InputFile";
import imagePath from "@/utils/imagePath";
import { updateProfileService } from "@/services/userServices";
import editProfileSchema from "@/validations/editProfileSchema";

export default function EditUserForm({ profileDetail }) {
  const { formData, setFormData, errors, touched, handleChange, handleFocus, handleSubmit, loading } = useForm(
    {
      fullname: "",
      profileImageUrl: "",
      bio: "",
      twitterLink: "",
      instagramLink: "",
      linkedinLink: "",
      username: "",
      email: [],
    },
    editProfileSchema
  );

  const router = useRouter();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      fullname: profileDetail?.fullname || "",
      username: profileDetail?.username || "",
      email: profileDetail?.email || "",
      bio: profileDetail?.bio || "",
      twitterLink: profileDetail?.twitterLink || "",
      instagramLink: profileDetail?.instagramLink || "",
      linkedinLink: profileDetail?.linkedinLink || "",
      profileImageUrl: profileDetail?.profileImageUrl || "",
    }));
  }, [profileDetail]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formObject = new FormData();

    formObject.append("fullname", formData.fullname);
    formObject.append("username", formData.username);
    formObject.append("email", formData.email);
    formObject.append("bio", formData.bio);
    formObject.append("twitterLink", formData.twitterLink);
    formObject.append("instagramLink", formData.instagramLink);
    formObject.append("linkedinLink", formData.linkedinLink);

    if (formData.profileImageUrl instanceof File) {
      formObject.append("profileImageUrl", formData.profileImageUrl);
    }

    await handleSubmit(async () => {
      try {
        const { success } = await updateProfileService(formObject);
        if (success) {
          router.push(`/profile/${profileDetail?.username}`);
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.message;
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className="mt-10 w-full">
      <form onSubmit={handleFormSubmit} className="space-y-6">
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
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.email}
          errors={errors?.email}
        />
        <Input label="Bio" name="bio" value={formData.bio} onChange={handleChange} onFocus={handleFocus} touched={touched?.bio} errors={errors?.bio} />
        <Input
          label="Twitter"
          name="twitterLink"
          value={formData.twitterLink}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.twitterLink}
          errors={errors?.twitterLink}
        />
        <Input
          label="Instagram"
          name="instagramLink"
          value={formData.instagramLink}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.instagramLink}
          errors={errors?.instagramLink}
        />
        <Input
          label="LinkedIn"
          name="linkedinLink"
          value={formData.linkedinLink}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched?.linkedinLink}
          errors={errors?.linkedinLink}
        />
        {formData?.profileImageUrl ? (
          <div>
            <p className="block text-sm/6 font-medium text-gray-900 mb-2">Profile Image</p>
            <div className="flex items-center gap-2">
              <p className="bg-gray-200 p-2 px-4 h-[40px] text-sm rounded">{profileDetail?.profileImageUrl?.replace("/uploads/posts/", "")}</p>
              <Button
                variant="cancel"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    profileImageUrl: null,
                  }))
                }
              >
                Remove Image
              </Button>
            </div>
            {formData?.profileImageUrl && (
              <img
                src={typeof formData.profileImageUrl === "string" ? imagePath(formData.profileImageUrl) : URL.createObjectURL(formData.profileImageUrl)}
                className="w-1/2 mt-4 rounded"
                alt="Preview"
              />
            )}{" "}
          </div>
        ) : (
          <div>
            <InputFile
              label="Profile Image"
              name="profileImageUrl"
              // value={formData.profileImageUrl}
              onChange={handleChange}
              onFocus={handleFocus}
              touched={touched?.profileImageUrl}
              errors={errors?.profileImageUrl}
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <Button type="submit" isLoading={loading}>
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
}
