"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { EventDialog } from "./event-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
}

interface EventListProps {
  selectedDate?: Date;
}

export function EventList({ selectedDate }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editEvent, setEditEvent] = useState<Event | undefined>();

  const fetchEvents = async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    // try {
    //   const response = await fetch(
    //     `/api/events?date=${selectedDate.toISOString()}`
    //   );
    //   if (!response.ok) throw new Error("Failed to fetch events");
    //   const data = await response.json();
    //   setEvents(data);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleDelete = async (id: string) => {
    // try {
    //   const response = await fetch(`/api/events/${id}`, {
    //     method: "DELETE",
    //   });
    //   if (!response.ok) throw new Error("Failed to delete event");
    //   await fetchEvents();
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setDeleteId(null);
    // }
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedDate]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Events for{" "}
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Today"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    {event.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-muted-foreground">
                      {format(new Date(event.date), "h:mm a")}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => setEditEvent(event)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => setDeleteId(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No events scheduled for this day.
            </p>
          )}
        </CardContent>
      </Card>

      <EventDialog
        open={!!editEvent}
        onOpenChange={(open) => !open && setEditEvent(undefined)}
        selectedDate={selectedDate}
        event={editEvent}
        mode="edit"
        onEventSaved={fetchEvents}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
