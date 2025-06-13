import { useParams } from "react-router";
import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Profile | wemake" },
    { name: "description", content: "View user's profile" },
  ];
};

export default function ProfilePage() {
  const { username } = useParams();

  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">
          I'm a product designer and developer. I'm currently working at a
          startup. I like doing product design and development. I'm also
          interested in UI/UX design and development. I'm also interested in AI
          and machine learning.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-muted-foreground">
          I'm a product designer and developer. I'm currently working at a
          startup. I like doing product design and development. I'm also
          interested in UI/UX design and development. I'm also interested in AI
          and machine learning.
        </p>
      </div>
    </div>
  );
}
