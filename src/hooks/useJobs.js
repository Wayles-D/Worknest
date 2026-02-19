import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "@/api/api";
import { useAuth } from "@/store";
import { ADMIN_PAGE_SIZE } from "@/constants/pagination";

export function useJobs(filters = {}) {
  const { accessToken } = useAuth();
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
      const response = await getAllJobs(filters, accessToken);

      // Extract raw jobs list
      const responseData = response?.data;
      const rawJobs = Array.isArray(responseData)
        ? responseData
        : responseData?.data?.data ||
          responseData?.data ||
          responseData?.jobs ||
          [];

      if (!Array.isArray(rawJobs)) return { data: [], total: 0 };

      // Sort by createdAt descending (latest first)
      const sortedJobs = [...rawJobs].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });

      // Make job filters actually filter the results
      let filteredJobs = sortedJobs.filter((job) => {
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

const parseNumericMeta = (...values) => {
  for (const value of values) {
    if (value === null || value === undefined || value === "") {
      continue;
    }
    const parsedValue = Number(value);
    if (Number.isFinite(parsedValue) && parsedValue >= 0) {
      return parsedValue;
    }
  }
  return null;
};

const extractAdminJobsPayload = (responseBody) => {
  const rawData =
    responseBody?.data?.data ||
    responseBody?.data ||
    responseBody?.jobs ||
    responseBody ||
    [];

  const items = Array.isArray(rawData)
    ? rawData
    : Array.isArray(rawData?.jobs)
      ? rawData.jobs
      : Array.isArray(rawData?.data)
        ? rawData.data
        : [];

  return { rawData, items };
};

export function useAdminJobs(params = {}) {
  const { accessToken } = useAuth();
  const {
    page = 1,
    status = "",
    search = "",
    limit = ADMIN_PAGE_SIZE,
  } = params;

  return useQuery({
    queryKey: ["admin-jobs", { page, limit, status, search }],
    queryFn: async () => {
      try {
        const queryParams = {
          page,
          limit: ADMIN_PAGE_SIZE,
        };

        if (status) {
          queryParams.status = status;
        }

        if (search) {
          queryParams.search = search;
          queryParams.keyword = search;
        }

        const response = await getAllJobs(queryParams, accessToken);
        const body = response?.data;
        const { rawData, items } = extractAdminJobsPayload(body);

        const total = parseNumericMeta(
          rawData?.total,
          rawData?.totalJobs,
          rawData?.pagination?.total,
          body?.total,
          body?.totalJobs,
          body?.pagination?.total,
          body?.data?.total,
          body?.data?.totalJobs,
        );

        let totalPages = parseNumericMeta(
          rawData?.totalPages,
          rawData?.pagination?.totalPages,
          body?.totalPages,
          body?.pagination?.totalPages,
          body?.data?.totalPages,
        );

        if (totalPages === null && total !== null && limit > 0) {
          totalPages = Math.max(1, Math.ceil(total / limit));
        }

        if (totalPages === null) {
          // Weak fallback when backend omits pagination metadata.
          totalPages = items.length === limit ? page + 1 : page;
        }

        return {
          items,
          data: items,
          total:
            total !== null ? total : Math.max((page - 1) * limit + items.length, 0),
          totalPages: Math.max(1, totalPages),
          page,
          limit,
        };
      } catch (error) {
        console.error("Failed to fetch admin jobs:", error);
        throw error;
      }
    },
    enabled: !!accessToken,
    placeholderData: (previousData) => previousData,
  });
}
