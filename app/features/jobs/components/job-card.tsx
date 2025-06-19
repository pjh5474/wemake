import { DateTime } from "luxon";
import { Link } from "react-router";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

interface JobCardProps {
  id: number;
  company: string;
  companyLogo: string;
  companyLocation: string;
  createdAt: string;
  overview: string;
  jobType: string;
  locationType: string;
  salaryRange: string;
}

export function JobCard({
  id,
  company,
  companyLogo,
  companyLocation,
  createdAt,
  overview,
  jobType,
  locationType,
  salaryRange,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors flex flex-col h-full">
        <CardHeader className="mt-auto h-full">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={companyLogo}
              alt={`${company} logo`}
              className="size-12 rounded-full"
            />
            <div className="space-x-2">
              <span className="text-accent-foreground">{company}</span>
              <span className="text-xs text-muted-foreground">
                {DateTime.fromISO(createdAt).toRelative()}
              </span>
            </div>
          </div>
          <CardTitle className="mt-auto">{overview}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline" className="uppercase">
            {jobType}
          </Badge>
          <Badge variant="outline" className="uppercase">
            {locationType}
          </Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              {salaryRange}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {companyLocation}
            </span>
          </div>
          <Button variant="secondary" size="sm">
            Apply now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
