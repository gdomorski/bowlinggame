function Frame(){  //Create a frame constructor object
  this.pins = 10;  //set the pins to 10 as a default
  this.rollNumber = 0;  //start at roll number 0 as a default
  this.rollList = [];  //make an array, which will hold each of our rolls
  this.strike = false; //as of now it is not a strike 
  this.spare = false;  // ...or a spare
  // Generate a random number
  this.randomRoll = function(max){
    if(always_strike){  // a cheat code to check the strike logic
      return 10;
    }
    return Math.round(Math.random()*max);
  };
  this.roll = function(){  //rolling on a particular frame, only pertaining to individual frame
    // random number of pins (no greater than the total this.pins)
    var numberOfPins = this.randomRoll(this.pins); 
    // knock them over
    this.hit(numberOfPins);
    
    
    if(numberOfPins == 10){  //if we knocked over 10 pins
      if(this.rollNumber == 0){  //on our first roll...
        this.strike = true;  //it must be a strike!
      }
    }
    
    if(this.pins == 0 && !this.strike){  //if there are no pins left and it is not a strike..
      this.spare = true; //its must be a spare
    }
    
    
    this.rollNumber++;  //add to the roll number 
    return numberOfPins;  // return how many we knocked over, for each frame
  };
  
  this.reset = function(){
    this.pins = 10;
  };
  
  this.done = function(){ // Done returns true if you've rolled twice if it is a strike or we rolled twice...
    return (this.rollNumber >= 2) || this.strike;  
  };
  // Knock over n amount of pins
  this.hit = function(n){
    this.rollList.push(n);
    this.pins -= n;
    if(this.pins < 0)this.pins = 0; // never less than 0 pins,
  };
}