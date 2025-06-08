const config = {
	default: {
		// Feature files location
		paths: ["tests/features/**/*.feature"],
		
		// Step definitions location
		require: [
			"tests/step-definitions/**/*.js",
			"tests/support/**/*.js"
		],
		
		// Formatters for output
		format: [
			"@cucumber/pretty-formatter",
			"json:reports/cucumber-report.json",
			"html:reports/cucumber-report.html"
		],
		
		// Parallel execution
		parallel: 2,
		
		// Retry failed scenarios
		retry: 1,
		
		// Tags to run specific scenarios
		tags: "not @skip and not @manual",
		
		// World parameters for sharing data between steps
		worldParameters: {
			browser: process.env.BROWSER || "chromium",
			headless: process.env.HEADLESS !== "false",
			baseUrl: process.env.BASE_URL || "http://localhost:3000",
			timeout: 30000,
			slowMo: process.env.HEADLESS === "false" ? 100 : 0
		},
		
		// Configure timeouts
		timeout: 60000, // 1 minute timeout for steps
		
		// Fail fast on first failure (useful for debugging)
		failFast: process.env.FAIL_FAST === "true",
		
		// Exit after first failure (for CI environments)
		strict: process.env.NODE_ENV === "ci"
	},
	
	// Smoke test profile
	smoke: {
		paths: ["tests/features/**/*.feature"],
		require: [
			"tests/step-definitions/**/*.js",
			"tests/support/**/*.js"
		],
		format: [
			"@cucumber/pretty-formatter",
			"json:reports/smoke-test-report.json"
		],
		parallel: 1,
		retry: 0,
		tags: "@smoke and not @skip",
		worldParameters: {
			browser: process.env.BROWSER || "chromium",
			headless: true,
			baseUrl: process.env.BASE_URL || "http://localhost:3000",
			timeout: 15000
		}
	},
	
	// API test profile
	api: {
		paths: ["tests/features/api_*.feature"],
		require: [
			"tests/step-definitions/**/*.js",
			"tests/support/**/*.js"
		],
		format: [
			"@cucumber/pretty-formatter",
			"json:reports/api-test-report.json"
		],
		parallel: 3,
		retry: 1,
		tags: "@api and not @skip",
		worldParameters: {
			browser: "chromium",
			headless: true,
			baseUrl: process.env.BASE_URL || "http://localhost:3000",
			timeout: 20000
		}
	},
	
	// Web application test profile
	web: {
		paths: ["tests/features/web_*.feature"],
		require: [
			"tests/step-definitions/**/*.js",
			"tests/support/**/*.js"
		],
		format: [
			"@cucumber/pretty-formatter",
			"json:reports/web-test-report.json"
		],
		parallel: 2,
		retry: 1,
		tags: "@web and not @skip",
		worldParameters: {
			browser: process.env.BROWSER || "chromium",
			headless: process.env.HEADLESS !== "false",
			baseUrl: process.env.BASE_URL || "http://localhost:3000",
			timeout: 30000,
			slowMo: process.env.HEADLESS === "false" ? 100 : 0
		}
	},
	
	// Performance test profile
	performance: {
		paths: ["tests/features/performance_*.feature"],
		require: [
			"tests/step-definitions/**/*.js",
			"tests/support/**/*.js"
		],
		format: [
			"@cucumber/pretty-formatter",
			"json:reports/performance-test-report.json"
		],
		parallel: 1,
		retry: 0,
		tags: "@performance and not @skip",
		worldParameters: {
			browser: "chromium",
			headless: true,
			baseUrl: process.env.BASE_URL || "http://localhost:3000",
			timeout: 60000
		}
	},
	
	// CI/CD profile
	ci: {
		paths: ["tests/features/**/*.feature"],
		require: [
			"tests/step-definitions/**/*.js",
			"tests/support/**/*.js"
		],
		format: [
			"json:reports/ci-test-report.json",
			"@cucumber/pretty-formatter"
		],
		parallel: 4,
		retry: 2,
		tags: "not @skip and not @manual and not @slow",
		worldParameters: {
			browser: "chromium",
			headless: true,
			baseUrl: process.env.BASE_URL || "http://localhost:3000",
			timeout: 45000
		},
		strict: true,
		failFast: false
	}
};

module.exports = config;