import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  User,
  Link as LinkIcon,
  ChevronDown,
  Save,
  DownloadIcon,
  Loader2,
} from "lucide-react";
import {
  useApplicationDetails,
  useUpdateApplicationStatus,
  useUpdateApplicationNote,
} from "@/hooks/useApplications";
import { statusOptions, getStatusStyles } from "@/utils/constant";

export default function ApplicationDetail({ applicationId }) {
  const navigate = useNavigate();
  const { data: application, isLoading } = useApplicationDetails(applicationId);
  const updateStatusMutation = useUpdateApplicationStatus();
  const updateNoteMutation = useUpdateApplicationNote();

  const [internalNote, setInternalNote] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (application) {
      setInternalNote(application.note || "");
    }
  }, [application]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false);
      }
    };
    if (showStatusDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStatusDropdown]);

  const handleBack = () => {
    navigate("/admin/applications");
  };

  const handleStatusSelect = (newStatus) => {
    setShowStatusDropdown(false);
    updateStatusMutation.mutate({
      applicationId: application.id,
      status: newStatus,
      note: internalNote, // Backend allows optional note here
    });
  };

  const handleDownloadCV = () => {
    if (!application?.resumeUrl) return;
    window.open(application.resumeUrl, "_blank");
  };

  const handlePortfolioClick = () => {
    if (!application?.portfolioUrl) return;
    window.open(application.portfolioUrl, "_blank", "noopener,noreferrer");
  };

  const handleLinkedInClick = () => {
    if (!application?.linkedinUrl) return;
    window.open(application.linkedinUrl, "_blank", "noopener,noreferrer");
  };

  const handleSaveChanges = () => {
    updateNoteMutation.mutate({
      applicationId: application.id,
      note: internalNote,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="animate-spin text-[#F57450]" size={40} />
        <p className="text-gray-400 font-medium">Loading details...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-gray-500 font-medium">Application not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      {/* Header & Back Button */}
      <div className="mb-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-all group font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-black" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
          {application.applicant?.name}
        </h1>
        <p className="text-gray-400 font-bold text-lg">
          Application for {application.job?.title}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Areas */}
        <div className="lg:col-span-8 space-y-8">
          {/* Candidate Details */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">
              Candidate Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50/50 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#F57450]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <p className="text-gray-900 font-bold truncate">
                    {application.applicant?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50/50 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#F57450]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-0.5">
                    Phone
                  </p>
                  <p className="text-gray-900 font-bold truncate">
                    {application.applicant?.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50/50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#F57450]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-0.5">
                    Location
                  </p>
                  <p className="text-gray-900 font-bold">
                    {application.applicant?.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">
              Professional Information
            </h2>
            <div className="flex flex-wrap gap-4">
              {application.resumeUrl && (
                <button
                  onClick={handleDownloadCV}
                  className="flex items-center gap-2 px-8 py-3.5 bg-gray-100/50 hover:bg-gray-100 text-gray-900 rounded-xl transition-all font-bold text-xs"
                >
                  <DownloadIcon className="w-4 h-4 text-blue-600" />
                  <span>Download CV</span>
                </button>
              )}
              {application.portfolioUrl && (
                <button
                  onClick={handlePortfolioClick}
                  className="flex items-center gap-2 px-8 py-3.5 bg-gray-100/50 hover:bg-gray-100 text-gray-900 rounded-xl transition-all font-bold text-xs"
                >
                  <User className="w-4 h-4 text-blue-400" />
                  <span>Portfolio</span>
                </button>
              )}
              {application.linkedinUrl && (
                <button
                  onClick={handleLinkedInClick}
                  className="flex items-center gap-2 px-8 py-3.5 bg-gray-100/50 hover:bg-gray-100 text-gray-900 rounded-xl transition-all font-bold text-xs"
                >
                  <LinkIcon className="w-4 h-4 text-blue-500" />
                  <span>LinkedIn</span>
                </button>
              )}
            </div>
          </div>

          {/* Application Answers */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">
              Application Answers
            </h2>
            <div className="space-y-10">
              {application.answers.length > 0 ? (
                application.answers.map((qa, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-bold text-gray-900 text-base">
                      {qa.question}
                    </h3>
                    <p className="text-gray-400 font-medium leading-relaxed">
                      {qa.answer}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">No answers provided.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Components */}
        <div className="lg:col-span-4 space-y-8">
          {/* Status Section */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">
              Status
            </h2>

            <div className="space-y-8">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                  Current Status
                </span>
                <span
                  className={`px-5 py-2 rounded-full text-[11px] font-bold shadow-sm ${getStatusStyles(application.status)}`}
                >
                  {application.status}
                </span>
              </div>

              <div className="relative">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                  Update Status
                </p>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl hover:border-orange-200 transition-all font-bold text-sm text-gray-700"
                  >
                    <span>{application.status}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${showStatusDropdown ? "rotate-180" : ""}`}
                    />
                  </button>
                  {showStatusDropdown && (
                    <div className="absolute z-50 w-full mt-3 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {statusOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleStatusSelect(option)}
                          className="w-full text-left px-5 py-3.5 hover:bg-orange-50 hover:text-[#F57450] font-bold transition-colors text-sm text-gray-600"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Job Details Section */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">
              Job Summary
            </h2>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-lg leading-tight">
                {application.job?.title}
              </h3>
              <p className="text-[#F57450] font-bold text-sm">
                {application.job?.companyName}
              </p>

              <div className="pt-6 mt-6 border-t border-gray-50">
                <p className="text-gray-400 font-bold text-sm">
                  Applied on{" "}
                  {new Date(application.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
          </div>

          {/* Internal Note Section */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">
              Internal Note
            </h2>
            <div className="space-y-4">
              <textarea
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Add private notes about this candidate..."
                className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[#F57450]/10 focus:border-[#F57450]/50 font-medium text-gray-600 placeholder-gray-300"
                rows="5"
              />

              <button
                onClick={handleSaveChanges}
                disabled={updateNoteMutation.isPending}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#F57450] hover:bg-[#E05B35] text-white rounded-2xl transition-all font-bold shadow-lg shadow-[#F57450]/20 active:scale-[0.98]"
              >
                <Save className="w-4 h-4" />
                <span>
                  {updateNoteMutation.isPending ? "Saving..." : "Save Note"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
