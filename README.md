# AI Communication Copilot

An AI-powered communication assistant that helps improve your messages by providing formatting, tone, clarity, and grammar suggestions.

Thanks to [WorkOs](https://dub.sh/workos-authkit) for kindly sponsoring this video.

## Features

- **Message Analysis**: Get instant feedback on your messages
- **Formatting**: Improve message structure and formatting
- **Tone Analysis**: Get suggestions for appropriate tone adjustments
- **Clarity Improvements**: Identify and fix clarity issues
- **Grammar Check**: Point out grammar issues

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **UI**: Shadcn UI components
- **AI**: Anthropic Claude 3 Opus

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following variables:

   ```
   ANTHROPIC_API_KEY="your-anthropic-api-key"
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
