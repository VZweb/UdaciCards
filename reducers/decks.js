import * as constant from "../constants";

export const decks = (state = {}, action) => {
  const { deckTitle } = action;
  switch (action.type) {
    case constant.SAVE_DECK:
      return {
        ...state,
        [deckTitle]: {
          title: deckTitle,
          questions: [],
        },
      };
    case constant.ADD_CARD:
      const { question, answer } = action;

      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions: [
            ...state[deckTitle].questions,
            {
              question,
              answer,
            },
          ],
        },
      };
    default:
      return state;
  }
};
