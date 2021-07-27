import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Text } from "react-native";
import { connect } from "react-redux";
import TextButton from "./TextButton";

function Quiz(props) {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswers, setcorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const { question, answer } = props?.deck?.questions[currentCard];

  const { title } = props.deck;
  const { navigate, reset } = props.navigation;

  const reverseCard = () => {
    setShowAnswer(!showAnswer);
  };

  const setCardCorrect = () => {
    // check if is the last card of the deck
    currentCard === props.noOfQuestions - 1
      ? setQuizFinished(true)
      : (setCurrentCard(currentCard + 1), setShowAnswer(false));

    setcorrectAnswers(correctAnswers + 1);
  };

  const setCardIncorrect = () => {
    // check if is the last card of the deck
    currentCard === props.noOfQuestions - 1
      ? setQuizFinished(true)
      : (setCurrentCard(currentCard + 1), setShowAnswer(false));

    setIncorrectAnswers(incorrectAnswers + 1);
  };

  const restartQuiz = () => {
    setCurrentCard(0);
    setShowAnswer(false);
    setcorrectAnswers(0);
    setIncorrectAnswers(0);
    setQuizFinished(false);
  };

  return (
    <View style={styles.container}>
      {quizFinished ? (
        <View style={styles.endOfQuiz}>
          <Text style={styles.text}>End of Quiz</Text>
          <Text style={styles.text}>Correct answers: {correctAnswers}/{props.noOfQuestions}</Text>
          <TextButton style={styles.restartButton} onPress={restartQuiz}>
            Restart Quiz!
          </TextButton>
          <TextButton
            style={styles.backToDeckButton}
            onPress={() => navigate("DeckDetails", { title })}
          >
            Back to Deck
          </TextButton>
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.progress}>
              <Text style={styles.progressText}>
                {currentCard + 1}/{props.noOfQuestions}
              </Text>
            </View>
            <View style={styles.progress}>
              <Text style={styles.progressText}>{showAnswer ? answer : question}</Text>
            </View>
            <TextButton style={styles.cardButton} onPress={reverseCard}>
              {showAnswer ? "Show Question" : "Show Answer"}
            </TextButton>
          </View>
          <View>
            <TextButton onPress={setCardCorrect} style={styles.correctButton}>
              {"Correct"}
            </TextButton>
            <TextButton
              onPress={setCardIncorrect}
              style={styles.incorrectButton}
            >
              {"Incorrect"}
            </TextButton>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#afcedb",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  endOfQuiz: {
    flex: 0.6,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  progressText: {
    flex: 0.8,
    // flexWrap: "wrap",
    fontSize: 20,
    // fontWeight: "bold",
    textAlign: "center",
    color: "#697b83",
  },
  text: {
    flex: 1,
    // flexWrap: "wrap",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#697b83",
  },
  progress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  correctButton: {
    marginTop: 30,
    fontSize: 25,
    textAlign: "center",
    width: 200,
    padding: 15,
    borderColor: "black",
    borderRadius: 6,
    borderWidth: 0.5,
    backgroundColor: "green",
    color: "white",
  },
  incorrectButton: {
    marginTop: 30,
    fontSize: 25,
    textAlign: "center",
    width: 200,
    padding: 15,
    borderColor: "black",
    borderRadius: 6,
    borderWidth: 0.5,
    backgroundColor: "red",
    color: "white",
  },
  cardButton: {
    marginTop: 10,
    fontSize: 15,
    textAlign: "center",
    width: 140,
    padding: 10,
    borderColor: "#697b83",
    borderRadius: 6,
    borderWidth: 0.5,
    backgroundColor: "white",
    color: "#697b83",
  },
  restartButton: {
    marginTop: 30,
    fontSize: 25,
    textAlign: "center",
    width: 200,
    padding: 15,
    borderColor: "#697b83",
    borderRadius: 6,
    borderWidth: 0.5,
    backgroundColor: "white",
    color: "#697b83",
  },
  backToDeckButton: {
    marginTop: 30,
    fontSize: 25,
    textAlign: "center",
    width: 200,
    padding: 15,
    borderColor: "#697b83",
    borderRadius: 6,
    borderWidth: 0.5,
    backgroundColor: "#697b83",
    color: "white",
  },
  card: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 3,
    borderRadius: 30,
    shadowRadius: 10,
    shadowOpacity: 10,
    shadowColor: "#7a9099",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    width: 250,
    height: 250,
  },
});

function mapStateToProps({ decks }, { route }) {
  const { title } = route.params;
  let deck = Object.values(decks).find((item) => item.title === title);
  let noOfQuestions = deck.questions.length;

  return {
    deck,
    noOfQuestions,
  };
}

export default connect(mapStateToProps)(Quiz);
