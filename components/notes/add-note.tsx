"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addNote } from "@/actions/notes/actions";
import PlusIcon from "@/components/icons/plus";

export default function AddNote() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      className="flex outline-none items-center gap-2"
      ref={ref}
      action={async (formData) => {
        await addNote(formData);
        ref.current?.reset();
      }}
    >
      <Button className="min-w-5 h-5 p-0 rounded-sm">
        <PlusIcon className="w-4 h-4" />
      </Button>
      <Input
        id="thought"
        className="p-0 border-none focus-visible:ring-transparent"
        name="thought"
        placeholder="Add new thought"
        required
      />
    </form>
  );
}