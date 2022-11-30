Feature: Profile page

  I want interact with the profile page information and edit my user info

  Scenario: Interact with user info
    Given Visit profile page
    Then Personal info card should be correctly rendered
    Then Badges card should be correctly rendered
    Then Weekly metrics card should be correctly rendered

  Scenario: Edit user name cancel
    When Click on edition name button
    Then Fullfil new name input
    When Click on cancel edition button
    Then Name should not be changed

  Scenario: Edit user name fail
    When Click on edition name button
    Then Fullfil new name input
    When Click on confirm edition button and API fails
    Then A fail toast feedback should be visible after edition try

  Scenario: Edit user name succeeds
    When Click on edition name button
    Then Fullfil new name input
    When Click on confirm edition button and API succeeds
    Then A success toast feedback should be visible after edition
    Then Name should be changed
    Given Name edition succeeds, revert change

  Scenario: Edit user picture cancel
    When Click on edition picture button
    Then Confirm picture edition button should be disabled
    Then Select an arbitrary new user picture
    Then Confirm picture edition button should be enabled
    When Click on cancel picture edition button
    Then User picture should not be changed

  Scenario: Edit user picture fail
    When Click on edition picture button
    Then Select an arbitrary new user picture
    When Click on confirm picture edition button and API fails
    Then A fail toast feedback should be visible after edition try
    Then User picture should not be changed

  Scenario: Edit user picture success
    When Click on edition picture button
    Then Select an arbitrary new user picture
    When Click on confirm picture edition button
    Then A success toast feedback should be visible after edition
    Then User picture should be changed
    Given User picture edition succeeds, revert change