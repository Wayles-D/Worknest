import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useJobs } from "@/hooks/useJobs";
import { getSavedJobs } from "@/api/api";
import { useAuth } from "@/store";
import { useQuery } from "@tanstack/react-query";
import JobCard from "@/components/JobCard";
import { Search, MapPin } from "lucide-react";

export default function Jobs() {
  const { accessToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Derived filters from URL - Single source of truth
  const filters = {
    jobType: searchParams.getAll("jobType"),
    industry: searchParams.getAll("industry"),
    salaryRange: searchParams.getAll("salaryRange"),
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
    page: parseInt(searchParams.get("page") || "1"),
    limit: 10,
  };

  // Local state only for the input field values to allow typing before searching
  const [searchInputs, setSearchInputs] = useState({
    search: filters.search,
    location: filters.location,
  });

  // Sync state with URL only when URL changes (e.g. Back button)
  // This follows the React pattern for 'Get derived state from props' without useEffect
  const [prevUrlFilters, setPrevUrlFilters] = useState({
    search: filters.search,
    location: filters.location,
  });
  if (
    filters.search !== prevUrlFilters.search ||
    filters.location !== prevUrlFilters.location
  ) {
    setSearchInputs({ search: filters.search, location: filters.location });
    setPrevUrlFilters({
      search: filters.search,
      location: filters.location,
    });
  }

  const { data: jobResponse, isLoading } = useJobs(filters);

  // Directly use the filtered and paginated data from useJobs hook
  const finalJobs = jobResponse?.data || [];
  const totalJobs = jobResponse?.total || 0;
  const totalPages = Math.ceil(totalJobs / filters.limit) || 1;
  const currentPage = filters.page;

  const { data: savedJobsResponse } = useQuery({
    queryKey: ["savedJobs", accessToken],
    queryFn: async () => {
      if (!accessToken) return [];
      const res = await getSavedJobs(accessToken);
      if (res.status === 200) {
        const rawData = res.data?.data || [];
        // Handle potential nested data for saved jobs too
        const actualSaved = Array.isArray(rawData)
          ? rawData
          : rawData.data || rawData.jobs || [];
        return Array.isArray(actualSaved) ? actualSaved : [];
      }
      return [];
    },
    enabled: !!accessToken,
  });

  const savedJobIds = new Set(
    Array.isArray(savedJobsResponse)
      ? savedJobsResponse.map((j) => j._id || j.id)
      : [],
  );

  const toggleFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    const current = newParams.getAll(key);
    const isSelected = current.includes(value);

    if (isSelected) {
      const filtered = current.filter((item) => item !== value);
      newParams.delete(key);
      filtered.forEach((v) => newParams.append(key, v));
    } else {
      newParams.append(key, value);
    }
    newParams.set("page", "1"); // Reset to page 1 on filter change
    setSearchParams(newParams);
  };

  const handleTypeChange = (value) => toggleFilter("jobType", value);
  const handleIndustryChange = (value) => toggleFilter("industry", value);
  const handleSalaryChange = (value) => toggleFilter("salaryRange", value);

  const handleSearch = () => {
    const newParams = new URLSearchParams(searchParams);

    if (searchInputs.search) {
      newParams.set("search", searchInputs.search);
    } else {
      newParams.delete("search");
    }

    if (searchInputs.location) {
      newParams.set("location", searchInputs.location);
    } else {
      newParams.delete("location");
    }

    newParams.set("page", "1"); // Reset to page 1 on search
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };

  if (isLoading)
    return (
      <p className="text-center py-20 font-semibold text-gray-500">
        Loading your opportunities...
      </p>
    );

  return (
    <div className="flex flex-col gap-12">
      <div className="w-auto py-16">
        <div className="container mx-auto px-4 flex flex-col">
          <div className="bg-[#fcedea] text-[#F57450] px-4 py-1.5 rounded-full text-xs w-fit font-bold uppercase  mb-8">
            Browse Opportunities
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A0A0A] mb-4 max-w-4xl tracking-tight leading-tight">
            Find a role that matches your ambition
          </h1>

          <p className="text-gray-600 text-start text-lg md:text-xl mb-12 max-w-2xl font-medium">
            Search thousands of curated openings across industries, experience
            levels, and locations.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 bg-transparent p-2">
            <div className="relative flex-1 w-full">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Job tittle, skills or keyboard"
                value={searchInputs.search}
                onChange={(e) =>
                  setSearchInputs({ ...searchInputs, search: e.target.value })
                }
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#F57450]/10 focus:border-[#F57450]/30 transition-all text-sm shadow-sm"
              />
            </div>

            <div className="relative flex-1 w-full">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Location"
                value={searchInputs.location}
                onChange={(e) =>
                  setSearchInputs({ ...searchInputs, location: e.target.value })
                }
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#F57450]/10 focus:border-[#F57450]/30 transition-all text-sm shadow-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="w-full md:w-auto px-10 py-4 bg-[#F57450] text-white font-bold rounded-xl hover:bg-[#E06440] transition-all shadow-lg shadow-[#F57450]/20 whitespace-nowrap"
            >
              Search Job
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8 pb-16">
        {/* FILTERS */}
        <aside className="bg-white p-6 rounded-xl space-y-6 h-fit border border-gray-100 shadow-sm">
          {/* JOB TYPE */}
          <div className="space-y-4 border-2 border-gray-50 p-5 rounded-2xl">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">
              Job Type
            </h3>
            {[
              "Full-Time",
              "Contract",
              "Part-Time",
              "Internship",
              "Freelance",
            ].map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 cursor-pointer group hover:text-[#F57450] transition-colors mb-3 last:mb-0"
              >
                <input
                  type="checkbox"
                  checked={filters.jobType.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="w-4 h-4 rounded border-gray-300 text-[#F57450] focus:ring-[#F57450]"
                />
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                  {type}
                </span>
              </label>
            ))}
          </div>

          {/* INDUSTRY */}
          <div className="space-y-4 border-2 border-gray-50 p-5 rounded-2xl">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">
              Industry
            </h3>
            {[
              "Information Technology",
              "Advertising/PR",
              "Media & Communication",
              "Fashion",
              "Health & Fitness",
            ].map((industry) => (
              <label
                key={industry}
                className="flex items-center gap-3 cursor-pointer group hover:text-[#F57450] transition-colors mb-3 last:mb-0"
              >
                <input
                  type="checkbox"
                  checked={filters.industry.includes(industry)}
                  onChange={() => handleIndustryChange(industry)}
                  className="w-4 h-4 rounded border-gray-300 text-[#F57450] focus:ring-[#F57450]"
                />
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                  {industry}
                </span>
              </label>
            ))}
          </div>

          {/* SALARY */}
          <div className="space-y-4 border-2 border-gray-50 p-5 rounded-2xl">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">
              Salary Range
            </h3>
            {[
              "₦300k - ₦380k",
              "₦250k - ₦350k",
              "₦200k - ₦250k",
              "₦150k - ₦250k",
              "₦100k - ₦150k",
            ].map((salary) => (
              <label
                key={salary}
                className="flex items-center gap-3 cursor-pointer group hover:text-[#F57450] transition-colors mb-3 last:mb-0"
              >
                <input
                  type="checkbox"
                  checked={filters.salaryRange.includes(salary)}
                  onChange={() => handleSalaryChange(salary)}
                  className="w-4 h-4 rounded border-gray-300 text-[#F57450] focus:ring-[#F57450]"
                />
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                  {salary}
                </span>
              </label>
            ))}
          </div>
        </aside>

        {/* JOB LIST */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-2">
            <p className="text-gray-600 font-medium">
              Showing{" "}
              <span className="text-[#F57450] font-bold">
                {finalJobs.length}
              </span>{" "}
              of <span className="text-[#F57450] font-bold">{totalJobs}</span>{" "}
              curated opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {finalJobs.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400 text-lg">
                  No jobs found matching your criteria.
                </p>
              </div>
            )}

            {finalJobs.map((job) => (
              <JobCard
                key={job._id || job.id}
                job={job}
                isSavedInitial={savedJobIds.has(job._id)}
              />
            ))}
          </div>

          {/* PAGINATION UI */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 pb-8">
              <button
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-6 py-2 border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              <span className="text-sm font-bold text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-6 py-2 bg-[#F57450] text-white rounded-lg font-bold hover:bg-[#E06440] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#F57450]/20"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
