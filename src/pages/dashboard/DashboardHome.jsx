import { Link } from "react-router";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ApplicationOverview from "@/components/dashboard/ApplicationOverview";
import { Briefcase, FileText, Clock } from "lucide-react";
import { useAdminDashboardStats } from "@/hooks/useAdminDashboardStats";

const DashboardHome = () => {
  const {
    totalJobs,
    activeJobs,
    totalApplications,
    pendingReview,
    isLoading,
  } = useAdminDashboardStats();

  const toDisplayValue = (value) => (isLoading ? "..." : String(value ?? 0));

  const dashboardStats = [
    {
      key: "total-jobs",
      label: "Total Jobs",
      value: toDisplayValue(totalJobs),
      icon: Briefcase,
      color: "bg-[#1B294B]/10 text-gray-600",
    },
    {
      key: "active-jobs",
      label: "Active Jobs",
      value: toDisplayValue(activeJobs),
      icon: Briefcase,
      color: "bg-green-50 text-green-600",
    },
    {
      key: "total-applications",
      label: "Total Applications",
      value: toDisplayValue(totalApplications),
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
    },
    {
      key: "pending-review",
      label: "Pending Review",
      value: toDisplayValue(pendingReview),
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
        <Link
          to="/admin/jobs"
          className="bg-(--sidebar-active-color) text-white px-5 py-2.5 rounded-lg font-medium hover:bg-black/90 transition-all"
        >
          <span className="font-semibold text-[16px]">+ Create Job</span>
        </Link>
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
