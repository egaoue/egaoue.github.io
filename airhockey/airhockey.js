var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x;
var y;
var dx = 0;
var dy = 0;
var paddleX;
var paddleY;
var distancePaddleBall;
var ballMove = false;
var scoreTop = 0;
var scoreBottom = 0;

function resetScore() {
  scoreTop = 0;
  scoreBottom = 0;
  ballMove = false;
}


function drawText() {
  ctx.font = "48px 'serif'";
  ctx.strokeText("Аэрохоккей", 20, 130);

  ctx.font = "48px 'serif'";
  ctx.fillText(scoreTop, 20, 280);
  ctx.font = "48px 'serif'";
  ctx.fillText(scoreBottom, 20, 360);
  }

function drawPaddle() {
  ctx.beginPath();
  ctx.arc(paddleX, paddleY, 15, 0, Math.PI*2);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
  }

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function playingField() {
  ctx.beginPath();
  ctx.moveTo(0,300);
  ctx.lineTo(450,300);
  ctx.strokeStyle = "blue";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(150,0);
  ctx.lineTo(150,10);
  ctx.lineTo(10,10);
  ctx.lineTo(10,590);
  ctx.lineTo(150,590);
  ctx.lineTo(150,600);
  ctx.lineTo(0,600);
  ctx.fillStyle = "black";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(300,10);
  ctx.lineTo(440,10);
  ctx.lineTo(440,590);
  ctx.lineTo(300,590);
  ctx.lineTo(300,600);
  ctx.lineTo(450,600);
  ctx.lineTo(450,600);
  ctx.lineTo(450,0);
  ctx.lineTo(300,0);
  ctx.fillStyle = "black";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(225,300);
  ctx.arc(225,300,15,0,(Math.PI/180)*360);
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.arc(225,300,75,0,Math.PI*2,true); // Внешняя окружность
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(225,0,75,Math.PI,Math.PI*2,true); // Верхние ворота
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(225,600,75,0,Math.PI,true); // Нижние ворота
  ctx.stroke();
}
function draw() {
    distancePaddleBall = Math.sqrt(Math.pow(x-paddleX,2) + Math.pow(y-paddleY,2));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playingField();
    drawText();
    drawBall();
    drawPaddle()
    if (distancePaddleBall < 30) {
      ballMove = true;
      dx = x - paddleX;
      dy = y - paddleY;
    }
   if (ballMove) { // движение мяча когда ballMove = true
     x += dx*0.2;
     y += dy*0.2;
   }
   else { // остановка мяча и перенос его в центр поля когда ballMove = false
     x = 225;
     y = 300;
   }
    if (x > 450 || x < 0) {
      dx = -dx;
    }
    if (((0 < x && x < 150) || (300 < x && x < 450)) && (y > 600 || y < 0)) {
        dy = -dy;
    }
    if (y < -5) {
      scoreTop += 1;
      ballMove = false;
    }
    if (y > 605) {
      scoreBottom += 1;
      ballMove = false;
    }
}
function mouseMoveHandler(e) {
    paddleX = e.clientX;
    paddleY = e.clientY;
}

document.addEventListener("mousemove", mouseMoveHandler, false);


setInterval(draw, 10);
