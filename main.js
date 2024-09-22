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
ballY = BRICK_HEIGHT - 8  //canvasNode.height / 2
addX = 0.5
addY = 0.5 

// not collide with this params
// addX = 0.2 - 0.4
// addY = 0.2 - 0.4

colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
bricksHorizontal = Math.floor(canvasNode.width / (BRICK_WIDTH + BRICKS_OFFSET)) 
bricksOffset = (canvasNode.width - (bricksHorizontal * (BRICK_WIDTH + BRICKS_OFFSET)) + BRICKS_OFFSET)/2
bricksVertical = 3
bricksStatus = []

const newArr = []
for (let serial_num = 1; serial_num <= bricksHorizontal; serial_num++) {
    newArr.push(1)
}
for (let i = 0; i < bricksVertical; i++) {
    bricksStatus.push(newArr)
}

// create bricks
bricks = new Object()
let serial_num = 0;
let prevRowLast_num = 0;
for (let row = 1; row <= bricksVertical; row++) {
    for (let row_num = 1; row_num <= bricksHorizontal; row_num++) {
        serial_num = prevRowLast_num + row_num
        bricks[`brick_${serial_num}`] = {
            'status' : 1,
            'color' :  colors[Math.floor(Math.random()*colors.length)],
            'position' : {
                'x' : bricksOffset + BRICK_WIDTH*(row_num-1) + BRICKS_OFFSET*(row_num-1),
                'y' : (BRICK_HEIGHT+BRICKS_OFFSET)*row 
            },
            'size' : {
                'weight' : BRICK_WIDTH,
                'height' : BRICK_HEIGHT 
            }, 
        }
    }
    prevRowLast_num = serial_num
}
const bricksAmount = Object.keys(bricks).length

console.log('bricksOffset:', bricksOffset);
console.log('bricksVertical:', bricksVertical);
console.log('bricksHorizontal:', bricksHorizontal);
console.log('bricksStatus:', bricksStatus);
console.log('bricks:', bricks);

function drawBricks() {
    // console.log('drawBricks is working!', bricks.length);
    // for (let index = 0; index < bricksStatus.length; index++) {
    //     const arrBricks = bricksStatus[index]
    //     const row = index + 1
    //     for (let i = 0; i < arrBricks.length; i++) {
    //         const status = i + 1;
    //         canvasContext.beginPath()    
    //         canvasContext.rect(
    //             bricksOffset + BRICK_WIDTH * i + BRICKS_OFFSET*i
    //             , (BRICK_HEIGHT+BRICKS_OFFSET)*row 
    //             , BRICK_WIDTH
    //             , BRICK_HEIGHT)
    //         canvasContext.fill()
    //         canvasContext.closePath()
            
    //     }
    // }
    for (let serNum = 1; serNum <= bricksAmount; serNum++) {
        // console.log('serNum:',serNum);
        // console.log('status:',bricks[`brick_${serNum}`]['status']);
        if (bricks[`brick_${serNum}`]['status'] === 1) {
            canvasContext.beginPath()    
            canvasContext.fillStyle = bricks[`brick_${serNum}`]['color']
            canvasContext.rect(
                bricks[`brick_${serNum}`]['position']['x']
                , bricks[`brick_${serNum}`]['position']['y']
                , BRICK_WIDTH
                , BRICK_HEIGHT)
            canvasContext.fill()
            canvasContext.closePath()
        }
    }
}
function drawPaddle(corX, corY) {
    canvasContext.fillStyle = "blue";
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

function drawBallLine() {
    canvasContext.beginPath();
    canvasContext.fillStyle = "black";
    canvasContext.moveTo(ballX-20, ballY)
    canvasContext.lineTo(ballX+20, ballY)
    canvasContext.stroke();
    canvasContext.closePath();

}
function drawBall(corX, corY) {
    canvasContext.fillStyle = "blue";
    canvasContext.beginPath();
    canvasContext.arc(corX, corY, BALL_RADIUS, 0, 360)
    canvasContext.fill();
    canvasContext.closePath()
}

function collideObjects() {
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
        } 
    }
    // collideBricks
    for (let serNum = 1; serNum <= bricksAmount; serNum++) {
        if (bricks[`brick_${serNum}`]['status'] === 1) {
            const brick_x = bricks[`brick_${serNum}`]['position']['x']
            const brick_y = bricks[`brick_${serNum}`]['position']['y']
            const rangeX = brick_x <= ballX && ballX <= brick_x+BRICK_WIDTH
            const lowBorderY = ballY-BALL_RADIUS === brick_y+BRICK_HEIGHT
            const topBorderY = ballY-BALL_RADIUS === brick_y-BRICK_HEIGHT
            if (rangeX) {
                if (lowBorderY || topBorderY) {
                    addY = -addY
                    bricks[`brick_${serNum}`]['status'] = 0
                    score += 1
                } 
            }
        }
    }
}



function textOnScreen(phrase, posX, posY, size, align) {
    canvasContext.fillStyle = "red";
    canvasContext.strokeStyle = "black";
    canvasContext.font = `bold ${size}pt Arial`;
    canvasContext.textAlign = align;
    canvasContext.strokeText(phrase, posX, posY);
    canvasContext.fillText(phrase, posX, posY);
}


function game() {
    // console.log("game start");
    canvasContext.fillStyle = 'blue'
    canvasContext.clearRect(0,0, canvasNode.width, canvasNode.height)
    drawBricks()
    drawPaddle(PADDLE_X, PADDLE_Y)
    drawBall(ballX, ballY)
    drawBallLine()
    textOnScreen('Счёт: ' + score, posX = 10, posY = 15, size = 10, align = 'start')
    textOnScreen('Жизни: ' + lives, posX = canvasNode.width - 10, posY = 15, size = 10, align = 'end')
    if (play) { 
        collideObjects()
        ballX += addX
        ballY += addY
    } else {
        textOnScreen("Press 'Space' for start/pause game", posX = CENTER_X, posY = CENTER_Y, size = 20, align = 'center')
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