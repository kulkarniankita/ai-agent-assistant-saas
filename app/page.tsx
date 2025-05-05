"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage(""); // Clear input

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, context: messages }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Process and format the AI response
      let formattedContent = "";
      if (Array.isArray(data)) {
        formattedContent = data
          .map((item) => {
            if (item.type === "text") {
              return item.text;
            } else if (item.type === "tool_use") {
              if (item.name === "analyzeMessage") {
                const analysis = item.input;
                return `<b>📝 Formatted Message:</b>\n${analysis.formatted}\n\n<b>🎯 Tone Analysis:</b>\n${analysis.tone}\n\n<b>💡 Clarity Improvements:</b>\n${analysis.clarity}\n\n<b>✍️ Grammar Issues:</b>\n${analysis.grammarIssues}`;
              }
              return `Analysis:\n${JSON.stringify(item.input, null, 2)}`;
            }
            return "";
          })
          .filter(Boolean)
          .join("\n\n");
      } else {
        formattedContent = JSON.stringify(data, null, 2);
      }

      // Add AI response to chat
      const aiMessage: Message = {
        role: "assistant",
        content: formattedContent,
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
      <h1 className="text-3xl font-bold mb-8">AI Chat Assistant</h1>

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
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <CardContent className="p-4">
                  <p className="whitespace-pre-wrap">{msg.content}</p>
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
