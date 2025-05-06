import Chat from "@/components/chat";

export default async function Home() {
  // If the user isn't signed in, they will be automatically redirected to AuthKit
  // const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <div className="flex pt-12 xl:pt-24 w-screen items-center justify-center">
      <Chat />
    </div>
  );
}
