var ballon, balloon_img;
var bgimage;
var database, position;

function preload(){
  balloon_img = loadImage("images/airBalloon.png");
  bgimage = loadImage("images/background.png");
}

function setup() {
  createCanvas(800,400);
  balloon = createSprite(400, 150, 50, 50);
  balloon.addImage(balloon_img);
  balloon.scale= 0.5;

  database = firebase.database();

  var child0 = database.ref("balloon/position");
  child0.on("value", readOP, showErr);
}

function draw() {
  background(bgimage);  
  drawSprites();

  if(keyDown(LEFT_ARROW)){
    writePosition(-3, 0)
  } else if(keyDown(RIGHT_ARROW)){
    writePosition(3, 0)
  }
}


function writePosition(x, y){
  database.ref("balloon/position").set({x: balloon.x +x, y: balloon.y + y});
}

function readOP(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showErr(){
  console.log("error");
}