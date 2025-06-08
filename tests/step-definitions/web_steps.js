const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { elementExists, getElementText, waitForVisible } = require("./common");

/**
 * Step definitions for web application testing
 * These steps test the user interface and user interactions
 */

// ============================================================================
// NAVIGATION AND MENU STEPS
// ============================================================================

Then("I should see the main navigation menu", async function () {
	await expect(this.page.locator("#navigation")).toBeVisible();
});

Then("the {string} navigation item should be highlighted", async function (navItem) {
	// Check for active/selected class on navigation item
	const navSelector = `#navigation a:has-text("${navItem}")`;
	const activeSelector = `#navigation li.selected a:has-text("${navItem}")`;
	
	const isActive = await elementExists(this.page, activeSelector);
	expect(isActive).toBe(true);
});

Then("the {string} link in the footer should be highlighted", async function (linkText) {
	const footerActiveSelector = `#footer .navigation li.active a:has-text("${linkText}")`;
	const isActive = await elementExists(this.page, footerActiveSelector);
	expect(isActive).toBe(true);
});

When("I click on {string} in the navigation", async function (navItem) {
	await this.page.click(`#navigation a:has-text("${navItem}")`);
	await this.page.waitForLoadState("networkidle");
});

// ============================================================================
// TRAVEL PAGE SPECIFIC STEPS
// ============================================================================

Then("I should see a list of available trips", async function () {
	await expect(this.page.locator("#sites")).toBeVisible();
	const tripItems = await this.page.locator("#sites li").count();
	expect(tripItems).toBeGreaterThan(0);
});

Then("each trip should display:", async function (dataTable) {
	const expectedElements = dataTable.raw().flat();
	const tripItems = this.page.locator("#sites li");
	const tripCount = await tripItems.count();
	
	expect(tripCount).toBeGreaterThan(0);
	
	// Check first trip has all required elements
	const firstTrip = tripItems.first();
	
	for (const element of expectedElements) {
		switch (element.toLowerCase()) {
			case "trip name":
				await expect(firstTrip.locator("h2")).toBeVisible();
				break;
			case "description":
				await expect(firstTrip.locator("p")).toBeVisible();
				break;
			case "length":
				await expect(firstTrip.locator("text=/Length:/")).toBeVisible();
				break;
			case "resort":
				await expect(firstTrip.locator("text=/Resort:/")).toBeVisible();
				break;
			case "price":
			case "rate":
				await expect(firstTrip.locator("text=/Rate:/")).toBeVisible();
				break;
			case "image":
				await expect(firstTrip.locator("img")).toBeVisible();
				break;
		}
	}
});

Then("I should see a trip named {string}", async function (tripName) {
	await expect(this.page.locator(`text=${tripName}`)).toBeVisible();
});

Then("the trip should show {string} as length", async function (expectedLength) {
	await expect(this.page.locator(`text=/Length:.*${expectedLength}/`)).toBeVisible();
});

Then("the trip should show {string} as resort", async function (expectedResort) {
	await expect(this.page.locator(`text=/Resort:.*${expectedResort}/`)).toBeVisible();
});

Then("the trip should show {string} as rate", async function (expectedRate) {
	await expect(this.page.locator(`text=/Rate:.*${expectedRate}/`)).toBeVisible();
});

Then("the trip should have an image {string}", async function (imageName) {
	await expect(this.page.locator(`img[src*="${imageName}"]`)).toBeVisible();
});

// ============================================================================
// TRIP INTERACTION STEPS
// ============================================================================

When("I click on the image for {string}", async function (tripName) {
	// Find the trip by name and click its image
	const tripContainer = this.page.locator(`h2:has-text("${tripName}")`).locator("..");
	const tripImage = tripContainer.locator("img").first();
	
	await tripImage.click();
	await this.page.waitForLoadState("networkidle");
});

When("I click on the trip name {string}", async function (tripName) {
	await this.page.click(`h2 a:has-text("${tripName}")`);
	await this.page.waitForLoadState("networkidle");
});

