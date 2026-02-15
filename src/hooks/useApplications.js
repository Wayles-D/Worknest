import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyApplications,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  updateApplicationNote,
  getApplicationStats,
} from "@/api/applications";
import { useAuth } from "@/store";
import { toast } from "sonner";

export function useMyApplications(params = {}) {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: ["my-applications", params],
    queryFn: () => getMyApplications({ ...params, accessToken }),
    enabled: !!accessToken,
  });
}

export function useAdminApplications(params = {}) {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: ["admin-applications", params],
    queryFn: () => getAllApplications({ ...params, accessToken }),
    enabled: !!accessToken,
  });
}

export function useApplicationDetails(id) {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: ["application-details", id],
    queryFn: () => getApplicationById({ id, accessToken }),
    enabled: !!id && !!accessToken,
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ applicationId, status, note }) =>
      updateApplicationStatus({
        id: applicationId,
        status,
        note,
        accessToken,
      }),
    onSuccess: (res, variables) => {
      // Invalidate all related queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
      queryClient.invalidateQueries({
        queryKey: ["application-details", variables.applicationId],
      });
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
      queryClient.invalidateQueries({ queryKey: ["application-stats"] });

      toast.success("Status updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });
}

export function useUpdateApplicationNote() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ applicationId, note }) =>
      updateApplicationNote({
        id: applicationId,
        note,
        accessToken,
      }),
    onSuccess: (res, variables) => {
      // Invalidate specific detail and lists
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
      queryClient.invalidateQueries({
        queryKey: ["application-details", variables.applicationId],
      });
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });

      toast.success("Note saved successfully ✅");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to save note ❌";
      toast.error(message);
    },
  });
}

export function useApplicationStats(jobId) {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: ["application-stats", jobId],
    queryFn: () => getApplicationStats({ jobId, accessToken }),
    enabled: !!accessToken,
  });
}
