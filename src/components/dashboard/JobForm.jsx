import React, { useState, useEffect } from "react";
import {
  X,
  ArrowLeft,
  Plus,
  Save,
  Send,
  Trash2,
  ChevronDown,
} from "lucide-react";

const JobForm = ({ job, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    jobType: "Full-time",
    location: "",
    seniority: "Mid Level",
    salaryRange: "",
    company: "",
    companyWebsite: "",
    logo: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    questions: [""],
  });

  useEffect(() => {
    if (job) {
      setFormData({
        ...formData,
        ...job,
        responsibilities: job.responsibilities?.join("\n") || "",
        requirements: job.skillsAndExperience?.join("\n") || "", // Map skillsAndExperience to requirements
        benefits: job.benefitsAndPerks?.join("\n") || "", // Map benefitsAndPerks to benefits
        questions: job.questions || [""],
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const addQuestion = () => {
    setFormData((prev) => ({ ...prev, questions: [...prev.questions, ""] }));
  };

  const removeQuestion = (index) => {
    if (formData.questions.length > 1) {
      const newQuestions = formData.questions.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, questions: newQuestions }));
    }
  };

  const handleSubmit = (e, status = "Active") => {
    if (e) e.preventDefault();
    const formattedData = {
      ...formData,
      status,
      responsibilities: formData.responsibilities
        .split("\n")
        .filter((line) => line.trim() !== ""),
      skillsAndExperience: formData.requirements
        .split("\n")
        .filter((line) => line.trim() !== ""),
      benefitsAndPerks: formData.benefits
        .split("\n")
        .filter((line) => line.trim() !== ""),
      questions: formData.questions.filter((q) => q.trim() !== ""),
    };
    onSave(formattedData);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 bg-[var(--color-primary)]">
      {/* Top Navigation */}
      <button
        onClick={onCancel}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A0A0A]">
          {job ? "Edit Job" : "Create Job"}
        </h1>
        <p className="text-gray-500 text-sm">
          {job ? "Update existing job posting" : "Create a new job posting"}
        </p>
      </div>

      <form className="space-y-8">
        {/* Section 1: Job Details */}
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0A0A0A]">Job Details</h2>
            <p className="text-gray-500 text-xs">
              Basic information about the position
            </p>
          </div>

          <div className="space-y-6">
            {/* Row 1: Job Title & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-4 py-2.5 bg-[var(--color-primary)] border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. New York, NY or Remote"
                  className="w-full px-4 py-2.5 bg-[var(--color-primary)] border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm"
                  required
                />
              </div>
            </div>

            {/* Row 2: Job Type, Experience Level, Salary Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Job Type *
                </label>
                <div className="relative">
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full appearance-none px-4 py-2.5 bg-[var(--color-primary)] border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm cursor-pointer"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Experience Level *
                </label>
                <div className="relative">
                  <select
                    name="seniority"
                    value={formData.seniority}
                    onChange={handleChange}
                    className="w-full appearance-none px-4 py-2.5 bg-[var(--color-primary)] border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm cursor-pointer"
                  >
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior</option>
                    <option>Lead / Manager</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Salary Range (optional)
                </label>
                <input
                  type="text"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  placeholder="e.g. $80,000 - $120,000"
                  className="w-full px-4 py-2.5 bg-primary  border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Company Information */}
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0A0A0A]">
              Company Information
            </h2>
            <p className="text-gray-500 text-xs">
              Details about the hiring company
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. TechCorp Inc."
                className="w-full px-4 py-2.5 bg-primary border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Company Website (optional)
              </label>
              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full px-4 py-2.5 bg-primary border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm"
              />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Company Logo URL (optional)
              </label>
              <input
                type="url"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2.5 bg-primary border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Job Content */}
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0A0A0A]">Job Content</h2>
            <p className="text-gray-500 text-xs">
              Detailed job description and requirements
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Job Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, what the candidate will be doing..."
                className="w-full px-4 py-3 bg-[var(--color-primary)] border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm h-32 resize-none"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Responsibilities *
              </label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="List the key responsibilities..."
                className="w-full px-4 py-3 bg-[var(--color-primary)] border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm h-32 resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Requirements *
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List the required skills and qualifications..."
                className="w-full px-4 py-3 bg-[var(--color-primary)] border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm h-32 resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Benefits (optional)
              </label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="List the benefits and perks..."
                className="w-full px-4 py-3 bg-[var(--color-primary)] border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm h-32 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Application Questions */}
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0A0A0A]">
              Application Questions
            </h2>
            <p className="text-gray-500 text-xs">
              Add custom questions for applicants
            </p>
          </div>

          <div className="space-y-4">
            {formData.questions.map((question, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder={`Question ${index + 1}`}
                  className="flex-1 px-4 py-2.5 bg-[var(--color-primary)] border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-200 transition-all text-sm"
                />
                {formData.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="p-2.5 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-[var(--color-primary)] rounded-lg border border-gray-200 transition-all"
            >
              <Plus size={16} />
              Add Question
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, "Draft")}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white hover:text-black/90 bg-black/90 border border-gray-200 rounded-lg hover:bg-white transition-all"
          >
            <Save size={18} />
            Save as Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, "Active")}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[var(--sidebar-active-color)] rounded-lg hover:bg-black/90 transition-all shadow-lg shadow-black/5"
          >
            <Send size={18} />
            Publish Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
