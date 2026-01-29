import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';

export default function MyApplications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Status');

  // Sample applications data - replace with your backend data
  const applications = [
    {
      id: 1,
      title: 'UI/UX Designer',
      company: 'Monieponit',
      companyIcon: 'https://res.cloudinary.com/dqqectes0/image/upload/v1769679917/moniepoint_img_bhjnii.png',
      iconBg: '',
      date: 'Jan 20, 2026',
      status: 'Interviewing',
      statusColor: 'purple'
    },
    {
      id: 2,
      title: 'Lead Product Designer',
      company: 'Palmpay',
      companyIcon: 'https://res.cloudinary.com/dqqectes0/image/upload/v1769679918/palmpay_img_uchoef.png',
      iconBg: '',
      date: 'Jan 23, 2026',
      status: 'Viewed',
      statusColor: 'orange'
    },
    {
      id: 3,
      title: 'Product Designer',
      company: 'Monieponit',
      companyIcon: 'https://res.cloudinary.com/dqqectes0/image/upload/v1769679917/moniepoint_img_bhjnii.png',
      iconBg: '',
      date: 'Jan 12, 2026',
      status: 'Pending',
      statusColor: 'blue'
    },
    {
      id: 4,
      title: 'Senior Product Designer',
      company: 'Monieponit',
      companyIcon: 'https://res.cloudinary.com/dqqectes0/image/upload/v1769679746/image_29_v05lhv.png',
      iconBg: '',
      date: 'Jan 10, 2026',
      status: 'Rejected',
      statusColor: 'red'
    },
    {
      id: 5,
      title: 'Visual Designer',
      company: 'Palmpay',
      companyIcon: 'https://res.cloudinary.com/dqqectes0/image/upload/v1769679918/palmpay_img_uchoef.png',
      iconBg: '',
      date: 'Jan 14, 2026',
      status: 'Offer',
      statusColor: 'green'
    }
  ];

  const getStatusStyles = (color) => {
    const styles = {
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      green: 'bg-green-50 text-green-700 border-green-200'
    };
    return styles[color] || styles.blue;
  };

  const handleBack = () => {
    window.history.back();
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Status' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">My Applications</h1>
            <p className="text-sm text-gray-500">You have applied for five jobs</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none w-full sm:w-[140px] px-4 py-3 pr-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all"
            >
              <option>Status</option>
              <option>Interviewing</option>
              <option>Viewed</option>
              <option>Pending</option>
              <option>Rejected</option>
              <option>Offer</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-xl p-8 sm:p-12 text-center">
              <p className="text-gray-500">No applications found</p>
            </div>
          ) : (
            filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
                    {/* Company Icon */}
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100"
                      style={{ backgroundColor: app.iconBg || '#f3f4f6' }}
                    >
                      <img
                        src={app.companyIcon}
                        alt={app.company}
                        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                      />
                    </div>

                    {/* Job Info */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors truncate">
                        {app.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="sm:w-[14px] sm:h-[14px] flex-shrink-0">
                            <path
                              d="M7 1.75V7L10.5 8.75"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle
                              cx="7"
                              cy="7"
                              r="5.25"
                              stroke="currentColor"
                              strokeWidth="1.2"
                            />
                          </svg>
                          <span className="truncate">{app.company}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="sm:w-[14px] sm:h-[14px] flex-shrink-0">
                            <rect
                              x="2.33334"
                              y="2.91669"
                              width="9.33333"
                              height="9.33333"
                              rx="1.16667"
                              stroke="currentColor"
                              strokeWidth="1.2"
                            />
                            <path
                              d="M9.33334 1.75V4.08333M4.66667 1.75V4.08333M2.33334 6.41669H11.6667"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="whitespace-nowrap">{app.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold border ${getStatusStyles(
                      app.statusColor
                    )} self-start sm:self-auto whitespace-nowrap`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}