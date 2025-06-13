import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-team-page";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Team | wemake" },
    { name: "description", content: "Submit your team to WeMake" },
  ];
};

export default function SubmitTeamPage() {
  return (
    <div className="space-y-20">
      <Hero
        title="Create Team"
        subtitle="Create a team to find a new member."
      />
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto">
        <div className="grid grid-cols-3 w-full gap-10">
          <InputPair
            id="name"
            label="What is the name of your product?"
            name="name"
            description="(20 characters or less)"
            type="text"
            maxLength={20}
            placeholder="i.e wemake"
            required
          />
          <SelectPair
            label="What is the stage of your product?"
            name="stage"
            description="Select the stage of your product"
            placeholder="Select the stage of your product"
            required
            options={[
              { label: "Idea", value: "idea" },
              { label: "Prototype", value: "prototype" },
              { label: "MVP", value: "mvp" },
              { label: "Launched", value: "launched" },
            ]}
          />
          <InputPair
            id="size"
            label="What is the size of your team?"
            name="size"
            description="(1-100)"
            type="number"
            min={1}
            max={100}
            required
          />
          <InputPair
            id="equity"
            label="How much equity are you willing to give?"
            name="equity"
            description="(each)"
            type="number"
            min={1}
            max={100}
            required
          />
          <InputPair
            id="roles"
            label="What roles are you looking for?"
            name="roles"
            description="(comma separated)"
            type="text"
            placeholder="i.e React Developer, Backend Developer, Product Manager"
            required
          />
          <InputPair
            id="description"
            label="What is the description of your product?"
            name="description"
            description="(200 characters or less)"
            type="text"
            maxLength={200}
            placeholder="i.e We are looking for a React Developer who is proficient in TypeScript and has experience with React Native."
            required
            textArea
          />
        </div>
        <Button type="submit" className="w-full max-w-sm">
          Create Team
        </Button>
      </Form>
    </div>
  );
}
