import { createStore } from "redux";
import reducer from "./reducers/index";
import middleware from "./middleware";
import { composeWithDevTools } from "redux-devtools-extension";

const componserWithEnhancer = composeWithDevTools({});

const decksMock = {
  decks: {
    Tennis: {
      title: "Tennis",
      questions: [
        {
          question: "How the first point score in a game is called?",
          answer: "15",
        },
        {
          question: "How is the term used for a score of 40-40 called?",
          answer: "Deuce",
        },
      ],
    },
    Basketball: {
      title: "Basketball",
      questions: [
        {
          question:
            "The game's about to start. What does each team need to prepare for?",
          answer: "Tip off",
        },
        {
          question:
            "You dribble down the court, pick up the ball, then dribble again. Why did the referee blow the whistle?",
          answer: "You traveled",
        },
      ],
    },
  },
};

const store = createStore(reducer, decksMock, componserWithEnhancer(middleware));

export default store;
