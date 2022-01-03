//variables for sprites
var playerS, back1_1, back1_2, edges, bottom;

//varibles for groups
var gBullet, gEnemy;

//variables for resources
var shipP, backImg1, backImg2, bullImg, ship1, ship2, ship3, ship4, Game;

//variables for extras
var gameState = 0;
var lives = 3;
var score = 0;
var shootA = true;
var Enx;

function preload() {
  shipP = loadImage("./Resource/Invade.gif");
  backImg1 = loadImage("./Resource/Back1.png");
  backImg2 = loadImage("./Resource/Back2.png");
  bullImg = loadImage("./Resource/Bullet.png");
  ship1 = loadImage("./Resource/Ship1.png");
  ship2 = loadImage("./Resource/Ship2.png");
  ship3 = loadImage("./Resource/Ship3.png");
  ship4 = loadImage("./Resource/Ship4.png");
  Game = loadImage("./Resource/gameOver.jpg");
}

function setup() {
  createCanvas(700, 500);

  textSize(19);
  fill("red");

  back1_1 = createSprite(350, 250);
  back1_1.addImage(backImg1);

  playerS = createSprite(350, 450);
  playerS.addImage(shipP);

  bottom = createSprite(350, 496, 750, 3);
  bottom.visible = 0;
  edges = createEdgeSprites();

  gBullet = new Group();
  gEnemy = new Group();
}

function draw() {
  background(230);
  showMouse(75, 25, "p", true);

  stage = gameState;

  if (lives === 0) {
    gameState = "over";
  }

  if (gameState === 0) {
    if (keyWentDown("space")) {
      gameState = 1;
    }

    back1_1.visible = 0;
  } else if (gameState === 1) {
    back1_1.visible = 1;

    //player ship movement
    playerS.x = mouseX;

    if (keyWentDown("space") && shootA === true) {
      shoot();
      shootA = false;
      setTimeout(() => {
        shootA = true;
      }, 700);
    }

    if (frameCount % 80 === 0) {
      spawnEnemy(6);
    }
    gEnemy.bounceOff(edges);

    if (gEnemy.isTouching(bottom)) {
      gEnemy.destroyEach();
      lives = lives - 1;
    }

    if (gEnemy.isTouching(gBullet)) {
      gEnemy.destroyEach();
      score++;
    }

    if (score === 10) {
      gameState = 2;
    }
  } else if (gameState === 2) {

    back1_1.addImage(backImg2);

    //player ship movement
    playerS.x = mouseX;

    if (keyWentDown("space") && shootA === true) {
      shoot();
      shootA = false;
      setTimeout(() => {
        shootA = true;
      }, 800);
    }

    if (frameCount % 80 === 0) {
      spawnEnemy(8);
    }
    gEnemy.bounceOff(edges);

    if (gEnemy.isTouching(bottom)) {
      gEnemy.destroyEach();
      lives = lives - 1;
    }

    if (gEnemy.isTouching(gBullet)) {
      gEnemy.destroyEach();
      score++;
    }
  } else if (gameState === "over") {
    back1_1.addImage(Game);
    if(keyWentDown("space")){
      gameState = 0;
      lives = 3;
      score = 0;
      playerS.x = 350;
    }
  }

  drawSprites();
  if (gameState === 0) {
    text("Press space to start", 270, 240);
    textSize(16);
    text("Lives: " + lives, 320, 270);
  } else if (gameState === 1 || gameState === 2) {
    textSize(16);
    text("Press space to shoot. Use the mouse to move the space ship", 140, 55);
    text("Score: " + score, 75, 30);
    text("Stage: " + stage, 325, 30);
    text("Lives: " + lives, 555, 30);
  } else if (gameState === "over") {
    text("Score: " + score, 75, 300);
    text("Press space to restart", 260, 300);
    text("Stage: " + stage, 540, 300);
  }
}

function shoot() {
  var bullet = createSprite(playerS.x, playerS.y);
  bullet.addImage(bullImg);
  bullet.velocityY = -40;
  bullet.lifetime = 13;
  bullet.depth = playerS.depth;
  playerS.depth = playerS.depth + 1;

  gBullet.add(bullet);
}

function spawnEnemy(y) {
  var img = loadImage("Resource/Ship" + Math.round(random(1, 4)) + ".png");
  nop();
  var x = random(3, 7) * Enx;
  var enemy = createSprite(random(10, 690), -1);
  enemy.addImage(img);
  enemy.velocityY = y;
  enemy.velocityX = x;

  gEnemy.add(enemy);
}

function nop() {
  var ret = Math.round(random(0, 1));
  if (ret === 0) {
    Enx = 1;
  } else if (ret === 1) {
    Enx = -1;
  }
}