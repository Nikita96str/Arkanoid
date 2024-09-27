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
ballY = BRICK_HEIGHT - 8 //canvasNode.height / 2
ballY_top = ballY - BALL_RADIUS
ballY_bott = ballY + BALL_RADIUS  
// ballX_left = ballY - BALL_RADIUS
function ballX_left() {
    return ballX - BALL_RADIUS  
}function ballX_right() {
    return ballX + BALL_RADIUS  
}

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
            const x = bricks[`brick_${serNum}`]['position']['x']
            const y = bricks[`brick_${serNum}`]['position']['y']
            canvasContext.rect(
                x
                , y
                , BRICK_WIDTH
                , BRICK_HEIGHT)
            canvasContext.fill()
            canvasContext.closePath()
            // draw the y black line
            canvasContext.beginPath();
            canvasContext.moveTo(x, y)
            canvasContext.lineTo(x+BRICK_WIDTH, y)
            canvasContext.strokeStyle = 'black';
            canvasContext.stroke();
            canvasContext.closePath();
            // draw the y HotPink line
            canvasContext.beginPath();
            canvasContext.moveTo(x, y+BRICK_HEIGHT)
            canvasContext.lineTo(x+BRICK_WIDTH, y+BRICK_HEIGHT)
            canvasContext.strokeStyle = 'HotPink';
            canvasContext.stroke();
            canvasContext.closePath();
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

function drawBall_horizLine(param_BallY) {
    canvasContext.beginPath();
    // canvasContext.fillStyle = "black";
    canvasContext.moveTo(ballX-10, param_BallY)
    canvasContext.lineTo(ballX+10, param_BallY)
    canvasContext.strokeStyle = 'black';
    canvasContext.stroke();
    canvasContext.closePath();
}
function drawBall_vertLine(param_BallX) {
    canvasContext.beginPath();
    // canvasContext.fillStyle = "white";
    canvasContext.moveTo(param_BallX, ballY-10)
    canvasContext.lineTo(param_BallX, ballY+10)
    canvasContext.strokeStyle = 'black';
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
            const brick_y_top = bricks[`brick_${serNum}`]['position']['y']
            const brick_y_bot = brick_y_top + BRICK_HEIGHT
            const rangeLeft = brick_x < ballX_left() && ballX_left() < brick_x+BRICK_WIDTH
            const rangeRight = brick_x < ballX_right() && ballX_right() < brick_x+BRICK_WIDTH
            const lowBorderBrick = ballY_top <= brick_y_bot
            const topBorderBrick = ballY_bott >= brick_y_top
            const rangeTop = brick_y_top <= ballY_top && ballY_top <= brick_y_bot
            const rangeBot = brick_y_bot >= ballY_bott && ballY_bott >= brick_y_top
            const leftBorderBrick = ballX_left() <= brick_x+BRICK_WIDTH
            const rightBorderBrick = ballX_right() >= brick_x
            if (rangeLeft || rangeRight) {
                if (lowBorderBrick && topBorderBrick) {
                    console.log('ballY_bott', ballY_bott);
                    console.log('brick_y_bot', brick_y_bot);
                    console.log('ballY_top', ballY_top);
                    console.log('brick_y_top', brick_y_top);
                    // play = false
                    addY = -addY
                    bricks[`brick_${serNum}`]['status'] = 0
                    score += 1
                } 
            } else if (rangeTop || rangeBot) {    
                if (leftBorderBrick && rightBorderBrick) {
                    console.log('ballY_bott', ballY_bott);
                    console.log('brick_y_bot', brick_y_bot);
                    console.log('ballY_top', ballY_top);
                    console.log('brick_y_top', brick_y_top);
                    // play = false
                    addX = -addX
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
    drawBall_horizLine(ballY_top)
    drawBall_horizLine(ballY_bott)
    drawBall_vertLine(ballX_left()) 
    drawBall_vertLine(ballX_right()) 
    textOnScreen('Scores: ' + score, posX = 10, posY = 15, size = 10, align = 'start')
    textOnScreen('Lives: ' + lives, posX = canvasNode.width - 10, posY = 15, size = 10, align = 'end')
    if (play) { 
        collideObjects()
        ballX += addX
        ballY += addY
        ballY_top = ballY - BALL_RADIUS
        ballY_bott = ballY + BALL_RADIUS  
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