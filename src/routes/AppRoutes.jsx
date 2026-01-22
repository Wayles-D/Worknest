import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import SuspenseUi from "@/components/SuspenseUi.jsx";

// lazy layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout.jsx"));
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout.jsx"));

// lazy pages
const Jobs = lazy(() => import("@/pages/Jobs.jsx"));
const JobDetails = lazy(() => import("@/pages/JobDetails.jsx"));
const DashboardHome = lazy(() =>
  import("@/pages/dashboard/DashboardHome.jsx")
);
const DashboardJobs = lazy(() =>
  import("@/pages/dashboard/DashboardJobs.jsx")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<SuspenseUi />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SuspenseUi />}>
            <Jobs />
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
            <DashboardJobs />
          </Suspense>
        ),
      },
    ],
  },
]);