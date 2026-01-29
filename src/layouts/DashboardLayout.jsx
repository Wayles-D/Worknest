import { Outlet, NavLink } from "react-router";
import { LayoutDashboard, Briefcase, FileText } from "lucide-react";
import Logo from "@/components/Logo";

export default function DashboardLayout() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "Jobs", path: "/admin/jobs", icon: <Briefcase size={20} /> },
    {
      name: "Applications",
      path: "/admin/applications",
      icon: <FileText size={20} />,
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--sidebar-color)] border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Logo />
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[var(--sidebar-active-color)] font-medium text-white"
                    : "text-white hover:bg-[var(--sidebar-active-color)]"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100"></div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-[var(--color-primary)]">
        {/* <header className="h-16 bg- border-b border-gray-200 flex items-center px-8">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Admin Panel
          </h2>
        </header> */}
        <div className="p-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
