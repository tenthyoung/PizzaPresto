
//========================================================//
//Global Variables
//========================================================//

$(document).ready(function () {

});
//========================================================//
//Functions
//========================================================//


//=================//
//Screen Changes
//=================//
//Adds an event listener to the play button, which brings us to the next screen
function playButton() {
    $(document).on('click', '#playButton', function() {
        $('#menu').addClass('d-none');
        $('#topicsDifficultyMenu').removeClass('d-none');
    });
}

//adds an event listener to the "next" button after player chooses topic and difficulty
function initiateGameScreen () {
    $(document).on('click', '#startGame', function() {
        $('#topicsDifficultyMenu').addClass('d-none');
        $('#gameScreen').removeClass('d-none');
    });
}

//Shows the scoreBoard, gives the user the option to replay the game, 
//or choose a new topic
function scoreBoard () {
    $('#gameScreen').addClass('d-none');
    $('#scoreBoardScreen').removeClass('d-none');

    joke();
    replay();
    chooseNewTopic();
}

//Brings the user back to previous gameScreen
function replay() {
    $(document).on('click', '#replay', function() {
        $('#scoreBoardScreen').addClass('d-none');
        $('#gameScreen').removeClass('d-none');
    });

}

//Brings the user back to the Topic screen
function chooseNewTopic() {
    $(document).on('click', '#replay', function() {
        $('#scoreBoardScreen').addClass('d-none');
        $('#topicsDiffcultyMenu').removeClass('d-none');
    });
}

//=================//
//APIs
//=================//
//One the scoreboard page, the chef will say a random pizza joke
//on the bottom

var difficulty = 'medium';
var category = '9';

function triviaPull() {
    var queryURL = 'https://opentdb.com/api.php?amount=50&category=' + category + '&difficulty=' + difficulty + '&type=multiple';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response.results[0]);
    }) 
}

triviaPull();

function joke() {
    var queryURL = "https://official-joke-api.appspot.com/random_joke";
    
    $.ajax({
        url:queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response)
        console.log(response.setup)
        $('#setup').text(response.setup);  //[ ] I need to animate this
        $('#punchline').text(response.punchline);
        
    });
    
}
