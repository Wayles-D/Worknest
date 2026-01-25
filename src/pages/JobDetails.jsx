import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getJobsById } from "@/api/jobs.js";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const data = await getJobsById(id);
      setJob(data);
    };

    fetchJob();
  }, [id]);

  if (!job) return <p>Loading job...</p>;

  return (
    <>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>{job.company}</p>
      <p>{job.location}</p>
    </>
  );
}
