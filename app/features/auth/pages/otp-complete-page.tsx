import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";

export default function OtpCompletePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Confirm OTP</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 4-digit code sent to your email.
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
          <InputPair
            id="otp"
            label="OTP"
            name="otp"
            placeholder="i.e 1234"
            description="Enter the 4-digit code sent to your email"
            type="number"
            required
          />
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
}
