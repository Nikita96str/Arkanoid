const canvasNode = document.getElementById('arkanoid');
const canvasContext = canvasNode.getContext('2d')

PADDLE_WIDTH = 50
PADDLE_HEIGHT = 10
BALL_RADIUS = 10
PADDLE_X = canvasNode.width / 2
PADDLE_Y = canvasNode.height - PADDLE_HEIGHT*2

canvasContext.fillStyle = '#0095DD'

function drawPaddle(corX, corY) {
    canvasContext.beginPath()    
    canvasContext.rect(corX
        , corY
        , PADDLE_WIDTH
        , PADDLE_HEIGHT)
    canvasContext.fill()
    canvasContext.closePath()
}

function game() {
    console.log("game start");
    canvasContext.clearRect(0,0, canvasNode.width, canvasNode.height)
    drawPaddle(PADDLE_X, PADDLE_Y)
    console.log("game over");
    
}

game()

document.addEventListener('keyup', function movePaddle(event) {
    console.log('keyup');
    if (event.code == 'ArrowLeft') {
        PADDLE_X -= 5
        drawPaddle(PADDLE_X, PADDLE_Y)
        console.log('PADDLE_X', PADDLE_X);
    } else if(event.code == 'ArrowRight') {
        PADDLE_X += 5
        drawPaddle(PADDLE_X, PADDLE_Y)
        console.log('PADDLE_X', PADDLE_X);
    }
})