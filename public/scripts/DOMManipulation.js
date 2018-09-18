

const createElement = element => document.createElement(element);
const giveClass = element => className => {
  element.className = className;
  return element;
}

const createButton = className => giveClass(createElement('button'))(className);
const createI = className => giveClass(createElement('i'))(className);
const createCanvas = className => giveClass(createElement('canvas'))(className);
