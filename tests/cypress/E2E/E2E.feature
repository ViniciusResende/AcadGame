Feature: E2E

  I want to fully test the application in a happy path, seeing all app features

  Scenario: SignUp should work properly
    Given Visit signUp page
    Then Inputs should be empty and submit button disabled
    When Fill input with right values signUp
    When Check terms and conditions warning
    Then Button should NOT be disabled with checked consent
    Given Click on send Form with API success
    Then Should signUp with success
    Then Should logout to future app interaction

  Scenario: Login should work properly
    Then Login inputs should be empty
    When Fill input with right values
    Then Click on send Form
    Then should login with success

  Scenario: Home should work properly
    Given Preserve token
    Then Header with navigation should be displayed
    Then What is Acad Game section should be rendered
    Then How does Acad Game impacts you slide should be visible
    Then How does Acad Game works slide should be visible
    Then Who are us slide should be visible
    When Wait 10 seconds slide should change
    Then Home footer section should be rendered

  Scenario: Header should work properly
    Given Preserve token
    Then Header with navigation should be displayed
    Then Header should have Logo rendered
    Then Header navigators items should be properly rendered
    When Header navigators are used should navigate to right pages

  Scenario: Profile should work properly
    Given Preserve token
    Then Personal info card should be correctly rendered
    Then Badges card should be correctly rendered
    Then Weekly metrics card should be correctly rendered
    When Click on edition name button
    Then Fullfil new name input
    When Click on confirm edition button and API succeeds
    Then A success toast feedback should be visible after edition
    Then Name should be changed
    Given Name edition succeeds, revert change
    When Click on edition picture button
    Then Select an arbitrary new user picture
    When Click on confirm picture edition button
    Then A success toast feedback should be visible after edition
    Then User picture should be changed
    Given User picture edition succeeds, revert change

  Scenario: Exercises Sheets should work properly
    Given Preserve token
    Given Click on exercises sheet header option
    Then First exercises sheet should be visible
    When Navigate on slider, should see all sheets
    Given Navigate to first exercises sheet
    When Click on first exercise edit button
    Then Should open exercise edition modal with input default values
    When Edit inputs metrics to new values
    When Click on exercise edition confirm button
    Then A exercise edition success feedback toast should be visible
    Then The exercise data should be changed
    Given Exercise edition succeeds, retrieve original data
    Given Navigate to last exercise sheet
    When Click on add new exercise button
    Then Should be redirected to add exercise page
    Then Select first listed exercise
    When Click on add exercise button
    Then Should be redirected do exercises sheet page
    Given Navigate to last exercise sheet
    Then A exercise add success feedback toast should be visible
    Then The new exercise should be shown and with empty values
    Given Visit exercises sheet page
    Then Select six eight first exercises from sheet
    When Submit exercises sheet
    Then The initial selected exercises should not be selected any more
    Then A exercises sheet submit success feedback toast should be visible
    Given Visit profile page
    Then Total points should be increased by new submission

  Scenario: Ranking should work properly
    Given Preserve token
    Given Click on ranking header option
    Given Get updated user ranking info
    Then Weekly podium card should be rendered
    Then First place podium should be rendered correctly
    Then Second place podium should be rendered correctly
    Then Third place podium should be rendered correctly
    Then Fourth place podium should be rendered correctly
    Then Self ranking card should be rendered
    Then User personal information should be visible
    Then User score and position should be visible
    Then Week ranking card should be rendered
    Then First card should start with the fifth positioned User
    Then Each card should have right five users, last not included
    When Navigate to second week ranking slide
    Then Last card should complete remaining users
    Then Last user in the last card should be the worsted positioned user
    When Navigate to first week ranking slide
  