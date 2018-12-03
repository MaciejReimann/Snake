
function drawVerticalLine(canvas, offset, color, width) {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(offset - width / 2, 0 - width / 2);
  ctx.lineTo(offset - width / 2, canvas.height - width / 2);
  ctx.lineWidth = width;
  ctx.stroke();
  return canvas;
};

function drawHorizontalLine(canvas, offset, color, width) {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(0 - width / 2, offset - width / 2);
  ctx.lineTo(canvas.width - width / 2, offset - width / 2);
  ctx.lineWidth = width;
  ctx.stroke();
  return canvas;
};

function drawOffsetVerticalLines(canvas, offset, color, width) {
  return Array(canvas.width / offset)
      .fill()
      .map((_, i) => drawVerticalLine(canvas, offset * i, color, width))
};

function drawOffsetHorizontalLines(canvas, offset, color, width) {
  return Array(canvas.height / offset)
      .fill()
      .map((_, i) => drawHorizontalLine(canvas, offset * i, color, width))
};

function drawRectangularGrid(canvas, offset, color, width) {
  drawOffsetVerticalLines(canvas, offset, color, width)
  drawOffsetHorizontalLines(canvas, offset, color, width)
};

function drawSquare(vertices, canvas, color) {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(vertices[0].x, vertices[0].y);
  ctx.lineTo(vertices[1].x, vertices[1].y);
  ctx.lineTo(vertices[2].x, vertices[2].y);
  ctx.lineTo(vertices[3].x, vertices[3].y);
  return ctx;
};

function drawSquareFromCorner(canvas, d, color, point) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(point.x * d, point.y * d, d, d)
};

function drawCircle(canvas, d, color, point) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  drawCircleInSquare(point.x * d, point.y * d, (d / 2), ctx);
};

function drawCircleInSquare(x, y, r, context) {
  context.beginPath();
  context.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
  context.fill();
};

function fill(canvas, color) {
  canvas.getContext('2d').fillStyle = color;
  canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)
};

function clear(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

module.exports = {
  drawVerticalLine,
  drawHorizontalLine,
  drawOffsetVerticalLines,
  drawOffsetHorizontalLines,
  drawRectangularGrid,
  drawSquare,
  drawSquareFromCorner,
  drawCircle,
  drawCircleInSquare,
  fill,
  clear
};









