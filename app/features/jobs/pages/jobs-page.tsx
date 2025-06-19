import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/jobs-page";
import { JobCard } from "../components/job-card";
import { Button } from "~/common/components/ui/button";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constants";
import { useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { getJobs } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Jobs | WeMake" },
    { name: "description", content: "Find the best jobs at wemake" },
  ];
};

export const loader = async () => {
  const jobs = await getJobs({
    limit: 7,
  });
  return { jobs };
};

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };
  return (
    <div className="space-y-20">
      <Hero title="Jobs" subtitle="Companies looking for makers" />
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
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
        <div className="xl:col-span-2 flex flex-col gap-10 sticky top-20">
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type) => (
                <Button
                  className={cn(
                    searchParams.get("type") === type.value &&
                      "bg-primary text-primary-foreground"
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
                      "bg-primary text-primary-foreground"
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
                    searchParams.get("salary") === range.replace(/\s/g, "") &&
                      "bg-primary text-primary-foreground"
                  )}
                  variant="outline"
                  onClick={() =>
                    onFilterClick("salary", range.replace(/\s/g, ""))
                  }
                  key={range.replace(/\s/g, "")}
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
