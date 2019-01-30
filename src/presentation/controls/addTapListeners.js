let timeStamp = 0;
module.exports = (state, start, resume, pause) =>
  window.addEventListener("touchend", e => {
    if (timeStamp === 0) {
      timeStamp = e.timeStamp;
    } else if (e.timeStamp - timeStamp < 500) {
      if (!state().isStarted || state().isOver) {
        start();
      } else if (state().isPaused) {
        resume();
      } else {
        pause();
      }
    }
    timeStamp = e.timeStamp;
  });
