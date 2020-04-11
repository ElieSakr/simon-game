
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;




$(document).keypress(function(){

  if(!started){
    nextSequence();
    $("#level-title").text("level "+level);
    started=true;
  }
});



$(".btn").click(function(){
var userChosenCoulour = $(this).attr("id");
userClickedPattern.push(userChosenCoulour);
playSound(userChosenCoulour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

  userClickedPattern = [];

level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#level-title").text("level "+level);

// animate the button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


playSound(randomChosenColour);
}



function playSound(name){
  // assign sound to each colour
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}


function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function() {
    $("#"+currentColour).removeClass('blue');
}, 100);

}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
//     // console.log("success");
// alert("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
gameOver();
    // console.log("wrong");
  }
}

function gameOver(){

  $("h1").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  restart();
}

function restart(){
  level = 0;
  started = false;
  gamePattern = [];
}
