import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/jobs-page";
import { JobCard } from "../components/job-card";
import { Button } from "~/common/components/ui/button";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constants";
import { data, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { getJobs } from "../queries";
import { z } from "zod";

const searchParamsSchema = z.object({
  type: z
    .enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]])
    .optional(),
  location: z
    .enum(
      LOCATION_TYPES.map((location) => location.value) as [string, ...string[]]
    )
    .optional(),
  salary: z.enum(SALARY_RANGE).optional(),
});

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Jobs | WeMake" },
    { name: "description", content: "Find the best jobs at wemake" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "INVALID_SEARCH_PARAMS",
        message: "Invalid search params",
      },
      {
        status: 400,
      }
    );
  }

  const jobs = await getJobs({
    limit: 7,
    type: parsedData?.type as (typeof JOB_TYPES)[number]["value"],
    location: parsedData?.location as (typeof LOCATION_TYPES)[number]["value"],
    salary: parsedData?.salary,
  });
  return { jobs };
};

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterClick = (key: string, value: string) => {
    if (value === searchParams.get(key)) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };
  return (
    <div className="space-y-20">
      <Hero title="Jobs" subtitle="Companies looking for makers" />
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
        {loaderData.jobs.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5 h-full">
            <div className="flex flex-col items-center justify-center h-full col-span-full">
              <h1 className="text-2xl font-bold">No jobs found</h1>
              <p className="text-muted-foreground">
                We couldn't find any jobs that match your search.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5">
            {loaderData.jobs.map((job) => (
              <JobCard
                id={job.job_id}
                company={job.company_name}
                companyLocation={job.company_location}
                companyLogo={job.company_logo}
                createdAt={job.created_at}
                overview={job.overview}
                jobType={job.job_type}
                locationType={job.location_type}
                salaryRange={job.salary_range}
                key={`jobsPageCardId-${job.job_id}`}
              />
            ))}
          </div>
        )}

        <div className="xl:col-span-2 flex flex-col gap-10 sticky top-20">
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type) => (
                <Button
                  className={cn(
                    searchParams.get("type") === type.value &&
                      "bg-primary text-primary-foreground",
                    "hover:bg-primary/20"
                  )}
                  variant="outline"
                  onClick={() => onFilterClick("type", type.value)}
                  key={type.value}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">
              Location
            </h4>
            <div className="flex flex-wrap gap-2">
              {LOCATION_TYPES.map((location) => (
                <Button
                  className={cn(
                    searchParams.get("location") === location.value &&
                      "bg-primary text-primary-foreground",
                    "hover:bg-primary/20"
                  )}
                  variant="outline"
                  onClick={() => onFilterClick("location", location.value)}
                  key={location.value}
                >
                  {location.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">
              Salary Range
            </h4>
            <div className="flex flex-wrap gap-2">
              {SALARY_RANGE.map((range) => (
                <Button
                  className={cn(
                    searchParams.get("salary") === range &&
                      "bg-primary text-primary-foreground",
                    "hover:bg-primary/20"
                  )}
                  variant="outline"
                  onClick={() => onFilterClick("salary", range)}
                  key={range}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
