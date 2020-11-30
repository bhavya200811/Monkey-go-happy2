 
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
createCanvas(500,500);
  
  var survivalTime=0;
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  //creating ground
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  //creating groups
  FoodGroup= new Group();
  ObstaclesGroup= new Group();
  
  score=0;
}


function draw() {
  
background("lightblue");
  
  //if condition
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-12
  }
    monkey.velocityY= monkey.velocityY+0.8;
    
    
    spawnFood();
    spawnObstacles();
  monkey.collide(ground);
    drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+ score,400,50);
  
  //if monkey touches obstacles game will end
  if(ObstaclesGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    ObstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityYEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
  }
  
 
  
}

function spawnFood(){
  if(frameCount%80===0){
    banana=createSprite(600,250,40,10);
    banana.y=random(120,200);
    banana.velocityX=-5;
    
    //lifetime to variable
    banana.lifetime=300;
    monkey.depth=banana.depth+1;
    
    //adding image of banana
    banana.addImage(bananaImage);
    banana.scale=0.05;
    
    //adding banana to group
    FoodGroup.add(banana);
  }
}
  
  function spawnObstacles(){
    if(frameCount%100===0){
      obstacle=createSprite(800,320,10,40);
      obstacle.velocityX=-6;
      
      //adding image to obstacle
      obstacle.addImage(obstacleImage);
      obstacle.scale=0.15;
      
      //adding lifetime to variavle
      obstacle.lifetime=300;
      
      //adding obstacle to group
      ObstaclesGroup.add(obstacle);
    }
  }







