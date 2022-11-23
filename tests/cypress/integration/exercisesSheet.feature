Feature: Exercises Sheet page

  I want to interact with the exercises sheets page information, create new exercises, edit existing exercises and submit a exercises sheet

  Scenario: Interact with sheets slider
    Given Visit exercises sheet page
    Then First exercises sheet should be visible
    When Navigate on slider, should see all sheets

  Scenario: Edit existing exercise succeeds
    Given Navigate to first exercises sheet
    When Click on first exercise edit button
    Then Should open exercise edition modal with input default values
    When Edit inputs metrics to new values
    When Click on exercise edition confirm button
    Then A exercise edition success feedback toast should be visible
    Then The exercise data should be changed
    Given Exercise edition succeeds, retrieve original data

  Scenario: Edit existing exercise fails
    Given Navigate to first exercises sheet
    When Click on first exercise edit button
    Then Should open exercise edition modal with input default values
    When Edit inputs metrics to new values
    When Click on exercise edition confirm button and API fails
    Then A exercise edition fail feedback toast should be visible
    Then The exercise data should not be changed

  Scenario: Add new exercise to sheet
    Given Navigate to last exercise sheet
    When Click on add new exercise button
    Then Should be redirected to add exercise page
    Then Select first listed exercise
    When Click on add exercise button
    Then Should be redirected do exercises sheet page
    Given Navigate to last exercise sheet
    Then A exercise add success feedback toast should be visible
    Then The new exercise should be shown and with empty values

  Scenario: Add new exercise to sheet fails
    Given Navigate to last exercise sheet
    When Click on add new exercise button
    Then Should be redirected to add exercise page
    Then Select first listed exercise
    When Click on add exercise button and API fails
    Then A exercise add fail feedback toast should be visible

  Scenario: Submit exercises sheet exercises succeeds
    Given Visit exercises sheet page
    Then Select six eight first exercises from sheet
    When Submit exercises sheet
    Then The initial selected exercises should not be selected any more
    Then A exercises sheet submit success feedback toast should be visible
    Given Visit profile page
    Then Total points should be increased by new submission

  Scenario: Submit exercises sheet fails
    Given Visit exercises sheet page
    Then Select six eight first exercises from sheet
    When Submit exercises sheet and API fails
    Then A exercises sheet submit fail feedback toast should be visible
    Given Visit profile page
    Then Total points should not be increased by new submission