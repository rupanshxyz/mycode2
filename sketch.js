const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImg;
var ground;
var cannon;
var cannon_ball;
var balls = [];
var myboat;
var boats = [];
var boatJson;
var boatImage;
var boatAnimation = [];
var explosion;
var backgroundMusic;
var piratelaugh;
var brokenJson, brokenImage;
var brokenAnimation = [];
var isgameover = false;

function preload() {
  backgroundImg = loadImage("../C27-Ta-v4--main/assets/background.gif");
  boatJson = loadJSON("../C27-Ta-v4--main/assets/boat/boat.json");
  boatImage = loadImage("../C27-Ta-v4--main/assets/boat/boat.png");
  explosion = loadSound("../C27-Ta-v4--main/assets/cannon_explosion.mp3");
  piratelaugh = loadSound("../C27-Ta-v4--main/assets/pirate_laugh.mp3");
  backgroundMusic = loadSound("../C27-Ta-v4--main/assets/background_music.mp3");
  brokenJson = loadJSON("../C27-Ta-v4--main/assets/boat/broken_boat.json");
  brokenImage = loadImage("../C27-Ta-v4--main/assets/boat/broken_boat.png");
}

function setup() {
  createCanvas(1000, 600);

  engine = Engine.create();
  world = engine.world;

  tower = new Tower(120, 350, 200, 300);
  ground = new Ground(500, 580, width, 20);
  cannon = new Cannon(180, 100, 110, 50, -PI / 4);
  // myboat = new boat(width-100, height - 130, 200, 200);

  var boatFrames = boatJson.frames;
  for (var i = 0; i < boatFrames.length; i += 1) {
    var pos = boatFrames[i].position;
    var img = boatImage.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
    //console.log(boatAnimation)
  }

  var brokenFrames = brokenJson.frames;
  for (var i = 0; i < boatFrames.length; i += 1) {
    var pos = brokenFrames[i].position;
    var img = brokenImage.get(pos.x, pos.y, pos.w, pos.h);
    brokenAnimation.push(img);
    //console.log(boatAnimation)
  }
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);

  tower.display();

  cannon.display();
  ground.display();
  // myboat.display()
  // cannon_ball.display();

  // Matter.Body.setVelocity(myboat.body,{x:-5,y:0})
  showBoats();

  for (var i = 0; i < balls.length; i += 1) {
    showCannonBalls(balls[i], i);
    for (var j = 0; j > boats.length; j += 1) {
      if (balls[i] !== undefined && boats[j] !== undefined) {
        var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
        if (collision.collided) {
          boats[j].remove(j);
          j--;
          Matter.World.remove(world, balls[i].body);
          balls.splice(i, 1);
          i--;
        }
      }
    }
  }

  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
    backgroundMusic.setVolume(0.5);
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannon_ball = new CannonBall(cannon.x, cannon.y, 50, 50);
    balls.push(cannon_ball);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
    explosion.play();
  }
}

function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 100) {
    World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length > 7 &&
      boats[boats.length - 1].body.position.x < width - 400
    ) {
      var position = [-40, -60, -70, -60];
      var b = random(position);

      var myboat = new boat(width - 10, height - 100, 150, 150, b);
      boats.push(myboat);
    }

    for (var i = 0; i < boats.length; i += 1) {
      Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 });
      boats[i].display();
      boats[i].animate();

      var collision = Matter.SAT.collides(tower.body, boats[i]);
      if (collision.collided) {
        piratelaugh.play();
        GameOver();
      }
    }
  } else {
    myboat = new boat(width - 10, height - 100, 150, 150, -60);
    boats.push(myboat);
  }
}

function GameOver() {
  swal(
    {
      title: "Game Over",
      text: "thanks for playing",
    },

    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
