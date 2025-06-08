# 🚀 Quick Start Guide - SNHU CS-465 Testing

Get your testing environment up and running in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] MongoDB running locally
- [ ] Express application working (`pnpm start`)

## 1. Install Dependencies

```bash
# Install all dependencies (includes test setup)
pnpm install

# Install Hoppscotch CLI globally  
pnpm install -g @hoppscotch/cli

# Install Playwright browsers
npx playwright install
```

## 2. Setup Test Environment

```bash
# Run the automated setup script
pnpm setup:tests

# Seed the database with test data
pnpm seed

# Start the application server
pnpm start
```

## 3. Run Your First Tests

### Quick Smoke Test (30 seconds)
```bash
pnpm test:smoke
```

### API Tests with Hoppscotch (1 minute)
```bash
pnpm test:hoppscotch:smoke
```

### Web Application Tests (2 minutes)
```bash
HEADLESS=false pnpm test:web
```

## 4. Generate Test Report

```bash
# Run tests and create HTML report
pnpm test:e2e:report

# View the report
pnpm reports:open
```

## 🎯 Development Workflow

### During Development
```bash
# Quick validation
pnpm test:dev

# API-only testing
pnpm test:hoppscotch

# Web-only testing  
pnpm test:web
```

### Before Committing
```bash
# Complete test suite
pnpm test:full

# Or CI-optimized tests
pnpm test:ci
```

### Debugging Issues
```bash
# Visual debugging with browser
HEADLESS=false pnpm test:web

# Take screenshots during tests
# (screenshots saved to reports/screenshots/)
```

## 📊 Understanding Test Results

### Cucumber Reports
- **Location**: `reports/cucumber-report.html`
- **Contains**: Step-by-step results, screenshots, timing
- **Best for**: Debugging test failures

### Hoppscotch Results
- **Location**: `reports/hoppscotch-results.json`  
- **Contains**: API response times, status codes
- **Best for**: API performance analysis

## 🏷️ Test Categories

| Tag | Purpose | Command |
|-----|---------|---------|
| `@smoke` | Critical path validation | `pnpm test:smoke` |
| `@api` | RESTful API testing | `pnpm test:api` |
| `@web` | User interface testing | `pnpm test:web` |
| `@database` | Database integration | `pnpm test:database` |
| `@performance` | Load & speed testing | `pnpm test:performance` |

## 🛠️ Troubleshooting

### "Server not accessible"
```bash
pnpm start  # Start the Express server
```

### "No trips found"
```bash
pnpm seed  # Populate test data
```

### "Browser launch failed"
```bash
npx playwright install  # Install browsers
```

### "Hoppscotch command not found"
```bash
pnpm install -g @hoppscotch/cli
```

## 📁 Project Structure

```
tests/
├── features/           # Test scenarios in Gherkin
├── step-definitions/   # Test implementation
├── hoppscotch/         # API test collections
└── support/           # Test configuration

reports/               # Generated test results
├── cucumber-report.html
├── screenshots/
└── hoppscotch-results.json
```

## 🔧 Configuration

### Environment Variables
```bash
# Browser choice
BROWSER=chromium|firefox|webkit

# Display mode  
HEADLESS=true|false

# Application URL
BASE_URL=http://localhost:3000

# Test environment
NODE_ENV=test
```

### Custom Test Data
Edit `tests/hoppscotch/dev.hoppenv.json` to modify:
- API endpoints
- Expected trip counts
- Performance thresholds
- Test trip codes

## 🎭 Test Examples

### API Testing
```gherkin
Scenario: Get all trips
  When I send a GET request to "/api/trips"
  Then the response status should be 200
  And the response should contain 3 trips
```

### Web Testing  
```gherkin
Scenario: Travel page loads
  When I navigate to "/travel"
  Then the page should load successfully
  And I should see a list of available trips
```

### Performance Testing
```bash
# 50 iterations for performance baseline
pnpm test:hoppscotch:performance

# 200 concurrent requests (10x20)
pnpm test:hoppscotch:load
```

## 🚀 Next Steps

1. **Explore the features**: Check `tests/features/` for all available test scenarios
2. **Customize environments**: Modify `tests/hoppscotch/*.hoppenv.json` for different environments
3. **Add your own tests**: Follow patterns in existing step definitions
4. **Integrate with CI/CD**: Use `pnpm test:ci` in your pipeline
5. **Performance monitoring**: Set up regular `pnpm test:performance` runs

## 📚 Additional Resources

- **Detailed docs**: See `tests/README.md` for comprehensive documentation
- **Hoppscotch guide**: Check `tests/hoppscotch/README.md` for CLI usage
- **Step definitions**: Browse `tests/step-definitions/` for implementation examples
- **Gherkin syntax**: Visit [Cucumber documentation](https://cucumber.io/docs/gherkin/)

---

**Need help?** Check the setup script output: `pnpm setup:tests`