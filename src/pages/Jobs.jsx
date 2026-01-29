import { useState } from "react";
import { useJobs } from "@/hooks/useJobs";
import JobCard from "@/components/JobCard";

export default function Jobs() {
  const [filters, setFilters] = useState({
    jobType: "",
    industry: "",
    salaryRange: "",
  });

  const { data, isLoading } = useJobs(filters);

  // because API returns { jobs, total, page, limit }
  const jobs = data?.jobs || [];

  const handleTypeChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      jobType: prev.jobType === value ? "" : value,
    }));
  };

  const handleIndustryChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      industry: prev.industry === value ? "" : value,
    }));
  };

  const handleSalaryChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      salaryRange: prev.salaryRange === value ? "" : value,
    }));
  };

  if (isLoading) return <p>Loading jobs...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8">
      {/* FILTERS */}
      <aside className="bg-white p-6 rounded-xl space-y-6">
        {/* JOB TYPE */}
        <div className="space-y-4 border-2 border-gray-200 p-4 rounded-xl">
          <h3 className="font-semibold mb-3">Job Type</h3>
          {[
            "Full Time / Permanent",
            "Contract",
            "Part Time",
            "Internship",
            "Freelance",
          ].map((type) => (
            <label key={type} className="block mb-2">
              <input
                type="checkbox"
                checked={filters.jobType === type}
                onChange={() => handleTypeChange(type)}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>

        {/* INDUSTRY */}
        <div className="space-y-4 border-2 border-gray-200 p-4 rounded-xl">
          <h3 className="font-semibold mb-3">Industry</h3>
          {[
            "Information Technology",
            "Advertising/PR",
            "Media & Communication",
            "Fashion",
            "Health & Fitness",
          ].map((industry) => (
            <label key={industry} className="block mb-2">
              <input
                type="checkbox"
                checked={filters.industry === industry}
                onChange={() => handleIndustryChange(industry)}
                className="mr-2"
              />
              {industry}
            </label>
          ))}
        </div>

        {/* SALARY */}
        <div className="space-y-4 border-2 border-gray-200 p-4 rounded-xl">
          <h3 className="font-semibold mb-3">Salary Range</h3>
          {[
            "₦300k - ₦380k",
            "₦250k - ₦350k",
            "₦200k - ₦250k",
            "₦150k - ₦250k",
            "₦100k - ₦150k",
          ].map((salary) => (
            <label key={salary} className="block mb-2">
              <input
                type="checkbox"
                checked={filters.salaryRange === salary}
                onChange={() => handleSalaryChange(salary)}
                className="mr-2"
              />
              {salary}
            </label>
          ))}
        </div>
      </aside>

      {/* JOB LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {jobs.length === 0 && <p>No jobs found</p>}

        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
