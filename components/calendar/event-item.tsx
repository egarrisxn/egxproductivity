"use client";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { format, parse } from "date-fns";
import type { EventItemProps } from "@/lib/types";

export function EventItem({ event, onEdit, onDelete }: EventItemProps) {
  const formatEventTime = (time: string) => {
    const date = parse(time, "HH:mm:ss", new Date());
    return format(date, "h:mm a");
  };

  return (
    <li className="flex flex-row gap-2 items-center">
      <div className="flex pt-1">
        <div className="text-sm font-medium">{formatEventTime(event.time)}</div>
      </div>
      <div className="flex flex-1 border-l pl-2 flex-col">
        <div className="font-bold flex-1 truncate">{event.title}</div>
        <div className="text-sm text-muted-foreground">{event.description}</div>
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit event</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete event</span>
        </Button>
      </div>
    </li>
  );
}
