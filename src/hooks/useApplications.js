import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchApplications,
  fetchApplicationById,
  updateApplicationStatus,
  updateApplicationNote,
} from "@/api/application";
import { toast } from "sonner";

export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
}

export function useApplication(applicationId) {
  return useQuery({
    queryKey: ["applications", applicationId],
    queryFn: () => fetchApplicationById(applicationId),
    enabled: !!applicationId,
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, newStatus }) =>
      updateApplicationStatus(applicationId, newStatus),
    onSuccess: (data, variables) => {
      // Update the specific application in cache
      queryClient.setQueryData(["applications", String(variables.applicationId)], data);
      
      // Update the application in the list cache
      queryClient.setQueryData(["applications"], (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((app) =>
          app.id === variables.applicationId ? data : app
        );
      });
      
      toast.success("Status updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update status");
    },
  });
}


export function useUpdateApplicationNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, note }) =>
      updateApplicationNote(applicationId, note),

    onSuccess: (data, variables) => {
      const id = Number(variables.applicationId);

      // Update single application cache
      queryClient.setQueryData(["applications", id], data);

      // Update applications list cache (if it exists)
      queryClient.setQueryData(["applications"], (oldData) => {
        if (!Array.isArray(oldData)) return oldData;

        return oldData.map((app) =>
          app.id === id ? data : app
        );
      });

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

