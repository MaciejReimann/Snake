let startX = 0;
let endX = 0;
let startY = 0;
let endY = 0;
const reactionTreshold = 20;

module.exports = (state, turn) => {
  window.addEventListener("touchmove", e => {
    if (startX === 0) {
      startX = e.targetTouches[0].screenX;
      startY = e.targetTouches[0].screenY;
    }
    endX = e.targetTouches[0].screenX;
    endY = e.targetTouches[0].screenY;
    if (startX - endX > reactionTreshold && Math.abs(startY - endY) < 30) {
      console.log("left");
      turn("LEFT");
    } else if (
      startX - endX < -reactionTreshold &&
      Math.abs(startY - endY) < 30
    ) {
      console.log("right");
      turn("RIGHT");
    } else if (
      Math.abs(startX - endX) < 30 &&
      startY - endY < -reactionTreshold
    ) {
      console.log("down");
      turn("DOWN");
    } else if (
      Math.abs(startX - endX) < 30 &&
      startY - endY > reactionTreshold
    ) {
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
