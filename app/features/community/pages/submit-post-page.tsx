import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-post-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Post | wemake" },
    {
      name: "description",
      content: "Submit a post to the wemake community",
    },
  ];
};

export default function SubmitPostPage() {
  return (
    <div className="space-y-20">
      <Hero
        title="Create Discussion"
        subtitle="Ask questions, share ideas, and connect with other members of the wemake community."
      />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto">
        <InputPair
          id="title"
          label="Title"
          name="title"
          description="(40 charactoer or less)"
          placeholder="i.e How to build a SaaS product?"
          required
        />
        <SelectPair
          label="Topic"
          name="topic"
          description="Select a topic"
          placeholder="i.e Productivity"
          required
          options={[
            {
              label: "Productivity",
              value: "productivity",
            },
            {
              label: "Design",
              value: "design",
            },
            {
              label: "Programming",
              value: "programming",
            },
            {
              label: "Marketing",
              value: "marketing",
            },
          ]}
        />
        <InputPair
          id="content"
          label="Content"
          name="content"
          description="(1000 characters or less)"
          placeholder="i.e I'm looking for a developer to help me build a SaaS product."
          required
          textArea
        />
        <Button type="submit" className="mx-auto">
          Create Discussion
        </Button>
      </Form>
    </div>
  );
}
