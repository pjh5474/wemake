import type { InputHTMLAttributes } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function InputPair({
  label,
  description,
  textArea = false,
  ...rest
}: {
  label: string;
  description?: string;
  textArea?: boolean;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  return (
    <div className="space-y-2 flex flex-col items-start">
      <Label className="flex flex-col gap-1 items-start" htmlFor={rest.id}>
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      {textArea ? (
        <Textarea className="resize-none" {...rest} rows={4} />
      ) : (
        <Input {...rest} />
      )}
    </div>
  );
}
