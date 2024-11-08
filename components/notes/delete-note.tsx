"use client";
import { Button } from "@/components/ui/button";
import { deleteNote } from "@/app/actions";

export default function DeleteNote({ id }: { id: number }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-4 h-4"
      onClick={async () => {
        await deleteNote(id);
      }}
    >
      X
    </Button>
  );
}
