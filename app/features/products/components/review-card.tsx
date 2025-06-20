import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { StarIcon } from "lucide-react";
import { DateTime } from "luxon";

interface ReviewCardProps {
  username: string;
  displayName: string;
  avatarUrl: string | null;
  rating: number;
  content: string;
  createdAt: string;
}

export function ReviewCard({
  username,
  displayName,
  avatarUrl,
  rating,
  content,
  createdAt,
}: ReviewCardProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{displayName[0]}</AvatarFallback>
          {avatarUrl && <AvatarImage src={avatarUrl} />}
        </Avatar>
        <div>
          <h4 className="text-lg font-bold">{displayName}</h4>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>
      </div>
      <div className="flex text-yellow-400">
        {Array.from({ length: rating }).map((_, index) => (
          <StarIcon className="size-4" key={index} fill="currentColor" />
        ))}
      </div>
      <p className="text-muted-foreground">{content}</p>
      <span className="text-xs text-muted-foreground">
        {DateTime.fromISO(createdAt).toRelative()}
      </span>
    </div>
  );
}
