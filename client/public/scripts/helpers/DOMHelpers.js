function createElement (element, className) {
  if(!className) {
    className = element;
  };
  const createdElement = document.createElement(element);
  createdElement.className = className;
  return createdElement;
}

module.exports = {
  createElement
}
