import { useState } from "react";
import { Label } from "./ui/label";
import {
  SelectLabel,
  SelectGroup,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";

export default function SelectPair({
  name,
  label,
  description,
  required,
  placeholder,
  options,
}: {
  name: string;
  label: string;
  description: string;
  required: boolean;
  placeholder: string;
  options: { label: string; value: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2 flex flex-col items-start">
      <Label
        className="flex flex-col gap-1 items-start"
        onClick={() => setOpen(true)}
      >
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      <Select
        open={open}
        onOpenChange={setOpen}
        name={name}
        required={required}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
