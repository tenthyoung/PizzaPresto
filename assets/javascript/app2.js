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
var pepperoni = 'false';
var hawaiian = ['false', 'false','false'];
var margherita = ['false','false'];
var aifunghi = ['false', 'false','false','false'];
var seafood = ['false', 'false','false','false','false'];

//====================================================//
// Chef Variables
//====================================================//
var chefDisapprovalDialogueOptions = ['Mamma mia...', 'My goldfish can make better pizza', 'Did you even eat spaghetti for breakfast?', 'Cavolo! The customer is waiting...', 'You microwave your pizza?', 'You eat cereal, don\'t you?'];
var chefGoodDialogue = ['Now, that is a pizza.', 'Tastes like Mozarella to me!', 'Maybe you\'re an Italian... Maybe', 'Caesar would be proud', 'When in Rome, do as the Romans do', 'Ah, a fresh pizza makes me think of home'];

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
    return string.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&shy;/g, "").replace(/&rdquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&amp;/g,'&');
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

function newOrderAndDisplayBlankPizza() {
    displayPizzaOrder();
}

//====================================================//
// Ingredient Functions
//====================================================//
var currentPizzaOrder;
var possiblePizzas = ['pepperoni', 'hawaiian', 'margherita', 'aifunghi', 'seafood'];
var pepperoni = 'false';
var hawaiian = ['false', 'false','false'];
var margherita = ['false','false'];
var aifunghi = ['false', 'false','false','false'];
var seafood = ['false', 'false','false','false','false'];

function addIngredient() {
    if (currentPizzaOrder == 'pepperoni') {
        if (pepperoni[0] == false) {
            $('#pizza').attr('src', './assets/images/pizzas/pepperonipizza.png');
            pepperoni[0] = true;
            newOrderAndDisplayBlankPizza();
        }
    } 
    // else if (currentPizza == 'hawaiian') {
    //     if (hawaiian[0] == false) {
    //         $('#pizza').attr('src', './assets/images/pizzas/hawaiianpizza1.png');        
    //         hawaiian[0] = true;
    //     } else if (hawaiian[1] == false) {
    //         $('#pizza').attr('src', './assets/images/pizzas/hawaiianpizza2.png');            
    //         hawaiian[1] = true;
    //     } else if (hawaiian[2] == false) {
    //         $('#pizza').attr('src', './assets/images/pizzas/hawaiianpizza3.png');
    //         hawaiian[2] = true;
    //     }
    // } else if (currentPizza == 'margherita') {
    //     if (margherita[0] == false) {
    //         $('#pizza').attr('src', './assets/images/pizzas/margheritapizza1.png');            
    //         asdaf[0] = true;
    //     }else if [margherita[1] == false] {
    //         $('#pizza').attr('src', './assets/images/pizzas/margheritapizza2.png');            
    //     }
    // } else if (currentPizza == 'aifunghi') {
    //     if (margherita[0] == false) {
    //         $('#pizza').attr('src', './assets/images/pizzas/aifunghi1.png');            
    //     } else if (margherita[1] == false) {
    //         $('#pizza').attr('src', './assets/images/pizzas/aifunghi2.png');            
    //     } else if (margherita[2] == false) {
    //         $('#pizza').attr('src', './assets/images/pizzas/aifunghi3.png');
    //     } else {
    //         $('#pizza').attr('src', './assets/images/pizzas/aifunghi4.png');
    //     }
    // } else  {
    //     if (seafood[0] == false) {
    //         $('#pizza').attr('src', './assets/images/pizzas/seafoodpizza1.png');            
    //     } else if (seafood[1] == false) {
    //         $('#pizza').attr('src', './assets/images/pizzas/seafoodpizza2.png');            
    //     } else if (seafood[2] == false) {
    //         $('#pizza').attr('src', './assets/images/pizzas/seafoodpizza3.png');
    //     } else if (seafood[3] == false) {
    //         $('#pizza').attr('src', './assets/images/pizzas/seafoodpizza4.png');
    //     } else {
    //         $('#pizza').attr('src', './assets/images/pizzas/seafoodpizza5.png');
    //     }
    // }
}

//========================================================================================================//
// Chef Animations
//========================================================================================================//
function chefDisapproval() {
    $('#dialogue').text(chefDisapprovalDialogueOptions[Math.floor(Math.random() * chefDisapprovalDialogueOptions.length)]);
    $('#chef').attr('src', './assets/images/chefwrong1.png');
    // console.log('1')
    // setTimeout(function() {
    //     $('#chef').attr('src', './assets/images/chefwrong2.png')
    //     console.log('2')
    // },2000);
    // setTimeout(function() {
    //     $('#chef').attr('src', './assets/images/chefwrong1.png')
    //     console.log('3')
    // },2000);
}

function chefApproval() {
    $('#dialogue').text(chefGoodDialogue[Math.floor(Math.random() * chefGoodDialogue.length)]);
    $('#chef').attr('src', './assets/images/happyChefwPizza.png')
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
            chefApproval();
            addIngredient();
        } else {
            chefDisapproval();
        }
        $('#score').text(userScore);
        nextQuestion();
    });
}