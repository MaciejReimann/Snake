module.exports = function Gameloop(initialInterval, callback) {
    let interval = initialInterval;
    let lastTime;
    let id;
    let loopCallback = callback;

    function _hasIntervalPassed() {
        const intervalHasPassed = Date.now() > lastTime + interval;
        if(intervalHasPassed) {
            lastTime = Date.now();
            loopCallback();
        };
        return intervalHasPassed;
    };

    function changeInterval(rate) {
        console.log("interval changed")
        interval = interval * rate || interval ;
    };

    function start() {
        lastTime = Date.now();
        if(!id) {
            id = setInterval(_hasIntervalPassed, 10)
        };        
    };

    function stop() {
       id = clearInterval(id);
    };

    return {start, stop, changeInterval}
};