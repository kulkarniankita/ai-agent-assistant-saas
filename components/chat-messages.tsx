import { Card } from "./ui/card";
import { CardContent } from "./ui/card";
import { HandHelping, HeartIcon, TextIcon } from "lucide-react";
import { Message } from "@/@types/chat";

export default function ChatMessages({
  msg,
  index,
}: {
  msg: Message;
  index: number;
}) {
  const isUserMessage = msg.role === "user";

  return (
    <div
      key={index}
      className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}
    >
      <Card
        className={`max-w-[80%] ${
          isUserMessage ? "bg-gray-50 text-gray-900" : "bg-white shadow-lg"
        }`}
      >
        <CardContent className="p-6">
          {typeof msg.content === "string" ? (
            <p className="whitespace-pre-wrap">{msg.content}</p>
          ) : msg.content.toolResults.type === "analyze" ? (
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
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-700 mb-2">
                  Rewritten Message
                </h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {msg.content.toolResults.rewrittenMessage}
                </p>
              </div>
            </div>
          ) : msg.content.toolResults.type === "email" ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-700 mb-2">
                  Email Details
                </h4>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">To:</span>{" "}
                    {msg.content.toolResults.recipient}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Subject:</span>{" "}
                    {msg.content.toolResults.subject}
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border">
                <p className="whitespace-pre-wrap text-gray-800">
                  {msg.content.toolResults.body}
                </p>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{JSON.stringify(msg.content)}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
