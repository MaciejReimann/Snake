module.exports = (state, start, resume, pause, turn) =>
  window.addEventListener("touchmove", e => {
    const dX = e.touches[0].clientX;
    // console.log(dX);
  });
