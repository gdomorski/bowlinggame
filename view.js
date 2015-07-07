// Display Class
function View(){
	var g = function(str){return document.getElementById(str);};  
  // Button elements
  this.bowlButton = g("bowlButton"); 
  this.frameButton = g("frameButton"); 
  this.startButton = g("startTheGame");
  // Text elements
  this.pinText = g("display-pins");  
  this.turnText = g("display-turn"); 
  this.framesText = g("display-frames"); 
  this.messageText = g("message");  
  this.scoreText = g("display-score");
  this.frameScoreText = g("currentFrameScore");
  // Pin image container
  this.pinList = g("lane");  

  // TEXT functions
  this.setPinText = function(str){this.pinText.textContent = "Pins Left: "+str;};  // Line 19 to 24 all gets hidden
  this.setTurnText = function(str){this.turnText.textContent = "Turn # "+str;};
  this.setFramesText = function(str){this.framesText.textContent = "Frames: "+str;};
  this.setMessageText = function(str){this.messageText.textContent = str;};
  this.setFrameScoreText = function(str){this.frameScoreText.textContent = str;};
  this.setScoreText = function(str){this.scoreText.textContent = "Score: "+str;};
  // BUTTON functions
  this.showBowlButton = function(){          
    this.bowlButton.style.display = "block"; // Show the bowl button
    this.frameButton.style.display = "none"; // Hide the frame button
  };
  this.showFrameButton = function(){
    this.frameButton.style.display = "block"; // show the frame button
    this.bowlButton.style.display = "none"; // hide the bowl button
  };
  this.hideStartButton = function(){
    this.startButton.style.display = "none";
  };
  // PIN image functions
  this.createPin = function(){
    var img = document.createElement("img");  //creates an new image,
    img.src = "./pin.png";  //gets the pin image from the folder
    img.className = "pin";
    this.pinList.appendChild(img);  //adds it to the pin container
  };
  this.clearPins = function(){
    var numberOfPins = this.pinList.children.length;  //we want to get the children of that are part of the lane display, finds all the element in the that element
    for(var i=0;i<numberOfPins;i++){
      var pin = this.pinList.children[0];
      this.pinList.removeChild(pin); //we want to remove the first value each time. I thought it would be "i", but "i" would skip over elements.
    }
  };
  this.setPins = function(n){
    this.clearPins();
    for(var i=0;i<n;i++){  //for every pin,
      this.createPin();   //we are going to create a new one!
    }
  };
}