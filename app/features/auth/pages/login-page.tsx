import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <Button variant="ghost" className="absolute right-4 top-8" asChild>
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold">Login to your account</h1>
        <Form className="w-full space-y-4">
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
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
