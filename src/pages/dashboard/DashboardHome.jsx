import { Link } from 'react-router'
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ApplicationOverview from "@/components/dashboard/ApplicationOverview";
import { stats } from "@/components/dashboard/StatsCard";

const DashboardHome = () => {
  return (
    <>
    <div className="space-y-7">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-[24px] text-[#171717] font-bold">Dashboard</h1>
          <p className="text-[14px] text-gray-500">Welcome back! Here's an overview of your job portal.</p>
        </div>
        <button className="bg-orange-500 text-white px-5 py-4 rounded-md">
          <Link to='/admin/jobs'>
          <span className="font-semibold text-[16px]">+ Create Job</span>
          </Link>
        </button>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
          key={stat.key}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}/>
        ))}
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <ApplicationOverview />
      </div>
    </div>
    </>
  );
};

export default DashboardHome;
