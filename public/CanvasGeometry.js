


const clearCanvas = canv => {
  canv.getContext('2d').clearRect(0, 0, canv.width, canv.height);
}

const drawCircleInSquare = (x, y, r, context) => {
  context.beginPath();
  context.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
  context.fill();
}
