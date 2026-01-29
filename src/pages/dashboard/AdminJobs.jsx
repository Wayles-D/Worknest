import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Search,
  Filter,
  ChevronDown,
  Eye,
  X,
} from "lucide-react";
import JobForm from "@/components/dashboard/JobForm";
import { jobs as initialJobs } from "@/data/jobs";
import { toast } from "sonner";

const AdminJobs = () => {
  const [view, setView] = useState("list"); // 'list' or 'form'
  const [jobs, setJobs] = useState(initialJobs);
  const [editingJob, setEditingJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

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

  const handleDelete = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
    toast.success("Job deleted successfully");
    setActiveDropdown(null);
  };

  const handleCloseJob = (id) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status: "Closed" } : j)));
    toast.info("Job marked as closed");
    setActiveDropdown(null);
  };

  const handleSaveJob = (jobData) => {
    if (editingJob) {
      setJobs(
        jobs.map((j) => (j.id === editingJob.id ? { ...jobData, id: j.id } : j))
      );
      toast.success("Job updated successfully");
    } else {
      const newJob = {
        ...jobData,
        id: `job-${Date.now()}`,
        datePosted: new Date().toISOString().split("T")[0],
        status: jobData.status || "Active",
        applications: 0,
      };
      setJobs([newJob, ...jobs]);
      toast.success("Job created successfully");
    }
    setView("list");
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-600 border-green-100";
      case "Closed":
        return "bg-red-50 text-red-600 border-red-100";
      case "Draft":
        return "bg-gray-50 text-gray-600 border-gray-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  if (view === "form") {
    return (
      <div className="p-8 bg-[var(--color-primary)] min-h-screen">
        <JobForm
          job={editingJob}
          onSave={handleSaveJob}
          onCancel={() => setView("list")}
        />
      </div>
    );
  }
  return (
    <div className="p-8 bg-[var(--color-primary)] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A0A0A]">Jobs</h1>
          <p className="text-gray-500 text-sm">Manage all job postings</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-[var(--sidebar-active-color)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-black/90 transition-all"
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
                    key={job.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900 text-sm">
                        {job.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {job.company}
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
                          job.status
                        )}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(job.datePosted).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === job.id ? null : job.id
                          )
                        }
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <span className="text-sm font-medium">Actions</span>
                      </button>

                      {activeDropdown === job.id && (
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
                            onClick={() => handleCloseJob(job.id)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <X size={14} />
                            Close Job
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
