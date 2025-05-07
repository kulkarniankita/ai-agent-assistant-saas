import { anthropic } from "@ai-sdk/anthropic";
import { Agent } from "@convex-dev/agent";
import { tool } from "ai";
import { z } from "zod";
import { components } from "./_generated/api";
import { v } from "convex/values";
import { action } from "./_generated/server";

// System prompt that defines the AI assistant's behavior

// Setup the Tools that the AI assistant can use

// Define an agent similarly to the AI SDK

// Agent Chat functions
export const createAgentAssistantThread = action({
  args: {
    prompt: v.string(),
    userId: v.string(),
    threadId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return {
      threadId: "",
      text: "",
      toolResults: "",
    };
  },
});
