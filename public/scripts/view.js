

const selectControls = (() => {
  const PAGE = document.querySelector(".page");
  const FOOTER = document.querySelector(".footer");
  const BOARD = document.querySelector(".canvas-wrapper");

  const DIRECTIONS = {
    LEFT: "fas fa-angle-left",
    UP: "fas fa-angle-up",
    DOWN: "fas fa-angle-down",
    RIGHT: "fas fa-angle-right"
  }

  const addMobileControls = () => { // https://goo.gl/YQJYxR; https://goo.gl/6rJzAh;

    PAGE.addEventListener('click', document.documentElement.webkitRequestFullscreen)
    BOARD.addEventListener('click', handle.start);
    BOARD.addEventListener('click', handle.pause);
    Array(4).fill().map((_, i) => createButton( Object.keys(DIRECTIONS)[i])
        .appendChild(createI(Object.values(DIRECTIONS)[i])).parentElement)
    .map(button => FOOTER.appendChild(button))
    .map(button => button.addEventListener('click', e => handle.turn(button.className)))
  }

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

  window.addEventListener('resize', handle.resize)
  document.body.clientWidth > 1024 ? addDesktopControls() : addMobileControls();
})()
