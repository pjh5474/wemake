import { Form, Link } from "react-router";
import type { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Join | WeMake" }];
};

export default function JoinPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <Button variant="ghost" className="absolute right-4 top-8" asChild>
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4">
          <InputPair
            id="name"
            label="Name"
            name="name"
            placeholder="Enter your name"
            description="Enter your name"
            type="text"
            required
          />
          <InputPair
            id="username"
            label="Username"
            name="username"
            placeholder="i.e wemake"
            description="Enter your username"
            type="text"
            required
          />
          <InputPair
            id="email"
            label="Email"
            name="email"
            placeholder="i.e wemake@exmaple.com"
            description="Enter your email"
            type="email"
            required
          />
          <InputPair
            id="password"
            label="Password"
            name="password"
            placeholder="********"
            description="Enter your password"
            type="password"
            required
          />
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
