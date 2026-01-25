import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getJobs } from "@/api/jobs.js";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  return (
    <>
      <h1>Jobs</h1>
      {jobs.map(job => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <Link to={`/jobs/${job.id}`}>View Details</Link>
        </div>
      ))}
    </>
  );
}
