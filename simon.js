let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
// if the game has started or not, so you only call nextSequence() on the first keypress.
let started = false;

//2. Create a new variable called level and start at level 0.
let level = 0;

let userClickedPattern = [];

// when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$("#start").click(function() {
    if (!started) {
  
      //  when the game has started, change this to say "Level 0".
      $("#counter").text(level);
      nextSequence();
      started = true;
      animatePress("start");
    }
  });

function nextSequence() {

    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    // Inside nextSequence(), update the h1 with this change in the value of level.
    $("#counter").text(level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    /// animate button
    animatePress(randomChosenColour);

    /// Play audio 
    playSound(randomChosenColour);

    
}

$(".btn").click(function (){
    
    // let userChosenColour = this.id;
    /// get Attributes
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);

    /// animate button
    animatePress(userChosenColour);

    /// Play audio 
    playSound(userChosenColour);
    
    // to chkect user click
    checkAnswer(userClickedPattern.length-1);

});
// setInterval(nextSequence,1000);

/// Play audio function
function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    /// to remove the pressed class after a 100 milliseconds.
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
 
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        console.log("Success");
        if(JSON.stringify(gamePattern)==JSON.stringify(userClickedPattern)){
            setTimeout(nextSequence, 1000);
        }

        // if(gamePattern.length === userClickedPattern.length){
        //     setTimeout(nextSequence, 1000);
        // }
        
    }else{
        console.log("Wrong!!");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#game-title").text("Game Over!❌, Please, Try Again🔁");

        // startOver();
    
    }

    console.log(userClickedPattern);
    console.log(gamePattern);
    
}

$("#reset").click(function() {
    level = 0;
    gamePattern = [];
    started = false;
    animatePress("reset");
    $("#game-title").text("Welcome from Simon Game 🎮");
    $("#counter").text(level);
});


// function startOver(){

//     level = 0;
//     gamePattern = [];
//     started = false;
// }