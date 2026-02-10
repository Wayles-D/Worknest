import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getJobById, saveJob, unsaveJob, getSavedJobs } from "@/api/api";
import {
  Send,
  Bookmark,
  BookmarkCheck,
  Loader2,
  MapPin,
  Briefcase,
  Building2,
} from "lucide-react";
import { useAuth } from "@/store";
import { toast } from "sonner";
import officeCollab from "/office_collab.jpg";

export default function JobDetails() {
  const { id } = useParams();
  const { accessToken } = useAuth();
  getJobById(id, accessToken);

  const {
    data: job,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const res = await getJobById(id, accessToken);
      // Robust mapping: check for res.data.data.data, res.data.data, or res.data directly
      const body = res.data;
      const rawData =
        body?.data?.data || body?.data || body?.jobs || body?.job || body;

      // If it's an array, take the first one; if it's an object with a 'jobs' property, drill down
      const actualData = Array.isArray(rawData)
        ? rawData[0]
        : rawData?.jobs || rawData?.job || rawData;

      // Final check: if it's an array of one, take it again
      return Array.isArray(actualData) ? actualData[0] : actualData;
    },
  });

  const { data: savedJobsResponse } = useQuery({
    queryKey: ["savedJobs", accessToken],
    queryFn: async () => {
      if (!accessToken) return [];
      const res = await getSavedJobs(accessToken);
      if (res.status === 200) {
        const body = res.data;
        const rawData = body?.data?.data || body?.data || body || [];
        const actualSaved = Array.isArray(rawData)
          ? rawData
          : rawData.jobs || [];
        return Array.isArray(actualSaved) ? actualSaved : [];
      }
      return [];
    },
    enabled: !!accessToken,
  });

  const savedJobIds = new Set(
    Array.isArray(savedJobsResponse)
      ? savedJobsResponse.map((j) => j._id || j.id)
      : [],
  );
  const isSaved = savedJobIds.has(id);

  const [saving, setSaving] = useState(false);

  const handleSaveToggle = async () => {
    if (!accessToken) {
      toast.error("Please login to save jobs");
      return;
    }
    setSaving(true);
    try {
      if (isSaved) {
        await unsaveJob(id, accessToken);
        toast.success("Job removed from saved");
      } else {
        await saveJob(id, accessToken);
        toast.success("Job saved successfully");
      }
      refetch();
    } catch (error) {
      toast.error("Failed to update save status");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  if (!job)
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-gray-800">Job not found</p>
        <p className="text-sm text-gray-500">ID: {id}</p>
        <Link to="/jobs" className="text-[#F57450] font-bold hover:underline">
          Back to all jobs
        </Link>
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Job Header */}
        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-gray-50 rounded-2xl p-4 flex items-center justify-center shrink-0 border border-gray-100">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-full h-full object-contain"
              />
            ) : (
              <Building2 className="text-gray-300 w-12 h-12" />
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-3">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <span className="text-[#F57450] font-bold">
                  {job.companyName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-400" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-gray-400" />
                <span>{job.jobType}</span>
              </div>
              <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-sm font-bold border border-green-100 uppercase">
                {job.experienceLevel}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <button
              onClick={handleSaveToggle}
              disabled={saving}
              className={`p-4 rounded-2xl transition-all border ${
                isSaved
                  ? "bg-orange-50 border-orange-100 text-[#F57450]"
                  : "bg-white border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300"
              }`}
            >
              {saving ? (
                <Loader2 className="animate-spin" size={24} />
              ) : isSaved ? (
                <BookmarkCheck size={28} />
              ) : (
                <Bookmark size={28} />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Role Overview Card */}
            <div className="bg-white rounded-[32px] p-10 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-[#0A0A0A]">
                  Role Overview
                </h2>
                <button
                  onClick={handleSaveToggle}
                  disabled={saving}
                  className={`p-2 rounded-full transition-colors ${
                    isSaved
                      ? "bg-orange-100 text-[#F57450]"
                      : "bg-gray-100 text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {saving ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : isSaved ? (
                    <BookmarkCheck size={24} />
                  ) : (
                    <Bookmark size={24} />
                  )}
                </button>
              </div>
              <p className="text-[#555859] leading-[1.6] text-lg font-medium">
                {job.jobDescription}
              </p>
            </div>

            {/* What You'll Do Card */}
            <div className="bg-white rounded-[32px] p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-6">
                What You'll Do
              </h2>
              <ul className="space-y-4">
                {(Array.isArray(job.responsibilities)
                  ? job.responsibilities
                  : typeof job.responsibilities === "string"
                    ? job.responsibilities.split(",").filter(Boolean)
                    : []
                ).map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-[#555859] text-lg font-medium leading-[1.5]"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#555859] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills & Experience Card */}
            <div className="bg-white rounded-[32px] p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-6">
                Skills & Experience
              </h2>
              <ul className="space-y-4">
                {(Array.isArray(job.requirement)
                  ? job.requirement
                  : typeof job.requirement === "string"
                    ? job.requirement.split(",").filter(Boolean)
                    : []
                ).map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-[#555859] text-lg font-medium leading-[1.5]"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#555859] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits & Perks Card */}
            <div className="bg-white rounded-[32px] p-10 shadow-sm text-[#0A0A0A]">
              <h2 className="text-2xl font-bold mb-6">Benefits & Perks</h2>
              <div className="flex flex-wrap gap-3">
                {(Array.isArray(job.benefits)
                  ? job.benefits
                  : typeof job.benefits === "string"
                    ? job.benefits.split(",").filter(Boolean)
                    : []
                ).map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-[#FFDACF] px-5 py-2.5 rounded-full text-lg font-bold"
                  >
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[32px] overflow-hidden shadow-sm p-4 h-fit sticky top-28">
              <div className="relative rounded-[24px] overflow-hidden mb-8 aspect-[411/300]">
                <img
                  src={officeCollab}
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-6 pb-6 text-center">
                <h3 className="text-[28px] font-bold text-[#0A0A0A] mb-4">
                  How to Apply
                </h3>
                <p className="text-[#6B7280] text-lg font-medium leading-relaxed mb-8">
                  Join the most innovative job board connecting ambitious talent
                  with world-class opportunities.
                </p>

                <Link
                  to={`/apply/${id}`}
                  className="w-full bg-[#F57450] text-white py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#E06440] transition-all shadow-lg shadow-[#F57450]/20"
                >
                  <Send size={20} />
                  Submit Application
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
