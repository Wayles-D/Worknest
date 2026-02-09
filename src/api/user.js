import axiosInstance from "@/utils/axiosInstance";
import { headers } from "@/utils/constant";

export const updateUserPassword = async ({ userData, accessToken }) => {
  return await axiosInstance.patch(
    "/auth/update-password",
    userData,
    headers(accessToken)
  );
};

export const updateUserProfile = async ({ userData, accessToken }) => {
  return await axiosInstance.patch(
    "/auth/update-user",
    userData,
    headers(accessToken)
  );
};

export const deleteAccount = async (accessToken) => {
  return await axiosInstance.delete(
    "/auth/delete-account",
    headers(accessToken)
  );
};

export const uploadAvatar = async ({ formData, accessToken }) => {
  return await axiosInstance.patch(
    "/auth/upload-avatar",
    formData,
    headers(accessToken)
  );
};