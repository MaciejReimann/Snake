function addControls() {
  let deviceType;
  if (document.body.clientWidth > 1024) {
    resizeBoard();
    addKeydownListeners();
  } else {
    addSwipeListeners();
  }
  return dispatch({
    type: ADD_CONTROLS,
    payload: {
      deviceType
    }
  });
}

module.exports = {
  addControls
};
