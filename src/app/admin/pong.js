//Notes, ball spawn not random yet! :()


//Classes
class Scoreboard {
  constructor() {
    this.score1 = 0;
    this.score2 = 0;
  }

  exist() {
    return this.show(), this.reset();
  }

  show() {
    fill(0);
    rect(
      window.width / 2 - window.width / 10,
      window.height / 28,
      window.width / 5,
      window.height / 5,
      window.width / 100
    );
    fill(255);
    text(
      this.score1,
      window.width / 2 - window.width / 15,
      window.height / 6
    );
    text(":", window.width / 2 - window.width / 100, window.height / 6);
    text(
      this.score2,
      window.width / 2 + window.width / 30,
      window.height / 6
    );
  }
  reset() {
    if (mouseIsPressed) {
      scoreboard.score1 = 0;
      scoreboard.score2 = 0;
    }
  }
}

class Ball {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.diameter = diameter;
    this.xDirection = "left";
    this.yDirection = "up";
    this.speed = window.width / 500 + window.height / 500;
    this.speedInc = window.width / 5000 + window.height / 5000;
  }
  exist() {
    return this.move(), this.show(), this.reflect(), this.die();
  }
  move() {
    if (this.xDirection == "left") {
      this.x = this.x - this.speed;
    } else if (this.xDirection == "right") {
      this.x = this.x + this.speed;
    }
    if (this.yDirection == "up") {
      this.y = this.y - this.speed / 2;
    } else if (this.yDirection == "down") {
      this.y = this.y + this.speed / 2;
    }
  }
  show() {
    fill(0);
    stroke(255);
    circle(this.x, this.y, this.diameter);
  }
  reflect() {
    //Check For Collisions

    //Check for collision with player
    if (
      this.x < player.x + player.width &&
      inRange(this.y, player.y, player.y + player.height) &&
      this.x > player.x
    ) {
      this.xDirection = "right";
      this.speed = this.speed + this.speedInc;
    }

    //Check for colision with Computer
    if (
      this.x > computer.x &&
      inRange(this.y, computer.y, computer.y + computer.height) &&
      this.x < computer.x + computer.width
    ) {
      this.xDirection = "left";
      this.speed = this.speed + this.speedInc;
    }

    //Check for colision with Top
    if (this.y < 0 && this.yDirection == "up") {
      this.yDirection = "down";
    }
    if (this.y > window.height && this.yDirection == "down") {
      this.yDirection = "up";
    }
  }
  die() {
    if (this.x < 0 || this.x > window.width) {
      this.x = window.width / 2;
      if (this.xDirection == "right") {
        this.xDirection = "left";
        scoreboard.score1 += 1;
      } else {
        this.xDirection = "right";
        scoreboard.score2 += 1;
      }
      this.speed = window.width / 500 + window.height / 500;
    }
  }
}

class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  exist() {
    return this.move(), this.show();
  }
  move() {
    if (keyIsDown(UP_ARROW) && this.y > 0) {
      this.y = this.y - window.width / 300 - window.height / 300;
    }
    if (keyIsDown(DOWN_ARROW) && this.y < window.height - window.height / 5) {
      this.y = this.y + window.width / 300 + window.height / 300;
    }
  }
  show() {
    fill(0);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Computer {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  exist() {
    return this.move(), this.show();
  }
  move() {
    if (this.y + this.height / 2 > ball.y && this.y > 0) {
      this.y = this.y - window.width / 300 - window.height / 300;
    }
    if (
      this.y + this.height / 2 < ball.y &&
      this.y < window.height - window.height / 5
    ) {
      this.y = this.y + window.width / 300 + window.height / 300;
    }
  }
  show() {
    fill(0);
    rect(this.x, this.y, this.width, this.height);
  }
}

//Functions
function inRange(n, min, max) {
  //Function that returns BOOL if n is in range(min,max)
  return (n - min) * (n - max) <= 0;
}

//Declare variables
let player;
let ball;
let computer;
let scoreboard;

//Setup the game environment
function setup() {
  //Screen setup/iniate
  window = createCanvas(1000, 500); //<<<<< Make this scale-able to browser :#

  //ball setup
  ball = new Ball(window.width / 2, window.height / 2, window.width / 50);

  //Player setup
  player = new Player(
    window.width / 10,
    window.height / 2 - window.height / 7.5,
    window.width / 50,
    window.height / 5
  );

  //AI setup
  computer = new Computer(
    (window.width / 10) * 9 - window.width / 30,
    window.height / 2 - window.height / 7.5,
    window.width / 50,
    window.height / 5
  );
  //Scoreboard setup
  scoreboard = new Scoreboard();
  textSize(window.width / 20);
}

//This runs
function draw() {
  background(100);
  scoreboard.exist();
  ball.exist();
  player.exist();
  computer.exist();
}
