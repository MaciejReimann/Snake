const intervals = [];

module.exports = function Gameloop(initialInterval, callback) {
  let interval = initialInterval;
  let loopCallback = callback;
  let lastTime;
  let id;

  function _hasIntervalPassed() {
    const intervalHasPassed = Date.now() > lastTime + interval;
    if (intervalHasPassed) {
      lastTime = Date.now();
      loopCallback();
    }
    return intervalHasPassed;
  }

  function changeInterval(newInterval) {
    if (newInterval) {
      interval = newInterval;
      console.log(interval);
    }
  }

  function start() {
    lastTime = Date.now();
    intervals.push(setInterval(_hasIntervalPassed, 10));
  }

  function stop() {
    intervals.forEach(id => clearInterval(id));
  }

  return { start, stop, changeInterval };
};
