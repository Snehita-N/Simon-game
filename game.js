var started = false;

$(document).on("keydown", function () {
  if (started === false) {
    nextSequence();
  }
});

var level = 0;

var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
  started = true;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  console.log("gamePattern: " + gamePattern);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

  $("#level-title").text("Level " + level);
}

$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log("userClickedPattern: " + userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  switch (name) {
    case "green":
      var greenAudio = new Audio("sounds/green.mp3");
      greenAudio.play();
      break;

    case "red":
      var redAudio = new Audio("sounds/red.mp3");
      redAudio.play();
      break;

    case "yellow":
      var yellowAudio = new Audio("sounds/yellow.mp3");
      yellowAudio.play();
      break;

    case "blue":
      var blueAudio = new Audio("sounds/blue.mp3");
      blueAudio.play();
      break;

    default:
      console.log("Not a game button");
      break;
  }
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log(
      "user pattern length: " +
        userClickedPattern.length +
        " level: " +
        currentLevel
    );
    if (userClickedPattern.length === level + 1) {
      level++;
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    } else {
      console.log(
        "gamePattern: " +
          gamePattern +
          "        userClickedPattern: " +
          userClickedPattern
      );
    }
  } else {
    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    started = false;
    level = 0;
    gamePattern = []
    userClickedPattern = []
  }
}
