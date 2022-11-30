Feature: SignUp page

  I want to see error when I try to Sign Up with invalid data and I want to have my account created when I provide right data

  Scenario: Filling form with invalid infos
    Given Visit signUp page
    Then Inputs should be empty and submit button disabled
    When Fill input email with invalid data
    Then Should be displayed an invalid email error feedback
    When Fill input password with invalid data
    Then Should be displayed an invalid password error feedback
    When Fill input password config with divergent password
    Given Click on passwords inputs eye icons
    Then Input types should change to text
    When Check terms and conditions warning
    Then Button should NOT be disabled with checked consent
    When Click on send button signUp
    Then All inputs should be filled message should be visible
    Given Fullfil nickname input
    When Click on send button signUp
    Then Divergent passwords error message should be visible

  Scenario: Filling form with right info
    When Fill input with right values signUp
    Given Click on send Form with API fail
    Then Fail to create account error message should be visible
    Given Click on send Form with API success
    Then Should signUp with success

  Scenario: Visit signUp page with already active account
    Given Visit sign up and already have an account
    When Click on login anchor
    Then Should be redirected to login page