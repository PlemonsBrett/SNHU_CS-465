# SNHU CS-465 Testing Framework

This directory contains comprehensive testing for the SNHU CS-465 Module 5 Travlr Getaways application, featuring both Cucumber/Playwright E2E tests and Hoppscotch API tests.

## Directory Structure

```
tests/
├── features/                          # Gherkin feature files
│   ├── api_endpoints.feature          # RESTful API endpoint tests
│   ├── api_testing_hoppscotch.feature # External tool API testing
│   ├── database_integration.feature   # Database connectivity tests
│   ├── hoppscotch_cli_automation.feature # CLI automation tests
│   ├── performance_and_reliability.feature # Performance tests
│   ├── separation_of_concerns.feature # Architecture validation
│   └── web_application.feature        # UI/UX tests
├── step-definitions/                  # Cucumber step implementations
│   ├── common.js                      # Shared helper functions
│   ├── api_steps.js                   # API testing steps
│   ├── web_steps.js                   # Web application steps
│   └── database_steps.js              # Database testing steps
├── support/                           # Test configuration
│   └── world.js                       # Playwright world setup
├── hoppscotch/                        # API test collections
│   ├── travlr-api-tests.json         # Main API test suite
│   ├── smoke-tests.json              # Quick connectivity tests
│   ├── performance-tests.json        # Performance benchmarks
│   ├── load-tests.json               # Concurrent load testing
│   ├── contract-validation-tests.json # API contract validation
│   ├── dev.hoppenv.json              # Development environment
│   ├── staging.hoppenv.json          # Staging environment
│   ├── prod.hoppenv.json             # Production environment
│   ├── custom-config.json            # Custom test configuration
│   └── README.md                     # Hoppscotch usage guide
└── README.md                         # This file
```

## Quick Start

### Prerequisites

```bash
# Install dependencies
pnpm install

# Install Hoppscotch CLI globally
pnpm add -g @hoppscotch/cli

# Start the application server
pnpm start
```

### Run Tests

```bash
# Quick smoke tests (fastest)
pnpm test:dev

# Full test suite
pnpm test:full

# API tests only
pnpm test:api

# Web application tests only
pnpm test:web

# Hoppscotch API tests
pnpm test:hoppscotch
```

## Test Categories

### 🌐 Web Application Tests (`@web`)
- User interface testing with Playwright
- Navigation and page functionality
- Form interactions and validation
- Responsive design verification
- Browser compatibility testing

**Run Command:** `pnpm test:web`

### 🔌 API Endpoint Tests (`@api`) 
- RESTful API endpoint validation
- HTTP status code verification
- JSON response structure validation
- Error handling scenarios
- API contract compliance

**Run Command:** `pnpm test:api`

### 🗄️ Database Integration Tests (`@database`)
- MongoDB connection testing
- Data seeding verification
- Query performance validation
- Connection pooling tests
- Error recovery scenarios

**Run Command:** `pnpm test:database`

### ⚡ Performance Tests (`@performance`)
- Response time benchmarks
- Load testing with concurrent users
- Memory usage validation
- Connection stability under load

**Run Command:** `pnpm test:performance`

### 💨 Smoke Tests (`@smoke`)
- Critical path validation
- Basic connectivity checks
- Essential functionality verification
- Fast execution for development

**Run Command:** `pnpm test:smoke`

## Browser Testing

### Supported Browsers
```bash
# Chromium (default)
pnpm test:e2e

# Firefox
pnpm test:e2e:firefox

# WebKit/Safari
pnpm test:e2e:webkit
```

### Headless vs. Headed
```bash
# Headless mode (default, faster)
pnpm test:e2e:headless

# Headed mode (visible browser, slower)
HEADLESS=false pnpm test:e2e
```

## API Testing with Hoppscotch

### Quick API Tests
```bash
# Basic API functionality
pnpm test:hoppscotch:smoke

# Comprehensive API test suite
pnpm test:hoppscotch

# Performance testing (50 iterations)
pnpm test:hoppscotch:performance

# Load testing (10 concurrent, 20 iterations each)
pnpm test:hoppscotch:load
```

