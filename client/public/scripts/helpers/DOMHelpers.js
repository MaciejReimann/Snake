function createElement (element, className) {
  if(!className) {
    className = element;
  };
  const createdElement = document.createElement(element);
  createdElement.className = className;
  return createdElement;
};

function resizeCanvas(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  return canvas;
};


module.exports = {
  createElement,
  resizeCanvas
};
