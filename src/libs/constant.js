import { User, FileText, Bookmark,} from "lucide-react";


export const navLink = [
  { name: "Home", path: "/" },
  { name: "Find Job", path: "/jobs" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

export const navAuthLink = [
  { name: "Login", path: "/auth/login", variant: "outline" },
  { name: "Join now", path: "/auth/signup", variant: "primary" },
];

export const profileLinks = [
  { name: "Profile", path: "/dashboard/profile", icon: User },
  { name: "Applications", path: "/dashboard/applications", icon: FileText },
  { name: "Saved Jobs", path: "/dashboard/jobs", icon: Bookmark },
];

export const footerJobs = [
  { name: "Browse Jobs", path: "/jobs" },
  { name: "Job Applications", path: "/dashboard/applications" },
  { name: "Upload Resume", path: "/dashboard/applications" },
  { name: "Job Alerts", path: "/dashboard/DashboardHome" },
]

export const footerCompany = [
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Terms of Service", path: "/terms-of-service" },
  { name: "Privacy Policy", path: "/privacy-policy"},
]
