import React from "react";
import { StyleSheet, View, Platform, StatusBar, Text } from "react-native";
import { connect } from "react-redux";
import TextButton from "./TextButton";

function DeckDetails(props) {
  const { title } = props.route.params;
  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <View style={styles.deck} >
        <View style={styles.deckTitleContainer}>
          <Text style={styles.deckTitleText}>{props.deck.title}</Text>
          <Text>{props.deck.questions.length} cards</Text>
        </View>
      </View>
      <TextButton
        style={styles.addCardButton}
        onPress={() => navigate("AddCard", { title })}
      >
        Add Card
      </TextButton>
      <TextButton
        style={styles.startOverButton}
        onPress={() => navigate("Quiz", { title })}
      >
        Start Quiz
      </TextButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#afcedb",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 3,
    flexDirection: "column",
  },
  deckTitleText: {
    fontSize: 25,
  },
  addCardButton: {
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
  startOverButton: {
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
  deck: {
    flex: 0.7,
    backgroundColor: "white",
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
  deckTitleContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 60,
    paddingRight: 60,
    width: 250
  },
});

function mapStateToProps({ decks }, { route }) {
  const { title } = route.params;
  let deck = Object.values(decks).find((item) => item.title === title);

  return {
    deck,
  };
}

export default connect(mapStateToProps)(DeckDetails);