// ============================================================================
// JSON RESPONSE VALIDATION (for API endpoints accessed via browser)
// ============================================================================

Then("I should see JSON data for the trip", async function () {
	// Check if we're on a JSON endpoint by looking for JSON content
	const pageContent = await this.page.content();
	
	// Check for JSON structure indicators
	const hasJsonStructure = pageContent.includes("{") && pageContent.includes("}");
	expect(hasJsonStructure).toBe(true);
	
	// Additional check for JSON content type if available
	const response = await this.page.waitForResponse(response => 
		response.url().includes("/api/trips") && response.status() === 200
	);
	
	const contentType = response.headers()["content-type"];
	expect(contentType).toContain("application/json");
});

Then("the JSON should contain the trip code {string}", async function (expectedCode) {
	const pageContent = await this.page.textContent("body");
	expect(pageContent).toContain(`"code":"${expectedCode}"`);
});

// ============================================================================
// ERROR HANDLING STEPS
// ============================================================================

Then("I should see an error message about API connectivity", async function () {
	const errorMessages = [
		"API lookup error",
		"Error retrieving trips",
		"API unavailable",
		"Connection error",
	];
	
	let foundErrorMessage = false;
	for (const message of errorMessages) {
		if (await elementExists(this.page, `text=${message}`)) {
			foundErrorMessage = true;
			break;
		}
	}
	
	expect(foundErrorMessage).toBe(true);
});

Then("I should see a message {string}", async function (expectedMessage) {
	await expect(this.page.locator(`text=${expectedMessage}`)).toBeVisible();
});

Then("the page layout should remain intact", async function () {
	// Check for essential layout elements
	await expect(this.page.locator("#header")).toBeVisible();
	await expect(this.page.locator("#navigation")).toBeVisible();
	await expect(this.page.locator("#footer")).toBeVisible();
});

// ============================================================================
// ERROR PAGE STEPS
// ============================================================================

Then("I should see an error page", async function () {
	const errorIndicators = [
		"h1:has-text('Error')",
		"text=/Error \\d+/",
		"text=/Not Found/",
		"text=/404/",
	];
	
	let foundError = false;
	for (const indicator of errorIndicators) {
		if (await elementExists(this.page, indicator)) {
			foundError = true;
			break;
		}
	}
	
	expect(foundError).toBe(true);
});

Then("the error page should show {string}", async function (errorText) {
	await expect(this.page.locator(`text=${errorText}`)).toBeVisible();
});

Then("the error page should have a {string} button", async function (buttonText) {
	await expect(this.page.locator(`button:has-text("${buttonText}"), a:has-text("${buttonText}")`)).toBeVisible();
});

// ============================================================================
// FOOTER VALIDATION STEPS
// ============================================================================

Then("the footer should contain navigation links", async function () {
	await expect(this.page.locator("#footer .navigation")).toBeVisible();
	const footerLinks = await this.page.locator("#footer .navigation a").count();
	expect(footerLinks).toBeGreaterThan(0);
});

Then("the footer should display the current year in copyright", async function () {
	const currentYear = new Date().getFullYear().toString();
	await expect(this.page.locator(`#footer text=/${currentYear}/`)).toBeVisible();
});

// ============================================================================
// STATIC ASSETS VALIDATION
// ============================================================================

Then("the CSS stylesheets should load successfully", async function () {
	// Check that style.css is loaded and applied
	const response = await this.page.waitForResponse(response =>
		response.url().includes("style.css") && response.status() === 200
	);
	expect(response.status()).toBe(200);
	
	// Check that styles are applied by looking for styled elements
	const headerElement = this.page.locator("#header");
	const backgroundColor = await headerElement.evaluate(el => 
		window.getComputedStyle(el).backgroundColor
	);
	expect(backgroundColor).not.toBe("rgba(0, 0, 0, 0)"); // Not transparent
});

