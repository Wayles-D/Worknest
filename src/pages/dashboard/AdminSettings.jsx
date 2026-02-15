import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateAdminPassword } from "@/api/admin";
import { useAuth } from "@/store";
import { toast } from "sonner";

const AdminSettings = () => {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-[#0A0A0A] mb-4">Settings</h1>
      <p className="text-gray-500 mb-8">
        Manage your account settings and change your password.
      </p>

      <div className="mt-8 p-6 border border-gray-100 rounded-xl bg-gray-50/50 max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">General Configuration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 opacity-60">
            <span className="text-sm font-medium text-gray-700">
              Maintenance Mode
            </span>
            <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-not-allowed">
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 opacity-60">
            <span className="text-sm font-medium text-gray-700">
              Email Notifications
            </span>
            <div className="w-10 h-5 bg-[#F57450] rounded-full relative cursor-not-allowed">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminSettings;
