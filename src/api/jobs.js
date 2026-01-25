import { jobs } from "@/data/jobs"; // adjust path if needed

export const getJobs = async () => {
  return jobs;
};

export const getJobsById = async (id) => {
  return jobs.find(job => job.id === id);
};
