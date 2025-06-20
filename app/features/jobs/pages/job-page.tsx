import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/job-page";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { z } from "zod";
import { getJobById } from "../queries";
import { DateTime } from "luxon";

const paramSchema = z.object({
  jobId: z.coerce.string().transform((val) => Number(val)),
});

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Job Details | WeMake" },
    { name: "description", content: "View job details" },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedParams } = paramSchema.safeParse(params);
  if (!success) {
    throw new Error("Invalid job ID");
  }
  const job = await getJobById({ jobId: parsedParams.jobId });
  return { job };
};

export default function JobPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 lg:gap-20 items-start -mt-20">
        <div className="col-span-1 lg:col-span-4 space-y-10 ">
          <div>
            <div className="size-40 bg-white rounded-full overflow-hidden relative left-10">
              <img src={loaderData.job.company_logo} className="object-cover" />
            </div>
            <h1 className="text-4xl font-bold">{loaderData.job.position}</h1>
            <h4 className="text-lg text-muted-foreground">
              {loaderData.job.company_name}
            </h4>
          </div>
          <div className="flex gap-2 capitalize">
            <Badge variant={"secondary"}>{loaderData.job.location_type}</Badge>
            <Badge variant={"secondary"}>{loaderData.job.salary_range}</Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">{loaderData.job.overview}</p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.qualifications
                .split(",")
                .map((qualifications) => (
                  <li key={`${loaderData.job.job_id}-${qualifications}`}>
                    {qualifications}
                  </li>
                ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.benefits.split(",").map((benefits) => (
                <li key={`${loaderData.job.job_id}-${benefits}`}>{benefits}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.skills.split(",").map((skills) => (
                <li key={`${loaderData.job.job_id}-${skills}`}>{skills}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.benefits.split(",").map((benefits) => (
                <li key={`${loaderData.job.job_id}-${benefits}`}>{benefits}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2 lg:sticky lg:top-20 border rounded-lg mt-10 lg:mt-32 space-y-5 p-6 ">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Avg. Salary</span>
            <span className="text-2xl font-medium">
              {loaderData.job.salary_range}
            </span>
          </div>
          <div className="flex flex-col capitalize">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-2xl font-medium">
              {loaderData.job.location_type}
            </span>
          </div>
          <div className="flex flex-col capitalize">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-2xl font-medium">
              {loaderData.job.job_type}
            </span>
          </div>
          <div className="flex">
            <span className="text-sm text-muted-foreground">
              Posted {DateTime.fromISO(loaderData.job.created_at).toRelative()}
            </span>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">{123} views</span>
          </div>
          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  );
}
