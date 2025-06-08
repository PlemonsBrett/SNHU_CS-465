const { setWorldConstructor, Before, After } = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");

/**
 * Custom World class that provides browser automation capabilities
 * This class is instantiated for each scenario and provides shared context
 */
class CustomWorld {
	constructor({ parameters }) {
		// Store configuration parameters
		this.parameters = parameters;
		this.browser = null;
		this.context = null;
		this.page = null;
		
		// Default timeout for operations
		this.timeout = 30000;
		
		// Base URL for the application
		this.baseUrl = parameters.baseUrl || "http://localhost:3000";
		
		// Browser type selection
		this.browserType = parameters.browser || "chromium";
		this.isHeadless = parameters.headless !== false;
	}

	/**
	 * Initialize browser instance based on configuration
	 * @returns {Promise<void>}
	 */
	async initializeBrowser() {
		// Select browser based on configuration
		let browserEngine;
		switch (this.browserType.toLowerCase()) {
			case "firefox":
				browserEngine = firefox;
				break;
			case "webkit":
			case "safari":
				browserEngine = webkit;
				break;
			case "chromium":
			case "chrome":
			default:
				browserEngine = chromium;
				break;
		}

		// Launch browser with configuration
		this.browser = await browserEngine.launch({
			headless: this.isHeadless,
			slowMo: 50, // Slow down operations for better visibility in non-headless mode
		});

		// Create browser context with common settings
		this.context = await this.browser.newContext({
			viewport: { width: 1280, height: 720 },
			ignoreHTTPSErrors: true,
		});

		// Create new page
		this.page = await this.context.newPage();
		
		// Set default timeout
		this.page.setDefaultTimeout(this.timeout);
	}

	/**
	 * Navigate to a specific path relative to base URL
	 * @param {string} path - The path to navigate to
	 * @returns {Promise<void>}
	 */
	async navigateToPath(path = "/") {
		const fullUrl = `${this.baseUrl}${path}`;
		await this.page.goto(fullUrl);
	}

	/**
	 * Clean up browser resources
	 * @returns {Promise<void>}
	 */
	async cleanup() {
		if (this.page) {
			await this.page.close();
		}
		if (this.context) {
			await this.context.close();
		}
		if (this.browser) {
			await this.browser.close();
		}
	}

	/**
	 * Take a screenshot for debugging purposes
	 * @param {string} name - Name for the screenshot file
	 * @returns {Promise<void>}
	 */
	async takeScreenshot(name = "screenshot") {
		if (this.page) {
			const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
			await this.page.screenshot({
				path: `reports/screenshots/${name}-${timestamp}.png`,
				fullPage: true,
			});
		}
	}
}

// Set the custom world constructor
setWorldConstructor(CustomWorld);

// Before hook - runs before each scenario
Before(async function () {
	await this.initializeBrowser();
});

// After hook - runs after each scenario
After(async function (scenario) {
	// Take screenshot if scenario failed
	if (scenario.result.status === "FAILED") {
		await this.takeScreenshot(`failed-${scenario.pickle.name.replace(/\s+/g, "-")}`);
	}
	
	// Clean up browser resources
	await this.cleanup();
}); 