const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;

const colors = [
    "black", "red", "green", "blue", "yellow", "orange", "purple", "cyan"
];

const shapes = [
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[0, 1, 0], [1, 1, 1]],
    [[1, 0, 0], [1, 1, 1]],
    [[0, 0, 1], [1, 1, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[1, 1, 0], [0, 1, 1]]
];

// Variabel permainan
let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
let currentTetrimino = generateTetrimino();
let nextTetrimino = generateTetrimino();
let score = 0;
let linesCleared = 0;
let fallSpeed = 500;
let gameRunning = false;
let showStartScreen = true;
let showGameOverScreen = false;

// Fungsi membuat tetromino baru
function generateTetrimino() {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    return {
        x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
        y: 0,
        shape,
        color: Math.floor(Math.random() * (colors.length - 1)) + 1
    };
}

// Fungsi menggambar grid
function drawGrid() {
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            ctx.fillStyle = colors[grid[y][x]];
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
    }
}

// Fungsi menggambar tetromino
function drawTetrimino(tetrimino) {
    tetrimino.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                ctx.fillStyle = colors[tetrimino.color];
                ctx.fillRect(
                    (tetrimino.x + x) * BLOCK_SIZE,
                    (tetrimino.y + y) * BLOCK_SIZE,
                    BLOCK_SIZE,
                    BLOCK_SIZE
                );
                ctx.strokeRect(
                    (tetrimino.x + x) * BLOCK_SIZE,
                    (tetrimino.y + y) * BLOCK_SIZE,
                    BLOCK_SIZE,
                    BLOCK_SIZE
                );
            }
        });
    });
}

// Fungsi menggambar layar Start
function drawStartScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "36px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Tetris", canvas.width / 2, 150);

    const buttonX = canvas.width / 2 - 50;
    const buttonY = 250;
    const buttonWidth = 100;
    const buttonHeight = 50;

    ctx.fillStyle = "rgb(0, 200, 0)";
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Start", buttonX + buttonWidth / 2, buttonY + buttonHeight / 1.6);

    return { buttonX, buttonY, buttonWidth, buttonHeight };
}

// Fungsi menggambar layar Game Over
function drawGameOverScreen(score) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "36px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, 150);
    ctx.fillText(Score= $(score), canvas.width / 2, 200);

    const buttonX = canvas.width / 2 - 50;
    const buttonY = 250;
    const buttonWidth = 100;
    const buttonHeight = 50;

    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Restart", buttonX + buttonWidth / 2, buttonY + buttonHeight / 1.6);

    return { buttonX, buttonY, buttonWidth, buttonHeight };
}

// Periksa tabrakan
function checkCollision(grid, tetrimino, offsetX, offsetY) {
    return tetrimino.shape.some((row, y) =>
        row.some((cell, x) => {
            if (cell) {
                const newX = tetrimino.x + x + offsetX;
                const newY = tetrimino.y + y + offsetY;
                return (
                    newX < 0 ||
                    newX >= COLS ||
                    newY >= ROWS ||
                    (newY >= 0 && grid[newY][newX] !== 0)
                );
            }
            return false;
        })
    );
}

// Turunkan tetromino
function dropTetrimino() {
    if (!checkCollision(grid, currentTetrimino, 0, 1)) {
        currentTetrimino.y++;
    } else {
        mergeTetrimino();
        clearLines();
        currentTetrimino = nextTetrimino;
        nextTetrimino = generateTetrimino();

        if (checkCollision(grid, currentTetrimino, 0, 0)) {
            gameRunning = false;
            showGameOverScreen = true;
        }
    }
}

// Gabungkan tetromino ke grid
function mergeTetrimino() {
    currentTetrimino.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                grid[currentTetrimino.y + y][currentTetrimino.x + x] = currentTetrimino.color;
            }
        });
    });
}

// Hapus garis penuh
function clearLines() {
    let lines = 0;
    for (let y = 0; y < ROWS; y++) {
        if (grid[y].every(cell => cell !== 0)) {
            grid.splice(y, 1);
            grid.unshift(Array(COLS).fill(0));
            lines++;
        }
    }

    if (lines > 0) {
        linesCleared += lines;
        score += lines * 100;
        document.getElementById('score').innerText = score;
    }
}

// Reset permainan
function resetGame() {
    grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    score = 0;
    linesCleared = 0;
    currentTetrimino = generateTetrimino();
    nextTetrimino = generateTetrimino();
    document.getElementById('score').innerText = score;
    showStartScreen = true;
    gameRunning = false;
    showGameOverScreen = false;
}

// Event klik mouse untuk Start dan Restart
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (showStartScreen) {
        const startButton = drawStartScreen();
        if (
            clickX >= startButton.buttonX &&
            clickX <= startButton.buttonX + startButton.buttonWidth &&
            clickY >= startButton.buttonY &&
            clickY <= startButton.buttonY + startButton.buttonHeight
        ) {
            showStartScreen = false;
            gameRunning = true;
        }
    }

    if (showGameOverScreen) {
        resetGame();
    }
});

// Kontrol keyboard
document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;

    if (e.key === "ArrowLeft" && !checkCollision(grid, currentTetrimino, -1, 0)) {
        currentTetrimino.x--;
    } else if (e.key === "ArrowRight" && !checkCollision(grid, currentTetrimino, 1, 0)) {
        currentTetrimino.x++;
    } else if (e.key === "ArrowDown") {
        dropTetrimino();
    } else if (e.key === "ArrowUp") {
        const rotated = currentTetrimino.shape[0].map((_, i) =>
            currentTetrimino.shape.map((row) => row[i]).reverse()
        );
        if (!checkCollision(grid, { ...currentTetrimino, shape: rotated }, 0, 0)) {
            currentTetrimino.shape = rotated;
        }
    }
});

// Reset game saat modal ditutup
window.addEventListener("hide.bs.modal", () => {
    resetGame();
});

// Loop utama permainan
function gameLoop() {
    if (showStartScreen) {
        drawStartScreen();
    } else if (showGameOverScreen) {
        drawGameOverScreen(score);
    } else if (gameRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        drawTetrimino(currentTetrimino);
    }
    requestAnimationFrame(gameLoop);
}

setInterval(() => {
    if (gameRunning) dropTetrimino();
}, fallSpeed);

gameLoop();