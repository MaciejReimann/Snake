const FOOTER = document.querySelector(".Footer");

const BUTTON = 'button';
const I = 'i';
const UP = 'UP';
const RIGHT = 'RIGHT';
const DOWN = 'DOWN';
const LEFT = 'LEFT';

const createElement = element => document.createElement(element);
const giveClass = element => className => {
  element.className = className;
  return element;
}
const createButton = className => giveClass(createElement(BUTTON))(className);
const createI = className => giveClass(createElement(I))(className);


const selectControls = (() => {

  const addMobileControls = () => {
    Array(4).fill().map((_, i) => { // https://goo.gl/YQJYxR; https://goo.gl/6rJzAh;
      switch(i) {
        case 0: return createButton(LEFT).appendChild(createI("fas fa-angle-left")).parentElement; // https://goo.gl/3dzoKc
        case 1: return createButton(DOWN).appendChild(createI("fas fa-angle-down")).parentElement;
        case 2: return createButton(UP).appendChild(createI("fas fa-angle-up")).parentElement;
        case 3: return createButton(RIGHT).appendChild(createI("fas fa-angle-right")).parentElement;
      }
    })
    .map(button => FOOTER.appendChild(button))
    .map(button => button.addEventListener('click', e => handleTurn(button.className)))
  }

  document.body.clientWidth > 1024 ? addDesktopControls() : addMobileControls();
})()
