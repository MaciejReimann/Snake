const { gridColor, textColor } = require("./colors").darkViolet;

function styleLayout(dom) {
  const { header, canvasContainer, canvas } = dom;
  header.style.backgroundColor = gridColor;
  canvasContainer.style.backgroundColor = gridColor;
  canvas.style.backgroundColor = "black";
  header.style.color = textColor;
}

module.exports = {
  styleLayout
};
