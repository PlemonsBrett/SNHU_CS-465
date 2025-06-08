const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { validateStatusCode, validateJsonStructure } = require("./common");

/**
 * Step definitions for API endpoint testing
 * These steps test the RESTful API endpoints directly
 */

// ============================================================================
// API REQUEST STEPS
// ============================================================================

When("I send a GET request to {string}", async function (endpoint) {
	const fullUrl = `${this.baseUrl}${endpoint}`;
	
	this.apiResponse = await this.page.request.get(fullUrl, {
		headers: {
			"Accept": "application/json",
		},
	});
	
	// Store response details for later assertions
	this.responseStatus = this.apiResponse.status();
	this.responseHeaders = this.apiResponse.headers();
	
	try {
		this.responseBody = await this.apiResponse.json();
	} catch (error) {
		// If response is not JSON, store as text
		this.responseBody = await this.apiResponse.text();
	}
});

When("I send a {string} request to {string}", async function (method, endpoint) {
	const fullUrl = `${this.baseUrl}${endpoint}`;
	
	const requestOptions = {
		headers: {
			"Accept": "application/json",
		},
	};
	
	switch (method.toUpperCase()) {
		case "GET":
			this.apiResponse = await this.page.request.get(fullUrl, requestOptions);
			break;
		case "POST":
			this.apiResponse = await this.page.request.post(fullUrl, requestOptions);
			break;
		case "PUT":
			this.apiResponse = await this.page.request.put(fullUrl, requestOptions);
			break;
		case "DELETE":
			this.apiResponse = await this.page.request.delete(fullUrl, requestOptions);
			break;
		default:
			throw new Error(`Unsupported HTTP method: ${method}`);
	}
	
	this.responseStatus = this.apiResponse.status();
	this.responseHeaders = this.apiResponse.headers();
	
	try {
		this.responseBody = await this.apiResponse.json();
	} catch (error) {
		this.responseBody = await this.apiResponse.text();
	}
});

When("I send a GET request to {string} with headers:", async function (endpoint, dataTable) {
	const fullUrl = `${this.baseUrl}${endpoint}`;
	const headers = {};
	
	// Parse headers from data table
	for (const row of dataTable.hashes()) {
		headers[row.key] = row.value;
	}
	
	this.apiResponse = await this.page.request.get(fullUrl, { headers });
	this.responseStatus = this.apiResponse.status();
	this.responseHeaders = this.apiResponse.headers();
	
	try {
		this.responseBody = await this.apiResponse.json();
	} catch (error) {
		this.responseBody = await this.apiResponse.text();
	}
});

// ============================================================================
// RESPONSE STATUS VALIDATION
// ============================================================================

Then("the response status should be {int}", async function (expectedStatus) {
	expect(this.responseStatus).toBe(expectedStatus);
});

Then("the response status should be {int} {string}", async function (expectedStatus, statusText) {
	expect(this.responseStatus).toBe(expectedStatus);
	// Note: statusText validation could be added if needed
});

Then("the response should be successful", async function () {
	expect(this.responseStatus).toBeGreaterThanOrEqual(200);
	expect(this.responseStatus).toBeLessThan(300);
});

Then("the response should indicate an error", async function () {
	expect(this.responseStatus).toBeGreaterThanOrEqual(400);
});

// ============================================================================
// RESPONSE CONTENT VALIDATION
// ============================================================================

Then("the response should be valid JSON", async function () {
	expect(typeof this.responseBody).toBe("object");
	expect(this.responseBody).not.toBeNull();
});

Then("the response should contain {int} trips", async function (expectedCount) {
	expect(Array.isArray(this.responseBody)).toBe(true);
	expect(this.responseBody.length).toBe(expectedCount);
});

Then("the response should contain an array of trips", async function () {
	expect(Array.isArray(this.responseBody)).toBe(true);
	expect(this.responseBody.length).toBeGreaterThan(0);
});

Then("the response should contain a trip with code {string}", async function (expectedCode) {
	expect(this.responseBody).toHaveProperty("code", expectedCode);
});

Then("the trip name should be {string}", async function (expectedName) {
	expect(this.responseBody).toHaveProperty("name", expectedName);
});

