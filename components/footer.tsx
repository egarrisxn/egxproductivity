import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-sm gap-8 h-16">
      <p>
        Powered by{" "}
        <a
          href="https://supabase.com/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        &{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Next.js
        </a>
      </p>
      <ThemeSwitcher />
    </footer>
  );
}
