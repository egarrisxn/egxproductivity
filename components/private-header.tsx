import { InfoIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function PrivateHeader() {
  return (
    <div className="bg-accent w-full">
      <div className="text-sm p-3 sm:px-5 max-w-5xl w-full text-foreground mx-auto items-center flex justify-between">
        <div className="flex gap-3">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <div className="flex gap-3">
          <Button asChild variant="link" className="h-0 font-bold">
            <Link href="/protected/dashboard">Dashboard</Link>
          </Button>
          <Button asChild variant="link" className="h-0 font-bold">
            <Link href="/protected/account">Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
