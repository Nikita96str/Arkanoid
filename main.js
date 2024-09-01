const canvasNode = document.getElementById('#arkanoid');
const canvasContext = canvasNode.getContext('2d')

PADDLE_WIDTH = 50
PADDLE_HEIGHT = 10
BALL_RADIUS = 10
canvasContext.fillStyle = '#0095DD'

function drawPaddle() {
    canvasContext.beginPath()
    canvasContext.rect(canvasNode.width / 2
        , canvasNode.height - PADDLE_HEIGHT
        , PADDLE_WIDTH
        , PADDLE_HEIGHT)
    canvasContext.fill()
    canvasNode.closePath()
}

function game() {
    drawPaddle()
}

game()