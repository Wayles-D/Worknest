// Table.jsx
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
          <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-900">{row.applicantName}</span>
            <span className="text-gray-500 text-sm">{row?.userId?.email}</span>
          </div>
        );

      case "jobTitle":
        return (
          <div className="capitalize text-gray-700 text-sm">{row.jobTitle}</div>
        );

      case "appliedDate":
        return <div className="text-gray-600 text-sm">{row.appliedDate}</div>;

      case "status":
        return (
          <span
            className={`inline-block px-3 py-2 rounded-full text-xs font-medium ${getStatusStyles(
              row.status,
            )}`}
          >
            {row.status}
          </span>
        );

      case "action":
        return (
          <button className="w-full text-black hover:text-orange-500 cursor-pointer">
            <Link to={`?id=${row.id}`}
             className="flex gap-2">
              <Eye size={20} />

              <span>Vew</span>
            </Link>
          </button>
        );

      default:
        return <span className="text-gray-700">{row[columnKey]}</span>;
    }
  }, []);

  return (
    <TableBody
      tableColumns={applicationColumns}
      tableData={applications}
      renderCell={renderCell}
    />
  );
}
