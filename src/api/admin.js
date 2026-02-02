import axiosInstance from "@/utils/axiosInstance";
import { headers } from "@/utils/constant";


export const loginAdmin = async (formData) => {
  return await axiosInstance.post("/auth/login", formData);
};

export const getAuthenticatedAdmin = async (accessToken) => {
  return await axiosInstance.get("/auth/user", headers(accessToken));
};

export const refreshAccessTokenAdmin = async () => {
  return await axiosInstance.post("/auth/refresh-token", {
    withCredentials: true, //inject cookie value automatically to the server
  });
  };

  export const adminLogout = async (accessToken) => {
  return await axiosInstance.post("/auth/logout", {}, headers(accessToken), {
    withCredentials: true,
  });
};

export const adminUploadAvatar = async ({ formData, accessToken }) => {
  return await axiosInstance.patch(
    "/auth/upload-avatar",
    formData,
    headers(accessToken)
  );
};

export const updateAdminPassword = async ({ userData, accessToken }) => {
  return await axiosInstance.patch(
    "/auth/update-password",
    userData,
    headers(accessToken)
  );
};

export const updateAdminProfile = async ({ userData, accessToken }) => {
  return await axiosInstance.patch(
    "/auth/update-user",
    userData,
    headers(accessToken)
  );
};

export const deleteAdminAccount = async (accessToken) => {
  return await axiosInstance.delete(
    "/auth/delete-account",
    headers(accessToken)
  );
};

export const deleteUserAdmins = async ({ userId, accessToken }) => {
  return await axiosInstance.delete(
    `/auth/${userId}/delete-account`,
    headers(accessToken)
  );
};