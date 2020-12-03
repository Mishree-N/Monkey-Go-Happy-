//create variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var ground;
var bananas, foodGroup;
var obstacles, obstacleGroup;
var survivalTime=0;



function preload(){
  
  //load monkey running animation
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  //load banana image
  bananaImage = loadImage("banana.png");
  
  //load obstacle image
  obstacleImage = loadImage("obstacle.png");
 
}//END OF PRELOAD



function setup() {
  //create canvas
  createCanvas(400,400);
  //create edges
  var edges=createEdgeSprites();
  
  //create ground sprite
  ground=createSprite(400,390,900,10);
  //and make it move
  ground.velocityX=-4;
  
  //create monkey sprite 
  monkey=createSprite(40,365,20,20);
  //and add animation
  monkey.addAnimation("run", monkey_running);
  //scale
  monkey.scale=0.1;
  
  //create groups
  foodGroup=new Group();
  obstacleGroup= new Group();
  
  
}//END OF SETUP


function draw() {
  //make background white
  background("white");
  
  //calculate survival time using frameRate
  survivalTime=survivalTime + Math.round(getFrameRate()/60);
  //display survival time
  text("Survival Time:  "+ survivalTime, 150,30);
  
  //make monkey jump when space is pressed and when monkey is on ground
  if (keyDown("space")&&monkey.y>=250){
    monkey.velocityY=-19;
  }
  
  //and give gravity to bring it down
  monkey.velocityY=monkey.velocityY+1;
  
  //make infinite scrolling ground effect
  if (ground.x<0){
    ground.x=ground.width/2;
  }
  
  //make monkey collide with ground
  monkey.collide(ground);
  
  //call bananas function
  bananas();
  //call obstacles function
  obstacles();
  
  //show sprites
  drawSprites();
  
}//END OF DRAW


//spawn bananas
function bananas(){
  
  //every 80 framecounts,
  if (World.frameCount%80==0){
    
    //create bananas
    banana=createSprite(400,20,10,10);
    //add image
    banana.addImage("running", bananaImage);
    //scale to fit
    banana.scale=0.1;
    //give random y position
    banana.y=Math.round(random(120,200));
    //make it move
    banana.velocityX=-5;
    //give lifetime
    banana.lifeTime=80;
    //control depth
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    //add banana to food group
    foodGroup.add(banana);
    
  }//end of every 80 framecounts
  
}//END OF BANANAS FUNCTION


//spawn obstacles
function obstacles(){
  
  //every 300 framcounts,
  if (World.frameCount%300==0){
    
    //create the sprite
    obstacle=createSprite(400,365,10,10);
    //add the image
    obstacle.addImage("obstacle", obstacleImage);
    //scale the image
    obstacle.scale=0.13;
    //make it move
    obstacle.velocityX=-4;
    //give lifetime
    obstacle.lifetime=100;
    //add to obstacleGroup
    obstacleGroup.add(obstacle);

  }//end of every 300 framecounts
  
  
}//END OF OBSTACLES FUNCTION





