import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "../utils/api";
import { saveDeck } from "../actions/decks";
import { connect } from "react-redux";
import { Alert } from "react-native";

function AddDeck(props) {
  const [deckTitleInput, setdeckTitleInput] = useState("");
  const { navigate } = props.navigation;
  const { dispatch, decks } = props;

  function onPress(deckTitleInput) {
    console.log("decks from redux is: ", decks);

    if (deckTitleInput === "" || !deckTitleInput.trim()) {
      Alert.alert("Warning", "Deck title entered cannot be empty!");
    } else if (!decks[deckTitleInput]) {
      dispatch(saveDeck(deckTitleInput));
      navigate("DeckDetails", { title: deckTitleInput });
    } else {
      Alert.alert("Warning", "Deck title entered already exists!");
    }

    setdeckTitleInput("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.addDeckText}>
        What is the title of your new deck?
      </Text>
      <TextInput
        placeholder="Deck title"
        onChangeText={(text) => setdeckTitleInput(text)}
        value={deckTitleInput}
        style={styles.inputTitle}
      />
      <TouchableOpacity onPress={() => onPress(deckTitleInput)}>
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
    flexGrow: 1,
  },
  addDeckText: {
    flex: 0.16,
    flexWrap: "wrap",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#697b83",
  },
  inputTitle: {
    marginTop: 10,
    width: '80%',
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
    borderColor: "#697b83",
    borderRadius: 6,
    borderWidth: 0.5,
    backgroundColor: "#697b83",
    color: "white",
  }
});

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(AddDeck);
