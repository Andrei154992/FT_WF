document.addEventListener("keydown", (e) => {
    if (e.key == 'ArrowLeft'){
      direction = 'left'
    }
    else if (e.key == 'ArrowRight'){
      direction = 'right'
    }
    else if (e.key == 'ArrowUp'){
      direction = 'up'
    }
    else if (e.key == 'ArrowDown'){
      direction ='down'
    }
    else if (e.key == 'r'){
      resetGame();
    }
  });
  
  document.getElementById('up_btn').onclick = () => {
    direction = 'up'
  };
  
  document.getElementById('down_btn').onclick = () => {
    direction = 'down'
  };
  
  document.getElementById('right_btn').onclick = () => {
    direction = 'right'
  };
  
  document.getElementById('left_btn').onclick = () => {
    direction = 'left'
  };
  
  const boardSize = 10;
  
  const gameBoard = document.getElementById('game_board');
  const cells = [];
  
  let snake = [{ x: 0, y: 0 }];
  let food = { x: 5, y: 5 };
  
  let direction = 'right';
  let speed = 1;
  
  document.getElementById('myInput').addEventListener('change', (event) => {
    if (event.target.value > 0 && event.target.value <= 5){
      speed = event.target.value;
    }
    else {
      console.log("Некорректный ввод!\nДоступные значения скорости находятся в интервале от 1 до 5\nПо умолчанию будет установлено значение 1")
      speed = 1;
      event.target.value = 1;
    }
  });
  
  function initializeGameBoard() {
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cells.push(cell);
        gameBoard.appendChild(cell);
      }
    }
  }
  
  function render() {
    cells.forEach((cell) => cell.classList.remove('snake', 'food'));
  
    snake.forEach((segment) => {
      const index = segment.x + segment.y * boardSize;
      cells[index].classList.add('snake');
    });
  
    const foodIndex = food.x + food.y * boardSize;
    cells[foodIndex].classList.add('food');
  }
  
  function update() {
    const head = Object.assign({}, snake[0]);
  
    switch (direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }
  
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
      resetGame();
      return;
    }
  
    if (isCollisionWithSelf(head)) {
      resetGame();
      return;
    }
  
    if (head.x === food.x && head.y === food.y) {
      snake.unshift(head);
      generateFood();
    } else {
      snake.pop();
      snake.unshift(head);
    }
  }
  
  function isCollisionWithSelf(head) {
    return snake
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y);
  }
  
  function generateFood() {
    food = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  }
  
  function resetGame() {
    snake = [{ x: 0, y: 0 }];
    direction = 'right';
    generateFood();
  }
  
  function gameLoop() {
    update();
    render();
    document.querySelector('#score').textContent = "Очки: " + updateScore(snake.length);
    setTimeout(gameLoop, 800/speed);
  }
  
  function updateScore(score) {
    return score-1;
  }
  
  initializeGameBoard();
  
  gameLoop();