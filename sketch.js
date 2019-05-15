var arr = [];
var arrOld = [];
var rows = 40;
var columns = 40;
var row;
var column;
var index;
var layout;
var x_co;
var y_co;
var rand;
var multiplier;
var alive;
var startingAlive;
var dead;
var width;
var height;
var speed, paused, gen;
// var x = 350;
// var y = 300;

function setup(){
  //console.log(height)
  startingAlive = 0;
  speed = 60;
  paused = true;
  gen = 0;
  width = 700
  height = 700

  createCanvas(width, height);
  background(0);

  for(var x = 0; x < rows; x++){
    for(var y = 0; y < columns; y++){
      stroke(200, 200, 200);
      line(x*floor((width/rows)), 0, x*floor((width/rows)), height);
      line(0, floor(y*(height/columns)), 701, y*floor((height/columns)));
    }
  }
  for(var i = 0; i < rows; i++){
    arr.push([0]);
    for(var j = 0; j < columns; j++){
      arr[i][j] = 0;
    }
  }
  
  //Set some random boxes to be white
  for(var i = 0; i < startingAlive; i++){
    arr[floor(random() * rows)][floor(random() * columns)] = 1
  }  

}
function mousePressed(){
  if(mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0)
  {
    var cellState = arr[floor(mouseY/(height/columns))][floor(mouseX/(width/rows))]
    if(cellState == 1){
      arr[floor(mouseY/(height/columns))][floor(mouseX/(width/rows))] = 0
    }
    else{
      arr[floor(mouseY/(height/columns))][floor(mouseX/(width/rows))] = 1
    }
    
  }
}


function draw(){
  frameRate(speed)
  gameRun() 

  //Refreshing of board
  for(var x = 0; x < arr.length; x++){
    for(var y = 0; y < arr[x].length; y++){
      fill(arr[y][x]*255)
      rect(x*floor(width/rows), y*floor(height/columns), 50, 50)
    }
  }
  
  //neighbors();
}

function keyPressed() {
  if(key == " ") {
    paused = !paused;
    
  }
  if(keyCode == 71){
    insertFigure(createGlider1())
  }
  if(keyCode == 80){
    insertFigure(createPulsar1())
  }
  if(keyCode == 37 && speed > 6) {
    speed -= 5
  }
  if(keyCode == 39) {
    speed += 5
  }
}

function gameRun(){
  
  if(!paused){
    
    // copy arr to arrOld
    arrOld = []
    for(var i = 0; i < rows; i++){
      arrOld.push([0]);
      for(var j = 0; j < columns; j++){
        arrOld[i][j] = arr[i][j];
      }
    }
    
    for(var x = 0; x < arrOld.length; x++){
      for(var y = 0; y < arrOld[x].length; y++){
        //RULES TO THE GAME OF LIFE
        //console.log("(" + right + ", " + y + ")")

        var numNeighbors = alive(x, y)
        
        if(arrOld[x][y] == 1){
          if(numNeighbors > 3 || numNeighbors < 2){
            arr[x][y] = 0
            //console.log("GENRATION " + gen + " DEATH AT " + x + "    " + y + " WITH " + numNeighbors + " NEIGHBORS")
          }
        }
        else {
          if(numNeighbors == 3) {
            arr[x][y] = 1
            //console.log("GENRATION " + gen + " BORN AT " + x + "    " + y + " WITH " + numNeighbors + " NEIGHBORS")
          }
        }
      }
    }
    
    gen++;
    //console.log("NEXT GENERATION!")
    
  }
  
}

function alive(x, y) {
  
  var left = x - 1
  var right = x + 1
  var up = y - 1
  var down = y + 1

  if(left < 0){
    left += rows 
  }
  else if(right > rows - 1){
    right -= rows
  }

  if(up < 0){
    up += columns
  }
  else if(down > columns - 1){
    down -= columns
  }
  
  var out = arrOld[x][up] + arrOld[x][down] + arrOld[right][y] + arrOld[left][y] + arrOld[right][down] + arrOld[left][up]+ arrOld[left][down] + arrOld[right][up];
  
  //console.log(out)

  return out
}

function createGlider1(){
  var configuration = []
  configuration[0] = [1, 1, 0]
  configuration[1] = [1, 0, 1]
  configuration[2] = [1, 0, 0]
  return configuration
}
function createPulsar1(){
  var configuration = []
  configuration[0] = [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
  configuration[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  configuration[2] = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1]
  configuration[3] = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1]
  configuration[4] = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1]
  configuration[5] = [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
  configuration[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  configuration[7] = [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
  configuration[8] = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1]
  configuration[9] = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1]
  configuration[10] = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1]
  configuration[11] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  configuration[12] = [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
  return configuration
}

function insertFigure(config){
  var startx = floor(random() * rows)
  var starty = floor(random() * columns)
  console.log(config)
  for(var x = 0; x < config.length; x++){
    for(var y = 0; y < config[x].length; y++){
      if(startx + config.length > rows || starty + config[x].length > columns){
          startx = floor(random() * rows)
          starty = floor(random() * columns)
          x = 0
          y = 0
      }

      arr[startx + x][starty + y] = config[x][y]
    }
  }

}