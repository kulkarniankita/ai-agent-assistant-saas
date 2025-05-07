import Chat from "@/components/chat";
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function Home() {
  // If the user isn't signed in, they will be automatically redirected to AuthKit
  const { user } = await withAuth();

  return (
    <div className="flex  w-screen items-center justify-center">
      <Chat user={user} />
    </div>
  );
}
