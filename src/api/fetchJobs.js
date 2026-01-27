import { jobList } from "@/data/jobList";

const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

export const fetchJobs = async ({ search, location }) => {
  await new Promise((res) => setTimeout(res, 300));

  return jobList.filter((job) => {
    const matchesSearch = normalize(job.position).includes(normalize(search));

    const matchesLocation = job.location
      .toLowerCase()
      .includes(location.toLowerCase());

    return matchesLocation && matchesSearch;
  });
};
