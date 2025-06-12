import type { Route } from "./+types/submit-job-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Job | WeMake" },
    { name: "description", content: "Submit a new job posting" },
  ];
};

export default function SubmitJobPage() {
  return (
    <div>
      <h1>Submit Job</h1>
    </div>
  );
} 