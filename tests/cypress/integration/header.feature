Feature: Header

  I want to assure that the app Header is working properly

  Scenario: Assuring proper working of Header
    Given Visit home page
    Then Header with navigation should be displayed
    Then Header should have Logo rendered
    Then Header navigators items should be properly rendered
    When Header navigators are used should navigate to right pages