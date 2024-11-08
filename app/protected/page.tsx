import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { InfoIcon, List, Calendar, Files } from "lucide-react";
import TodoList from "@/components/todos/todo-list";
import NoteList from "@/components/notes/note-list";
import CalendarView from "@/components/calendar/calendar-view";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="w-full">
        <div className="bg-accent text-sm p-3 sm:px-5 text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </section>

      {/* <section className="p-2 max-w-2xl">
            <div className="flex flex-col border rounded-lg shadow-lg p-4 gap-4">
              <h2 className="font-bold text-2xl">Your user details</h2>
              <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </section> */}

      <div className="flex flex-col lg:flex-row mx-auto gap-4">
        <div className="flex flex-col sm:min-w-96">
          <section className="p-2 max-w-2xl">
            <div className="flex flex-col border rounded-lg shadow-lg p-4">
              <div className="flex items-center gap-4 pb-4">
                <Files className="size-8 text-gray-500 dark:text-gray-400" />
                <h1 className="font-semibold text-2xl">Notes</h1>
              </div>
              <NoteList />
            </div>
          </section>
          <section className="p-2 max-w-2xl">
            <div className="flex flex-col border rounded-lg shadow-lg p-4">
              <div className="flex items-center gap-4 pb-4">
                <List className="size-8 text-gray-500 dark:text-gray-400" />
                <h1 className="font-semibold text-2xl">To-Do List</h1>
              </div>
              <TodoList />
            </div>
          </section>
        </div>
        <div className="flex flex-1">
          <section className="p-2 max-w-4xl">
            <div className="flex flex-col border rounded-lg shadow-lg p-4">
              <div className="flex items-center gap-4 pb-4">
                <Calendar className="size-8 text-gray-500 dark:text-gray-400" />
                <h1 className="font-semibold text-2xl">Calendar</h1>
              </div>
              <CalendarView />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
