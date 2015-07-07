
// Scoreboard
// Creates and manipulates box elements

function Scoreboard(){
  this.sheet = document.getElementById("sheet");  //get the sheet element, is the sheet just a white background. 
  this.list = [];
  
  // Spawns the boxes
  this.setup = function(){
    
    // Create 10 boxes

    for(var i=0; i<9; i++){
      var box = this.createBox(); // Create an individual box
      this.list.push(box); // Add each box to the list
      this.sheet.appendChild(box); // Add each box to the sheet
    }

      var lastbox = this.CreateThirdBox(); // Create an individual box
      this.list.push(lastbox); // Add each box to the list
      this.sheet.appendChild(lastbox); // Add each box to the sheet
    /*
      <div id="screen>
        <div class="box">
         <div class="indent"></div>
         <div class="corner"></div>
         <div class="bottom"></div>
        </div>
      </div>
    */
    // We're basically doing this with javascript^
  };

  this.createBox = function(){
    var c = function(className){
      var element = document.createElement("div");  //create a function so it is easier to create elements, not having to repeat code
      element.className = className;  //asigns a new class,
      return element;
    };
    
    var box = c("box"); //creates a new box
    var indent = c("indent");  //references a div tag in the html
    var corner = c("corner");
    var bottom = c("bottom");
    
    // Add the elements to the box.
    box.appendChild(indent);
    box.appendChild(corner);
    box.appendChild(bottom);
    
    box.setIndent = function(str){  //maniipulates the text in the elements.
      indent.textContent = str;
    };
    box.setCorner = function(str){
      corner.textContent = str;
    };
    box.setBottom = function(str){
      bottom.textContent = str;
    };
    
    return box;
  };
  
  this.CreateThirdBox = function(){  //this is the last box in bowling, which pretty much changes a lot of the rules of the game..
    var e = function(className){
      var newElement = document.createElement("div");
      newElement.className = className;
      return newElement;
    };

    var box = e("box-tenth"); //creates a new box, you can make another box variable because it is in a different scope.
    
    var corner1 = e("corner-tenth");  //creates it
    var corner2 = e("corner-tenth");  //creates it
    var corner3 = e("corner-tenth");
    
    var bottom = e("bottom");

	box.appendChild(corner1);  //add it
   box.appendChild(corner2);
   box.appendChild(corner3);
   box.appendChild(bottom);

    box.setCorner1 = function(str){
      corner1.textContent = str;
    };
    box.setCorner2 = function(str){
      corner2.textContent = str;
    };
    box.setCorner3 = function(str){
      corner3.textContent = str;
    };
    box.setBottom = function(str){
      bottom.textContent = str;
    };
    
    return box;

  }


}
