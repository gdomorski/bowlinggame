//Create a Game class

//Frames: an array
//Current Frame
//setup function that assigns the pins
function Game(){
  this.frames = []; //create a empty frames array
  this.currentFrame = 0; // The index of the frame we're currently on
  // Setup the game
  this.setup = function(){
    // Create 10 empty frames
    for(var i=0;i<10;i++){ 
      this.frames[i] = new Frame(); //we are going to create 10 frames in the game
    }
  };
  // Return the frames we're currently on
  this.getCurrentFrame = function(){  
    return this.frames[this.currentFrame];
  };
  
  this.nextFrame = function(){
    this.currentFrame += 1;  //the next frame after it...
    display.setMessageText("You finished Frame No. " + this.currentFrame + ". We reset the pins for you! Please take your next roll"); //the current frame will add to one each time changing the message
    display.showBowlButton();
    display.setPins(10);
  };
    // 10th frame
    // first ball
    // strike - 2 more shots
    // spare - 1 more shot
    // else - no extra shots
    
  this.tenthStrike = function(frame){
    frame.roll();
    frame.reset(); // reset the pins
    display.setMessageText("You got a strike on your tenth frame");  //write a new message
    this.displayFrameUpdate(); // show our display
  };
  
  this.tenthSpare = function(frame){
    if(frame.rollNumber < 3 && frame.pins > 0){ //if the roll number is less than three
      var knockedOver = frame.roll();
      display.setMessageText("You knocked over " + knockedOver + " pins on your tenth frame!");
      this.displayFrameUpdate(); // show our display
      // If we got a spare, set the pins back up
      if(frame.pins == 10){ 
        frame.reset();
      }
    }
  };
  
  this.tenthFirstRoll = function(frame){
    var knockedOver = frame.roll();
    display.setMessageText("You knocked over " + knockedOver + " pins!");
    this.displayFrameUpdate(); // show our display
  };
    
  this.tenthSpare = function(frame){
    if(frame.rollNumber < 3){
     var knockedOver = frame.roll();
     display.setMessageText("You knocked over " + knockedOver + " pins on your tenth frame!");
     this.displayFrameUpdate(); // show our display
    }else{
      display.setMessageText("Game over");
      this.displayFrameUpdate(); // show our display
    }
  };
    
  this.rollTenth = function(){
    // Gets passed to the tenthFirstRoll, tenthSpare, etc functions
    // Had to refactor that way because we seperated
    // the logic into seperate functions
    
    var frame = this.getCurrentFrame(); // frame object 
    
    if(frame.rollNumber == 0){
      this.tenthFirstRoll(frame);
      return;  //exit out before it does any of the other if statments
    }
    
    if(frame.strike && frame.rollNumber < 3){
     this.tenthStrike(frame);
     return;
    }

    if(frame.spare && !frame.strike){
      this.tenthSpare(frame);
      return;
    }
    
    if(!frame.strike && !frame.spare && !frame.done()){  //if it is not a strike, spare or done
      var knockedOver = frame.roll();  //it will allow us to take another roll
      display.setMessageText("You knocked over " + knockedOver + " pins!");
      this.displayFrameUpdate(); // show our display
    }
    if(frame.rollNumber > 3 || frame.pins == 0){
      display.setMessageText("The game is over. Please hit the reset button to restart the game.");
      this.displayFrameUpdate(); // show our display
    }
  };
  
  
  this.normalRoll = function(){
     // if the frame is done
      var frame = this.getCurrentFrame();
      if(frame.done()){   //this refers to game so we can access getCurrentFrame and done.
        this.nextFrame(); // Move onto next frame
      }else{ // else
        var knockedOver = frame.roll(); // roll
        
        display.setMessageText("You knocked over " + knockedOver + " pins!");
        this.displayFrameUpdate(); // show our display
        
        // If this is our last roll
        if(frame.done()){
          display.showFrameButton();
        }
      }
  };
    
  this.roll = function(){  //when you call roll in the game...
    // If its the tenth roll(arrays start at 0)
    if(this.currentFrame == 9){
      this.rollTenth(); // do the special logic
    }else{ // else do the normal roll logic
      this.normalRoll();
    }
  };
  
  this.displayScoreboard = function(){
    var total = this.getTotalScore();
    score.list[this.currentFrame].setBottom(total);
    var frame = this.getCurrentFrame();

    if(this.currentFrame != 9){  
      // First 9 frames, (arrays start at a 0 index)
      var secondRoll = frame.rollList[1];
      score.list[this.currentFrame].setCorner('-'); //score is scoreboard class, list in the frame boxes, setting the dash as a default
      if(secondRoll){
        score.list[this.currentFrame].setCorner(secondRoll);
      }else{
        if(secondRoll == 0){
          score.list[this.currentFrame].setCorner('-');
        }
      }
      
      
      if(frame.spare){
        score.list[this.currentFrame].setCorner('/');
      }
      if(frame.strike){
        score.list[this.currentFrame].setCorner('X');
  
      }
      
      var firstRoll = frame.rollList[0];
      if(firstRoll && !frame.strike & !frame.spare){
        score.list[this.currentFrame].setIndent(firstRoll);
      }else{
        if(firstRoll == 0){
          score.list[this.currentFrame].setIndent('-');
        }
      }
    }else{
      // TENTH FRAME
      var rolls = frame.rollList;
      var r1 = rolls[0];
      var r2 = rolls[1];
      var r3 = rolls[2];
      // Display element for this frame
      
	  var s = score.list[this.currentFrame];
	  
      s.setCorner1('-');
      s.setCorner2('-');
      s.setCorner3('-');
      
      if(r1)s.setCorner1(r1);
      if(r2)s.setCorner2(r2);
      if(r3)s.setCorner3(r3);
      
      // Strike
      if(r1 == 10){
        s.setCorner1("X");
        if(r2 == 10){
          // Strike - Strike
          s.setCorner2("X");
          if(r3 == 10){
            // Strike - Strike - Strike
            s.setCorner3("X");
          }
        }else{
          // Strike - Spare
          if((r2 + r3)==10){
            s.setCorner3("/");
          }
        }
      }else{
        // If you got a spare
        if((r1 + r2)==10){
          s.setCorner2("/");
          // If you got a strike on your third roll
          if(r3 == 10){
            s.setCorner3("X");
          }
        }
      }
      
      
    }
  };
  
  this.displayFrameUpdate = function(){
    var frame = this.getCurrentFrame();
    display.setPinText(frame.pins); // Show how many pins are up (with text)
    display.setPins(frame.pins); // Show how many pins are up (with images)
    display.setTurnText(this.currentFrame); // Show what frame we're on
    display.setFramesText(this.getFrameString()); // Show our RAW score list
    display.setFrameScoreText(this.getScore().toString()); // show CALCULATED score list
    display.setScoreText(this.getTotalScore());
    
    this.displayScoreboard();
  };
  this.getTotalScore = function(){
    var list = this.getScore();
    var sum = 0;
    if(list.length > 0){
      sum = list.reduce(function(a,b){return a+b;});
    }
    return sum;
  };
  
  this.getBaseScore = function(){
    var scoreList = [];
    for(var i=0;i<this.frames.length;i++){    
      // CALCULATE
      var frame = this.frames[i];
      var sum = 0;  //set the sum to 0 as a default
      if(frame.rollList.length > 0){  //if there is something in the frame 
        sum = frame.rollList.reduce(function(a,b){return a+b;}); // calcuate the number for each frame, 
      }
      // STORE
      scoreList[i] = sum; 
    }
    return scoreList;
  };
  // this == game
  this.getScore = function(){
    var scoreList = this.getBaseScore();
    var game_ = this;
    
    // this == game
    var strike = function(i){
      // this == window
      if(scoreList[i+1]){ // (If there is a next frame)
        scoreList[i] += scoreList[i+1]; // add that next frames value
      }
    };
    
    var spare = function(i){
      // this == window (in this scope)
      // If there is a next frame
      if(game_.frames[i+1]){  // the this keyword === the window?
        // If that frame has a first roll
        if(game_.frames[i+1].rollList[0]){
          // add that roll to our score
          scoreList[i] += game_.frames[i+1].rollList[0];
        }
      }
    };
    
    var max = function(i){
       // no score can be greater than 30, if the code is all on one line for an if statement, you don't need brackets
       if(scoreList[i]>30)scoreList[i]=30; 
    };
    
    // For each score
    for(var i=(scoreList.length-1); i>=0; i--){
      var frame = game_.frames[i];
      // If its a strike
      if(frame.strike)strike(i);
      // If its a spare
      if(frame.spare)spare(i);
      max(i);
    }

    return scoreList;  
  };
  this.getFrameString = function(){ //we don't show the text anymore since making the scoreboard
    var frameString = "";
    for(var i = 0;i < this.frames.length; i++){
      var frame = this.frames[i];
      frameString += "[";
      for(var j = 0; j < frame.rollNumber; j++){
        frameString += frame.rollList[j] + ":";
      }
      if(frame.strike){
        frameString += "strike";
      }
      if(frame.spare){
        frameString += "spare"; 
      }
      frameString += "]";
    }
    return frameString;
  };
}