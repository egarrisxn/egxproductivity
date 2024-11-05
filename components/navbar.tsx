import Link from "next/link";
import HeaderAuth from "@/components/auth/header-auth";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex mx-auto justify-between items-center p-4 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>Supabase Calendar</Link>
        </div>
        <HeaderAuth />
      </div>
    </nav>
  );
}