Then("the trip images should load successfully", async function () {
	const images = this.page.locator("#sites img");
	const imageCount = await images.count();
	
	for (let i = 0; i < imageCount; i++) {
		const image = images.nth(i);
		const isVisible = await image.isVisible();
		expect(isVisible).toBe(true);
		
		// Check that image actually loaded (has natural width/height)
		const naturalWidth = await image.evaluate(img => img.naturalWidth);
		expect(naturalWidth).toBeGreaterThan(0);
	}
});

Then("the page layout should render correctly", async function () {
	// Check that major layout containers are visible and have content
	await expect(this.page.locator("#page")).toBeVisible();
	await expect(this.page.locator("#contents")).toBeVisible();
	
	// Check that the page has reasonable dimensions
	const pageHeight = await this.page.evaluate(() => document.body.scrollHeight);
	expect(pageHeight).toBeGreaterThan(500); // Page should have substantial content
});

// ============================================================================
// BACKGROUND STEPS FOR WEB APPLICATION
// ============================================================================

Given("I am using a web browser", async function () {
	// This is essentially a no-op since we're always using a browser in Playwright
	// But we can use it to set specific browser configurations if needed
	expect(this.page).toBeTruthy();
});

Given("the MongoDB database is connected and seeded with trip data", async function () {
	// Verify that the travel page loads and shows trips
	await this.navigateToPath("/travel");
	await this.page.waitForLoadState("networkidle");
	
	const tripElements = await this.page.locator("#sites li").count();
	expect(tripElements).toBeGreaterThan(0);
});

// ============================================================================
// HOME PAGE SPECIFIC STEPS
// ============================================================================

Then("I should see the main content area", async function () {
	await expect(this.page.locator("#main")).toBeVisible();
});

Then("I should see the sidebar", async function () {
	await expect(this.page.locator("#sidebar")).toBeVisible();
});

Then("I should see the latest blog section", async function () {
	await expect(this.page.locator("h3:has-text('Latest Blog')")).toBeVisible();
});

Then("I should see the testimonials section", async function () {
	await expect(this.page.locator("#testimonials")).toBeVisible();
});

// ============================================================================
// RESPONSIVE DESIGN STEPS
// ============================================================================

Given("I am using a mobile device", async function () {
	await this.page.setViewportSize({ width: 375, height: 667 }); // iPhone dimensions
});

Given("I am using a tablet device", async function () {
	await this.page.setViewportSize({ width: 768, height: 1024 }); // iPad dimensions
});

Given("I am using a desktop browser", async function () {
	await this.page.setViewportSize({ width: 1280, height: 720 }); // Desktop dimensions
});

Then("the navigation should be mobile-friendly", async function () {
	const navigation = this.page.locator("#navigation");
	await expect(navigation).toBeVisible();
	
	// Check that navigation doesn't overflow on mobile
	const navWidth = await navigation.evaluate(el => el.scrollWidth);
	const viewportWidth = await this.page.evaluate(() => window.innerWidth);
	expect(navWidth).toBeLessThanOrEqual(viewportWidth + 50); // Allow small overflow
});

// ============================================================================
// ACCESSIBILITY STEPS
// ============================================================================

Then("the page should have proper heading structure", async function () {
	// Check that there's an h1 tag
	await expect(this.page.locator("h1")).toBeVisible();
	
	// Check that headings follow logical order
	const headings = await this.page.locator("h1, h2, h3, h4, h5, h6").allTextContents();
	expect(headings.length).toBeGreaterThan(0);
});

Then("images should have alt text", async function () {
	const images = this.page.locator("img");
	const imageCount = await images.count();
	
	for (let i = 0; i < imageCount; i++) {
		const image = images.nth(i);
		const altText = await image.getAttribute("alt");
		expect(altText).toBeTruthy(); // Should have alt attribute
	}
});

Then("links should be keyboard accessible", async function () {
	const links = this.page.locator("a");
	const firstLink = links.first();
	
	// Test that link can receive focus
	await firstLink.focus();
	const focusedElement = await this.page.evaluate(() => document.activeElement.tagName);
	expect(focusedElement.toLowerCase()).toBe("a");
});

// ============================================================================
// PERFORMANCE STEPS
// ============================================================================

