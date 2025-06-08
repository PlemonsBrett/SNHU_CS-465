Feature: Performance and Reliability
  As a system administrator
  I want the application to perform well and handle errors gracefully
  So that users have a reliable experience

  Background:
    Given the application is deployed and running
    And monitoring is in place to track performance

  Scenario: API response times are acceptable
    When I send requests to the API endpoints
    Then the "/api/trips" endpoint should respond within 500ms
    And the "/api/trips/:tripCode" endpoint should respond within 300ms
    And response times should be consistent across multiple requests
    And no timeouts should occur under normal load

  Scenario: Web page load times are reasonable
    When I navigate to different pages in the web application
    Then the home page should load within 2 seconds
    And the travel page should load within 3 seconds
    And subsequent page loads should be faster due to caching
    And images should load progressively without blocking page rendering

  Scenario: Application handles concurrent users
    Given 50 concurrent users are accessing the application
    When they navigate to various pages and API endpoints
    Then all requests should complete successfully
    And response times should remain within acceptable limits
    And no memory leaks should occur
    And the database connection pool should handle the load efficiently

  Scenario: Memory usage remains stable
    Given the application is running under normal load
    When I monitor memory usage over time
    Then memory consumption should remain stable
    And no memory leaks should be detected
    And garbage collection should occur regularly
    And the application should not consume excessive memory

  Scenario: Database queries are optimized
    When I examine database query performance
    Then queries should use appropriate indexes
    And query execution times should be minimal
    And no full collection scans should occur for indexed fields
    And database connections should be properly pooled

  Scenario: Error recovery is robust
    Given the application encounters various error conditions
    When the database connection is temporarily lost
    Then the application should attempt to reconnect automatically
    And users should see appropriate error messages
    And the application should recover when the database comes back online
    When the API is temporarily unavailable
    Then the web application should degrade gracefully
    And users should be informed of the service disruption

  Scenario: Logging provides adequate information
    When the application is running
    Then all requests should be logged with appropriate detail
    And errors should be logged with stack traces
    And database operations should be logged
    And log levels should be configurable
    And sensitive information should not be logged

  Scenario: Application startup is reliable
    When the application starts up
    Then it should connect to the database successfully
    And all routes should be properly registered
    And the server should listen on the correct port
    And startup should complete within a reasonable time (< 30 seconds)

  Scenario: Graceful shutdown works properly
    Given the application is running and serving requests
    When a shutdown signal is received
    Then existing requests should be allowed to complete
    And new requests should be rejected gracefully
    And database connections should be closed properly
    And the process should exit cleanly

  Scenario: Static asset delivery is efficient
    When users request static assets (CSS, images, JavaScript)
    Then assets should be served with appropriate cache headers
    And compression should be applied where beneficial
    And assets should be served quickly
    And 404 errors for missing assets should be handled gracefully

  Scenario: API rate limiting prevents abuse
    When excessive requests are made to API endpoints
    Then appropriate rate limiting should be applied
    And abuse attempts should be logged
    And legitimate users should not be affected
    And proper HTTP status codes should be returned for rate-limited requests

  Scenario: Security headers are properly set
    When I examine HTTP response headers
    Then security headers should be present and properly configured
    And sensitive information should not be exposed in headers
    And CORS policies should be appropriate for the application's needs
    And content type headers should be accurate