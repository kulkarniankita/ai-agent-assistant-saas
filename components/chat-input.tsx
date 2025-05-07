import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
  error: string | null;
}

export default function ChatInput({
  message,
  setMessage,
  sendMessage,
  isLoading,
  error,
}: ChatInputProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[100px] pr-12 resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
          className="absolute bottom-2 right-2 h-8 w-8 p-0 bg-amber-600 hover:bg-amber-700 text-white rounded-full"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {error && (
        <div className="text-red-500 p-4 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
