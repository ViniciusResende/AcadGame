Feature: Login page

  I want to see error when I try to login with wrong credentials and I want to login when I use right credential

  Scenario: Filling form with wrong info
    Given Visit login page
    Then Login inputs should be empty
    When Fill wrongly input email
    Then Email input should have correct value
    When Fill wrongly input password
    Then Password input should have correct value
    When Click on Password input eye icon input should change type to text
    Then Button should NOT be disabled with filled inputs
    When Click on send button
    Then Error message should be visible

  Scenario: Filling form with right info
    When Fill input with right values
    Then Click on send Form
    Then should login with success

  Scenario: Visit page without authentication
    When Visit profile page and is not logged
    Then should redirect to login page
    When Click on signUp anchor
    Then Should be redirected to signUp page