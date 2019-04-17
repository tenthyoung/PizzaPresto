//========================================================================================================//
// Global Variables
//========================================================================================================//
var username = "";
var userScore = 0;
var difficulty = "";
var time = 120;

//====================================================//
// Pizza Variables
//====================================================//
var currentPizzaOrder;
var possiblePizzas = ['pepperoni', 'hawaiian', 'margherita', 'aifunghi', 'seafood'];

//====================================================//
// Chef Variables
//====================================================//
var chefDisapprovalAnimationID = "";
//====================================================//
// Trivia Variables
//====================================================//
var arrayOfTriviaObjects = [];
var arrayOfTriviaObjectsLength = 0;
var currentTriviaObject = "";
var currentTriviaObjectIndex = 0;

var currentQuestion = "";
var correctAnswer = "";
var possibleAnswers = [];

//========================================================================================================//
// Wait for Document Loadout
//========================================================================================================//
$(document).ready(function () {
    //====================================================//
    //Materialize Animations
    //====================================================//
    $('.fixed-action-btn').floatingActionButton();
    $('select').formSelect();  //For the select difficulty dropdown

    //====================================================//
    // Add Event Listeners
    //====================================================//
    // These only need to be called once
    addMenuScreenPlayButtonListener();
    addSettingsSubmitButtonListener();
    addAnswerButtonListeners();
    chefDisapproval();
});
//========================================================================================================//
// Start Game
//========================================================================================================//
function startGame() {
    $('#username-display').text(username);
    timer();
    triviaPull();
    generateRandomPizzaOrder();
    displayPizzaOrder();
}
//========================================================================================================//
// Trivia API
//========================================================================================================//
function triviaPull() {
    let triviaQueryURL = 'https://opentdb.com/api.php?amount=50&difficulty=' + difficulty + '&type=multiple';

    $.ajax({
        url: triviaQueryURL,
        method: 'GET'
    }).then(function (response) {
        // Store the random array of trivia objects into the variable
        arrayOfTriviaObjects = response.results;
        // Store the length, so you know when you run out of questions
        arrayOfTriviaObjectsLength = arrayOfTriviaObjects.length;

        // Render a question to the screen
        renderQuestionAndAnswers();
    });
}
//====================================================//
// Render Question
//====================================================//
function renderQuestionAndAnswers() {
    // Make sure you haven't ran out of Trivia Questions
    if (currentTriviaObjectIndex > arrayOfTriviaObjectsLength) {
        console.log("Error: You've run out of trivia questions, pull more trivia questions!");
    }

    // Set the current Trivia Object you want to use
    currentTriviaObject = arrayOfTriviaObjects[currentTriviaObjectIndex];

    // Remove weird symbols from the questions and possible answers
    prepareQuestionsAndAnswerByRemovingWeirdSymbols();
    // Randomize the possible answers, so the correct answer isn't always in the same box
    shuffleArray(possibleAnswers);
    // Show the Questions and Answers tot he Game Screen
    showQuestionsAndAnswersToGameScreen();
}

//====================================================//
// Randomize the Possible Answer Array using the Durstenfield Shuffle
//====================================================//
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//====================================================//
// Show Questions and Answers to Game Screen
//====================================================//
function showQuestionsAndAnswersToGameScreen() {
    $('#question').text(currentQuestion);
    $('#answer1').text(possibleAnswers[0]);
    $('#answer2').text(possibleAnswers[1]);
    $('#answer3').text(possibleAnswers[2]);
    $('#answer4').text(possibleAnswers[3]);
}

function nextQuestion() {
    currentTriviaObjectIndex++;
    renderQuestionAndAnswers();
}

//====================================================//
// Replace Weird Symbols
//====================================================//
function prepareQuestionsAndAnswerByRemovingWeirdSymbols() {
    currentQuestion = cleanUp(currentTriviaObject.question);
    correctAnswer = cleanUp(currentTriviaObject.correct_answer);
    possibleAnswers = [correctAnswer, cleanUp(currentTriviaObject.incorrect_answers[0]), cleanUp(currentTriviaObject.incorrect_answers[1]), cleanUp(currentTriviaObject.incorrect_answers[2])];
    console.log(possibleAnswers);
}

function cleanUp(string) {
    return string.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&shy;/g, "").replace(/&rdquo;/g, '"').replace(/&rdquo;/g, '"');
}

//========================================================================================================//
// Pizza Functions
//========================================================================================================//
//====================================================//
// Choose a random pizza
//====================================================//
function generateRandomPizzaOrder() {
    currentPizzaOrder = possiblePizzas[Math.floor(Math.random() * 5)];
}

//====================================================//
// Display the Pizza Order
//====================================================//
function displayPizzaOrder() {
    let index = possiblePizzas.indexOf(currentPizzaOrder);
    if (index === 0) {
        $('#pizzaOrder').attr('src', './assets/images/pizzas/pizzaOrders/pizzaOrder1.png')
    } else if (index === 1){
        $('#pizzaOrder').attr('src', './assets/images/pizzas/pizzaOrders/pizzaOrder2.png')
    } else if (index === 2){
        $('#pizzaOrder').attr('src', './assets/images/pizzas/pizzaOrders/pizzaOrder3.png')
    } else if (index === 3){
        $('#pizzaOrder').attr('src', './assets/images/pizzas/pizzaOrders/pizzaOrder4.png')
    } else {
        $('#pizzaOrder').attr('src', './assets/images/pizzas/pizzaOrders/pizzaOrder5.png')
    }

}

//========================================================================================================//
// Chef Animations
//========================================================================================================//
function chefDisapproval() {
    chefDisapprovalAnimationID = setInterval(function() {
        $('#chef').attr('src', './assets/images/chefwrong1.png')
        setTimeout(function() {
            $('#chef').attr('src', './assets/images/chefwrong2.png')
        },1000);
    },3000);
}

//========================================================================================================//
// Timer Functions
//========================================================================================================//
function timer() {
    setInterval(function () {
        time--;

        if (time <= 0) {
            clearInterval(time);
            $('#time').text("Game Over!");
            return;
        } else {
            $('#time').text(timeConverter(time));
        }
    }, 1000);
}

function timeConverter(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    } else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}

//========================================================================================================//
// Event Listeners
//========================================================================================================//
function addMenuScreenPlayButtonListener() {
    $(document).on('click', '#playButton', function () {
        $('#menuScreen').addClass('hide');
        $('#settingsMenu').removeClass('hide');
    });
}

function addSettingsSubmitButtonListener() {
    $(document).on('click', '#startGameButton', function () {
        event.preventDefault();
        $('#settingsMenu').addClass('hide');
        $('#gameScreen').removeClass('hide');

        username = $('#username').val().trim();
        difficulty = $('#difficulty').val();

        startGame();
    })
}

function addAnswerButtonListeners() {
    $(document).on('click', '.answer-button', function () {
        if ($(this).text() === correctAnswer) {
            if (difficulty === 'easy') {
                userScore += 100;
            } else if (difficulty === 'medium') {
                userScore += 200;
            } else {
                userScore += 300;
            }
        } else {
            chefDisapproval();
        }
        $('#score').text(userScore);
        nextQuestion();
    });
}