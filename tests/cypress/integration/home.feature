Feature: Home page

  I want to the Home page content and interact with it

  Scenario: Visiting and interacting with Home page
    Given Visit home page
    Then Header with navigation should be displayed
    Then What is Acad Game section should be rendered
    Then How does Acad Game impacts you slide should be visible
    Then How does Acad Game works slide should be visible
    Then Who are us slide should be visible
    When Wait 10 seconds slide should change
    Then Home footer section should be rendered