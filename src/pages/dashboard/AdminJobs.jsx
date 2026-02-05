import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Search,
  Filter,
  ChevronDown,
  Eye,
  X,
  Trash2,
} from "lucide-react";
import JobForm from "@/components/dashboard/JobForm";
import { getAllJobs, deleteJob, updateJob } from "@/api/api";
import { toast } from "sonner";
import { useAuth } from "@/store";
import { useJobs } from "@/hooks/useJobs"; // Assuming this hook exists and is imported

const AdminJobs = () => {
  const { accessToken } = useAuth();
  const [view, setView] = useState("list"); // 'list' or 'form'
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getAllJobs(accessToken);
      if (res.status === 200) {
        const responseData = res.data;
        // Robust mapping: handle [body], [body.data], [body.jobs], or [body.data.jobs]
        const jobList = Array.isArray(responseData)
          ? responseData
          : responseData.data || responseData.jobs || [];

        setJobs(Array.isArray(jobList) ? jobList : jobList.jobs || []);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchJobs();
    }
  }, [accessToken]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateNew = () => {
    setEditingJob(null);
    setView("form");
  };
  const handleEdit = (job) => {
    setEditingJob(job);
    setView("form");
    setActiveDropdown(null);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteJob(id, accessToken);
      if (res.status === 200) {
        setJobs(jobs.filter((j) => j._id !== id));
        toast.success("Job deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
    setActiveDropdown(null);
  };

  const handleCloseJob = async (id) => {
    try {
      const res = await updateJob(id, { status: "inactive" }, accessToken);
      if (res.status === 200) {
        setJobs(
          jobs.map((j) => (j._id === id ? { ...j, status: "inactive" } : j)),
        );
        toast.info("Job marked as inactive");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to close job");
    }
    setActiveDropdown(null);
  };

  const handleSaveJob = () => {
    fetchJobs();
    setView("list");
  };

  const filteredJobs = (Array.isArray(jobs) ? jobs : []).filter((job) => {
    const matchesSearch =
      (job.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.companyName || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" ||
      (statusFilter === "Active"
        ? job.status === "active"
        : job.status === "inactive");
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-600 border-green-100 uppercase";
      case "inactive":
        return "bg-red-50 text-red-600 border-red-100 uppercase";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100 uppercase";
    }
  };

  if (view === "form") {
    return (
      <div className="p-8 bg-white min-h-screen">
        <JobForm
          job={editingJob}
          onSave={handleSaveJob}
          onCancel={() => setView("list")}
        />
      </div>
    );
  }
  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A0A0A]">Jobs</h1>
          <p className="text-gray-500 text-sm">Manage all job postings</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-(--sidebar-active-color) text-white px-5 py-2.5 rounded-lg font-medium hover:bg-black/90 transition-all font-inter"
        >
          <Plus size={18} />
          Create Job
        </button>
      </div>

      {/* Filters Area */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-[400px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-gray-400">
            <Filter size={18} />
          </div>
          <div className="relative group w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 cursor-pointer w-full md:w-40"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Closed</option>
              <option>Draft</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">
                  Applications
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Posted
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr
                    key={job._id || job.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900 text-sm">
                        {job.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {job.companyName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {job.jobType}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">
                      {job.applications || 0}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                          job.status,
                        )}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString("en-GB")
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === (job._id || job.id)
                              ? null
                              : job._id || job.id,
                          )
                        }
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <span className="text-sm font-medium">Actions</span>
                      </button>

                      {activeDropdown === (job._id || job.id) && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-6 top-10 w-40 bg-white border border-gray-100 rounded-lg shadow-xl z-20 py-1.5 animate-in fade-in zoom-in duration-150"
                        >
                          <button
                            onClick={() => {
                              toast.info("Opening job view...");
                              setActiveDropdown(null);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Eye size={14} className="text-gray-400" />
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(job)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Edit2 size={14} className="text-gray-400" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleCloseJob(job._id || job.id)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <X size={14} />
                            Close Job
                          </button>
                          <button
                            onClick={() => handleDelete(job._id || job.id)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500 text-sm"
                  >
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
