Feature: API Testing with External Tools
  As a developer
  I want to test API endpoints using external tools like Hoppscotch
  So that I can verify API functionality independently of the web interface

  Background:
    Given the Express server is running on port 3000
    And the API endpoints are available at "/api"
    And the database contains sample trip data

  Scenario: Hoppscotch web interface can retrieve all trips
    Given I am using Hoppscotch web interface to test the API
    When I create a GET request to "http://localhost:3000/api/trips"
    And I set the Accept header to "application/json"
    And I send the request
    Then the response status should be 200 OK
    And the response body should be valid JSON
    And the response should contain an array of trips
    And each trip should have all required properties

  Scenario: Hoppscotch can retrieve a specific trip
    Given I am using Hoppscotch to test the API
    When I create a GET request to "http://localhost:3000/api/trips/GALR"
    And I send the request
    Then the response status should be 200 OK
    And the response body should contain a single trip object
    And the trip code should be "GALR"
    And the trip name should be "Gale Reef"

  Scenario: Hoppscotch CLI can run automated API tests
    Given I have Hoppscotch CLI installed
    And I have a test collection configured for the API endpoints
    When I run "hopp test api-collection.json"
    Then all API tests should pass
    And the CLI should report success for all endpoints
    And response times should be within acceptable limits
    And all status codes should match expectations

  Scenario: Hoppscotch receives proper error responses
    Given I am using Hoppscotch to test the API
    When I create a GET request to "http://localhost:3000/api/trips/NOTFOUND"
    And I send the request
    Then the response status should be 404 Not Found
    And the response body should contain an error message
    And the error message should indicate the trip was not found

  Scenario: API responses include proper headers
    Given I am using Hoppscotch to test the API
    When I send a GET request to "/api/trips"
    Then the response headers should include "Content-Type: application/json"
    And the response headers should include appropriate CORS headers if configured
    And the response time should be reasonable (< 1000ms)

  Scenario: Browser can directly access API endpoints
    Given I am using a web browser
    When I navigate to "http://localhost:3000/api/trips"
    Then the browser should display JSON data
    And the JSON should be properly formatted
    And all trips should be visible in the browser

  Scenario: Browser can access parameterized endpoints
    Given I am using a web browser
    When I navigate to "http://localhost:3000/api/trips/DAWR"
    Then the browser should display JSON data for a single trip
    And the trip code should be "DAWR"
    And the JSON should be properly formatted

  Scenario: Hoppscotch CLI can validate API contract
    Given I have defined API tests in a Hoppscotch collection
    When I run "hopp test --env development api-tests.json"
    Then all contract validations should pass
    And response schemas should match expected structures
    And all required fields should be present in responses
    And data types should match specifications

  Scenario: API endpoints handle different HTTP methods appropriately
    Given I am using Hoppscotch to test the API
    When I send a POST request to "/api/trips"
    Then the response should indicate the method is not allowed
    When I send a PUT request to "/api/trips/GALR"
    Then the response should indicate the method is not allowed
    When I send a DELETE request to "/api/trips/GALR"
    Then the response should indicate the method is not allowed

  Scenario: Hoppscotch CLI can run performance tests
    Given I have configured performance tests in Hoppscotch CLI
    When I run "hopp test --iterations 100 performance-tests.json"
    Then average response time should be under 500ms
    And all requests should complete successfully
    And no timeouts should occur
    And memory usage should remain stable

  Scenario: API provides consistent response format
    Given I am using Hoppscotch to test the API
    When I send requests to multiple API endpoints:
      | endpoint              |
      | /api/trips           |
      | /api/trips/GALR      |
      | /api/trips/DAWR      |
      | /api/trips/CLAR      |
    Then all successful responses should have status 200
    And all responses should have Content-Type "application/json"
    And all trip objects should have consistent property structures

  Scenario: Hoppscotch CLI can generate test reports
    Given I have a comprehensive test suite configured
    When I run "hopp test --reporter json --output test-results.json"
    Then a detailed test report should be generated
    And the report should include pass/fail status for each test
    And response times should be recorded for performance analysis
    And any failures should include detailed error information

  Scenario: API handles concurrent requests properly
    Given I am using Hoppscotch CLI for load testing
    When I run "hopp test --concurrent 10 --iterations 5 load-tests.json"
    Then all requests should complete successfully
    And all responses should return the same data
    And no race conditions should occur
    And response times should remain reasonable

  Scenario: Hoppscotch environment variables work correctly
    Given I have environment variables configured in Hoppscotch
    And the variables include "BASE_URL" set to "http://localhost:3000"
    When I use "{{BASE_URL}}/api/trips" in my requests
    Then the requests should resolve to the correct URL
    And tests should work across different environments
    And variable substitution should work in both GUI and CLI

  Scenario: API endpoints are discoverable and documented
    When I examine the application routing
    Then "/api/trips" should be available for GET requests
    And "/api/trips/:tripCode" should be available for GET requests
    And the API should follow RESTful conventions
    And endpoints should be properly documented in code comments
    And I should be able to create comprehensive Hoppscotch collections