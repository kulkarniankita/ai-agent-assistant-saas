import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

// Define types for request and response
type RequestData = {
  message: string;
};

// Define response types
type BaseResponse = {
  error?: string;
  details?: string;
};

// Response when returning plain text
type TextResponse = BaseResponse & {
  text: string;
};

// Response when a tool is used
type ToolResponse = BaseResponse & {
  tool: string;
  input: Record<string, any>;
  tool_use_id: string;
};

// Create a singleton instance of the Anthropic client
const anthropicClient = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// Define the available tools
const tools = [
  {
    name: "analyzeMessage",
    description: `Analyze the given message and provide improvements in the following areas:
1. Formatting: Improve the message structure and formatting
2. Tone: Suggest appropriate tone adjustments
3. Clarity: Identify and fix clarity issues
4. Grammar: Point out any grammar issues

Provide your analysis in JSON format with these exact keys:
{
  "formatted": "formatted message here",
  "tone": "tone analysis here",
  "clarity": "clarity improvements here",
  "grammarIssues": "grammar issues here"
}`,
    input_schema: {
      type: "object",
      properties: {
        formatted: {
          type: "string",
          description: "Formatted message",
        },
        tone: {
          type: "string",
          description: "Tone analysis",
        },
        clarity: {
          type: "string",
          description: "Clarity improvements",
        },
        grammarIssues: {
          type: "string",
          description: "Grammar issues",
        },
      },
      required: ["formatted", "tone", "clarity", "grammarIssues"],
    },
  },
  {
    name: "writeEmail",
    description: `Write an email to the given recipient with the given subject and body. Make sure to follow a friendly and professional tone. Don't use -- in the email and avoid using complex words.`,
    input_schema: {
      type: "object",
      properties: {
        recipient: {
          type: "string",
          description: "Recipient email address",
        },
        subject: { type: "string", description: "Subject of the email" },
        body: { type: "string", description: "Body of the email" },
      },
      required: ["recipient", "subject", "body"],
    },
  },
  {
    name: "writeSocialMediaPost",
    description: `Write a social media post for X, LinkedIn, and BlueSky. Make sure to follow the algorithm rules for each platform. Don't sound cringey.`,
    input_schema: {
      type: "object",
      properties: {
        platform: {
          type: "string",
          description:
            "Platform to write the post for (X, LinkedIn, or BlueSky)",
          enum: ["X", "LinkedIn", "BlueSky"],
        },
        message: { type: "string", description: "Message" },
      },
      required: ["platform", "message"],
    },
  },
];

// System prompt that defines the AI assistant's behavior
const systemPrompt = `You are an expert AI assistant for Ankita. Your goal is to help her complete her tasks. These tasks include writing emails, messages, social media posts, and blog posts.

When using the analyzeMessage tool, you MUST provide all required fields:
- formatted: The improved version of the message
- tone: Analysis of the message's tone and suggestions for improvement
- clarity: Specific clarity improvements
- grammarIssues: Any grammar issues found and their corrections

Do not skip any of these fields when using the analyzeMessage tool.`;

export async function POST(request: Request) {
  try {
    // Validate request data
    const data = (await request.json()) as Partial<RequestData>;

    if (!data.message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("Missing Anthropic API key");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Call Anthropic API
    const response = await anthropicClient.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: data.message,
        },
      ],
      tools,
    });

    console.log("content", response.content);

    // Process Claude's response
    if (!response.content || response.content.length === 0) {
      return NextResponse.json(
        { error: "Empty response from Claude" },
        { status: 500 }
      );
    }

    return NextResponse.json(response.content);
  } catch (error) {
    // Enhanced error handling
    console.error("Error processing request:", error);

    // Determine appropriate status code based on error
    let statusCode = 500;
    let errorMessage = "Internal server error";

    if (error instanceof Error) {
      // Check for specific error types
      if (
        error.message.includes("rate limit") ||
        error.message.includes("quota")
      ) {
        statusCode = 429;
        errorMessage = "Rate limit exceeded";
      } else if (
        error.message.includes("unauthorized") ||
        error.message.includes("authentication")
      ) {
        statusCode = 401;
        errorMessage = "Authentication error";
      } else if (error.message.includes("invalid request")) {
        statusCode = 400;
        errorMessage = "Invalid request";
      } else if (error.message.includes("thinking")) {
        // Handle case where we received internal thinking output
        statusCode = 500;
        errorMessage =
          "Received internal thinking output instead of proper response";
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: statusCode }
    );
  }
}
