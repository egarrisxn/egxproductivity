"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
}

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: Date;
  onEventSaved?: () => void;
  event?: Event;
  mode?: "create" | "edit";
}

export function EventDialog({
  open,
  onOpenChange,
  selectedDate,
  onEventSaved,
  event,
  mode = "create",
}: EventDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("12:00");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (event && mode === "edit") {
      const date = new Date(event.date);
      setTitle(event.title);
      setDescription(event.description || "");
      setTime(format(date, "HH:mm"));
    } else {
      setTitle("");
      setDescription("");
      setTime("12:00");
    }
  }, [event, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate && !event) return;

    const [hours, minutes] = time.split(":").map(Number);
    const eventDate = new Date(event?.date || selectedDate!);
    eventDate.setHours(hours, minutes);

    setIsLoading(true);
    // try {
    //   const response = await fetch(
    //     mode === "edit" ? `/api/events/${event!.id}` : "/api/events",
    //     {
    //       method: mode === "edit" ? "PATCH" : "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         title,
    //         description,
    //         date: eventDate.toISOString(),
    //       }),
    //     }
    //   );

    //   if (!response.ok) throw new Error(`Failed to ${mode} event`);

    //   onEventSaved?.();
    //   onOpenChange(false);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Event" : "Add New Event"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event description"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? `${mode === "edit" ? "Updating" : "Creating"}...`
                : mode === "edit"
                  ? "Update Event"
                  : "Save Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
