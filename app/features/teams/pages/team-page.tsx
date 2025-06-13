import type { Route } from "./+types/team-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Team Details | wemake" },
    { name: "description", content: "View team details and information" },
  ];
};

export default function TeamPage() {
  return (
    <div>
      <h1>Team Details</h1>
    </div>
  );
}
