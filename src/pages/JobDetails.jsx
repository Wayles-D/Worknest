import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchJobById } from "../api/jobs";
import { Send, CheckCircle2 } from "lucide-react";
import officeCollab from "/office_collab.png";

export default function JobDetails() {
  const { id } = useParams();

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
  });

  if (isLoading)
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  if (!job)
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-800">Job not found</p>
      </div>
    );

  return (
    <div className="bg-primary min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Role Overview Card */}
            <div className="bg-white rounded-[32px] p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-6">
                Role Overview
              </h2>
              <p className="text-[#555859] leading-[1.6] text-lg font-medium">
                {job.roleOverview}
              </p>
            </div>

            {/* What You'll Do Card */}
            <div className="bg-white rounded-[32px] p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-6">
                What You'll Do
              </h2>
              <ul className="space-y-4">
                {job.responsibilities?.map((item, index) => (
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
                {job.skillsAndExperience?.map((item, index) => (
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
                {job.benefitsAndPerks?.map((benefit, index) => (
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

                <button className="w-full bg-[#F57450] text-white py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#E06440] transition-all shadow-lg shadow-[#F57450]/20">
                  <Send size={20} />
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
