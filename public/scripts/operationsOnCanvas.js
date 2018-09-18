

const resize = canvas => width => height => {
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

const drawSquare = canvas => d => color => point => {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(point.x * d, point.y * d, d, d)
}

const drawVerticalLine = canvas => offset => color => {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(offset, 0);
  ctx.lineTo(offset, canvas.height);
  ctx.stroke();
  return canvas;
}
const drawHorizontalLine = canvas => offset => color => {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, offset);
  ctx.lineTo(canvas.width, offset);
  ctx.stroke();
  return canvas;
}

const drawOffsetVerticalLines = canvas => offset => color => Array(
  canvas.width / offset).fill()
  .map((_, i) => drawVerticalLine(canvas)(offset * i)(color)
)
const drawOffsetHorizontalLines = canvas => offset => color => Array(
  canvas.height / offset).fill()
  .map((_, i) => drawHorizontalLine(canvas)(offset * i)(color)
)
const drawRectangularGrid = canvas => offset => color => {
  drawOffsetVerticalLines(canvas)(offset)(color)
  drawOffsetHorizontalLines(canvas)(offset)(color)
}

const drawCircle = canvas => d => color => point => {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  drawCircleInSquare(point.x * d, point.y * d, (d / 2), ctx);
}

const clear = canvas => {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

const fill = canvas => color => {
  canvas.getContext('2d').fillStyle = color;
  canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)
}

const drawCircleInSquare = (x, y, r, context) => {
  context.beginPath();
  context.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
  context.fill();
}
