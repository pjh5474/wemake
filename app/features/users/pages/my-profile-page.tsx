import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Profile | wemake" },
    { name: "description", content: "내 프로필 페이지" },
  ];
};

export function loader() {
  //find user using the cookies
  return redirect("/users/nico");
}
