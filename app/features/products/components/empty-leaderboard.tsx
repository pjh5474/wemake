import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";

interface EmptyLeaderboardProps {
  title: string;
  description: string;
  emptyMessage: string;
  emptyDescription: string;
  linkTo?: string;
}

export function EmptyLeaderboard({
  title,
  description,
  emptyMessage,
  emptyDescription,
  linkTo,
}: EmptyLeaderboardProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="mb-10">
        <h2 className="text-3xl font-bold leading-tight tracking-tight">
          {title}
        </h2>
        <p className="text-xl font-light text-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div className="flex flex-col items-center justify-center h-full col-span-full">
          <h1 className="text-2xl font-bold">{emptyMessage}</h1>
          <p className="text-muted-foreground">{emptyDescription}</p>
        </div>
      </div>
      {linkTo && (
        <Button variant="link" asChild className="text-lg self-center">
          <Link to={linkTo}>Explore another products &rarr;</Link>
        </Button>
      )}
    </div>
  );
}
