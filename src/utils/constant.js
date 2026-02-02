import dayjs from "dayjs";

export const slideShow = [
  {
    id: 1,
    src: "/out.jpg",
    caption:
      "“WorkNest has completely transformed how we manage employer and employee records. What used to take hours now happens in minutes.”",
  },
  {
    id: 2,
    src: "/in.jpg",
    caption:
      "“WorkNest is designed to create opportunities and a sane workspace for all tech lifestyle.”",
  },
];

export const headers = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const dummyApplications = [
  {
    id: 1,
    applicantName: "John Smith",
    jobTitle: "UI/UX Designer",
    company: "Teco Inc",
    appliedDate: "1/17/2026",
    status: "Submitted",
    email: "John.smith@email.com",
    phone: "+234 9067275765",
    location: "San Francisco, CA",
    cvUrl: "/sample-cv.pdf", // You can replace this with actual CV file path
    portfolioUrl: "https://johnsmithportfolio.com",
    linkedinUrl: "https://linkedin.com/in/johnsmith",
    applicationAnswers: [
      {
        question: "Why are you interested in this role?",
        answer:
          "i'm passionate about building great user experience and have been following Techcorp's product for years. The opportunity to work on cutting-edge frontend technologies while contributing to a product i believe in is incredibly exciting",
      },
      {
        question: "What is your biggest technical achievement",
        answer:
          "i led the frontend migration of our main application from a legacy jQuery codebase to React, reducing load times by 60% and improving developer productivity significantly. The project was completed ahead of schedule and received positive feedback from both users and stakeholders",
      },
    ],
    internalNote: "",
  },
  {
    id: 2,
    applicantName: "Sarah Johnson",
    jobTitle: "Frontend Developer",
    company: "TechCorp",
    appliedDate: "1/15/2026",
    status: "Interviewing",
    email: "sarah.johnson@email.com",
    phone: "+234 9012345678",
    location: "New York, NY",
    cvUrl: "/sample-cv.pdf",
    portfolioUrl: "https://sarahjohnson.dev",
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    applicationAnswers: [
      {
        question: "Why are you interested in this role?",
        answer:
          "I'm excited about the opportunity to work with modern technologies and contribute to innovative projects. The company culture and growth opportunities align perfectly with my career goals.",
      },
      {
        question: "What is your biggest technical achievement",
        answer:
          "I developed a real-time collaboration feature that increased team productivity by 40% and received recognition from the CTO for innovation.",
      },
    ],
    internalNote: "",
  },
  {
    id: 3,
    applicantName: "Michael Chen",
    jobTitle: "Product Designer",
    company: "Design Studio",
    appliedDate: "1/18/2026",
    status: "Viewed",
    email: "michael.chen@email.com",
    phone: "+234 9076543210",
    location: "Los Angeles, CA",
    cvUrl: "/sample-cv.pdf",
    portfolioUrl: "https://michaelchen.design",
    linkedinUrl: "https://linkedin.com/in/michaelchen",
    applicationAnswers: [
      {
        question: "Why are you interested in this role?",
        answer:
          "The role offers a perfect blend of creative design work and strategic thinking. I'm particularly drawn to the company's user-centered approach.",
      },
      {
        question: "What is your biggest technical achievement",
        answer:
          "I redesigned the entire mobile app interface, resulting in a 50% increase in user engagement and a 30% reduction in support tickets.",
      },
    ],
    internalNote: "",
  },
  {
    id: 4,
    applicantName: "Emily Davis",
    jobTitle: "UX Researcher",
    company: "Innovate Labs",
    appliedDate: "1/16/2026",
    status: "Rejected",
    email: "emily.davis@email.com",
    phone: "+234 9087654321",
    location: "Chicago, IL",
    cvUrl: "/sample-cv.pdf",
    portfolioUrl: "https://emilydavis.ux",
    linkedinUrl: "https://linkedin.com/in/emilydavis",
    applicationAnswers: [
      {
        question: "Why are you interested in this role?",
        answer:
          "I'm passionate about understanding user behavior and translating insights into actionable design improvements.",
      },
      {
        question: "What is your biggest technical achievement",
        answer:
          "I conducted a comprehensive user research study that informed a product pivot, leading to a 200% increase in user retention.",
      },
    ],
    internalNote: "",
  },
  {
    id: 5,
    applicantName: "David Wilson",
    jobTitle: "UI/UX Designer",
    company: "Teco Inc",
    appliedDate: "1/19/2026",
    status: "Offer",
    email: "david.wilson@email.com",
    phone: "+234 9054321098",
    location: "Seattle, WA",
    cvUrl: "/sample-cv.pdf",
    portfolioUrl: "https://davidwilson.design",
    linkedinUrl: "https://linkedin.com/in/davidwilson",
    applicationAnswers: [
      {
        question: "Why are you interested in this role?",
        answer:
          "The opportunity to work on cutting-edge design systems and collaborate with a talented team is exactly what I'm looking for in my next role.",
      },
      {
        question: "What is your biggest technical achievement",
        answer:
          "I built a comprehensive design system from scratch that reduced design-to-development time by 70% and improved design consistency across all products.",
      },
    ],
    internalNote: "",
  },
];

export const statusOptions = [
  "Submitted",
  "Viewed",
  "In Review",
  "Interview",
  "Offer",
  "Rejected",
];

export const getStatusColor = (statusValue) => {
  const colors = {
    Submitted: "bg-orange-100 text-orange-800",
    Interviewing: "bg-blue-100 text-blue-800",
    Viewed: "bg-purple-100 text-purple-800",
    Rejected: "bg-red-100 text-red-800",
    Offer: "bg-green-100 text-green-800",
  };
  return colors[statusValue] || "bg-gray-100 text-gray-800";
};

export const getStatusStyles = (status) => {
  const styles = {
    Submitted: "bg-orange-50 text-orange-700 border-orange-200",
    Interviewing: "bg-blue-50 text-blue-700 border-blue-200",
    "In review": "bg-blue-50 text-blue-700 border-blue-200",
    Shortlisted: "bg-green-50 text-green-700 border-green-200",
    Interview: "bg-blue-50 text-blue-700 border-blue-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
    Offer: "bg-green-50 text-green-700 border-green-200",
    Viewed: "bg-purple-50 text-purple-700 border-purple-200",
  };
  return styles[status] || "bg-gray-50 text-gray-700 border-gray-200";
};

export const applicationColumns = [
  {
    name: "Candidates",
    uid: "applicantName",
  },
  {
    name: "Job Title",
    uid: "jobTitle",
  },
  {
    name: "Applied Date",
    uid: "appliedDate",
  },
  { name: "Status", uid: "status" },
  { name: "Action", uid: "action" },
];

export const formatDate = (item, format = "display") => {
  if (format === "input") {
    return dayjs(item).format("YYYY-MM-DD");
  }
  return dayjs(item).format("DD/MM/YYYY");
};
