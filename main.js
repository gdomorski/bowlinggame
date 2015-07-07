//var name = prompt("Enter your name");
var always_strike = false;

var bowling = new Game();  //bowling is an instance of the game class.
var display = new View();
var score = new Scoreboard(); 

bowling.setup();  //sets up data that goes into the boxes
score.setup();   //sets up the visual boxes, which are the frames 

// Function when 'submit name' is pressed
//function submitName(){
  // Input element that holds playerName
  //name =// display.getPlayerName();

  //display.hidePlayerName();
  //display.hideSubmitButton();
 // display.showBowlButton();
  
 // var msg = "Your name has been assigned: " + name + ". Now take your first turn!";
//  display.setMessageText(msg); // Tell the user there name has been assigned
  
//  display.setPins(10);
  
//}

// Shows the submitname fields
function bowlingGame(){
   //display.showPlayerName();
  // display.showSubmitButton();
  var userName = prompt("Please enter your name")  //asks the user for his name
  var msg = "Your name has been assigned: " + userName + ". We set up 10 pins. Hit 'bowl' to take your first shot.";  //assigns the users name
  display.setPins(10);  //sets the pins
  display.setMessageText(msg);  //writes the message text on the screen
  display.showBowlButton();  //shows the bowl button
  display.hideStartButton();  //hides it
}

// (Bowl button)
function turn(){  
  if(bowling.currentFrame < 10){ //if it is under the 10th frame..., it will allow us to take a turn...
    bowling.roll();  //we can take a roll... 
  }
}