import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/team-page";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Team Details | wemake" },
    { name: "description", content: "View team details and information" },
  ];
};

export default function TeamPage() {
  return (
    <div className="space-y-20">
      <Hero title="Join lynn's team" />
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 grid grid-cols-4 gap-5">
          {[
            {
              title: "Product Name",
              value: "Doggy Social",
            },
            {
              title: "Stage",
              value: "MVP",
            },
            {
              title: "Team size",
              value: "10",
            },
            {
              title: "Available Equity",
              value: "50",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <CardContent className="p-0 font-bold text-2xl">
                  <p>{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Looking for
              </CardTitle>
              <CardContent className="p-0 font-bold text-2xl">
                <ul className="text-lg list-disc list-inside">
                  {[
                    "React Developer",
                    "Backend Developer",
                    "Product Manager",
                    "UI/UX Designer",
                  ].map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Idea Description
              </CardTitle>
              <CardContent className="p-0 font-medium text-xl">
                <p>
                  We are building a social media platform for dogs. We are
                  looking for a React Developer who is proficient in TypeScript
                  and has experience with React Native.
                </p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg shadow-sm p-6">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarImage src="https://github.com/inthetiger.png" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">Lynn</h4>
              <Badge variant="secondary">Entrepreneur</Badge>
            </div>
          </div>
          <Form className="space-y-5">
            <InputPair
              id="introduction"
              label="Intoduce yourself"
              name="introduction"
              description="Tell us about yourself"
              type="text"
              placeholder="i.e I'm a React Developer with 3 years of experience."
              required
              textArea
            />
            <Button type="submit" className="w-full">
              Get in touch
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}