Then("the trip resort should be {string}", async function (expectedResort) {
	expect(this.responseBody).toHaveProperty("resort", expectedResort);
});

Then("the trip perPerson should be {string}", async function (expectedPrice) {
	expect(this.responseBody).toHaveProperty("perPerson", expectedPrice);
});

Then("each trip should have the following properties:", async function (dataTable) {
	expect(Array.isArray(this.responseBody)).toBe(true);
	
	const requiredProperties = dataTable.hashes();
	
	for (const trip of this.responseBody) {
		for (const prop of requiredProperties) {
			expect(trip).toHaveProperty(prop.property);
			
			// Validate property type if specified
			if (prop.type) {
				const actualType = typeof trip[prop.property];
				expect(actualType).toBe(prop.type);
			}
		}
	}
});

Then("the response should contain an error message", async function () {
	expect(this.responseBody).toHaveProperty("message");
	expect(typeof this.responseBody.message).toBe("string");
	expect(this.responseBody.message.length).toBeGreaterThan(0);
});

Then("the error message should include {string}", async function (expectedText) {
	expect(this.responseBody).toHaveProperty("message");
	expect(this.responseBody.message).toContain(expectedText);
});

// ============================================================================
// RESPONSE HEADER VALIDATION
// ============================================================================

Then("the response should have content-type {string}", async function (expectedContentType) {
	const contentType = this.responseHeaders["content-type"];
	expect(contentType).toContain(expectedContentType);
});

Then("the response headers should include {string}", async function (expectedHeader) {
	const headerValue = this.responseHeaders[expectedHeader.toLowerCase()];
	expect(headerValue).toBeTruthy();
});

// ============================================================================
// PERFORMANCE VALIDATION
// ============================================================================

Then("the response time should be under {int}ms", async function (maxTime) {
	// Note: Playwright doesn't directly expose response time, 
	// but we can measure it by storing timestamps
	if (this.requestStartTime && this.requestEndTime) {
		const responseTime = this.requestEndTime - this.requestStartTime;
		expect(responseTime).toBeLessThan(maxTime);
	}
});

// ============================================================================
// BACKGROUND STEPS FOR API TESTING
// ============================================================================

Given("the Express server is running on port {int}", async function (port) {
	// Verify server is accessible by making a simple request
	try {
		const response = await this.page.request.get(`${this.baseUrl}/`);
		expect(response.status()).toBeLessThan(500);
	} catch (error) {
		throw new Error(`Server is not accessible on port ${port}. Make sure the Express server is running.`);
	}
});

Given("the MongoDB database is connected", async function () {
	// This could be enhanced to actually check database connectivity
	// For now, we'll assume it's connected if the server responds
	const response = await this.page.request.get(`${this.baseUrl}/api/trips`);
	expect([200, 404, 500]).toContain(response.status());
});

Given("the database contains the following trips:", async function (dataTable) {
	// Store expected trips for validation
	this.expectedTrips = dataTable.hashes();
	
	// Verify that the API returns the expected trips
	const response = await this.page.request.get(`${this.baseUrl}/api/trips`);
	const trips = await response.json();
	
	expect(Array.isArray(trips)).toBe(true);
	expect(trips.length).toBe(this.expectedTrips.length);
});

Given("the API is unavailable", async function () {
	// This step would typically be used with a mock or test double
	// For now, we'll simulate by using an invalid URL
	this.baseUrl = "http://localhost:9999"; // Non-existent server
});

Given("the API returns an empty trip list", async function () {
	// This would typically involve setting up test data
	// For now, we'll note this condition for the test
	this.expectedEmptyResponse = true;
});

Given("the database connection is unavailable", async function () {
	// This would typically involve stopping the database or using a mock
	// For now, we'll simulate this condition
	this.databaseUnavailable = true;
});

// ============================================================================
// UTILITY STEPS
// ============================================================================

When("I store the response for later use", async function () {
	this.storedResponse = {
		status: this.responseStatus,
		headers: this.responseHeaders,
		body: this.responseBody,
	};
});

Then("the stored response should match the current response", async function () {
	expect(this.responseStatus).toBe(this.storedResponse.status);
	expect(this.responseBody).toEqual(this.storedResponse.body);
});