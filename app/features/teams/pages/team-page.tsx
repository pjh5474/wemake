import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/team-page";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { data, Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import z from "zod";
import { getTeamById } from "../queries";

const paramsSchema = z.object({
  teamId: z.string().transform((val) => parseInt(val)),
});

export const meta: Route.MetaFunction = ({ data }: Route.MetaArgs) => {
  return [
    { title: `${data?.team.product_name} | wemake` },
    { name: "description", content: "View team details and information" },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { teamId } = params;
  const { success, data: parsedData } = paramsSchema.safeParse({
    teamId,
  });
  if (!success) {
    throw data(
      { error_code: "INVALID_SEARCH_PARAMS", message: "Invalid search params" },
      { status: 400 }
    );
  }
  const team = await getTeamById({
    team_id: parsedData.teamId,
  });
  return { team };
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title={`Join ${loaderData.team.team_leader.username}'s team`} />
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-10 xl:gap-40 items-start">
        <div className="col-span-1 xl:col-span-4 grid grid-cols-2 xl:grid-cols-4 gap-5">
          {[
            {
              title: "Product Name",
              value: loaderData.team.product_name,
            },
            {
              title: "Stage",
              value: loaderData.team.product_stage,
            },
            {
              title: "Team size",
              value: loaderData.team.team_size,
            },
            {
              title: "Available Equity",
              value: loaderData.team.equity_split,
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <CardContent className="p-0 font-bold text-2xl capitalize">
                  <p>{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className="col-span-1 xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Looking for
              </CardTitle>
              <CardContent className="p-0 font-bold text-2xl">
                <ul className="text-lg list-disc list-inside capitalize">
                  {loaderData.team.roles.split(",").map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="col-span-1 xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Idea Description
              </CardTitle>
              <CardContent className="p-0 font-medium text-xl">
                <p>{loaderData.team.product_description}</p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className="col-span-1 xl:col-span-2 space-y-5 border rounded-lg shadow-sm p-6">
          <div className="flex gap-5">
            <Avatar className="size-14">
              {loaderData.team.team_leader.avatar && (
                <AvatarImage src={loaderData.team.team_leader.avatar} />
              )}
              <AvatarFallback>
                {loaderData.team.team_leader.username[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">
                {loaderData.team.team_leader.username}
              </h4>
              <Badge variant="secondary">
                {loaderData.team.team_leader.role}
              </Badge>
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
