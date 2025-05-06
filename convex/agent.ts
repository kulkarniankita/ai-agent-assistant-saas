import { anthropic } from "@ai-sdk/anthropic";
import { Agent } from "@convex-dev/agent";
import { tool } from "ai";
import { z } from "zod";
import { components } from "./_generated/api";
import { v } from "convex/values";
import { action } from "./_generated/server";

// Define the available tools
const tools = {
  analyzeMessage: tool({
    description: `Analyze the given message and provide improvements in the following areas:
1. Formatting: Improve the message structure and formatting
2. Tone: Suggest appropriate tone adjustments
3. Clarity: Identify and fix clarity issues
4. Grammar: Point out any grammar issues`,
    parameters: z.object({
      formatted: z.string(),
      tone: z.string(),
      clarity: z.string(),
      grammarIssues: z.string(),
    }),
    execute: async (args) => {
      return args;
    },
  }),

  writeEmail: tool({
    description: `Write an email to the given recipient with the given subject and body. Make sure to follow a friendly and professional tone. Don't use -- in the email and avoid using complex words.`,
    parameters: z.object({
      recipient: z.string(),
      subject: z.string(),
      body: z.string(),
    }),
    execute: async (args) => {
      return args;
    },
  }),

  writeSocialMediaPost: tool({
    description: `Write a social media post for X, LinkedIn, and BlueSky. Make sure to follow the algorithm rules for each platform. Don't sound cringey.`,
    parameters: z.object({
      platform: z.enum(["X", "LinkedIn", "BlueSky"]),
      message: z.string(),
    }),
    execute: async (args) => {
      return args;
    },
  }),
};

// System prompt that defines the AI assistant's behavior
const systemPrompt = `You are an expert AI assistant for Ankita. Your goal is to help her complete her tasks. These tasks include writing emails, messages, social media posts, and blog posts.`;

// Define an agent similarly to the AI SDK
const aiAgentAssistant = new Agent(components.agent, {
  chat: anthropic("claude-3-5-sonnet-20240620"),
  instructions: systemPrompt,
  tools: tools,
});

export const createAgentAssistantThread = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    //validate with zod
    // const { prompt, code } = createThreadSchema.parse(args);

    const { threadId, thread } = await aiAgentAssistant.createThread(ctx);

    const result = await thread.generateText({
      prompt: args.prompt,
    });

    console.log("result", result?.toolResults);

    const toolResult = result?.toolResults?.[0]?.result;

    return {
      threadId,
      text: result?.text,
      toolResults: toolResult,
    };
  },
});
