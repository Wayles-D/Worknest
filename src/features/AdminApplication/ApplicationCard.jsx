import { Calendar, Building2 } from "lucide-react";
import { getStatusColor } from "@/utils/constant";

export default function ApplicationCard({ application, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {application.applicantName}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{application.jobTitle}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            application.status,
          )}`}
        >
          {application.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          <span>{application.company}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Applied on {application.appliedDate}</span>
        </div>
      </div>
    </div>
  );
}
