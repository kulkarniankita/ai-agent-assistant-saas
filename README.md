# AI Communication Copilot

An AI-powered communication assistant that helps improve your messages by providing formatting, tone, clarity, and grammar suggestions.

Thanks to [WorkOs](https://dub.sh/workos-authkit) for kindly sponsoring this video.

[Download the Cheatsheet for free](https://dub.sh/agent-copilot) that accompanies this Github Repo for all the links and visuals.

[The solution code is here](/solution/index.ts)

## What This Project Covers

- Building an AI agent with memory and context awareness
- Implementing real-time message analysis and improvements
- Creating a modern, responsive UI with Next.js and Shadcn
- Setting up secure authentication with WorkOS AuthKit
- Managing real-time state and data with Convex
- Implementing AI tools for message analysis and email generation
- Building type-safe APIs and validation with TypeScript and Zod
- Deploying a production-ready application on Vercel

## 📚 What You'll Learn

- 🚀 Next.js 15.3 with App Router – server components and API routes
- ⚛️ React 19 – interactive UI components with hooks
- 🤖 Claude AI (3.5 Sonnet) – intelligent message analysis and improvements
- 🔐 WorkOS AuthKit – secure authentication and user management
- 🧠 AI SDK – building AI agents with memory and tools
- 🎨 Shadcn UI – beautiful, accessible components with Radix UI
- 💾 Convex – reactive backend with real-time state management
- 📜 TypeScript – type-safe development
- 👀 Zod – schema validation for AI tools and inputs
- 💅 Tailwind CSS v4 – modern utility-first styling
- 🚀 Deployment on Vercel – production-ready setup

## Tech Stack

- **Frontend**: Next.js 15.3 with App Router
- **UI**: Shadcn UI components with Radix UI primitives
- **AI**: Claude 3.5 Sonnet via Anthropic SDK
- **Backend**: Convex for real-time data and state management
- **Authentication**: WorkOS AuthKit
- **Styling**: Tailwind CSS v4
- **Type Safety**: TypeScript with Zod validation
- **Development**: ESLint, Turbopack

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following variables:

```
AUTH_SECRET="" # Added by `npx auth`. Read more: https://cli.authjs.dev

# Deployment used by `npx convex dev`

CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=

DATABASE_URL=""

# Workos

WORKOS_API_KEY=''
WORKOS_CLIENT_ID=''
WORKOS_COOKIE_PASSWORD="" # use npx secret to generate

# configured in the WorkOS dashboard

NEXT_PUBLIC_WORKOS_REDIRECT_URI="" # Most likely http://localhost:3000/callback

# Claude

ANTHROPIC_API_KEY=""

```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/` - Next.js app router pages and API routes
- `components/` - Reusable UI components
- `lib/` - Utility functions and configurations
- `public/` - Static assets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
