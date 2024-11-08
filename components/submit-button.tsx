"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";

type SubmitProps = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: SubmitProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
