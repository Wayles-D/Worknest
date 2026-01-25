import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import SuspenseUi from "@/components/SuspenseUi.jsx";
import ErrorBoundary from "@/components/ErrorBoundary";
import HomePage from "@/pages/HomePage";

// lazy layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout.jsx"));
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout.jsx"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout.jsx"));

// lazy pages
const Login = lazy(() => import("@/pages/auth/Login.jsx"));
const Signup = lazy(() => import("@/pages/auth/Signup.jsx"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword.jsx"));
const Verify = lazy(() => import("@/pages/auth/Verify.jsx"));
const Jobs = lazy(() => import("@/pages/Jobs.jsx"));
const JobDetails = lazy(() => import("@/pages/JobDetails.jsx"));
const DashboardHome = lazy(() => import("@/pages/dashboard/DashboardHome.jsx"));
const DashboardJobs = lazy(() => import("@/pages/dashboard/DashboardJobs.jsx"));

export const router = createBrowserRouter([
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
            <HomePage/>
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
    ],
  },

  {
    path: "/dashboard",
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
        path: "dashboard-jobs",
        element: (
          <Suspense fallback={<SuspenseUi />}>
            <DashboardJobs />
          </Suspense>
        ),
      },
    ],
  },
]);
