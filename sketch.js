var zombie,zombieImg, cave,caveImg, zombie,zombieImg, RocksGroup;
var rockImg,rock,BackgroundSound,GameOverImg, GameOverSound;
var PLAY = 0 ; 
var gameState = "play";
var top ;
var score = 0 ; 
var Ground ;

function preload(){
boyImg= loadImage("BoyR.gif") 
caveImg= loadImage("Cave.jpg") 
rockImg= loadImage("Rock.png") 
zombieImg= loadImage("ZOMBIE.gif")
GameOverSound= loadSound("Game Over Sound.wav")
BackgroundSound = loadSound("Background Music.wav")
GameOverImg = loadImage("GameOver.png")
}
function setup() { 
  createCanvas(725,600);
  cave = createSprite(300,300)
  cave.addImage("cave",caveImg)
  

  RocksGroup = new Group()

  boy = createSprite(200,410,20,50);
  boy.addImage("boy",boyImg)
  boy.scale=0.4
  
  
  zombie = createSprite(55,460,20,50)
  zombie.addImage("zombie",zombieImg)
  zombie.scale=0.875
   
  // top = createSprite(300,190,600,10)

  score = 0
  
  Ground=createSprite(200,550,1000,20)
  GameOver = createSprite(300,300)
  GameOver.addImage(GameOverImg)
  BackgroundSound.play()
  GameOver.visible = false
  GameOver.scale = 1.4


}

function draw() {
  background("black")

  if(gameState=="end"){
  GameOver.visible = true
  GameOverSound.play()
  
    
     }
  if(gameState=="play"){
  boy.setCollider("rectangle",0,0,boy.width/8,boy.height)
  cave.velocityX = -(4 + 3* score/100)
  score = score + Math.round(getFrameRate()/60);

  boy.debug = true


  if(cave.x < 300){
    cave.x = cave.width/2;
  }

  if(keyDown("space") && boy.y >= 400){
    boy.velocityY = -20
  
  } 

  if(boy.isTouching(RocksGroup)||boy.isTouching(zombie)){
    boy.destroy
    gameState = "end"
  }
  boy.velocityY = boy.velocityY + 0.50
  spawnRocks()

  }
  Ground.visible = false  
  boy.collide(Ground)
  //console.log(boy.y)
  //console.log(boy.x)
  
  drawSprites()
  text("Score: "+ score,500,50)  
  textSize(100)

}



function spawnRocks(){
if(frameCount % 250 === 0){
rock=createSprite(600,500,10,10)
rock.velocityX = -(6+ score/100)
rock.x = Math.round(random(675,725))
rock.velocityX=-2
rock.addImage(rockImg)
rock.lifetime=800
RocksGroup.add(rock)
rock.depth=1
rock.scale=0.03
boy.depth=1 
}   


}