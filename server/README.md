# TypeScript + Express + Handlebars Application

A basic web application built with TypeScript, Express, and Handlebars view engine.

## Project Structure

```txt
server/
├── dist/                  # Compiled JavaScript files (generated)
├── node_modules/          # Dependencies (generated)
├── public/                # Static assets
│   ├── css/               # CSS stylesheets
│   └── js/                # Client-side JavaScript
├── src/                   # Source code
│   ├── routes/            # URL routing definitions
│   ├── views/             # Handlebars templates
│   │   ├── layouts/       # Layout templates
│   │   └── partials/      # Reusable template parts
│   └── index.ts           # Application entry point
├── .env                   # Environment variables
├── package.json           # Project metadata and dependencies
└── tsconfig.json          # TypeScript configuration
```

## Features

- TypeScript for type safety
- Express for routing and middleware
- Handlebars for templating
- Bootstrap for responsive UI
- Basic error handling

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- pnpm package manager

### Installation

1. Install dependencies:

   ```shell
   pnpm install
   ```

2. Run the application in development mode:

   ```shell
   pnpm dev
   ```

3. For production, build and then run:

   ```shell
   pnpm build
   pnpm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `pnpm start` - Run the compiled application
- `pnpm dev` - Run the application with auto-reload using tsx
- `pnpm build` - Compile TypeScript to JavaScript
- `pnpm test` - Run tests

## License

ISC
