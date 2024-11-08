import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PrivateHeader from "@/components/private-header";
import Link from "next/link";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="w-full">
        <PrivateHeader />
      </section>
      <section className="p-2 max-w-2xl">
        <div className="flex flex-col border rounded-lg shadow-lg p-4 gap-4">
          <h2 className="font-bold text-2xl">Your user details</h2>
          <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
}
