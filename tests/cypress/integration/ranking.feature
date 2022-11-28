Feature: Ranking page

  I want interact with the ranking page information

  Scenario: Interact with podium card
    Given Visit ranking page
    Then Weekly podium card should be rendered
    Then First place podium should be rendered correctly
    Then Second place podium should be rendered correctly
    Then Third place podium should be rendered correctly
    Then Fourth place podium should be rendered correctly

  Scenario: Interact with self ranking card
    Then Self ranking card should be rendered
    Then User personal information should be visible
    Then User score and position should be visible

  Scenario: Interact with week ranking card
    Then Week ranking card should be rendered
    Then First card should start with the fifth positioned User
    Then Each card should have right five users, last not included
    When Navigate to second week ranking slide
    Then Last card should complete remaining users
    Then Last user in the last card should be the worsted positioned user
    When Navigate to first week ranking slide