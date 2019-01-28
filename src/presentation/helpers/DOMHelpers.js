function createElement(element, className) {
  if (!className) {
    className = element;
  }
  const createdElement = document.createElement(element);
  createdElement.className = className;
  return createdElement;
}

function resizeCanvas(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function displayOnTopOfThePage(text) {
  document.querySelector(".page-foreground").textContent = text;
  // text color should be assigned here, but style.color wouldnt work...
}

module.exports = {
  createElement,
  resizeCanvas
  // displayOnTopOfThePage
};
