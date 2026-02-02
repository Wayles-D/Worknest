import { ChevronDown } from "lucide-react";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router";

export default function JobFilter({ applications }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get selected job from URL params
  const selectedJob = searchParams.get("job") || "All Jobs";

  // Generate unique job titles
  const uniqueJobs = useMemo(
    () => ["All Jobs", ...new Set(applications.map((app) => app.jobTitle))],
    [applications]
  );

  const handleJobChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value === "All Jobs") {
      params.delete("job"); // remove filter
    } else {
      params.set("job", value);
    }

    setSearchParams(params);
  };

  return (
    <div className="relative">
      <select
        value={selectedJob}
        onChange={handleJobChange}
        className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white cursor-pointer"
      >
        {uniqueJobs.map((job) => (
          <option key={job} value={job}>
            {job}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  );
}
