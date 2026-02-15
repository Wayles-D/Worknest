import { useCallback } from "react";
import { Eye } from "lucide-react";
import { applicationColumns, getStatusStyles } from "@/utils/constant";
import TableBody from "@/components/TableBody";
import { Link } from "react-router";

export default function Table({ applications }) {
  const renderCell = useCallback((row, columnKey) => {
    switch (columnKey) {
      case "applicantName":
        return (
          <div className="flex flex-col py-2">
            <span className="font-bold text-gray-900 group-hover:text-[#F57450] transition-colors">
              {row.applicant?.name}
            </span>
            <span className="text-gray-400 text-xs font-medium">
              {row.applicant?.email}
            </span>
          </div>
        );

      case "jobTitle":
        return (
          <div className="font-semibold text-gray-800 text-sm">
            {row.job?.title}
          </div>
        );

      case "appliedDate":
        return (
          <div className="text-gray-500 font-medium text-sm">
            {new Date(row.createdAt).toLocaleDateString("en-GB")}
          </div>
        );

      case "status":
        return (
          <div className="flex">
            <span
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-sm ${getStatusStyles(
                row.status,
              )}`}
            >
              {row.status}
            </span>
          </div>
        );

      case "action":
        return (
          <Link
            to={`?id=${row.id}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-900 hover:bg-gray-50 font-bold text-sm transition-all group"
          >
            <Eye
              size={18}
              className="text-gray-400 group-hover:text-[#F57450] transition-colors"
            />
            <span>View</span>
          </Link>
        );

      default:
        return <span className="text-gray-700">{row[columnKey]}</span>;
    }
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <TableBody
        tableColumns={applicationColumns}
        tableData={applications}
        renderCell={renderCell}
      />
    </div>
  );
}
