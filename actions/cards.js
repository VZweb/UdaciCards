import * as constant from "../constants";

export const addCardToDeck = (newCard) => (dispatch) => {
  const {question, answer, deckTitle} = newCard; 
  dispatch({ type: constant.ADD_CARD, question, answer, deckTitle });
};
