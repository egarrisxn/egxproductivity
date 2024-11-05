"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EventDialog } from "./event-dialog";
import { EventList } from "./event-list";

export default function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [key, setKey] = useState(0);

  const handleEventSaved = () => {
    setKey((prev) => prev + 1);
  };

  return (
    // <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
    <div>
      <div className="space-y-4">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
          />
        </Card>
        <Button className="w-full" onClick={() => setShowEventDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>
      <EventList key={key} selectedDate={date} />
      <EventDialog
        open={showEventDialog}
        onOpenChange={setShowEventDialog}
        selectedDate={date}
        mode="create"
        onEventSaved={handleEventSaved}
      />
    </div>
  );
}
