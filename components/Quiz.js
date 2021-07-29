import React, { useState, useEffect } from "react";
import { StyleSheet, View, Animated, Text } from "react-native";
import { connect } from "react-redux";
import TextButton from "./TextButton";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

function Quiz(props) {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswers, setcorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [value1, setValue1] = useState(0);

  animatedValue.addListener(({ value }) => {
    setValue1(value);
  });

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const { question, answer } = props?.deck?.questions[currentCard];

  const { title } = props.deck;
  const { navigate } = props.navigation;

  const reverseCard = () => {
    if (value1 >= 90) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }

    setShowAnswer(!showAnswer);
  };

  const setCardCorrect = () => {
    currentCard === props.noOfQuestions - 1
      ? (setQuizFinished(true),
        clearLocalNotification().then(setLocalNotification))
      : (setCurrentCard(currentCard + 1), showAnswer ? reverseCard() : "");

    setcorrectAnswers(correctAnswers + 1);
  };

  const setCardIncorrect = () => {
    currentCard === props.noOfQuestions - 1
      ? (setQuizFinished(true),
        clearLocalNotification().then(setLocalNotification))
      : (setCurrentCard(currentCard + 1), showAnswer ? reverseCard() : "");

    setIncorrectAnswers(incorrectAnswers + 1);
  };

  const restartQuiz = () => {
    setCurrentCard(0);
    showAnswer ? reverseCard() : "";
    setcorrectAnswers(0);
    setIncorrectAnswers(0);
    setQuizFinished(false);
  };

  return (
    <View style={styles.container}>
      {quizFinished ? (
        <View style={styles.endOfQuiz}>
          <Text style={styles.text}>End of Quiz</Text>
          <Text style={styles.text}>
            Correct answers: {correctAnswers}/{props.noOfQuestions}
          </Text>
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
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <View style={styles.progress}>
              <Text style={styles.progressText}>
                {currentCard + 1}/{props.noOfQuestions}
              </Text>
            </View>
            <View style={styles.mainCardTextView}>
              <Text style={styles.mainCardText}>{question}</Text>
            </View>
            <TextButton style={styles.cardButton} onPress={reverseCard}>
              Show Answer
            </TextButton>
          </Animated.View>
          <Animated.View
            style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}
          >
            <View style={styles.progress}>
              <Text style={styles.progressText}>
                {currentCard + 1}/{props.noOfQuestions}
              </Text>
            </View>
            <View style={styles.progress}>
              <Text style={styles.progressText}>{answer}</Text>
            </View>
            <TextButton style={styles.cardButton} onPress={reverseCard}>
              Show Question
            </TextButton>
          </Animated.View>
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
    alignItems: "center",
  },
  endOfQuiz: {
    flex: 0.6,
    padding: 10,
  },
  progressText: {
    flex: 0.8,
    fontSize: 20,
    textAlign: "center",
    color: "#697b83",
  },
  mainCardText: {
    fontSize: 20,
    textAlign: "center",
    color: "#697b83",
  },
  mainCardTextView: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  text: {
    flex: 1,
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
  flipCard: {
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
    height: 350,
    backfaceVisibility: "hidden",
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
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
