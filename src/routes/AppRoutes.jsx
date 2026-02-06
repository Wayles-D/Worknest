import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import SuspenseUi from "@/components/SuspenseUi.jsx";
import ErrorBoundary from "@/components/ErrorBoundary";
import HomePage from "@/pages/HomePage";
// import { PrivateRoutes, PublicRoutes } from "@/routes/ProtectedRoutes";

// lazy layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout.jsx"));
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout.jsx"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout.jsx"));

// lazy pages
const Login = lazy(() => import("@/pages/auth/Login.jsx"));
const AdminLogin = lazy(() => import("@/pages/auth/AdminLogin.jsx"));
const Signup = lazy(() => import("@/pages/auth/Signup.jsx"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword.jsx"));
const Verify = lazy(() => import("@/pages/auth/Verify.jsx"));
const Jobs = lazy(() => import("@/pages/Jobs.jsx"));
const JobDetails = lazy(() => import("@/pages/JobDetails.jsx"));
const AboutUs = lazy(() => import("@/pages/AboutUs.jsx"));
const ContactUs = lazy(() => import("@/pages/ContactUs.jsx"));
const DashboardHome = lazy(() => import("@/pages/dashboard/DashboardHome.jsx"));
const AdminJobs = lazy(() => import("@/pages/dashboard/AdminJobs.jsx"));
const AdminApplications = lazy(
  () => import("@/pages/dashboard/AdminApplications.jsx"),
);
const Profile = lazy(() => import("@/pages/Profile.jsx"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy.jsx"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService.jsx"));
const CandidateApplicationForm = lazy(
  () => import("@/pages/CandidateApplicationForm.jsx"),
);
const MyApplications = lazy(() => import("@/pages/MyApplication.jsx"));
const SavedJobs = lazy(() => import("@/pages/SavedJobs.jsx"));

export default function AppRoutes() {
  const routes = [
    {
      path: "/auth",
      element: (
        <Suspense fallback={<SuspenseUi />}>
          <AuthLayout />
        </Suspense>
      ),
      errorElement: <ErrorBoundary />,

      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify", element: <Verify /> },
        { path: "admin/login", element: <AdminLogin /> },
      ],
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<SuspenseUi />}>
          <MainLayout />
        </Suspense>
      ),
      errorElement: <ErrorBoundary />,

      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "profile",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <Profile />
            </Suspense>
          ),
        },
        {
          path: "jobs",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <Jobs />
            </Suspense>
          ),
        },
        {
          path: "jobs/:id",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <JobDetails />
            </Suspense>
          ),
        },
        {
          path: "apply/:id",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <CandidateApplicationForm />
            </Suspense>
          ),
        },
        {
          path: "/about",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <AboutUs />
            </Suspense>
          ),
        },
        {
          path: "/contact",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <ContactUs />
            </Suspense>
          ),
        },
        {
          path: "/privacy-policy",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <PrivacyPolicy />
            </Suspense>
          ),
        },
        {
          path: "/terms-of-service",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <TermsOfService />
            </Suspense>
          ),
        },
        {
          path: "/my-applications",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <MyApplications />
            </Suspense>
          ),
        },
        {
          path: "/saved-jobs",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <SavedJobs />
            </Suspense>
          ),
        },
      ],
    },

    {
      path: "/admin",
      element: (
        <Suspense fallback={<SuspenseUi />}>
          <DashboardLayout />
        </Suspense>
      ),
      errorElement: <ErrorBoundary />,

      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <DashboardHome />
            </Suspense>
          ),
        },
        {
          path: "jobs",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <AdminJobs />
            </Suspense>
          ),
        },
        {
          path: "applications",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <AdminApplications />
            </Suspense>
          ),
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
