Feature: Web Application Integration with API
  As a website visitor
  I want to view travel information
  So that I can browse available trips

  Background:
    Given the Express server is running on port 3000
    And the MongoDB database is connected and seeded with trip data
    And I am using a web browser

  Scenario: Home page loads successfully
    When I navigate to "/"
    Then the page should load successfully
    And the page title should contain "Travlr Getaways"
    And I should see the main navigation menu
    And the "Home" navigation item should be highlighted

  Scenario: Travel page displays trips from API
    When I navigate to "/travel"
    Then the page should load successfully
    And the page title should contain "Travel"
    And the "Travel" navigation item should be highlighted
    And I should see a list of available trips
    And each trip should display:
      | element     |
      | trip name   |
      | description |
      | length      |
      | resort      |
      | price       |
      | image       |

  Scenario: Travel page shows specific trip information
    When I navigate to "/travel"
    Then I should see a trip named "Gale Reef"
    And the trip should show "4 days / 3 nights" as length
    And the trip should show "Coral Sands on Grace Bay" as resort
    And the trip should show "$799.00 / Person" as rate
    And the trip should have an image "reef1.jpg"

  Scenario: Trip images link to API endpoints
    When I navigate to "/travel"
    And I click on the image for "Gale Reef"
    Then I should be redirected to "/api/trips/GALR"
    And I should see JSON data for the trip
    And the JSON should contain the trip code "GALR"

  Scenario: Trip names link to API endpoints
    When I navigate to "/travel"
    And I click on the trip name "Dawson's Reef"
    Then I should be redirected to "/api/trips/DAWR"
    And I should see JSON data for the trip
    And the JSON should contain the trip code "DAWR"

  Scenario: Travel page handles API errors gracefully
    Given the API is unavailable
    When I navigate to "/travel"
    Then the page should load successfully
    And I should see an error message about API connectivity
    And the page layout should remain intact

  Scenario: Travel page handles empty trip list
    Given the API returns an empty trip list
    When I navigate to "/travel"
    Then the page should load successfully
    And I should see a message "No trips exist in the database!"
    And the page layout should remain intact

  Scenario: Navigation between pages works correctly
    Given I am on the home page
    When I click on "Travel" in the navigation
    Then I should be on the travel page
    And the "Travel" navigation item should be highlighted
    When I click on "Home" in the navigation
    Then I should be on the home page
    And the "Home" navigation item should be highlighted

  Scenario: Footer navigation is consistent
    When I navigate to "/travel"
    Then the footer should contain navigation links
    And the "Travel" link in the footer should be highlighted
    And the footer should display the current year in copyright

  Scenario: Error page displays for invalid routes
    When I navigate to "/invalid-route"
    Then I should see an error page
    And the error page should show "Error 404"
    And the error page should have a "Go Home" button
    And the error page should have a "Go Back" button

  Scenario: Static assets load correctly
    When I navigate to "/travel"
    Then the CSS stylesheets should load successfully
    And the trip images should load successfully
    And the page layout should render correctly