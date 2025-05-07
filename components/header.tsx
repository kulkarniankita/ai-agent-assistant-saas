import { signOut } from "@workos-inc/authkit-nextjs";
import { getSignUpUrl, getSignInUrl } from "@workos-inc/authkit-nextjs";
import { Button } from "./ui/button";
import { User } from "@workos-inc/node";

export default async function Header({ user }: { user: User | null }) {
  // Retrieves the user from the session or returns `null` if no user is signed in

  const signUpUrl = await getSignUpUrl();
  const signInUrl = await getSignInUrl();

  return (
    <div className="flex justify-between items-center h-16 px-12 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 shadow-md">
      <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-900">
        AI Agent Assistant
      </p>
      <div>
        {user ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="flex gap-2 items-center"
          >
            <p className="text-amber-800 font-medium">
              Welcome back{user.firstName && `, ${user.firstName}`}
            </p>
            <Button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white transition-colors duration-200"
            >
              Sign out
            </Button>
          </form>
        ) : (
          <div className="flex gap-3">
            <a
              href={signInUrl}
              className="cursor-pointer text-amber-800 border border-amber-600 bg-white hover:bg-amber-50 rounded-md px-4 py-2 transition-colors duration-200 font-medium"
            >
              Sign in
            </a>
            <a
              href={signUpUrl}
              className="cursor-pointer text-white border border-amber-600 bg-amber-600 hover:bg-amber-700 rounded-md px-4 py-2 transition-colors duration-200 font-medium"
            >
              Sign up
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
