import { signOut } from "@workos-inc/authkit-nextjs";

import { getSignUpUrl, getSignInUrl } from "@workos-inc/authkit-nextjs";
import { Link } from "lucide-react";
import { Button } from "./ui/button";
import { User } from "@workos-inc/node";

export default async function Header({ user }: { user: User }) {
  // Retrieves the user from the session or returns `null` if no user is signed in

  const signUpUrl = await getSignUpUrl();
  const signInUrl = await getSignInUrl();

  return (
    <div className="flex justify-between items-center h-16 bg-amber-200 px-12">
      <p className="text-2xl font-bold">AI Agent Assistant</p>
      <div>
        {user ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="flex gap-2 items-center"
          >
            <p>Welcome back{user.firstName && `, ${user.firstName}`}</p>
            <Button type="submit" className="cursor-pointer">
              Sign out
            </Button>
          </form>
        ) : (
          <div className="flex gap-2">
            <Link href={signInUrl}>Sign in</Link>
            <Link href={signUpUrl}>Sign up</Link>
          </div>
        )}
      </div>
    </div>
  );
}
