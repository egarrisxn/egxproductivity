import { createClient } from "@/utils/supabase/server";
import { Calendar, InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import CheckCircleIcon from "@/components/icons/check-circle";
import Todos from "@/components/todos/todos";
import ClearActions from "@/components/todos/clear-actions";
import Notes from "@/components/notes/notes";
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
      <section className="p-3 sm:px-8 flex flex-col gap-4 items-start">
        <h2 className="font-bold text-2xl">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </section>
      <section className="flex mx-auto gap-4 flex-col lg:flex-row">
        <div className="p-2 border-2">
          <div className="flex flex-col min-w-sm max-w-2xl border rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-4 pb-4">
              <CheckCircleIcon className="size-8 text-gray-500 dark:text-gray-400" />
              <h1 className="font-semibold text-2xl">Todos</h1>
            </div>
            <Todos />
            <ClearActions />
          </div>
        </div>
        <div className="p-2 border-2">
          <div className="flex flex-col max-w-2xl border rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-4 pb-4">
              <CheckCircleIcon className="size-8 text-gray-500 dark:text-gray-400" />
              <h1 className="font-semibold text-2xl">Notes</h1>
            </div>
            <Notes />
          </div>
        </div>
      </section>
      <section className="flex mx-auto p-4 md:p-6 lg:p-8">
        <CalendarView />
      </section>
    </div>
  );
}
