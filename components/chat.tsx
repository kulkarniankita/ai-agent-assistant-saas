"use client";

import { Message, ToolResult } from "@/@types/chat";
import { api } from "@/convex/_generated/api";
import { User } from "@workos-inc/node";
import { useAction } from "convex/react";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";
import ThinkingCard from "./thinking-card";

export default function Chat({ user }: { user: User | null }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
      // We invoke the AI Agent here
      const data = await createAgentAssistantThreadAction({
        prompt: message,
        userId: user?.id || "",
        threadId: threadId || undefined,
      });
      console.log("API Response:", data);

      // Store threadId for future messages
      if (data.threadId) {
        setThreadId(data.threadId);
      }

      let formattedContent: ToolResult | null = null;

      if (data?.toolResults) {
        const toolResult = data.toolResults as unknown as ToolResult;
        console.log("Tool Result:", toolResult);

        if (toolResult.type === "email") {
          const aiMessage: Message = {
            role: "assistant",
            content: { toolResults: toolResult },
          };
          setMessages((prev) => [...prev, aiMessage]);
          return;
        }

        if (toolResult.type === "analyze") {
          formattedContent = toolResult;
        }
      }

      // Add AI response to chat
      const aiMessage: Message = {
        role: "assistant",
        content: formattedContent
          ? { toolResults: formattedContent }
          : data.text || "",
      };

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
        <div className="space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto p-6 border rounded-2xl bg-gradient-to-b from-gray-50 to-white shadow-lg">
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <ChatMessages key={index} msg={msg} index={index} />
            ))}
            {isLoading && <ThinkingCard />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-4 bg-white rounded-2xl shadow-lg p-4">
          <ChatInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
