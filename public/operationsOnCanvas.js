

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
