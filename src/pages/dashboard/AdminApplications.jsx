import PageWrapper from "@/components/PageWrapper";
import Search from "@/components/Search";
import ApplicationCard from "@/features/AdminApplication/ApplicationCard";
import ApplicationDetail from "@/features/AdminApplication/ApplicationDetail";
import Filter from "@/features/AdminApplication/Filter";
import JobFilter from "@/features/AdminApplication/JobFilter";
import Table from "@/features/AdminApplication/Table";
import { useAdminApplications } from "@/hooks/useApplications";
import { Grid3x3, List, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const AdminApplications = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const statusFilter = searchParams.get("status") || "";
  const searchQuery = searchParams.get("query") || "";
  const jobFilter = searchParams.get("job") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const { data: response, isLoading } = useAdminApplications({
    status: statusFilter,
    keyword: searchQuery,
    page,
    limit: 12,
  });

  const applications = response?.data || [];
  const total = response?.total || 0;

  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  const applicationId = searchParams.get("id");
  if (applicationId) {
    return (
      <div className="pb-24">
        <ApplicationDetail applicationId={applicationId} />
      </div>
    );
  }

  const handleApplicationClick = (id) => {
    navigate(`?id=${id}`);
  };

  return (
    <PageWrapper>
      <div>
        <h1 className="text-2xl font-bold">Applications</h1>
        <p className="mt-2 text-gray-600">
          Review and manage all job applications.
        </p>
      </div>

      {/* Search + Filters + View Toggle */}
      <div className="mt-6">
        <Search>
          <div className="hidden md:flex flex-col md:flex-row gap-2 mt-3 md:mt-0">
            <JobFilter applications={applications} />
            <Filter />
          </div>
          {/* View Mode Toggle */}
          <div className="hidden md:flex mt-2 md:mt-0 items-center gap-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Grid View"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </Search>
      </div>

      {/* Applications Grid or Table */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="animate-spin text-[#F57450]" size={40} />
            <p className="text-gray-500 font-medium">Loading applications...</p>
          </div>
        ) : applications.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onClick={() => handleApplicationClick(application.id)}
                />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[700px] bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <Table applications={applications} />
              </div>
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl p-8 sm:p-12 text-center">
            <p className="text-gray-500">
              No applications found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Results Count and Pagination could be here */}
      <div className="text-sm text-gray-600 mt-6 flex justify-between items-center">
        <span>
          Showing {applications.length} of {total} applications
        </span>
      </div>
    </PageWrapper>
  );
};

export default AdminApplications;
