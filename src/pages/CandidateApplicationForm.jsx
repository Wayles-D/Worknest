import React, { useState } from 'react';
import { Upload, Link as LinkIcon, X } from 'lucide-react';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: '',
    cvFile: null,
    portfolioUrl: '',
    linkedinUrl: '',
    whyInterested: '',
    technicalAchievement: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Show toast notification
  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'cv') {
        setFormData(prev => ({ 
          ...prev, 
          cvFile: file
        }));
      }
    }
  };

  const removeFile = (type) => {
    if (type === 'cv') {
      setFormData(prev => ({ ...prev, cvFile: null }));
    }
  };

  const removeUrl = (type) => {
    if (type === 'portfolio') {
      setFormData(prev => ({ ...prev, portfolioUrl: '' }));
    } else if (type === 'linkedin') {
      setFormData(prev => ({ ...prev, linkedinUrl: '' }));
    }
  };

  const handleAddUrl = (type) => {
    const url = prompt(`Enter your ${type === 'portfolio' ? 'Portfolio' : 'LinkedIn'} URL:`);
    if (url) {
      if (type === 'portfolio') {
        setFormData(prev => ({ ...prev, portfolioUrl: url }));
      } else if (type === 'linkedin') {
        setFormData(prev => ({ ...prev, linkedinUrl: url }));
      }
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  // Validate form before submission
  const validateForm = () => {
    if (!formData.email.trim()) {
      showToast('Please enter your email address');
      return false;
    }
    if (!formData.phone.trim()) {
      showToast('Please enter your phone number');
      return false;
    }
    if (!formData.location.trim()) {
      showToast('Please enter your location');
      return false;
    }
    if (!formData.cvFile) {
      showToast('Please upload your CV');
      return false;
    }
    if (!formData.portfolioUrl.trim()) {
      showToast('Please add your portfolio URL');
      return false;
    }
    if (!formData.linkedinUrl.trim()) {
      showToast('Please add your LinkedIn URL');
      return false;
    }
    if (!formData.whyInterested.trim()) {
      showToast('Please answer why you are interested in this role');
      return false;
    }
    if (!formData.technicalAchievement.trim()) {
      showToast('Please describe your biggest technical achievement');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Prepare form data for backend
    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('cv', formData.cvFile);
    formDataToSend.append('portfolioUrl', formData.portfolioUrl);
    formDataToSend.append('linkedinUrl', formData.linkedinUrl);
    formDataToSend.append('whyInterested', formData.whyInterested);
    formDataToSend.append('technicalAchievement', formData.technicalAchievement);

    try {
      console.log('Form submitted:', formData);
      // Replace with your actual backend call
      // const response = await fetch('/api/applications', { 
      //   method: 'POST', 
      //   body: formDataToSend 
      // });
      // if (!response.ok) throw new Error('Submission failed');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('Application submitted successfully!', 'success');
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      showToast('Failed to submit application. Please try again.');
    }
  };

  const handleViewApplications = () => {
    window.location.href = '/dashboard/my-applications';
  };

  return (
    <div className="min-h-screen bg-[#F0EEEE] py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top duration-300">
          <div className={`px-6 py-4 rounded-lg shadow-lg ${
            toast.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            <div className="flex items-center gap-3">
              {toast.type === 'success' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
              <p className="font-medium">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Arrow */}
        <button 
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-4"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Candidate Information Section */}
        <div className='bg-[#F0EEEE]'>
          <h2 className="text-[22px] font-bold leading-[120%] text-black mb-8">
            Candidate Information
          </h2>          
        </div>
        
        <section className="bg-white rounded-xl shadow-sm p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            {/* Phone Field */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="Enter your phone"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              placeholder="Enter your Address"
              required
            />
          </div>
        </section>

        {/* Professional Information Section */}
        <div className='bg-[#F0EEEE]'>
          <h2 className="text-[22px] font-bold leading-[120%] text-black mb-8">
            Professional Information
          </h2>          
        </div>
        
        <section className="bg-white rounded-xl shadow-sm p-8 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Upload CV */}
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'cv')}
                  className="hidden"
                />
                <Upload className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">
                  Upload CV <span className="text-red-500">*</span>
                </span>
              </label>
              {formData.cvFile && (
                <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="flex-1 text-xs font-medium text-blue-900 truncate">
                    {formData.cvFile.name}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => removeFile('cv')}
                    className="flex-shrink-0 p-1 text-gray-500 hover:bg-gray-200 rounded transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Portfolio */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleAddUrl('portfolio')}
                className="flex items-center gap-3 px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all text-left"
              >
                <LinkIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">
                  Portfolio <span className="text-red-500">*</span>
                </span>
              </button>
              {formData.portfolioUrl && (
                <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="flex-1 text-xs font-medium text-blue-900 truncate">
                    {formData.portfolioUrl}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => removeUrl('portfolio')}
                    className="flex-shrink-0 p-1 text-gray-500 hover:bg-gray-200 rounded transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleAddUrl('linkedin')}
                className="flex items-center gap-3 px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all text-left"
              >
                <LinkIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">
                  LinkedIn <span className="text-red-500">*</span>
                </span>
              </button>
              {formData.linkedinUrl && (
                <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="flex-1 text-xs font-medium text-blue-900 truncate">
                    {formData.linkedinUrl}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => removeUrl('linkedin')}
                    className="flex-shrink-0 p-1 text-gray-500 hover:bg-gray-200 rounded transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Application Question Section */}
        <div className='bg-[#F0EEEE]'>
          <h2 className="text-[22px] font-bold leading-[120%] text-black mb-8">
            Application Question
          </h2>          
        </div>
        
        <section className="bg-white rounded-xl shadow-sm p-8 sm:p-10">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Why are you interested in this role <span className="text-red-500">*</span>
              </label>
              <textarea
                name="whyInterested"
                value={formData.whyInterested}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y min-h-[120px]"
                placeholder="Enter your answer here..."
                rows="4"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                What is your biggest technical achievement <span className="text-red-500">*</span>
              </label>
              <textarea
                name="technicalAchievement"
                value={formData.technicalAchievement}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y min-h-[120px]"
                placeholder="Enter your answer here..."
                rows="4"
                required
              />
            </div>
          </div>
        </section>

        {/* Submit Button Section */}
        <div className="flex flex-col items-center gap-4">
          {!isSubmitted ? (
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full max-w-md px-8 py-4 bg-gradient-to-r from-[#ff5722] to-[#f4511e] text-white text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-[#f4511e] hover:to-[#e64a19] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          ) : (
            <div className="w-full max-w-md space-y-4 animate-in fade-in duration-500">
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M9 16L14 21L23 11" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Your application has been successfully submitted. You'll hear from us soon.
                </p>
              </div>
              
              <button 
                type="button"
                onClick={handleViewApplications}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#ff5722] to-[#f4511e] text-white text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-[#f4511e] hover:to-[#e64a19] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                View My Applications
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}