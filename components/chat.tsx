"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { HandHelping, HeartIcon, TextIcon } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content:
    | string
    | {
        toolResults: {
          formatted: string;
          tone: string;
          clarity: string;
          grammarIssues: string;
        };
      }
    | { recipient: string; subject: string; body: string }
    | { message: string; platform: "X" | "LinkedIn" | "BlueSky" }
    | { text: string; threadId: string };
};

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAgentAssistantThreadAction = useAction(
    api.agent.createAgentAssistantThread
  );

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage(""); // Clear input

    setIsLoading(true);
    setError(null);
    try {
      const data = await createAgentAssistantThreadAction({ prompt: message });
      console.log("API Response:", data);

      let formattedContent: {
        formatted: string;
        tone: string;
        clarity: string;
        grammarIssues: string;
      } | null = null;

      if (data?.toolResults) {
        // Process and format the AI response
        formattedContent = data?.toolResults as {
          formatted: string;
          tone: string;
          clarity: string;
          grammarIssues: string;
        };
      }

      // Add AI response to chat
      const aiMessage: Message = {
        role: "assistant",
        content: formattedContent
          ? {
              toolResults: formattedContent,
            }
          : data,
      };
      console.log("Processed message:", aiMessage);

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setError("Failed to get response. Please try again.");
      console.error("Error getting response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="space-y-6">
        {/* Chat Messages */}
        <div className="space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto p-4 border rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <Card
                className={`max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-gray-50 text-gray-900"
                    : "bg-white shadow-lg"
                }`}
              >
                <CardContent className="p-6">
                  {typeof msg.content === "string" ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : "toolResults" in msg.content ? (
                    <div className="space-y-6">
                      <div className="text-base font-medium text-gray-800 leading-relaxed">
                        {msg.content.toolResults.formatted}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                          <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                            <HandHelping className="h-5 w-5" />
                            Clarity
                          </h4>
                          <p className="text-sm text-gray-600">
                            {msg.content.toolResults.clarity}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                          <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                            <HeartIcon className="h-5 w-5" />
                            Tone
                          </h4>
                          <p className="text-sm text-gray-600">
                            {msg.content.toolResults.tone}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
                          <h4 className="font-semibold text-amber-700 mb-2 flex items-center gap-2">
                            <TextIcon className="h-5 w-5" />
                            Grammar
                          </h4>
                          <p className="text-sm text-gray-600">
                            {msg.content.toolResults.grammarIssues}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : "text" in msg.content ? (
                    <p className="whitespace-pre-wrap">{msg.content.text}</p>
                  ) : (
                    <p className="whitespace-pre-wrap">
                      {JSON.stringify(msg.content)}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] bg-muted">
                <CardContent className="p-4">
                  <p>Thinking...</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <Button
            onClick={sendMessage}
            disabled={isLoading || !message.trim()}
            className="w-full bg-amber-600 text-white"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </Button>

          {error && (
            <div className="text-red-500 p-4 bg-red-50 rounded-md">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}
