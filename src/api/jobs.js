import { jobs as rawJobs } from "@/data/jobs";

export function fetchJobs({
  jobType,
  industry,
  salaryRange,
  location: locationFilter,
  status,
  search,
  page = 1,
  limit = 10,
} = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...rawJobs];

      // Filtering by Job Type
      if (jobType && jobType.length > 0) {
        if (Array.isArray(jobType)) {
          result = result.filter((job) => jobType.includes(job.jobType));
        } else {
          result = result.filter((job) => job.jobType === jobType);
        }
      }

      // Filtering by Industry
      if (industry && industry.length > 0) {
        if (Array.isArray(industry)) {
          result = result.filter((job) => industry.includes(job.industry));
        } else {
          result = result.filter((job) => job.industry === industry);
        }
      }

      // Filtering by Salary Range (Exact match based on string in schema)
      if (salaryRange && salaryRange.length > 0) {
        if (Array.isArray(salaryRange)) {
          result = result.filter((job) =>
            salaryRange.includes(job.salaryRange)
          );
        } else {
          result = result.filter((job) => job.salaryRange === salaryRange);
        }
      }

      // Filtering by Status
      if (status && status.length > 0) {
        if (Array.isArray(status)) {
          result = result.filter((job) => status.includes(job.status));
        } else {
          result = result.filter((job) => job.status === status);
        }
      }

      // Search by Keyword (Title)
      if (search) {
        const query = search.toLowerCase();
        result = result.filter((job) =>
          job.title.toLowerCase().includes(query)
        );
      }

      // Search by Location
      if (locationFilter) {
        const query = locationFilter.toLowerCase();
        result = result.filter((job) =>
          job.location.toLowerCase().includes(query)
        );
      }

      // Pagination
      const total = result.length;
      const startIndex = (page - 1) * limit;
      const paginatedItems = result.slice(startIndex, startIndex + limit);

      resolve({
        jobs: paginatedItems,
        total,
        page,
        limit,
      });
    }, 500); // 500ms delay to simulate network latency
  });
}

export function fetchJobById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const job = rawJobs.find((j) => j.id === id);
      resolve(job || null);
    }, 300);
  });
}
