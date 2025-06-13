import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";

export default function OtpStartPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Login to with OTP</h1>
          <p className="text-sm text-muted-foreground">
            We will send you a 4-digit code to log in to your account.
          </p>{" "}
        </div>
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
          <Button type="submit" className="w-full">
            Send OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}
