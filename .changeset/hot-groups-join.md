---
"server": major
"@snhu/biome-config": major
"@snhu/jest-config": major
"@snhu/tsconfig": major
---

# Major Version Release - Comprehensive Project Infrastructure

## WHAT

This release introduces major structural changes to the project, establishing a robust monorepo architecture with shared configurations, development tooling, and server implementation:

- **Server**: Initial Express server implementation with static file serving, routing, and error handling
- **@snhu/tsconfig**: Shared TypeScript configurations for different environments (base, web, Node.js, Angular)
- **@snhu/jest-config**: Standardized Jest testing configurations with environment-specific presets
- **@snhu/biome-config**: Unified Biome linting and formatting rules for consistent code style

## WHY

These breaking changes were made to:

1. Establish a scalable monorepo structure that supports multiple packages and applications
2. Standardize development practices across all projects through shared configurations
3. Improve developer experience with automated tooling and workflows
4. Ensure code quality through consistent linting, formatting, and testing
5. Support modern ES Module patterns for better compatibility with current JavaScript ecosystem

## HOW

To update existing code to work with these changes:

1. **For TypeScript Projects**:
   - Replace local tsconfig.json files with references to the shared configurations
   - Example: `"extends": "@snhu/tsconfig/web.json"`

2. **For Testing Setup**:
   - Update Jest configurations to use the shared presets
   - Example: `module.exports = require('@snhu/jest-config/web')`

3. **For Linting and Formatting**:
   - Remove local Biome configurations and extend from the shared presets
   - Example: `"extends": ["@snhu/biome-config/web.json"]`

4. **For Server Integration**:
   - Update imports to use ES Module syntax (`import` instead of `require`)
   - Follow the routing patterns established in the server package

## Additional Improvements

- Enhanced pre-commit hooks with automatic lint fixing
- Improved HTML formatting across static templates
- Added comprehensive documentation in README.md
- Configured Commitizen for standardized commit messages
- Set up Changesets for versioning and changelog generation
