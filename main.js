const canvasNode = document.getElementById('arkanoid');
const canvasContext = canvasNode.getContext('2d')

let play = false;
let score = 0;
let lives = 0;
PADDLE_WIDTH = 50
PADDLE_HEIGHT = 8 
BRICK_WIDTH = PADDLE_WIDTH * 1.5
BRICK_HEIGHT = PADDLE_HEIGHT*2
BRICKS_OFFSET = 10
BALL_RADIUS = 6
CENTER_X = canvasNode.width / 2
PADDLE_X = canvasNode.width / 2
CENTER_Y = canvasNode.height / 2
PADDLE_Y = canvasNode.height - PADDLE_HEIGHT*2
ballX = canvasNode.width / 2
ballY = canvasNode.height / 2
addX = 1
addY = 1

bricksHorizontal = Math.floor(canvasNode.width / (BRICK_WIDTH + BRICKS_OFFSET)) 
bricksOffset = (canvasNode.width - (bricksHorizontal * (BRICK_WIDTH + BRICKS_OFFSET)) + BRICKS_OFFSET)/2
bricksVertical = 3
bricksStatus = []

const newArr = []
for (let st = 0; st < bricksHorizontal; st++) {
    newArr.push(1)
}
for (let i = 0; i < bricksVertical; i++) {
    bricksStatus.push(newArr)
}
console.log('bricksOffset:', bricksOffset);
console.log('bricksHorizontal:', bricksHorizontal);
console.log('bricksStatus:', bricksStatus);

function drawBricks() {
    for (let index = 0; index < bricksStatus.length; index++) {
        const arrBricks = bricksStatus[index]
        const row = index + 1
        for (let i = 0; i < arrBricks.length; i++) {
            const status = i + 1;
            // console.log('i:', i);
            // console.log('status:', status);
            //     console.log('x:', 
            //         bricksOffset + BRICK_WIDTH * status + BRICKS_OFFSET*i);
            
            canvasContext.beginPath()    
            canvasContext.rect(
                bricksOffset + BRICK_WIDTH * i + BRICKS_OFFSET*i
                , (BRICK_HEIGHT+BRICKS_OFFSET)*row 
                , BRICK_WIDTH
                , BRICK_HEIGHT)
            canvasContext.fill()
            canvasContext.closePath()
            
        }
    }
}
function drawPaddle(corX, corY) {
    // canvasContext.clearRect(0,0, canvasNode.width, canvasNode.height)
    canvasContext.beginPath()    
    canvasContext.rect(
        corX
        , corY
        , PADDLE_WIDTH
        , PADDLE_HEIGHT)
    canvasContext.fill()
    canvasContext.closePath()
}

function drawBall(corX, corY) {
    canvasContext.beginPath();
    canvasContext.arc(corX, corY, BALL_RADIUS, 0, 360)
    canvasContext.fill();
    canvasContext.closePath()
}

function collideWalls() {
    // collideWalls
    if (ballX === 0 + BALL_RADIUS) {
        addX = -addX
    } else if (ballX === canvasNode.width-BALL_RADIUS) {
        addX = -addX
    }
    if (ballY === 0 + BALL_RADIUS) {
        addY = -addY
    } else if (ballY === canvasNode.height-BALL_RADIUS) {
        addY = -addY
    }
    // collidePaddle
    if (PADDLE_X < ballX-BALL_RADIUS && ballX-BALL_RADIUS < PADDLE_X+PADDLE_WIDTH) {  
        if (ballY+BALL_RADIUS === PADDLE_Y) {
            addY = -addY
            // addX = 0
            // addY = 0
        } 
    }
    ballX += addX
    ballY += addY
}

function maintextOnScreen(phrase, posY) {
    canvasContext.fillStyle = "red";
    canvasContext.strokeStyle = "#F00";
    // canvasContext.font = "italic 10pt Arial";
    canvasContext.textAlign = "center";
    // canvasContext.strokeText(phrase, CENTER_X, CENTER_Y/2);
    canvasContext.font = 'bold 20px sans-serif';
    canvasContext.fillText(phrase, CENTER_X, posY);
}

function textOnScreen(phrase, posX, posY, size, align) {
    canvasContext.fillStyle = "red";
    canvasContext.strokeStyle = "#F00";
    canvasContext.font = `bold ${size}pt Arial`;
    canvasContext.textAlign = align;
    canvasContext.fillText(phrase, posX, posY);
}


function game() {
    // console.log("game start");
    canvasContext.fillStyle = 'blue'
    canvasContext.clearRect(0,0, canvasNode.width, canvasNode.height)
    drawBricks()
    drawPaddle(PADDLE_X, PADDLE_Y)
    drawBall(ballX, ballY)
    textOnScreen('Счёт: ' + score, posX = 10, posY = 15, size = 10, align = 'start')
    textOnScreen('Жизни: ' + lives, posX = canvasNode.width - 10, posY = 15, size = 10, align = 'end')
    if (play) { 
        collideWalls()
    } else {
        textOnScreen("Press 'Space' for start/pause game", posX = CENTER_X, posY = CENTER_Y/2, size = 20, align = 'center')
    }
    // console.log("game over");
    requestAnimationFrame(game);   
}

game()

document.addEventListener('keydown', function movePaddle(event) {
    console.log('keydown');
    if(event.code == 'Space') {
        play = !play
    }
    if (play) {
        if (event.code == 'ArrowLeft' && PADDLE_X > 0) {
            PADDLE_X -= 5
            drawPaddle(PADDLE_X, PADDLE_Y)
            console.log('PADDLE_X', PADDLE_X);
        } else if(event.code == 'ArrowRight' && PADDLE_X < canvasNode.width-PADDLE_WIDTH) {
            PADDLE_X += 5
            drawPaddle(PADDLE_X, PADDLE_Y)
            console.log('canvasNode.width-PADDLE_WIDTH:', canvasNode.width-PADDLE_WIDTH);
            console.log('PADDLE_X', PADDLE_X);
        }  
    }
})