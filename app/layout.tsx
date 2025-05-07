import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import "./globals.css";
import Header from "@/components/header";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ankita's AI Assistant",
  description: "Ankita's AI Assistant",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await withAuth();

  return (
    <html lang="en">
      <body className={`${ibmPlexSans.className} antialiased`}>
        <Header user={user} />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center pt-12 xl:pt-24">
          <h1 className="text-2xlmd:text-4xl xl:text-7xl font-bold text-amber-900 mb-4">
            Welcome to Your AI Assistant
          </h1>
          <p className="text-lg text-amber-800">
            Your personal AI companion for productivity and assistance
          </p>
        </div>
        <ConvexClientProvider>
          <AuthKitProvider>{children}</AuthKitProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
