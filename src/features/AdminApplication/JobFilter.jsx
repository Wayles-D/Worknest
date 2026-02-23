import { ChevronDown } from "lucide-react";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router";
import { ADMIN_PAGE_SIZE } from "@/constants/pagination";

export default function JobFilter({ applications }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedJob = searchParams.get("job") || "";

  const uniqueJobs = useMemo(() => {
    const jobsMap = new Map();

    applications.forEach((application) => {
      const jobId = application?.job?.id;
      const jobTitle = application?.job?.title;

      if (!jobId || !jobTitle) return;
      if (!jobsMap.has(jobId)) {
        jobsMap.set(jobId, jobTitle);
      }
    });

    return Array.from(jobsMap.entries()).map(([id, title]) => ({
      id,
      title,
    }));
  }, [applications]);

  const handleJobChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete("job");
    } else {
      params.set("job", value);
    }

    params.set("page", "1");
    params.set("limit", String(ADMIN_PAGE_SIZE));
    setSearchParams(params);
  };

  return (
    <div className="relative">
      <select
        value={selectedJob}
        onChange={handleJobChange}
        className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white cursor-pointer"
      >
        <option value="">All Jobs</option>
        {uniqueJobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.title}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  );
}
