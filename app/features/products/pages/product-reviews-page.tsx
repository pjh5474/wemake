import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-reviews-page";
import { ReviewCard } from "../components/review-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Reviews | WeMake" },
    { name: "description", content: "Read and write product reviews" },
  ];
};

export default function ProductReviewsPage() {
  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">10 Reviews</h2>
          <DialogTrigger>
            <Button variant="secondary">Write a reivew</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {Array.from({ length: 10 }).map((_, index) => (
            <ReviewCard
              username="username"
              displayName="Jane Doe"
              avatarUrl="https://github.com/shadcn.png"
              rating={5}
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,"
              createdAt="10 days age"
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
