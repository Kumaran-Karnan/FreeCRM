Feature: Company CRUD Operations

  Scenario: Create Company
    Given User logs into FreeCRM
    When User navigates to Companies
    And User creates a new Company
    Then Company should be created successfully

  Scenario: Search Company
    Given User logs into FreeCRM
    When User searches the Company
    Then Company details should be displayed

  Scenario: Update Company
    Given User logs into FreeCRM
    When User updates Company details
    Then Updated Company details should be visible

  Scenario: Delete Company
    Given User logs into FreeCRM
    When User deletes the Company
    Then Company should not exist