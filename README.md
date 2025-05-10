# SNHU_CS-465 Full Stack Web Development

A full-stack web application built with TypeScript, Express, and Handlebars for the SNHU CS-465 course.

## Project Overview

This project demonstrates a modern web application architecture using:

- **Backend**: Node.js with Express and TypeScript
- **View Engine**: Handlebars for server-side templating
- **Development Tools**: Biome for linting/formatting, Conventional Commits for versioning

## Project Structure

```txt
SNHU_CS-465/
├── server/              # Express application
│   ├── src/             # TypeScript source code
│   ├── public/          # Static assets
│   ├── config/          # Configuration files
│   ├── middleware/      # Middleware functions
│   ├── routes/          # Route definitions
│   ├── utils/           # Utility functions
│   └── index.ts         # Application entry point
├── .husky/              # Git hooks for commit linting
├── biome.json           # Biome configuration
└── commitlint.config.ts # Commit message linting rules
```

### Server Application

The [server](./server) directory contains an Express application built with TypeScript and Handlebars. It includes:

- TypeScript for type safety
- Express for routing and middleware
- Handlebars for templating
- Bootstrap for responsive UI
- Basic error handling
- Test route `/test-error` for error page testing

For server-specific commands and information, see the [server README](./server/README.md).

## Getting Started

### Prerequisites

- Node.js (v22 or newer)
- pnpm package manager (`npm install -g pnpm`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/SNHU_CS-465.git
   cd SNHU_CS-465
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm start:server
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `pnpm start:server` - Start the Express server in development mode
- `pnpm lint` - Check code for linting issues
- `pnpm lint:fix` - Fix linting issues automatically
- `pnpm format` - Check code formatting
- `pnpm format:fix` - Fix formatting issues automatically
- `pnpm commit` - Run the interactive commit tool for Conventional Commits

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE](./LICENSE) file for details.
