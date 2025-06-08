Feature: RESTful API Endpoints
  As a client application
  I want to consume RESTful API endpoints
  So that I can retrieve trip data in JSON format

  Background:
    Given the Express server is running on port 3000
    And the MongoDB database is connected
    And the database contains the following trips:
      | code | name           | length           | start      | resort                    | perPerson | image     | description                                                                                                           |
      | GALR | Gale Reef      | 4 days / 3 nights | 2021-06-01 | Coral Sands on Grace Bay  | 799.00    | reef1.jpg | Sed et augue lorem. In sit amet placerat arcu. Mauris volutpat ipsum ac justo mollis vel vestibulum orci gravida.  |
      | DAWR | Dawson's Reef  | 4 days / 3 nights | 2021-06-01 | Blue Haven Resort         | 1199.00   | reef2.jpg | Integer magna leo, posuere et dignissim vitae, porttitor at odio. Pellentesque a metus nec magna placerat volutpat. |
      | CLAR | Claire's REEF  | 4 days / 3 nights | 2021-06-01 | Coral Reef Resort         | 1399.00   | reef3.jpg | Donec sed felis risus. Nulla facilisi. Donec a orci tellus, et auctor odio. Fusce ac orci nibh, quis semper arcu.   |

  Scenario: Get all trips from API
    When I send a GET request to "/api/trips"
    Then the response status should be 200
    And the response should be valid JSON
    And the response should contain 3 trips
    And each trip should have the following properties:
      | property    | type   |
      | code        | string |
      | name        | string |
      | length      | string |
      | start       | string |
      | resort      | string |
      | perPerson   | string |
      | image       | string |
      | description | string |

  Scenario: Get specific trip by valid code
    When I send a GET request to "/api/trips/GALR"
    Then the response status should be 200
    And the response should be valid JSON
    And the response should contain a trip with code "GALR"
    And the trip name should be "Gale Reef"
    And the trip resort should be "Coral Sands on Grace Bay"
    And the trip perPerson should be "799.00"

  Scenario: Get specific trip by another valid code
    When I send a GET request to "/api/trips/DAWR"
    Then the response status should be 200
    And the response should be valid JSON
    And the response should contain a trip with code "DAWR"
    And the trip name should be "Dawson's Reef"
    And the trip resort should be "Blue Haven Resort"

  Scenario: Get trip with invalid code
    When I send a GET request to "/api/trips/INVALID"
    Then the response status should be 404
    And the response should be valid JSON
    And the response should contain an error message
    And the error message should include "Trip not found with code: INVALID"

  Scenario: Get trip with non-existent code
    When I send a GET request to "/api/trips/XXXX"
    Then the response status should be 404
    And the response should be valid JSON
    And the response should contain an error message

  Scenario: API endpoints return proper content-type headers
    When I send a GET request to "/api/trips"
    Then the response should have content-type "application/json"

  Scenario: API handles special characters in trip code
    When I send a GET request to "/api/trips/GAL@#$"
    Then the response status should be 404
    And the response should be valid JSON

  Scenario: API handles empty trip code parameter
    When I send a GET request to "/api/trips/"
    Then the response status should be 200
    And the response should contain all trips

  Scenario: Database connection error handling
    Given the database connection is unavailable
    When I send a GET request to "/api/trips"
    Then the response status should be 500
    And the response should contain an error message about database connectivity