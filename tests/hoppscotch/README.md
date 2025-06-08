# Hoppscotch CLI Commands for SNHU CS-465 API Testing

This document provides the CLI commands to run the various test collections for your Module 5 API implementation.

## Prerequisites

```bash
# Install Hoppscotch CLI
npm install -g @hoppscotch/cli

# Verify installation
hopp --version
```

## Basic Test Execution

### Run Main API Test Suite
```bash
# Run all tests with development environment
hopp test --env dev.hoppenv.json travlr-api-tests.json

# Run tests with verbose output
hopp test --env dev.hoppenv.json --verbose travlr-api-tests.json

# Run tests and generate JSON report
hopp test --env dev.hoppenv.json --reporter json --output test-results.json travlr-api-tests.json
```

### Quick Smoke Tests
```bash
# Run basic connectivity tests
hopp test --env dev.hoppenv.json smoke-tests.json

# Run smoke tests with custom timeout
hopp test --env dev.hoppenv.json --timeout 10000 smoke-tests.json
```

## Environment-Specific Testing

### Development Environment
```bash
hopp test --env dev.hoppenv.json travlr-api-tests.json
```

### Staging Environment
```bash
hopp test --env staging.hoppenv.json travlr-api-tests.json
```

### Production Environment
```bash
hopp test --env prod.hoppenv.json travlr-api-tests.json
```

## Performance Testing

### Basic Performance Tests
```bash
# Run performance tests with 50 iterations
hopp test --env dev.hoppenv.json --iterations 50 performance-tests.json

# Performance tests with delay between requests
hopp test --env dev.hoppenv.json --iterations 50 --delay 100 performance-tests.json
```

### Load Testing
```bash
# Concurrent load testing (10 concurrent requests, 20 iterations each)
hopp test --env dev.hoppenv.json --concurrent 10 --iterations 20 load-tests.json

# Heavy load testing
hopp test --env dev.hoppenv.json --concurrent 20 --iterations 50 load-tests.json
```

## Specialized Test Collections

### Contract Validation
```bash
# Validate API contract compliance
hopp test --env dev.hoppenv.json contract-validation-tests.json

# Contract validation with strict mode
hopp test --env dev.hoppenv.json --strict contract-validation-tests.json
```

### Custom Configuration
```bash
# Run tests with custom configuration
hopp test --config custom-config.json travlr-api-tests.json

# Override specific settings
hopp test --env dev.hoppenv.json --timeout 15000 --retry 5 travlr-api-tests.json
```

## Report Generation

### JSON Reports
```bash
# Generate detailed JSON report
hopp test --env dev.hoppenv.json --reporter json --output results.json travlr-api-tests.json

# Generate minimal JSON report
hopp test --env dev.hoppenv.json --reporter json-minimal --output results-minimal.json travlr-api-tests.json
```

### Console Reports
```bash
# Verbose console output
hopp test --env dev.hoppenv.json --reporter console --verbose travlr-api-tests.json

# Quiet mode (errors only)
hopp test --env dev.hoppenv.json --reporter console --quiet travlr-api-tests.json
```

## CI/CD Integration Commands

### Basic CI Pipeline
```bash
# Exit with appropriate codes for CI/CD
hopp test --env staging.hoppenv.json --reporter json --output ci-results.json travlr-api-tests.json
echo "Exit code: $?"
```

### Full Test Suite for CI
```bash
#!/bin/bash
# Full test suite for CI/CD pipeline

echo "Running smoke tests..."
hopp test --env staging.hoppenv.json smoke-tests.json || exit 1

echo "Running main API tests..."
hopp test --env staging.hoppenv.json --reporter json --output api-test-results.json travlr-api-tests.json || exit 1

echo "Running performance tests..."
hopp test --env staging.hoppenv.json --iterations 10 performance-tests.json || exit 1

echo "Running contract validation..."
hopp test --env staging.hoppenv.json contract-validation-tests.json || exit 1

echo "All tests passed!"
```

## Development Workflow Commands

### Quick Development Check
```bash
# Fast check during development
hopp test --env dev.hoppenv.json smoke-tests.json && \
hopp test --env dev.hoppenv.json --folder "Smoke Tests" travlr-api-tests.json
```

### Pre-commit Testing
```bash
# Comprehensive pre-commit test suite
hopp test --env dev.hoppenv.json travlr-api-tests.json && \
hopp test --env dev.hoppenv.json contract-validation-tests.json && \
hopp test --env dev.hoppenv.json --iterations 10 performance-tests.json
```

### Debug Mode
```bash
# Run tests with debug information
hopp test --env dev.hoppenv.json --verbose --debug travlr-api-tests.json

# Test specific folder only
hopp test --env dev.hoppenv.json --folder "Error Handling" travlr-api-tests.json
```

## Example Test Results

After running tests, you'll see output like:

```
✅ Get All Trips - Success (156ms)
✅ Get Trip by Code - GALR (89ms)  
✅ Get Trip by Code - DAWR (92ms)
❌ Get Trip - Invalid Code (45ms)
   └─ Status code is 404 ✅
   └─ Response contains error message ✅

Tests: 15 passed, 0 failed
Duration: 2.3s
```

## Troubleshooting

### Common Issues
```bash
# If tests fail due to server not running
echo "Make sure Express server is running on port 3000"
npm start

# If environment variables are not loading
hopp test --env dev.hoppenv.json --verbose travlr-api-tests.json

# If timeout issues occur
hopp test --timeout 30000 --env dev.hoppenv.json travlr-api-tests.json
```

### Verify Setup
```bash
# Test basic connectivity
curl http://localhost:3000/api/trips

# Verify environment file
cat dev.hoppenv.json

# Check test collection structure
hopp test --dry-run travlr-api-tests.json
```