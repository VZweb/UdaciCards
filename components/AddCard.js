import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { addCardToDeck } from "../actions/cards";
import { Alert } from "react-native";

function AddCard(props) {
  const [cardQuestion, setCardQuestion] = useState("");
  const [cardAnswer, setCardAnswer] = useState("");
  const { dispatch, navigation } = props;

  function onPress(question, answer, deckTitle) {
    if (question === "" ||answer === "" ||!question.trim() ||!answer.trim()) {
      Alert.alert("Warning", "All fields need to be completed!");
    } else {
      dispatch(addCardToDeck({ question, answer, deckTitle }));
      navigation.navigate("DeckDetails", { title: deckTitle });
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Question"
        onChangeText={(text) => setCardQuestion(text)}
        value={cardQuestion}
        style={styles.inputText}
      />
      <TextInput
        placeholder="Answer"
        onChangeText={(text) => setCardAnswer(text)}
        value={cardAnswer}
        style={styles.inputText}
      />
      <TouchableOpacity
        onPress={() => onPress(cardQuestion, cardAnswer, props.deck.title)}
      >
        <Text style={styles.submitButton}>SUBMIT</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#afcedb",
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    marginTop: 10,
    width: "80%",
    height: 50,
    fontSize: 18,
    borderColor: "#697b83",
    borderWidth: 0.7,
    padding: 15,
  },
  submitButton: {
    marginTop: 30,
    fontSize: 25,
    textAlign: "center",
    width: 200,
    padding: 15,
    borderColor: "black",
    borderRadius: 6,
    borderWidth: 0.5,
    backgroundColor: "#697b83",
    color: "white",
  },
});

function mapStateToProps({ decks }, { route }) {
  const { title } = route.params;
  let deck = Object.values(decks).find((item) => item.title === title);

  return {
    deck,
  };
}

export default connect(mapStateToProps)(AddCard);
