import type { Route } from "./+types/job-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Job Details | WeMake" },
    { name: "description", content: "View job details" },
  ];
};

export default function JobPage() {
  return (
    <div>
      <h1>Job Details</h1>
    </div>
  );
} 