import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "@/api/api";
import { useAuth } from "@/store";

export function useJobs(filters) {
  const { accessToken } = useAuth();
  return useQuery({
    queryKey: ["jobs", filters, accessToken],
    queryFn: () => getAllJobs(accessToken),
    keepPreviousData: true,
  });
}
