import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "@/api/api";
import { useAuth } from "@/store";

export function useJobs(filters) {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => getAllJobs(),
    keepPreviousData: true,
  });
}
