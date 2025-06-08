Feature: API Testing with External Tools
  As a developer
  I want to test API endpoints using external tools like Postman
  So that I can verify API functionality independently of the web interface

  Background:
    Given the Express server is running on port 3000
    And the API endpoints are available at "/api"
    And the database contains sample trip data

  Scenario: Postman can retrieve all trips
    Given I am using Postman to test the API
    When I create a GET request to "http://localhost:3000/api/trips"
    And I set the Accept header to "application/json"
    And I send the request
    Then the response status should be 200 OK
    And the response body should be valid JSON
    And the response should contain an array of trips
    And each trip should have all required properties

  Scenario: Postman can retrieve a specific trip
    Given I am using Postman to test the API
    When I create a GET request to "http://localhost:3000/api/trips/GALR"
    And I send the request
    Then the response status should be 200 OK
    And the response body should contain a single trip object
    And the trip code should be "GALR"
    And the trip name should be "Gale Reef"

  Scenario: Postman receives proper error responses
    Given I am using Postman to test the API
    When I create a GET request to "http://localhost:3000/api/trips/NOTFOUND"
    And I send the request
    Then the response status should be 404 Not Found
    And the response body should contain an error message
    And the error message should indicate the trip was not found

  Scenario: API responses include proper headers
    Given I am using Postman to test the API
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

  Scenario: API endpoints handle different HTTP methods appropriately
    Given I am using Postman to test the API
    When I send a POST request to "/api/trips"
    Then the response should indicate the method is not allowed
    When I send a PUT request to "/api/trips/GALR"
    Then the response should indicate the method is not allowed
    When I send a DELETE request to "/api/trips/GALR"
    Then the response should indicate the method is not allowed

  Scenario: API provides consistent response format
    Given I am using Postman to test the API
    When I send requests to multiple API endpoints:
      | endpoint              |
      | /api/trips           |
      | /api/trips/GALR      |
      | /api/trips/DAWR      |
      | /api/trips/CLAR      |
    Then all successful responses should have status 200
    And all responses should have Content-Type "application/json"
    And all trip objects should have consistent property structures

  Scenario: API handles concurrent requests properly
    Given I am using an API testing tool
    When I send 10 concurrent GET requests to "/api/trips"
    Then all requests should complete successfully
    And all responses should return the same data
    And no race conditions should occur
    And response times should remain reasonable

  Scenario: API endpoints are discoverable
    When I examine the application routing
    Then "/api/trips" should be available for GET requests
    And "/api/trips/:tripCode" should be available for GET requests
    And the API should follow RESTful conventions
    And endpoints should be properly documented in code comments