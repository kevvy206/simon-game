// DECLARE VARIABLES
var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


// RUN SCRIPT
// Start the game once a key is pressed.
$(document).on("keydown", function() {
  if (!started) {
    started = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});

// Save button clicked in array userClickedPattern.
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


// DECLARE FUNCTIONS
// Randomly choose a color, fadeToggle, and play sound.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeToggle(100).fadeToggle(100);
  playSound(randomChosenColour);
}

// Function for playing sound.
function playSound(colorName) {
  var audio = new Audio("sounds/" + colorName + ".mp3");
  audio.play();
}

// Add ".pressed" class to button clicked, and remove shortly after.
function animatePress(currentColour) {
  var colourId = "#" + currentColour;

  $(colourId).addClass("pressed");
  setTimeout(function() {
    $(colourId).removeClass("pressed");
  }, 100);
}

// Check the user-clicked keydowns with the randomly-generated keydowns.
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    startOver();
  }
}

// Function for restarting(reset all relevant variables).
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
