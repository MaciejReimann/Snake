


const gameloop = () => {
  let interval = 1000;
  let progress = Date.now() - gamestate.lastTime;

  if(intervalPassed()()) {
    console.log("loop")
  }

  console.log(progress)
  if(progress > interval) {
    console.log("loop")
  }
  window.requestAnimationFrame(gameloop)
}












const renderCanvas = () => {

}

const step = function(t1) {
  return function(t2) {
    return function(tempo) {
      return t1-t2 > tempo
    }
  }
}
