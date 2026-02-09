import { Link } from "react-router";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/store";
import { saveJob, unsaveJob } from "@/api/api";
import { toast } from "sonner";

export default function JobCard({ job, isSavedInitial = false, onToggleSave }) {
  const { accessToken } = useAuth();
  const [isSaved, setIsSaved] = useState(isSavedInitial);
  const [loading, setLoading] = useState(false);

  const handleSaveToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!accessToken) {
      toast.error("Please login to save jobs");
      return;
    }
    setLoading(true);
    try {
      if (isSaved) {
        await unsaveJob(job._id || job.id, accessToken);
        toast.success("Job removed from saved");
        setIsSaved(false);
      } else {
        await saveJob(job._id || job.id, accessToken);
        toast.success("Job saved successfully");
        setIsSaved(true);
      }
      if (onToggleSave) onToggleSave();
    } catch (error) {
      toast.error("Failed to update save status");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Link
      to={`/jobs/${job._id || job.id}`}
      className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition block relative"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="inline-block bg-orange-100 text-xs px-3 py-1 rounded-full">
          {job.jobType}
        </span>
        <button
          onClick={handleSaveToggle}
          disabled={loading}
          className={`p-1.5 rounded-full transition-colors ${
            isSaved
              ? "bg-orange-50 text-[#F57450]"
              : "bg-gray-50 text-gray-400 hover:text-gray-600"
          }`}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : isSaved ? (
            <BookmarkCheck size={18} />
          ) : (
            <Bookmark size={18} />
          )}
        </button>
      </div>

      <h4 className="font-semibold text-lg mb-1">{job.title}</h4>

      <p className="text-sm mb-2">
        Salary: ₦{job.salaryRange?.min} - ₦{job.salaryRange?.max}
      </p>

      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {job.jobDescription}
      </p>
      <hr className="my-4 border-gray-200" />

      <div className="w-fit flex space-x-2">
        <div>
          <img
            src={job.companyLogo}
            alt={job.companyName}
            className="w-8 h-8 object-contain"
          />
        </div>
        <div>
          <div className="justify-between text-xs text-gray-500">
            <span>
              {job.companyName}, {job.location}
            </span>
          </div>

          <div className="text-xs text-gray-500">
            <span>
              {job.createdAt
                ? new Date(job.createdAt).toLocaleDateString("en-GB")
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
