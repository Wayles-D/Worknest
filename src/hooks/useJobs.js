import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "@/api/api";
import { useAuth } from "@/store";

export function useJobs(filters = {}) {
  const {
    jobType = [],
    industry = [],
    salaryRange = [],
    search = "",
    location = "",
    page = 1,
    limit = 10,
  } = filters;

  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      // Still forward filters to API as requested
      const response = await getAllJobs(filters);

      // Extract raw jobs list
      const responseData = response?.data;
      const rawJobs = Array.isArray(responseData)
        ? responseData
        : responseData?.data?.data ||
          responseData?.data ||
          responseData?.jobs ||
          [];

      if (!Array.isArray(rawJobs)) return { data: [], total: 0 };

      // Make job filters actually filter the results
      let filteredJobs = rawJobs.filter((job) => {
        // jobType filter
        if (
          jobType.length > 0 &&
          !jobType.some((t) => job.jobType?.toLowerCase() === t.toLowerCase())
        ) {
          return false;
        }

        // industry filter
        if (
          industry.length > 0 &&
          !industry.some((i) => job.industry?.toLowerCase() === i.toLowerCase())
        ) {
          return false;
        }

        // salaryRange filter - matching the labels exactly for simplicity/consistency with UI
        if (
          salaryRange.length > 0 &&
          !salaryRange.some((s) => {
            const jobSalary = `₦${(job.salaryRange?.min / 1000).toFixed(0)}k - ₦${(job.salaryRange?.max / 1000).toFixed(0)}k`;
            return jobSalary === s;
          })
        ) {
          return false;
        }

        // search filter (title or company)
        if (search) {
          const s = search.toLowerCase();
          const matchesTitle = job.title?.toLowerCase().includes(s);
          const matchesCompany = job.companyName?.toLowerCase().includes(s);
          if (!matchesTitle && !matchesCompany) return false;
        }

        // location filter
        if (location) {
          const l = location.toLowerCase();
          if (!job.location?.toLowerCase().includes(l)) return false;
        }

        return true;
      });

      // Pagination must be calculated from API response (after filtering)
      const total = filteredJobs.length;
      const start = (page - 1) * limit;
      const paginatedJobs = filteredJobs.slice(start, start + limit);

      return {
        data: paginatedJobs,
        total,
      };
    },
    keepPreviousData: true,
  });
}
