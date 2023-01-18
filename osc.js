class SnakeGame {
    constructor() {
      this.canvas = document.getElementById("snake");
      this.context = this.canvas.getContext("2d");
      this.GameF = document.getElementById('gameFrame')
  
      document.addEventListener("keydown", this.onKeyPress.bind(this));
    }
  
    /* controls */
    onKeyPress(e) {
      //A
      if (e.keyCode === 65 && this.velocityX !== 1 && this.paused == false) {
        this.velocityX = -1;
        this.velocityY = 0;
        this.gameStarted = true;
      }
      //W
      if (e.keyCode === 87 && this.velocityY !== 1 && this.paused == false) {
        this.velocityX = 0;
        this.velocityY = -1;
        this.gameStarted = true;
      }
      //D
      if (e.keyCode === 68 && this.velocityX !== -1 && this.paused == false) {
        this.velocityX = 1;
        this.velocityY = 0;
        this.gameStarted = true;
      }
      //S
      if (e.keyCode === 83 && this.velocityY !== -1 && this.paused == false) {
        this.velocityX = 0;
        this.velocityY = 1;
        this.gameStarted = true;
      }
  
      /* pauze */
      if (e.keyCode === 32) {
        if (this.gameStarted) {
          clearInterval(this.timer);
  
          this.context.fillStyle = "rgba(0, 0, 0, .65)";
          this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
          this.context.fillStyle = "white";
          this.context.font = "20px Arial";
          this.context.fillText(
            "P A U S E D",
            this.canvas.width / 2 - 50,
            this.canvas.height / 2 - 10
          );
          this.paused = true;
        } else {
          this.timer = setInterval(this.loop.bind(this), 90);
          this.paused = false;
        }
  
        this.gameStarted = !this.gameStarted;
      }
    }
  
    init() {
      this.positionX = this.positionY = 13;
      this.appleX = this.appleY = startPos;
      this.tailSize = 5;
      this.trail = [];
      this.gridSize = this.tileCount = 27;
      this.velocityX = this.velocityY = 0;
      this.gameStarted = false;
      this.paused = false;
      this.timer = setInterval(this.loop.bind(this), 90);
    }
  
    loop() {
      this.update();
      this.draw();
    }
  
    update() {
      this.positionX += this.velocityX;
      this.positionY += this.velocityY;
  
      if (this.positionX < 0) {
        this.positionX = this.tileCount - 1;
      }
  
      if (this.positionY < 0) {
        this.positionY = this.tileCount - 1;
      }
  
      if (this.positionX > this.tileCount - 1) {
        this.positionX = 0;
      }
  
      if (this.positionY > this.tileCount - 1) {
        this.positionY = 0;
      }
  
      this.trail.forEach((t) => {
        if (this.positionX === t.positionX && this.positionY === t.positionY) {
          if (this.gameStarted) { mogus.play(); }
          this.reset();
        }
      });
  
      this.trail.push({ positionX: this.positionX, positionY: this.positionY });
  
      while (this.trail.length > this.tailSize) {
        this.trail.shift();
      }
  
      if (this.appleX === this.positionX && this.appleY === this.positionY) {
        this.tailSize++;
        this.newApple();
      }
    }
    /* niewe apple als je een eet */
    newApple() {
      this.appleX = Math.floor(Math.random() * this.tileCount);
      this.appleY = Math.floor(Math.random() * this.tileCount);
      eating.play();
  
      this.trail.forEach((t) => {
        if (t.positionX === this.appleX || t.positionY === this.appleY) {
          this.newApple();
        }
      });
    }
  
  
    /* de snake en achtergrond */
    draw() {
      let background = new Image();
      background.src =
        "https://s1.fileditch.ch/kGRCnkvMJLEBNoQhfpW.jpg";
  
      this.context.fillStyle = this.context.createPattern(background, "repeat");
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
      this.context.fillStyle = "black";
      this.context.font = "20px Arial";
      this.context.fillText(this.tailSize - 5, 20, 40);
  
      this.context.fillStyle = "lime";
      this.trail.forEach((t) => {
        this.context.fillRect(
          t.positionX * this.gridSize,
          t.positionY * this.gridSize,
          this.gridSize,
          this.gridSize
        );
      });
  
      /* de appel */
      let foodimg = new Image();
      foodimg.src =
        "https://s1.fileditch.ch/IQuRXLLxLnzAIWocRrU.png";
      this.context.fillStyle = this.context.createPattern(foodimg, "repeat");
      this.context.fillRect(
        this.appleX * this.gridSize,
        this.appleY * this.gridSize,
        this.gridSize,
        this.gridSize
      );
    }
  
    /* reset */
    reset() {
      let highScore = parseInt(localStorage.getItem("high"));
  
      if (!highScore || this.tailSize > highScore) {
        highScore = this.tailSize;
        localStorage.setItem("high", highScore);
      }
  
      clearInterval(this.timer);
      this.init();
    }
  }
  
  const startPos = Math.floor(Math.random() * 20);
  
  const game = new SnakeGame();
  
  const eating = new Audio('https://s1.fileditch.ch/kfTNPHMuEnxawghoZTK.mp3');
  const tada = new Audio('Tada.mp3');
  const mogus = new Audio('https://s1.fileditch.ch/soqstcSaYeCBRSJTcSUW.mp3');
  
  window.onload = () => game.init();
  
  tada.play();