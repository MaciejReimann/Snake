
function getLastItem(array) {
    return array.length > 0
        ? array[array.length - 1]
        : null
};

module.exports = {
    getLastItem
}