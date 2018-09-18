

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





// const drawVerticalLines = canvas => offset => color => {
//
//   for (let i = 0; i < canvas)
//   ctx.beginPath();
//   ctx.moveTo(50, 50);
//   ctx.lineTo(100, 100);
//   ctx.stroke();
//   ctx.fillStyle = color;
//   context.beginPath();
//   const gridX = canvas.width / d;
//   const gridY = canvas.height / d;
//   return Array()
// }

const drawCircle = canvas => d => color => point => {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  drawCircleInSquare(point.x * d, point.y * d, (d / 2), ctx);
}

const clear = canvas => {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

const fill = canvas => {
  canvas.getContext('2d').fillStyle = 'red';
  canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)
}

const drawCircleInSquare = (x, y, r, context) => {
  context.beginPath();
  context.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
  context.fill();
}
