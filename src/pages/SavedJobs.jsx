import React, { useState, useEffect } from "react";
import { ArrowLeft, Building2, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getSavedJobs } from "@/api/api";
import { useAuth } from "@/store";
import JobCard from "@/components/JobCard";

export default function MySavedJobs() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    if (!accessToken) return;
    try {
      setLoading(true);
      const res = await getSavedJobs(accessToken);
      if (res.status === 200) {
        const rawData = res.data.data || [];
        setSavedJobs(Array.isArray(rawData) ? rawData : rawData.jobs || []);
      }
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, [accessToken]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleApplyNow = (jobId) => {
    navigate(`/apply/${jobId}`);
    console.log("Applying for job:", jobId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0EEEE] flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4 sm:mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">
              My saved Jobs
            </h1>
            <p className="text-sm text-gray-500">You have saved four jobs</p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.length === 0 ? (
            <div className="col-span-full bg-white rounded-xl p-8 sm:p-12 text-center">
              <p className="text-gray-500">No saved jobs found</p>
            </div>
          ) : (
            savedJobs.map((job) => (
              <JobCard
                key={job._id || job.id}
                job={job}
                isSavedInitial={true}
                onToggleSave={fetchSavedJobs}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
