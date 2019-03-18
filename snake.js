//Width of the snake and food
let snakeSize = 10;
//Board Size
let w = 350;
let h = 350;
//Starting Score
let score = 0;

let board = document.getElementById('board');
let ctx = board.getContext('2d');
let snake;
let food;

var createBoard = (function () {

  var setSnakeOptions = function(x, y) {
    //Snake Colors
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';

    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var setFoodOptions = function(x, y) {
      //Food Color
      ctx.fillStyle = 'black';
      ctx.fillStyle = 'brown';

      //Creates the border for the food.
      ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
      ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var scoreText = function() {
      var score_text = `Score: ${score}`;
      ctx.fillStyle = 'blue';
      //Positions the score
      ctx.fillText(score_text, 145, h-5);
  }

  var drawSnake = function() {
    // Starting length of snake
    var length = 4;
    snake = [];

    //Creating the snake
    for (var i = length; i>=0; i--) {
        snake.push({x:i, y:0});
    }
  }

  var createFood = function() {
    food = {
      //Adds starting food to a random square.
      x: Math.floor((Math.random() * 30) + 1),
      y: Math.floor((Math.random() * 30) + 1)
  }

  //Checks if the snake is eating.
  for (var i=0; i>snake.length; i++) {
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;

       if (food.x===snakeX || food.y === snakeY || food.y === snakeY && food.x===snakeX) {
         //Creates a new food when the original is eaten.
          food.x = Math.floor((Math.random() * 30) + 1);
          food.y = Math.floor((Math.random() * 30) + 1);
      }
    }
  }

  //Checks if the snake hit something.
  var check_collision = function(x, y, array) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
    }
    return false;
  }

  var setBoardOptions = function () {

    //Background color
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, w, h);

    //Boards border
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, w, h);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    //Movement Logic
    if (direction == 'right') {
        snakeX++;
    } else if (direction == 'left') {
        snakeX--;
    } else if (direction == 'up') {
        snakeY--;
    } else if (direction == 'down') {
        snakeY++;
    }

    //Checks if the snake hit a wall.
    if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || check_collision(snakeX, snakeY, snake)) {
        //Clears the board
        ctx.clearRect(0, 0, w, h);
        gameloop = clearInterval(gameloop);
        return;
    }

    //Adds a square to a snake.
    if (snakeX == food.x && snakeY == food.y) {

        var tail = {
            x: snakeX,
            y: snakeY
        };
        score++;
        createFood();
    }
    //Pops out tail and sets tail.next to tail
    else {
        var tail = snake.pop();
        tail.x = snakeX;
        tail.y = snakeY;
    }

    //Adds old tail to head.
    snake.unshift(tail);

    //For each element of the array create a square.
    for (var i = 0; i < snake.length; i++) {
        setSnakeOptions(snake[i].x, snake[i].y);
    }

    //Creates a new food
    setFoodOptions(food.x, food.y);

    //Updates Score
    scoreText();
  }

  var init = function () {
    //Starting direction of the snake.
    direction = 'down';
    drawSnake();
    createFood();
    //Loops through the game options.
    gameloop = setInterval(setBoardOptions, 80);
}

return {
    init: init
};

}());

//Controls
(function (window, document, createBoard, undefined) {

  //Start button
  document.getElementById('btn').addEventListener("click", function () {
    score = 0;
    createBoard.init();
  });

  //Controls
  document.onkeydown = function (event) {

      keyCode = window.event.keyCode;
      keyCode = event.keyCode;

      //Checks for arrowkey keycodes
      switch (keyCode) {

      case 37:
          if (direction != 'right') {
              direction = 'left';
          }
          console.log('left');
          break;

      case 39:
          if (direction != 'left') {
              direction = 'right';
              console.log('right');
          }
          break;

      case 38:
          if (direction != 'down') {
              direction = 'up';
              console.log('up');
          }
          break;

      case 40:
          if (direction != 'up') {
              direction = 'down';
              console.log('down');
          }
          break;
      }
  }
})(window, document, createBoard);