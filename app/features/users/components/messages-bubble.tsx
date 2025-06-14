import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";

interface MessagesBubbleProps {
  content: string;
  avatarUrl?: string;
  avatarFallback?: string;
  isCurrentUser?: boolean;
}

export function MessagesBubble({
  content,
  avatarUrl = "https://github.com/shadcn.png",
  avatarFallback,
  isCurrentUser = false,
}: MessagesBubbleProps) {
  return (
    <div
      className={cn(
        "flex items-end gap-4",
        isCurrentUser && "flex-row-reverse"
      )}
    >
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div
        className={cn({
          "rounded-md p-4 text-sm w-1/4": true,
          "bg-accent rounded-br-none": isCurrentUser,
          "bg-primary/70 text-primary-foreground rounded-bl-none":
            !isCurrentUser,
        })}
      >
        <p>{content}</p>
      </div>
    </div>
  );
}
