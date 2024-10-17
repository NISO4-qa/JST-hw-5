Feature: Let's go to the cinema tests"
    Scenario: Book one ticket
        Given user is on "/client/index.php" page
        When the user selects the day
        When the user select of the hall and time
        When the user selects one seat
        Then user sees title for one seat "Вы выбрали билеты:"

    Scenario: Book three tickets
        Given user is on "/client/index.php" page
        When the user selects the day
        When the user select of the hall and time
        When the user selects three seats
        Then user sees title for three seats "Вы выбрали билеты:"
    Scenario: Selection of occupied seats

        Given user is on "/client/index.php" page
        When the user selects the day
        When the user select of the hall and time
        When the user selects occupied seats
        Then the user clicks on the book button "Забронировать"