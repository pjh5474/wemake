import { supabaseClient } from "~/supa-client";

export const getJobs = async ({ limit }: { limit: number }) => {
  const { data, error } = await supabaseClient
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