### Environment-Specific Testing
```bash
# Development environment
hopp test --env tests/hoppscotch/dev.hoppenv.json tests/hoppscotch/travlr-api-tests.json

# Staging environment
hopp test --env tests/hoppscotch/staging.hoppenv.json tests/hoppscotch/travlr-api-tests.json

# Production environment
hopp test --env tests/hoppscotch/prod.hoppenv.json tests/hoppscotch/travlr-api-tests.json
```

## Test Reports

### Generate Reports
```bash
# Run tests and generate HTML report
pnpm test:e2e:report

# Clean old reports
pnpm reports:clean

# Open latest report
pnpm reports:open
```

### Report Locations
- **HTML Report:** `reports/cucumber-report.html`
- **JSON Report:** `reports/cucumber-report.json`
- **Screenshots:** `reports/screenshots/`
- **Hoppscotch Results:** `reports/hoppscotch-results.json`

## Development Workflow

### During Development
```bash
# Quick validation during development
pnpm test:dev

# Test specific features
pnpm test:smoke

# Debug with visible browser
HEADLESS=false pnpm test:web
```

### Before Commits
```bash
# Comprehensive testing
pnpm test:full

# Performance validation
pnpm test:performance
```

### CI/CD Pipeline
```bash
# Optimized for CI environments
pnpm test:ci
```

## Configuration

### Environment Variables
```bash
# Test environment
NODE_ENV=test

# Browser selection
BROWSER=chromium|firefox|webkit

# Display mode
HEADLESS=true|false

# Application URL
BASE_URL=http://localhost:3000

# Fail fast (stop on first failure)
FAIL_FAST=true|false
```

### Custom Test Profiles
The `cucumber.config.js` includes multiple profiles:
- **default**: Full test suite
- **smoke**: Quick critical path tests
- **api**: API-focused testing
- **web**: UI-focused testing
- **performance**: Performance benchmarks
- **ci**: CI/CD optimized

## Debugging Tests

### Take Screenshots
```gherkin
When I take a screenshot named "debug-issue"
```

### Browser Developer Tools
```bash
# Run with headed browser for debugging
HEADLESS=false pnpm test:web
```

### Verbose Logging
```bash
# Enable detailed logging
DEBUG=pw:api pnpm test:e2e
```

## Test Data Management

### Database Seeding
```bash
# Seed test data
pnpm seed
```

### Expected Test Data
The tests expect the following trips in the database:
- **GALR**: Gale Reef ($799.00)
- **DAWR**: Dawson's Reef ($1199.00)  
- **CLAR**: Claire's REEF ($1399.00)

## Best Practices

### Writing Tests
1. **Use descriptive scenario names**
2. **Keep steps atomic and reusable**
3. **Follow the Given-When-Then pattern**
4. **Add appropriate tags for categorization**
5. **Include both positive and negative scenarios**

### Performance Considerations
1. **Use headless mode for faster execution**
2. **Parallelize compatible tests**
3. **Clean up resources in After hooks**
4. **Minimize network requests in setup**

### Maintenance
1. **Update test data when application changes**
2. **Keep environment configurations current**
3. **Review and update timeouts as needed**
4. **Maintain consistent step definitions**

## Troubleshooting

### Common Issues

**Server Not Running**
```bash
# Ensure Express server is running
pnpm start
# Then run tests
pnpm test:smoke
```

**Port Conflicts**
```bash
# Change base URL if needed
BASE_URL=http://localhost:3001 pnpm test:e2e
```

**Browser Launch Failures**
```bash
# Install Playwright browsers
pnpm exec playwright install
```

**Database Connection Issues**
```bash
# Verify MongoDB is running
# Check connection string in .env
# Run database seed script
pnpm seed
```

### Getting Help
1. Check the console output for specific error messages
2. Review the generated HTML report for detailed failure information
3. Use headed mode (`HEADLESS=false`) to visually debug issues
4. Take screenshots at failure points for analysis

## Contributing

When adding new tests:
1. Follow existing patterns in step definitions
2. Use appropriate tags (@api, @web, @database, @performance, @smoke)
3. Add both positive and negative test scenarios
4. Update this README if adding new test categories
5. Ensure tests are idempotent and can run in any order