
//========================================================//
//Global Variables
//========================================================//
var jokesAPIResults = "";

$(document).ready(function () {
  joke();
});
//========================================================//
//Functions
//========================================================//

//One the scoreboard page, the chef will say a random pizza joke
//on the bottom
function joke() {
    $(document).on("click", '#button', function () {
        var queryURL = "https://official-joke-api.appspot.com/random_joke";
        
        $.ajax({
            url:queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response)
            console.log(response.setup)
            $('#setup').text(response.setup);
            $('#punchline').text(response.punchline);
            
        });
    });


}
