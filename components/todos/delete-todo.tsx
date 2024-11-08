"use client";
import { Button } from "@/components/ui/button";
import { deleteTodo } from "@/app/actions";

export default function DeleteTodo({ id }: { id: number }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-4 h-4"
      onClick={async () => {
        await deleteTodo(id);
      }}
    >
      X
    </Button>
  );
}
