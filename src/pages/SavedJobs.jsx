import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building2, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MySavedJobs() {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data - replace with your backend API call
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const sampleJobs = [
          {
            id: 1,
            title: 'UI/UX Designer',
            company: 'Monieponit',
            date: 'Jan 17, 2026',
            companyIcon: 'https://res.cloudinary.com/dqqectes0/image/upload/v1769679917/moniepoint_img_bhjnii.png',
            iconBg: ''
          },
          {
            id: 2,
            title: 'Lead Product Designer',
            company: 'Palmpay',
            date: 'Jan 17, 2026',
            companyIcon: 'https://res.cloudinary.com/dqqectes0/image/upload/v1769679918/palmpay_img_uchoef.png',
            iconBg: ''
          },
          {
            id: 3,
            title: 'Product Designer',
            company: 'Monieponit',
            date: 'Jan 17, 2026',
            companyIcon: 'https://res.cloudinary.com/dqqectes0/image/upload/v1769679917/moniepoint_img_bhjnii.png',
            iconBg: ''
          },
          {
            id: 4,
            title: 'Senior Product Designer',
            company: 'Monieponit',
            date: 'Jan 17, 2026',
            companyIcon: 'https://res.cloudinary.com/dqqectes0/image/upload/v1769679746/image_29_v05lhv.png',
            iconBg: ''
          }
        ];

        setSavedJobs(sampleJobs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleApplyNow = (jobId) => {
    navigate(`/apply/${jobId}`);
    console.log('Applying for job:', jobId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0EEEE] flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0EEEE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4 sm:mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">My saved Jobs</h1>
            <p className="text-sm text-gray-500">You have saved four jobs</p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-3 sm:space-y-4">
          {savedJobs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 sm:p-12 text-center">
              <p className="text-gray-500">No saved jobs found</p>
            </div>
          ) : (
            savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
                    {/* Company Icon */}
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100"
                      style={{ backgroundColor: job.iconBg || '#f3f4f6' }}
                    >
                      <img
                        src={job.companyIcon}
                        alt={job.company}
                        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                      />
                    </div>

                    {/* Job Info */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 truncate">
                        {job.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Building2 size={12} className="text-gray-400 sm:w-[14px] sm:h-[14px] flex-shrink-0" />
                          <span className="truncate">{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-gray-400 sm:w-[14px] sm:h-[14px] flex-shrink-0" />
                          <span className="whitespace-nowrap">{job.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Apply Now Button */}
                  <button
                    onClick={() => handleApplyNow(job.id)}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-[#FF5722] text-white text-sm cursor-pointer font-semibold rounded-lg hover:bg-[#F4511E] active:scale-95 transition-all duration-200 whitespace-nowrap"
                  >
                    Apply now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}