const canvasNode = document.getElementById('arkanoid');
const canvasContext = canvasNode.getContext('2d')

PADDLE_WIDTH = 50
PADDLE_HEIGHT = 10
BALL_RADIUS = 6
PADDLE_X = canvasNode.width / 2
PADDLE_Y = canvasNode.height - PADDLE_HEIGHT*2
ballX = canvasNode.width / 2
ballY = canvasNode.height / 2
addX = 1
addY = 1
canvasContext.fillStyle = '#0095DD'

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

function game() {
    // console.log("game start");
    canvasContext.clearRect(0,0, canvasNode.width, canvasNode.height)
    drawPaddle(PADDLE_X, PADDLE_Y)
    drawBall(ballX, ballY)

    collideWalls()
    // console.log("game over");

    requestAnimationFrame(game);
    
}

game()

document.addEventListener('keydown', function movePaddle(event) {
    console.log('keydown');
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
})