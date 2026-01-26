import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchJobById } from "../api/jobs";

export default function JobDetails() {
  const { id } = useParams();

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
  });

  if (isLoading) return <p>Loading job...</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <>
    <div>
      <h1>{job.title}</h1>
      <p>{job.company}</p>
    </div>

    <div>
      <p>{job.description}</p>
    </div>
    </>
  );
}
