import { Form, Link } from "react-router";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyProps {
  avatarUrl: string;
  username: string;
  content: string;
  createdAt: string;
  topLevel: boolean;
}

export function Reply({
  avatarUrl,
  username,
  content,
  createdAt,
  topLevel,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying(!replying);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-5 w-2/3">
        <Avatar className="size-14">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex items-center gap-2">
            <Link to={`/users/@${username.toLowerCase()}`}>
              <h4 className="font-medium">{username}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-xs text-muted-foreground">{createdAt}</span>
          </div>
          <p className="text-sm text-muted-foreground">{content}</p>
          <Button variant="ghost" className="self-end" onClick={toggleReplying}>
            <MessageCircleIcon className="size-4" /> Reply
          </Button>
        </div>
      </div>
      {replying && (
        <Form className="flex items-start gap-5 w-3/4">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/apple.png" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-5 w-full items-end">
            <Textarea
              placeholder="Write a reply"
              className="w-full resize-none"
              rows={5}
            />
            <Button type="submit">Reply</Button>
          </div>
        </Form>
      )}
      {topLevel && (
        <div className="pl-20 w-full">
          <Reply
            avatarUrl="https://github.com/microsoft.png"
            username="Nicolas"
            content="I'm using Notion for my daily tasks. It's great for organizing my work and personal life."
            createdAt="12 hours ago"
            topLevel={false}
          />
        </div>
      )}
    </div>
  );
}
