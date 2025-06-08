const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

/**
 * Common step definitions and helper functions for consistent testing patterns
 * This file contains reusable steps that can be shared across different feature files
 */

// ============================================================================
// NAVIGATION STEPS
// ============================================================================

Given("I am on the home page", async function () {
	await this.navigateToPath("/");
	await this.page.waitForLoadState("networkidle");
});

Given("I am on the {string} page", async function (pageName) {
	const pathMap = {
		home: "/",
		travel: "/travel",
		rooms: "/rooms",
		meals: "/meals",
		news: "/news",
		about: "/about",
		contact: "/contact",
	};
	
	const path = pathMap[pageName.toLowerCase()] || `/${pageName}`;
	await this.navigateToPath(path);
	await this.page.waitForLoadState("networkidle");
});

When("I navigate to {string}", async function (path) {
	await this.navigateToPath(path);
	await this.page.waitForLoadState("networkidle");
});

When("I visit {string}", async function (url) {
	if (url.startsWith("http")) {
		await this.page.goto(url);
	} else {
		await this.navigateToPath(url);
	}
	await this.page.waitForLoadState("networkidle");
});

// ============================================================================
// PAGE VALIDATION STEPS
// ============================================================================

Then("the page should load successfully", async function () {
	// Check that we don't have any obvious error indicators
	const errorElements = await this.page.locator("text=/error|404|500|not found/i").count();
	expect(errorElements).toBe(0);
	
	// Check that the page has loaded (has a title)
	const title = await this.page.title();
	expect(title).toBeTruthy();
	expect(title.length).toBeGreaterThan(0);
});

Then("the page title should contain {string}", async function (expectedTitle) {
	const title = await this.page.title();
	expect(title).toContain(expectedTitle);
});

Then("the page title should be {string}", async function (expectedTitle) {
	const title = await this.page.title();
	expect(title).toBe(expectedTitle);
});

// ============================================================================
// ELEMENT INTERACTION STEPS
// ============================================================================

When("I click on {string}", async function (text) {
	await this.page.click(`text=${text}`);
	await this.page.waitForLoadState("networkidle");
});

When("I click the {string} button", async function (buttonText) {
	await this.page.click(`button:has-text("${buttonText}")`);
	await this.page.waitForLoadState("networkidle");
});

When("I click the {string} link", async function (linkText) {
	await this.page.click(`a:has-text("${linkText}")`);
	await this.page.waitForLoadState("networkidle");
});

When("I fill {string} with {string}", async function (field, value) {
	await this.page.fill(`[name="${field}"], [id="${field}"], label:has-text("${field}") >> input`, value);
});

// ============================================================================
// ELEMENT VISIBILITY STEPS
// ============================================================================

Then("I should see {string}", async function (text) {
	await expect(this.page.locator(`text=${text}`)).toBeVisible();
});

Then("I should not see {string}", async function (text) {
	await expect(this.page.locator(`text=${text}`)).not.toBeVisible();
});

Then("I should see the {string} element", async function (selector) {
	await expect(this.page.locator(selector)).toBeVisible();
});

Then("I should see an element containing {string}", async function (text) {
	await expect(this.page.locator(`*:has-text("${text}")`).first()).toBeVisible();
});

// ============================================================================
// CONTENT VALIDATION STEPS
// ============================================================================

Then("the page should contain {string}", async function (expectedContent) {
	await expect(this.page.locator(`text=${expectedContent}`)).toBeVisible();
});

Then("the page should not contain {string}", async function (unexpectedContent) {
	await expect(this.page.locator(`text=${unexpectedContent}`)).not.toBeVisible();
});

// ============================================================================
// URL VALIDATION STEPS
// ============================================================================

Then("I should be on {string}", async function (expectedPath) {
	const currentUrl = this.page.url();
	const currentPath = new URL(currentUrl).pathname;
	expect(currentPath).toBe(expectedPath);
});

Then("I should be redirected to {string}", async function (expectedPath) {
	await this.page.waitForURL(`**${expectedPath}`);
	const currentUrl = this.page.url();
	const currentPath = new URL(currentUrl).pathname;
	expect(currentPath).toBe(expectedPath);
});

Then("the URL should contain {string}", async function (expectedUrlPart) {
	const currentUrl = this.page.url();
	expect(currentUrl).toContain(expectedUrlPart);
});

