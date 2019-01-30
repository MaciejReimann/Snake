let startX = 0;
let endX = 0;
let startY = 0;
let endY = 0;

module.exports = (state, turn) => {
  window.addEventListener("touchmove", e => {
    if (startX === 0) {
      startX = e.targetTouches[0].screenX;
      startY = e.targetTouches[0].screenY;
    }
    endX = e.targetTouches[0].screenX;
    endY = e.targetTouches[0].screenY;
    if (startX - endX > 50 && Math.abs(startY - endY) < 30) {
      console.log("left");
      turn("LEFT");
    } else if (startX - endX < -50 && Math.abs(startY - endY) < 30) {
      console.log("right");
      turn("RIGHT");
    } else if (Math.abs(startX - endX) < 30 && startY - endY < -30) {
      console.log("down");
      turn("DOWN");
    } else if (Math.abs(startX - endX) < 30 && startY - endY > 30) {
      console.log("up");
      turn("UP");
    }
  });
  window.addEventListener("touchend", e => {
    startX = 0;
    endX = 0;
    startY = 0;
    endY = 0;
  });
};
