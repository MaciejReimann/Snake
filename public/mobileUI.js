const FOOTER = document.querySelector(".Footer");

const createButton = text => className => {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = className;
  return button;
};

// const selectControls = () => {


  const addMobileControls = () => {
    [...new Array(4)].map((button ,i) => {
      switch(i) {
        case 0: return createButton("<")("LEFT")
        case 1: return createButton("^")("UP")
        case 2: return createButton(">")("RIGHT")
        case 3: return createButton("v")("DOWN")
      }
    })
    .map(button => FOOTER.appendChild(button))
    .map(button => button.addEventListener('click', e => handleTurn(e.target.className)))
  }

  document.body.clientWidth > 1024 ? addDesktopControls() : addMobileControls();
// }
