import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/api/jobs";

export function useJobs(filters) {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => fetchJobs(filters),
  });
}
