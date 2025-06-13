import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { CheckIcon, EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface NotificationCardProps {
  avatarUrl: string;
  avatarFallback: string;
  name: string;
  message: string;
  createdAt: string;
  seen: boolean;
}

export function NotificationCard({
  avatarUrl,
  avatarFallback,
  name,
  message,
  createdAt,
  seen,
}: NotificationCardProps) {
  return (
    <Card
      className={cn("min-w-[450px]", seen ? "bg-muted" : "bg-yellow-500/60")}
    >
      <CardHeader className="flex flex-row gap-5 items-start">
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>{name}</span>
            <span>{message}</span>
          </CardTitle>
          <small className="text-muted-foreground text-sm">{createdAt}</small>
        </div>
      </CardHeader>

      <CardFooter className="flex justify-end">
        {seen ? (
          <Button variant="outline" size="icon">
            <CheckIcon className="size-4" />
          </Button>
        ) : (
          <Button variant="outline" size="icon">
            <EyeIcon className="size-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
