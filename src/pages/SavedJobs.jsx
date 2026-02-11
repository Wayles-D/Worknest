import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getSavedJobs } from "@/api/api";
import { useAuth } from "@/store";
import SavedJobItem from "@/components/SavedJobItem";

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
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0EEEE] flex items-center justify-center">
        <div className="text-gray-600 font-semibold">
          Loading your saved jobs...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container">
      <div className=" py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-10">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="mb-2">
            <h1 className="text-3xl sm:text-4xl font-black text-black mb-1">
              My saved Jobs
            </h1>
            <p className="text-lg text-gray-500 font-medium">
              You have saved {savedJobs.length}{" "}
              {savedJobs.length === 1 ? "job" : "jobs"}
            </p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="flex flex-col gap-4">
          {savedJobs.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-lg font-medium">
                No saved jobs yet. Start exploring!
              </p>
            </div>
          ) : (
            savedJobs.map((job) => (
              <SavedJobItem key={job._id || job.id} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
