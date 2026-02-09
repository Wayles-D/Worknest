import React from "react";

const AdminSettings = () => {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-[#0A0A0A] mb-4">Settings</h1>
      <p className="text-gray-500">
        Admin settings and configuration options will appear here.
      </p>

      <div className="mt-8 p-6 border border-gray-100 rounded-xl bg-gray-50/30 max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">General Configuration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <span>Maintenance Mode</span>
            <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-not-allowed">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <span>Email Notifications</span>
            <div className="w-12 h-6 bg-[#F57450] rounded-full relative cursor-not-allowed">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
