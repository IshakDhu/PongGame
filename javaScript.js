let canvas;
let canvasContext;

let ballX = 50;
let ballSpeedX = 15;

let ballY = 10;
let ballSpeedY = 4;

let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 3;

let showWinScreen = false;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;




function calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    return {
        x: mouseX,
        y: mouseY

    };


}

function handleMouseClick(evt) {
    if (showWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showWinScreen = false;
    }
}

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');


    let framesPerSecond = 30; // Life Changer
    setInterval(function () {
        movingParts();
        drawBorad();
    }, 1000 / framesPerSecond);


    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove', function (evt) {
        let mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });


}

function ballReset() {

    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
        showWinScreen = true;
    }


    ballSpeedX = -ballSpeedX
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function aiMovement() {

    let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);

    if (paddle2YCenter < ballY - 35) {
        paddle2Y += 6;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 6;
    }
}


function movingParts() {

    if (showWinScreen) {
        return;
    }

    aiMovement();


    ballX += ballSpeedX;

    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;

            let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);

            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++ // must be before ball reset
            ballReset();
        }
    }
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;

            let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);

            ballSpeedY = deltaY * 0.35;

        } else {
            player2Score++ // must be before ball reset
            ballReset();
        }

    }


    ballY += ballSpeedY;

    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawBoardNet() {

    for (var i = 0; i < canvas.height; i += 40) {
        colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
    }

}



function drawBorad() {
    // Creates canvas area
    colorRect(0, 0, canvas.width, canvas.height, 'black');


    if (showWinScreen) {
        canvasContext.fillStyle = 'white';
        if (player1Score >= WINNING_SCORE) {
            canvasContext.fillText("Human Wins :D", canvas.width / 2, 200);
        } else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText("Computer Dances on your Grave!", canvas.width / 2, 200);
        }
        canvasContext.fillText("Click to Continue", canvas.width / 2, canvas.height / 2);
        return;
    }
    // Creates Net
    drawBoardNet()
    // Creates the left paddle
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    // Creates the right paddle
    colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    // Creates ball
    colorCir(ballX, ballY, 10, 'white');

    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);

}



function colorCir(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();

}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}