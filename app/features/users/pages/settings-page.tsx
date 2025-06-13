import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Settings | wemake" },
    { name: "description", content: "계정 설정 페이지" },
  ];
};

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <Form className="flex flex-col w-1/2 gap-5">
            <InputPair
              id="name"
              label="Name"
              name="name"
              description="Your public name"
              type="text"
              placeholder="Jane Doe"
              required
            />
            <SelectPair
              label="Role"
              name="role"
              description="What role do you identify the most with?"
              placeholder="Select a role"
              options={[
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Entrepreneur", value: "entrepreneur" },
                { label: "Investor", value: "investor" },
                { label: "Other", value: "other" },
              ]}
              required
            />
            <InputPair
              id="headline"
              label="Headline"
              name="headline"
              description="An introduction to your profile"
              type="text"
              placeholder="I'm a software engineer..."
              required
              textArea
            />
            <InputPair
              id="bio"
              label="Bio"
              name="bio"
              description="Your public bio. It will be displayed on your profile page."
              type="text"
              placeholder="I'm a software engineer..."
              required
              textArea
            />
            <Button className="w-full">Update Profile</Button>
          </Form>
        </div>
        <aside className="col-span-2 p-6 border rounded-lg shadow-sm">
          <div className="space-y-5">
            <div className="size-40 rounded-full shadow-xl overflow-hidden">
              {avatar ? (
                <img src={avatar} className="object-cover w-full h-full" />
              ) : null}
            </div>
            <Label className="flex flex-col gap-1 items-start">
              Avatar <small>This is your public avatar</small>
            </Label>
            <Input
              type="file"
              className="w-1/2"
              onChange={onChange}
              required
              name="avatar"
            />
            <div className="flex flex-col text-xs">
              <span className="text-muted-foreground">
                Recommended size : 128x128px
              </span>
              <span className="text-muted-foreground">
                Allowed formats : PNG, JPEG
              </span>
              <span className="text-muted-foreground">Max file size : 1MB</span>
            </div>
            <Button className="w-full">Update Avatar</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
