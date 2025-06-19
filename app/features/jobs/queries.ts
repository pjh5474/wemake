import { supabaseClient } from "~/supa-client";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "./constants";

export const getJobs = async ({
  limit,
  type,
  location,
  salary,
}: {
  limit: number;
  type?: (typeof JOB_TYPES)[number]["value"];
  location?: (typeof LOCATION_TYPES)[number]["value"];
  salary?: (typeof SALARY_RANGE)[number];
}) => {
  const baseQuery = supabaseClient
    .from("jobs")
    .select(
      `
        job_id,
        position,
        overview,
        company_name,
        company_logo,
        company_location,
        location_type,
        job_type,
        salary_range,
        created_at
        `
    )
    .limit(limit);

  if (type) {
    baseQuery.eq("job_type", type);
  }

  if (location) {
    baseQuery.eq("location_type", location);
  }

  if (salary) {
    baseQuery.eq("salary_range", salary);
  }

  const { data, error } = await baseQuery;
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getJobById = async ({ jobId }: { jobId: number }) => {
  const { data, error } = await supabaseClient
    .from("jobs")
    .select("*")
    .eq("job_id", jobId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
