"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MessageSquare } from "lucide-react";

interface Thread {
  _id: string;
  _creationTime: number;
  title?: string;
  summary?: string;
  status: "active" | "archived";
}

export default function Threads({
  user,
  onSelectThread,
}: {
  user: { id: string } | null;
  onSelectThread: (threadId: string) => void;
}) {
  // Query to get threads for the current user
  const threads = useQuery(api.agent.getThreadsByUserId, {
    userId: user?.id || "",
    paginationOpts: {
      numItems: 10,
      cursor: null,
    },
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!user) {
    return (
      <div className="w-full max-w-md mx-auto p-4">
        <div className="text-center text-gray-500 py-8">
          Please sign in to view your conversations
        </div>
      </div>
    );
  }

  if (threads === undefined) {
    return (
      <div className="w-full max-w-md mx-auto p-4">
        <div className="text-center text-gray-500 py-8">
          <div className="animate-pulse">Loading conversations...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Past Conversations
      </h2>
      <div className="space-y-4">
        {threads.page.map((thread: Thread) => (
          <Card
            key={thread._id}
            className="hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => onSelectThread(thread._id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-900">
                    {thread.title || "Untitled Conversation"}
                  </h3>
                  {thread.summary && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {thread.summary}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(thread._creationTime)}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>
                  {thread.status === "active" ? "Active" : "Archived"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
        {threads.page.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No conversations yet</p>
            <p className="text-sm mt-2">
              Start a new conversation to see it here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
