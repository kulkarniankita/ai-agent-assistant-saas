import { Textarea } from "./ui/textarea";

import { Button } from "./ui/button";

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
    <>
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
    </>
  );
}
