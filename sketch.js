
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0;
var survivalTime = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(550,500);
  
  ground = createSprite(200,490,590,25);
  ground.velocityX = -5;
  
  monkey = createSprite(70,430,5,5);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  
  background("pink");
  
  food();
  obstacles();
  
  console.log(monkey.y);
  
  if(keyDown("space")&& monkey.y >= 416 ) {
  monkey.velocity.y = -12; 
  
  }
  
  
  monkey.velocityY = monkey.velocityY+0.5;
  ground.x = ground.width/2;
  monkey.collide(ground);
  
  if(monkey.isTouching(foodGroup))
    {
      foodGroup.destroyEach();
    }
  
  if(obstacleGroup.isTouching(monkey))
  {
    ground.velocityX = 0; monkey.velocityY = 0;   
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    //obstacleGroup.destroyEach();
    foodGroup.setVelocityXEach(0); 
    foodGroup.setLifetimeEach(-1); 
    foodGroup.destroyEach();
   
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.round(frameCount/frameRate());
  text("Survival Time: " + survivalTime,350,50);
  
  drawSprites();
}

function food() {
    
  if(frameCount % 180 === 0) 
  {
 banana = createSprite(500,Math.round(random(300,200)),15,15);
 banana.addImage(bananaImage);
 banana.scale = 0.1;
 banana.velocityX = -7;
 foodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0){
  obstacle = createSprite(325,450,5,5);
  obstacle.velocityX = -(6 + score/100);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.lifetime = 100;
  obstacleGroup.add(obstacle);
    }
}


