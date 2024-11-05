import { signOutAction } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button type="submit" variant={"ghost"}>
        Sign Out
      </Button>
    </form>
  );
}
