import { Link } from "react-router";

export default function JobCard({ job }) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition block"
    >
      <span className="inline-block bg-orange-100 text-xs px-3 py-1 rounded-full mb-3">
        {job.jobType}
      </span>

      <h4 className="font-semibold text-lg mb-1">
        {job.title}
      </h4>

      <p className="text-sm mb-2">
        Salary: {job.salaryRange}
      </p>

      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {job.description}
      </p>
      <hr className="my-4 border-gray-200"/>

      <div className="w-fit flex space-x-2">
      <div>
        <img src={job.logo} alt={job.company} className="w-8 h-8"/>
      </div>
      <div>
      <div className="justify-between text-xs text-gray-500">
        <span>{job.company}, {job.location}</span>
      </div>

      <div className="text-xs text-gray-500">
        <span>{job.datePosted}</span>
      </div>
      </div>
      </div>
    </Link>
  );
}