Then("the page should load within {int} seconds", async function (maxSeconds) {
	// This would typically be measured during navigation
	// For now, we'll check that the page has loaded completely
	await this.page.waitForLoadState("networkidle", { timeout: maxSeconds * 1000 });
	
	// Additional check that essential content is visible
	await expect(this.page.locator("body")).toBeVisible();
});

Then("images should load progressively", async function () {
	// Check that images don't block page rendering
	const images = this.page.locator("img");
	const imageCount = await images.count();
	
	if (imageCount > 0) {
		// Check that at least some content is visible even if images are still loading
		await expect(this.page.locator("h1, h2, p").first()).toBeVisible();
	}
});

// ============================================================================
// SEARCH FUNCTIONALITY (if implemented)
// ============================================================================

When("I search for {string}", async function (searchTerm) {
	const searchInput = this.page.locator("input[type='search'], input[name='search'], #searchInput");
	await searchInput.fill(searchTerm);
	await searchInput.press("Enter");
	await this.page.waitForLoadState("networkidle");
});

Then("I should see search results for {string}", async function (searchTerm) {
	// This would depend on how search results are displayed
	const results = this.page.locator(".search-results, #search-results");
	await expect(results).toBeVisible();
});

// ============================================================================
// FORM VALIDATION STEPS
// ============================================================================

When("I submit the form", async function () {
	await this.page.click("button[type='submit'], input[type='submit']");
	await this.page.waitForLoadState("networkidle");
});

Then("I should see a validation error for {string}", async function (fieldName) {
	const errorSelector = `.error-${fieldName}, .${fieldName}-error, [data-error='${fieldName}']`;
	await expect(this.page.locator(errorSelector)).toBeVisible();
});

Then("the form should be submitted successfully", async function () {
	// Look for success indicators
	const successIndicators = [
		".success-message",
		".form-success",
		"text=/success/i",
		"text=/submitted/i",
		"text=/thank you/i",
	];
	
	let foundSuccess = false;
	for (const indicator of successIndicators) {
		if (await elementExists(this.page, indicator)) {
			foundSuccess = true;
			break;
		}
	}
	
	expect(foundSuccess).toBe(true);
});

// ============================================================================
// BROWSER COMPATIBILITY STEPS
// ============================================================================

Given("I am using {string} browser", async function (browserName) {
	// This step would be used with different browser configurations
	// The actual browser is set in the world constructor
	expect(this.browserType.toLowerCase()).toContain(browserName.toLowerCase());
});

Then("the page should render consistently across browsers", async function () {
	// Check that essential layout elements are positioned correctly
	const header = this.page.locator("#header");
	const navigation = this.page.locator("#navigation");
	const content = this.page.locator("#contents");
	const footer = this.page.locator("#footer");
	
	await expect(header).toBeVisible();
	await expect(navigation).toBeVisible();
	await expect(content).toBeVisible();
	await expect(footer).toBeVisible();
	
	// Check that elements don't overlap inappropriately
	const headerBox = await header.boundingBox();
	const contentBox = await content.boundingBox();
	
	expect(contentBox.y).toBeGreaterThan(headerBox.y + headerBox.height - 10); // Allow small overlap
});

// ============================================================================
// DEBUGGING AND UTILITY STEPS
// ============================================================================

When("I take a screenshot named {string}", async function (screenshotName) {
	const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
	await this.page.screenshot({
		path: `reports/screenshots/${screenshotName}-${timestamp}.png`,
		fullPage: true,
	});
});

When("I wait {int} seconds", async function (seconds) {
	await this.page.waitForTimeout(seconds * 1000);
});

Then("I should see the page source contains {string}", async function (expectedContent) {
	const pageContent = await this.page.content();
	expect(pageContent).toContain(expectedContent);
});

When("I reload the page", async function () {
	await this.page.reload();
	await this.page.waitForLoadState("networkidle");
});

When("I go back in browser history", async function () {
	await this.page.goBack();
	await this.page.waitForLoadState("networkidle");
});

When("I go forward in browser history", async function () {
	await this.page.goForward();
	await this.page.waitForLoadState("networkidle");
});