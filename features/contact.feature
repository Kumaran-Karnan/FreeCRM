Feature: Contact CRUD Operations

  Scenario: Create Contact
    Given User logs into FreeCRM
    When User navigates to Contacts
    And User creates a new Contact
    Then Contact should be created successfully

  Scenario: Search Contact
    Given User logs into FreeCRM
    When User searches the Contact
    Then Contact details should be displayed

  Scenario: Update Contact
    Given User logs into FreeCRM
    When User updates Contact details
    Then Updated Contact details should be visible

  Scenario: Delete Contact
    Given User logs into FreeCRM
    When User deletes the Contact
    Then Contact should not exist