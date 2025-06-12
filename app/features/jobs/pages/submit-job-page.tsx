import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-job-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constants";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Job | WeMake" },
    { name: "description", content: "Submit a new job posting" },
  ];
};

export default function SubmitJobPage() {
  return (
    <div>
      <Hero
        title="Post a Job"
        subtitle="Reach out to the best developers in the world"
      />
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto">
        <div className="grid grid-cols-3 w-full gap-10">
          <InputPair
            id="position"
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            placeholder="i.e Senior React Developer"
            required
          />
          <InputPair
            id="overview"
            label="Overview"
            description="(400 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            placeholder="i.e We are looking for a Senior React Developer with 3+ years of experience in React, Node.js, and MongoDB."
            required
            textArea
          />
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="(400 characters max, comma separated)"
            name="responsibilities"
            maxLength={400}
            type="text"
            placeholder="i.e Implement new features, troubleshoot and debug applications, optimize applications for maximum speed and scalability."
            required
            textArea
          />
          <InputPair
            id="qualifications"
            label="Qualifications"
            description="(400 characters max, comma separated)"
            name="qualifications"
            maxLength={400}
            type="text"
            placeholder="i.e Bachelor's degree in Computer Science, 3+ years of experience in React, Node.js, and MongoDB."
            required
            textArea
          />
          <InputPair
            id="benefits"
            label="Benefits"
            description="(400 characters max, comma separated)"
            name="benefits"
            maxLength={400}
            type="text"
            placeholder="i.e Health insurance, dental insurance, vision insurance, 401(k) plan."
            required
            textArea
          />
          <InputPair
            id="skills"
            label="Skills"
            description="(400 characters max, comma separated)"
            name="skills"
            maxLength={400}
            type="text"
            placeholder="i.e React, Node.js, MongoDB, TypeScript."
            required
            textArea
          />
          <InputPair
            id="companyName"
            label="Company Name"
            description="(40 characters max)"
            name="companyName"
            maxLength={40}
            type="text"
            placeholder="i.e Meta Inc."
            required
          />
          <InputPair
            id="companyLogoUrl"
            label="Company Logo URL"
            description="(40 characters max)"
            name="companyLogoUrl"
            type="url"
            placeholder="i.e https://github.com/facebook.png"
            required
          />
          <InputPair
            id="companyLocation"
            label="Company Location"
            description="(40 characters max)"
            name="companyLocation"
            maxLength={40}
            type="text"
            placeholder="i.e San Francisco, CA"
            required
          />
          <InputPair
            id="applyUrl"
            label="Apply URL"
            description="(40 characters max)"
            name="applyUrl"
            maxLength={40}
            type="url"
            placeholder="i.e https://www.linkedin.com/jobs/view/3959291991"
            required
          />
          <SelectPair
            label="Job Type"
            description="Select the type of job"
            name="jobType"
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
            placeholder="Select the type of job"
            required
          />
          <SelectPair
            label="Job Location"
            description="Select the location of the job"
            name="jobLocation"
            options={LOCATION_TYPES.map((location) => ({
              label: location.label,
              value: location.value,
            }))}
            placeholder="Select the location of the job"
            required
          />
          <SelectPair
            label="Salary Range"
            description="Select the salary range of the job"
            name="salaryRange"
            options={SALARY_RANGE.map((salary) => ({
              label: salary,
              value: salary,
            }))}
            placeholder="Select the salary range of the job"
            required
          />
        </div>
        <Button type="submit" className="w-full max-w-sm">
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
