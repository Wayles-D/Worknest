import { updateUserPassword } from "@/api/user";
import { updateAdminPassword } from "@/api/admin";
import ErrorAlert from "@/components/ErrorAlert";
import FieldBody from "@/components/FieldBody";
import useMetaArgs from "@/hooks/UseMeta";
import { useAuth } from "@/store";
import { updatePasswordSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ChangePassword() {
  useMetaArgs({
    title: "Change Password - Worknest",
    description: "Change your Worknest account password.",
    keywords: "Worknest, change-password, account",
  });

  const { accessToken, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      if (user?.role === "admin") {
        return updateAdminPassword(data);
      } else {
        return updateUserPassword(data);
      }
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Password updated successfully");
      reset();
      // Optionally navigate away or keep them there
      // navigate("/profile");
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Password update failed");
    },
  });

  const onSubmit = (data) => {
    // API expects { userData, accessToken }
    // userData should contain currentPassword, newPassword
    const userData = {
      currentPassword: data.password, // Schema uses 'password' for current
      newPassword: data.newPassword, // Schema uses 'newPassword' for new
    };
    mutation.mutate({ userData, accessToken });
  };

  return (
    <div className="min-h-screen container bg-[#F4F4F4] p-6">
      <section className="w-full flex justify-center mt-10">
        <div className="w-full max-w-3xl rounded-xl bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          <h1 className="text-xl md:text-2xl font-semibold mb-8 text-[#0E0E0E]">
            Change Password
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
          >
            {error && <ErrorAlert error={error} />}

            <div className="flex flex-col gap-2">
              <label className="text-[#0E0E0E] font-medium text-[16px]">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter Your old password"
                {...register("password")}
                className="w-full h-[50px] bg-[#F4F4F4] rounded-[5px] px-4 outline-none border border-transparent focus:border-[#F75D1F]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#0E0E0E] font-medium text-[16px]">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                {...register("newPassword")}
                className="w-full h-[50px] bg-[#F4F4F4] rounded-[5px] px-4 outline-none border border-transparent focus:border-[#F75D1F]"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#0E0E0E] font-medium text-[16px]">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                {...register("confirmPassword")}
                className="w-full h-[50px] bg-[#F4F4F4] rounded-[5px] px-4 outline-none border border-transparent focus:border-[#F75D1F]"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="submit"
                className="bg-[#F75D1F] text-white rounded-lg h-11 px-8 hover:bg-[rgba(247,95,32,0.8)] flex items-center justify-center transition-all duration-300 cursor-pointer font-medium"
                disabled={isSubmitting || mutation.isPending}
              >
                {isSubmitting || mutation.isPending ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="border border-[#F75D1F] text-[#F75D1F] rounded-lg h-11 px-8 hover:bg-[#FFF6F2] flex items-center justify-center transition-all duration-300 cursor-pointer font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
