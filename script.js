// 获取canvas元素
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 设置游戏参数
const cellSize = 20;
let snake = [{x: 200, y: 200}, {x: 220, y: 200}, {x: 240, y: 200}];
let direction = 'RIGHT';
let food = {x: Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize, y: Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize};

// 绘制游戏界面
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, cellSize, cellSize);
}

// 更新游戏状态
function update() {
    let head = snake[0];
    let newHead;
    switch (direction) {
        case 'UP':
            newHead = {x: head.x, y: head.y - cellSize};
            break;
        case 'DOWN':
            newHead = {x: head.x, y: head.y + cellSize};
            break;
        case 'LEFT':
            newHead = {x: head.x - cellSize, y: head.y};
            break;
        case 'RIGHT':
            newHead = {x: head.x + cellSize, y: head.y};
            break;
    }
    snake.unshift(newHead);
    
    if (snake[0].x === food.x && snake[0].y === food.y) {
        food = {x: Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize, y: Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize};
    } else {
        snake.pop();
    }
    
    // 检查游戏结束条件
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height || checkCollision()) {
        alert('Game Over');
        clearInterval(intervalId);
    }
}

// 检查蛇是否撞到自己
function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// 处理键盘输入
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'DOWN') direction = 'UP';
            break;
        case 'ArrowDown':
            if (direction !== 'UP') direction = 'DOWN';
            break;
        case 'ArrowLeft':
            if (direction !== 'RIGHT') direction = 'LEFT';
            break;
        case 'ArrowRight':
            if (direction !== 'LEFT') direction = 'RIGHT';
            break;
    }
});

// 主游戏循环
let intervalId = setInterval(() => {
    update();
    draw();
}, 100);
