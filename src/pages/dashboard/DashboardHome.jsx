import React from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ApplicationOverview from "@/components/dashboard/ApplicationOverview";
import { Briefcase, FileText, Clock } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { useApplications } from "@/hooks/useApplications";

const DashboardHome = () => {
  const { data: jobResponse, isLoading: jobsLoading } = useJobs();
  const { data: applications, isLoading: appsLoading } = useApplications();

  // Robust mapping for jobs
  const responseData = jobResponse?.data;
  const jobList = Array.isArray(responseData)
    ? responseData
    : responseData?.data || responseData?.jobs || [];
  const finalJobs = Array.isArray(jobList) ? jobList : jobList.jobs || [];

  const totalJobs = finalJobs.length;
  const activeJobs = finalJobs.filter((j) => j.status === "active").length;
  const totalApplications = Array.isArray(applications)
    ? applications.length
    : 0;
  const pendingReview = Array.isArray(applications)
    ? applications.filter((app) => app.status?.toLowerCase() === "pending")
        .length
    : 0;

  const dashboardStats = [
    {
      key: "total-jobs",
      label: "Total Jobs",
      value: jobsLoading ? "..." : totalJobs.toString(),
      icon: Briefcase,
      color: "bg-[#1B294B]/10 text-gray-600",
    },
    {
      key: "active-jobs",
      label: "Active Jobs",
      value: jobsLoading ? "..." : activeJobs.toString(),
      icon: Briefcase,
      color: "bg-green-50 text-green-600",
    },
    {
      key: "total-applications",
      label: "Total Applications",
      value: appsLoading ? "..." : totalApplications.toString(),
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
    },
    {
      key: "pending-review",
      label: "Pending Review",
      value: appsLoading ? "..." : pendingReview.toString(),
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="space-y-7">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[24px] text-[#171717] font-bold">Dashboard</h1>
          <p className="text-[14px] text-gray-500">
            Welcome back! Here's an overview of your job portal.
          </p>
        </div>
        <button className="bg-(--sidebar-active-color) text-white px-5 py-2.5 rounded-lg font-medium hover:bg-black/90 transition-all">
          <span className="font-semibold text-[16px]">+ Create Job</span>
        </button>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat) => (
          <StatsCard
            key={stat.key}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <ApplicationOverview />
      </div>
    </div>
  );
};

export default DashboardHome;