// ============================================================================
// FORM VALIDATION STEPS
// ============================================================================

Then("the {string} field should contain {string}", async function (fieldName, expectedValue) {
	const field = this.page.locator(`[name="${fieldName}"], [id="${fieldName}"]`);
	const value = await field.inputValue();
	expect(value).toBe(expectedValue);
});

Then("the {string} field should be empty", async function (fieldName) {
	const field = this.page.locator(`[name="${fieldName}"], [id="${fieldName}"]`);
	const value = await field.inputValue();
	expect(value).toBe("");
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Helper function to wait for API response
 * @param {Object} page - Playwright page object
 * @param {string} urlPattern - URL pattern to wait for
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Response>} - The response object
 */
async function waitForApiResponse(page, urlPattern, timeout = 10000) {
	return await page.waitForResponse(
		response => response.url().includes(urlPattern) && response.status() === 200,
		{ timeout }
	);
}

/**
 * Helper function to check if an element exists without throwing
 * @param {Object} page - Playwright page object
 * @param {string} selector - CSS selector or text selector
 * @returns {Promise<boolean>} - True if element exists
 */
async function elementExists(page, selector) {
	try {
		await page.waitForSelector(selector, { timeout: 1000 });
		return true;
	} catch {
		return false;
	}
}

/**
 * Helper function to get element text content safely
 * @param {Object} page - Playwright page object
 * @param {string} selector - CSS selector
 * @returns {Promise<string|null>} - Element text or null if not found
 */
async function getElementText(page, selector) {
	try {
		const element = await page.locator(selector).first();
		return await element.textContent();
	} catch {
		return null;
	}
}

/**
 * Helper function to wait for element to be visible
 * @param {Object} page - Playwright page object
 * @param {string} selector - CSS selector
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<boolean>} - True if element becomes visible
 */
async function waitForVisible(page, selector, timeout = 5000) {
	try {
		await page.waitForSelector(selector, { state: "visible", timeout });
		return true;
	} catch {
		return false;
	}
}

/**
 * Helper function to scroll element into view
 * @param {Object} page - Playwright page object
 * @param {string} selector - CSS selector
 * @returns {Promise<void>}
 */
async function scrollIntoView(page, selector) {
	await page.locator(selector).scrollIntoViewIfNeeded();
}

/**
 * Helper function to take screenshot with custom name
 * @param {Object} world - Cucumber world object
 * @param {string} name - Screenshot name
 * @returns {Promise<void>}
 */
async function takeScreenshot(world, name) {
	const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
	await world.page.screenshot({
		path: `reports/screenshots/${name}-${timestamp}.png`,
		fullPage: true,
	});
}

/**
 * Helper function to get current timestamp for debugging
 * @returns {string} - Formatted timestamp
 */
function getTimestamp() {
	return new Date().toISOString();
}

/**
 * Helper function to create a data table from Cucumber table
 * @param {Object} dataTable - Cucumber data table
 * @returns {Array<Object>} - Array of objects representing table rows
 */
function parseDataTable(dataTable) {
	const rows = dataTable.hashes();
	return rows;
}

/**
 * Helper function to validate response status codes
 * @param {number} actualStatus - Actual HTTP status code
 * @param {number} expectedStatus - Expected HTTP status code
 * @throws {Error} - If status codes don't match
 */
function validateStatusCode(actualStatus, expectedStatus) {
	if (actualStatus !== expectedStatus) {
		throw new Error(`Expected status ${expectedStatus}, but got ${actualStatus}`);
	}
}

/**
 * Helper function to validate JSON response structure
 * @param {Object} jsonResponse - JSON response object
 * @param {Array<string>} requiredFields - Array of required field names
 * @throws {Error} - If required fields are missing
 */
function validateJsonStructure(jsonResponse, requiredFields) {
	for (const field of requiredFields) {
		if (!(field in jsonResponse)) {
			throw new Error(`Required field '${field}' is missing from JSON response`);
		}
	}
}

// Export helper functions for use in other step definition files
module.exports = {
	waitForApiResponse,
	elementExists,
	getElementText,
	waitForVisible,
	scrollIntoView,
	takeScreenshot,
	getTimestamp,
	parseDataTable,
	validateStatusCode,
	validateJsonStructure,
};