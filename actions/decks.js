import * as constant from "../constants";

export const saveDeck = (deckTitle) => (dispatch) => {
  dispatch({ type: constant.SAVE_DECK, deckTitle });
};
