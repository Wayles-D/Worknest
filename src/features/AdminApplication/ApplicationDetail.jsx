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
} from "lucide-react";
import {
  useApplication,
  useUpdateApplicationStatus,
  useUpdateApplicationNote,
} from "@/hooks/useApplications";
import { statusOptions, getStatusColor } from "@/utils/constant";

export default function ApplicationDetail({ applicationId }) {
  const navigate = useNavigate();
  const { data: application, isLoading } = useApplication(applicationId);
  const updateStatusMutation = useUpdateApplicationStatus();
  const updateNoteMutation = useUpdateApplicationNote();

  // Derive status from application data - this will update automatically when query data changes
  const status = application?.status || "";

  // Use local state for note to allow editing before saving
  // Initialize from application data - the key on textarea will reset it when applicationId changes
  const [internalNote, setInternalNote] = useState(
    application?.internalNote || "",
  );
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Sync internal note when application data changes (only if empty to preserve user edits)
  useEffect(() => {
    if (application?.internalNote !== undefined && internalNote === "") {
      setInternalNote(application.internalNote || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [application?.internalNote]);

  // Close dropdown when clicking outside
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
      applicationId: Number(applicationId),
      newStatus,
    });
  };

  const handleDownloadCV = () => {
    // Create a dummy PDF blob for download
    const pdfContent = `CV for ${application.applicantName}\n\nJob Title: ${application.jobTitle}\nCompany: ${application.company}\nEmail: ${application.email}\nPhone: ${application.phone}\nLocation: ${application.location}`;
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${application.applicantName.replace(/\s+/g, "_")}_CV.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePortfolioClick = () => {
    window.open(application.portfolioUrl, "_blank", "noopener,noreferrer");
  };

  const handleLinkedInClick = () => {
    window.open(application.linkedinUrl, "_blank", "noopener,noreferrer");
  };

  const handleSaveChanges = () => {
    updateNoteMutation.mutate({
      applicationId: Number(applicationId),
      note: internalNote,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading application details...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Application not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button and Header */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {application.applicantName}
        </h1>
        <p className="text-gray-600 text-2xl font-medium">
          Application for {application.jobTitle} Required
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              Personal Details
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  Email: {application.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  Phone: {application.phone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  Location: {application.location}
                </span>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              Professional Information
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 cursor-pointer"
              >
                <DownloadIcon className="w-4 h-4" />
                <span>Download CV</span>
              </button>
              <button
                onClick={handlePortfolioClick}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Portfolio</span>
              </button>
              <button
                onClick={handleLinkedInClick}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 cursor-pointer"
              >
                <LinkIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </button>
            </div>
          </div>

          {/* Application Answers */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h2 className="text-3xl font-medium text-gray-900 mb-6">
              Application Answers
            </h2>
            <div className="space-y-6">
              {application.applicationAnswers.map((qa, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900 mb-2">
                    {qa.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{qa.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Status Section */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Status</h2>
            <div className="mb-4 flex justify-between">
              <p className="text-sm text-gray-600 mb-2">Current Status</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  status,
                )}`}
              >
                {status}
              </span>
            </div>
            <div className="border-t border-gray-400 my-4" />
            <div className="relative">
              <p className="text-sm text-gray-600 mb-2">Update Status</p>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                >
                  <span>{status}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showStatusDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {statusOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleStatusSelect(option)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Job Details
            </h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-900 font-medium">
                {application.jobTitle}
              </p>
              <p className="text-gray-600">{application.company}</p>
              <div className="border-t border-gray-400 my-4" />

              <p className="text-gray-600">
                Applied on {application.appliedDate}
              </p>
            </div>
          </div>

          {/* Internal Note */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Internal Note
            </h2>
            <textarea
              key={applicationId}
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              placeholder="Add notes about this Candidate..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows="4"
            />
            <p className="text-xs text-gray-500 mt-2">
              Applied on {application.appliedDate}
            </p>
            <button
              onClick={handleSaveChanges}
              type="button"
              disabled={updateNoteMutation.isPending}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {updateNoteMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
