const ruleBtn = document.getElementById('rules-btn');
const closeRuleBtn = document.getElementById('close-btn');
const ruleElement = document.getElementById('rules');
const canvasElement = document.getElementById('canvas');
const canvasContext = canvasElement.getContext('2d');
const primaryColor = '#0095DD';
canvasContext.fillStyle = primaryColor;
let score = 0;
const bricks = [];

const resetBricks = () => {
  const numberOfBricks = {
    column: 8,
    row: 4
  };
  const brickSpace = 14;
  const brickWidth =
    (canvasElement.width - brickSpace) / numberOfBricks.column - brickSpace;
  const brickHeight = 20;
  for (let i = 0; i < numberOfBricks.column; i++) {
    for (let j = 0; j < numberOfBricks.row; j++) {
      const x = brickSpace + i * (brickWidth + brickSpace);
      const y = 50 + j * (brickHeight + brickSpace);
      bricks.push({ x, y, w: brickWidth, h: brickHeight, visible: true });
    }
  }
};

const ballCanvas = {
  x: canvasElement.width / 2,
  y: canvasElement.height / 2,
  size: 10,
  dx: 4,
  dy: -4
};

const padCanvas = {
  x: canvasElement.width / 2,
  y: canvasElement.height - 40,
  width: 100,
  height: 15,
  dx: 0,
  speed: 5
};

const drawBall = () => {
  canvasContext.beginPath();
  canvasContext.arc(
    ballCanvas.x,
    ballCanvas.y,
    ballCanvas.size,
    0,
    Math.PI * 2,
    true
  );
  canvasContext.fill();
  canvasContext.closePath();
};

const drawPad = () => {
  canvasContext.beginPath();
  canvasContext.arc(
    padCanvas.x - padCanvas.width / 2 - padCanvas.height / 2,
    padCanvas.y,
    padCanvas.height / 2,
    Math.PI / 2,
    (Math.PI * 3) / 2
  );
  canvasContext.arc(
    padCanvas.x + padCanvas.width / 2 - padCanvas.height / 2,
    padCanvas.y,
    padCanvas.height / 2,
    (Math.PI * 3) / 2,
    Math.PI / 2
  );
  canvasContext.fill();
  canvasContext.closePath();
};

const drawBricks = () => {
  bricks.forEach((brick) => {
    canvasContext.fillStyle =
      brick.visible === true ? primaryColor : 'transparent';
    canvasContext.fillRect(brick.x, brick.y, brick.w, brick.h);
  });
  canvasContext.fillStyle = primaryColor;
};

const drawScore = () => {
  canvasContext.font = '20px Arial';
  canvasContext.fillText(`Score: ${score}`, canvasElement.width - 120, 30);
};

const drawInitialElements = () => {
  canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

  drawScore();
  drawBall();
  drawPad();
  drawBricks();
};

const handleShowRule = () => {
  ruleElement.classList.toggle('show');
};

const movePaddle = () => {
  const halfPadWidth = padCanvas.width / 2;
  if (padCanvas.x >= canvasElement.width - halfPadWidth) {
    padCanvas.x = canvasElement.width - halfPadWidth;
  }

  if (padCanvas.x <= halfPadWidth + 15) {
    padCanvas.x = halfPadWidth + 15;
  }

  padCanvas.x += padCanvas.dx;
};

const moveBall = () => {
  ballCanvas.x += ballCanvas.dx;
  ballCanvas.y += ballCanvas.dy;
  const ballRadius = ballCanvas.size / 2;
  const halfPadWidth = padCanvas.width / 2;

  //  by wall collision
  if (ballCanvas.x >= canvasElement.width - ballRadius || ballCanvas.x <= 0) {
    ballCanvas.dx = -ballCanvas.dx;
  }

  if (ballCanvas.y >= canvasElement.height - ballRadius || ballCanvas.y <= 0) {
    ballCanvas.dy = -ballCanvas.dy;
  }

  // by Paddle collision
  if (
    ballCanvas.x - ballRadius >= padCanvas.x - halfPadWidth &&
    ballCanvas.x + ballRadius <= padCanvas.x + halfPadWidth &&
    ballCanvas.y + ballRadius >= padCanvas.y - padCanvas.height / 2 &&
    ballCanvas.y - ballRadius <= padCanvas.y + padCanvas.height / 2
  ) {
    ballCanvas.dy = -ballCanvas.dy;
  }

  // by Bricks collision
  bricks
    .filter((brick) => brick.visible)
    .forEach((brick) => {
      if (
        ballCanvas.x - ballRadius >= brick.x &&
        ballCanvas.x + ballRadius <= brick.x + brick.w &&
        ((ballCanvas.y - ballRadius <= brick.y &&
          ballCanvas.y + ballRadius >= brick.y) ||
          (ballCanvas.y - ballRadius <= brick.y + brick.h &&
            ballCanvas.y + ballRadius >= brick.y + 2 * ballRadius))
      ) {
        ballCanvas.dy = -ballCanvas.dy;
        brick.visible = false;
        score += 10;
      }
    });
};

const updateFrame = () => {
  movePaddle();
  moveBall();

  drawInitialElements();

  requestAnimationFrame(updateFrame);
};

const handleKeyDown = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    padCanvas.dx = padCanvas.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    padCanvas.dx = -padCanvas.speed;
  }
};

const handleKeyUp = (e) => {
  padCanvas.dx = 0;
};

const init = () => {
  ruleBtn.addEventListener('click', handleShowRule);
  closeRuleBtn.addEventListener('click', handleShowRule);
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  resetBricks();
  updateFrame();
};

init();
