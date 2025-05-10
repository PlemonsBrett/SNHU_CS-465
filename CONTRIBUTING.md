# Contributing to SNHU_CS-465

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing to the SNHU_CS-465 full-stack web application.

## Development Environment Setup

### Prerequisites

- **Node.js**: Version 22 or newer
  - We recommend using [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage Node.js versions
  - Run `nvm install 22` and `nvm use 22` to use the correct version

- **pnpm**: We use pnpm as our package manager
  - Install globally: `npm install -g pnpm@latest`
  - All commands should use pnpm instead of npm or yarn

### Initial Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/SNHU_CS-465.git`
3. Navigate to the project: `cd SNHU_CS-465`
4. Install dependencies: `pnpm install`
5. Set up git hooks: `pnpm prepare` (this happens automatically after install)

## Development Workflow

### Branch Strategy (GitFlow)

We follow the GitFlow branching model:

- `main`: Production-ready code
- `develop`: Latest development changes
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `release/*`: Release preparation
- `hotfix/*`: Urgent fixes for production

#### Creating a new feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
# Make your changes
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
# Create a pull request to merge into develop
```

### Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for consistent commit messages. This project is configured with commitlint to enforce these standards.

#### Commit Message Format

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools
- `perf`: Performance improvements
- `ci`: Changes to CI configuration files and scripts
- `build`: Changes to build system or external dependencies
- `revert`: Revert a previous commit

#### Using the Commit Tool

For convenience, you can use our interactive commit tool:

```bash
pnpm commit
```

This will guide you through creating a properly formatted commit message.

### Code Style and Quality

We use [Biome](https://biomejs.dev/) for linting and formatting. Biome is configured in the `biome.json` file at the project root.

#### Linting and Formatting

- Check for linting issues: `pnpm lint`
- Fix linting issues automatically: `pnpm lint:fix`
- Check code formatting: `pnpm format`
- Fix formatting issues automatically: `pnpm format:fix`

Biome will automatically check your code during the pre-commit hook, but you should run these commands manually before committing to ensure your code meets our standards.

### Git Hooks with Husky

This project uses [Husky](https://typicode.github.io/husky/) to manage Git hooks, ensuring code quality and consistency. The hooks are automatically installed when you run `pnpm install`.

#### Pre-commit Hook

The pre-commit hook runs automatically when you attempt to commit changes and performs the following checks:

- Linting with Biome
- Formatting with Biome

If any issues are found, the commit will be aborted. You can fix the issues and try again, or use `--no-verify` to bypass the hook (not recommended).

#### Commit Message Hook

The commit-msg hook validates your commit messages against the Conventional Commits standard using [commitlint](https://commitlint.js.org/). This ensures consistent commit history.

If your commit message doesn't follow the standard, the commit will be rejected with an error message explaining the issue.

### TypeScript Execution with TSX

For development, we use [tsx](https://github.com/esbuild-kit/tsx) instead of ts-node. TSX is a TypeScript execution engine powered by esbuild that offers:

- Significantly faster startup times
- No separate compilation step
- Automatic file watching and reloading
- Support for both ESM and CommonJS

When working on the server code, use `pnpm dev` in the server directory to start the application with TSX.

### Testing

Before submitting a pull request, make sure all tests pass:

```bash
pnpm test
```

## Pull Request Process

1. Ensure your code follows our style guidelines and passes all tests
2. Update documentation if necessary
3. Create a pull request to the `develop` branch
4. The PR title should follow the Conventional Commits format
5. Wait for code review and address any requested changes
6. Once approved, your PR will be merged

## Release Process

Releases are managed by maintainers following GitFlow:

1. Create a `release/x.y.z` branch from `develop`
2. Make any final adjustments and version bumps
3. Merge the release branch into `main` and tag with the version
4. Merge the release branch back into `develop`

## Questions?

If you have any questions or need help, please open an issue in the repository.

Thank you for contributing!
