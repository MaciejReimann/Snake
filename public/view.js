


const selectControls = ( () => {
  const FOOTER = document.querySelector(".Footer");
  const BOARD = document.querySelector(".canvas-wrapper");

  const UP = 'UP';
  const RIGHT = 'RIGHT';
  const DOWN = 'DOWN';
  const LEFT = 'LEFT';

  const addDesktopControls = () => {
    console.log('DESKTOP');
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'w': case 'ArrowUp':    handle.turn('UP'); break
        case 'a': case 'ArrowLeft':  handle.turn('LEFT');  break
        case 's': case 'ArrowDown':  handle.turn('DOWN'); break
        case 'd': case 'ArrowRight': handle.turn('RIGHT');  break
        case 'Enter':                handle.start();  break
        case ' ':                    handle.pause();  break // spacebar
      }
    })
  }

  const addMobileControls = () => {
    console.log('MOBILE')
    BOARD.addEventListener('click', handle.start);
    Array(4).fill().map((_, i) => { // https://goo.gl/YQJYxR; https://goo.gl/6rJzAh;
      switch(i) {
        case 0: return createButton(LEFT).appendChild(createI("fas fa-angle-left")).parentElement; // https://goo.gl/3dzoKc
        case 1: return createButton(DOWN).appendChild(createI("fas fa-angle-down")).parentElement;
        case 2: return createButton(UP).appendChild(createI("fas fa-angle-up")).parentElement;
        case 3: return createButton(RIGHT).appendChild(createI("fas fa-angle-right")).parentElement;
      }
    })
    .map(button => FOOTER.appendChild(button))
    .map(button => button.addEventListener('click', e => handle.turn(button.className)))
  }
  window.addEventListener('resize', handle.resize)


  document.body.clientWidth > 1024 ? addDesktopControls() : addMobileControls();

})()
