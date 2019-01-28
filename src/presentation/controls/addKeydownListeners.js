module.exports = (state, start, resume, pause, turn) =>
  window.addEventListener("keydown", e => {
    if (e.key === " ") {
      if (!state().isStarted) {
        start();
      } else if (state().isPaused) {
        resume();
      } else {
        pause();
      }
    } else if (e.key === "Enter") {
      if (state().isOver) {
        start();
      }
    }
    switch (e.key) {
      case "w":
      case "ArrowUp":
        turn("UP");
        break;
      case "a":
      case "ArrowLeft":
        turn("LEFT");
        break;
      case "s":
      case "ArrowDown":
        turn("DOWN");
        break;
      case "d":
      case "ArrowRight":
        turn("RIGHT");
        break;
    }
  });
