const canvas = document.getElementById('textris-canvas');
const context = canvas.getContext('2d');

context.scale(20, 20);

const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
];

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(player.matrix, player.position);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

let dropCounter = 0;
let dropInterval = 1000; //ms
let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        player.moveDown();
    }
    draw();
    requestAnimationFrame(update);
}

const player = {
    position: { x: 5, y: 5 },
    matrix: matrix,
    moveLeft: () => player.position.x--,
    moveRight: () => player.position.x++,
    moveDown: () => {
        player.position.y++;
        dropCounter = 0;
    },
    move: (event) => {
        if (event.keyCode === 37) {
            player.moveLeft();
        } else if (event.keyCode === 39) {
            player.moveRight();
        } else if (event.keyCode === 40) {
            player.moveDown();
        }
    }
}

document.addEventListener('keydown', player.move);

update();
