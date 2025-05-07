export type ToolResult =
  | {
      type: "analyze";
      formatted: string;
      tone: string;
      clarity: string;
      grammarIssues: string;
      rewrittenMessage: string;
    }
  | { type: "email"; recipient: string; subject: string; body: string }
  | { type: "social"; platform: "X" | "LinkedIn" | "BlueSky"; message: string };

export type Message = {
  role: "user" | "assistant";
  content: string | { toolResults: ToolResult };
};
