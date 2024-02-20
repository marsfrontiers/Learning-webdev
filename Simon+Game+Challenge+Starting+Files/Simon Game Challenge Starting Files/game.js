
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed"); // Add the "pressed" class
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed"); // Remove the "pressed" class after a short delay
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        // Check if the user finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            // Delay nextSequence by 1000 milliseconds
            setTimeout(function() {
                nextSequence();
            }, 1000);
            // Reset userClickedPattern
            userClickedPattern = [];
        }
    } else {
        console.log("wrong");
        playSound("wrong"); // Play the "wrong" sound

        // Apply and remove "game-over" class to the body
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // Change h1 title to "Game Over, Press Any Key to Restart"
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Reset the game
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}