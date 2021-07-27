import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

export const storeData = async (deckTitle) => {
  try {
    let value = await getDecks(deckTitle);
    console.log("value is: ", value);
    if (!value) {
        value = {};
      }


    let newDeck = {};

    if (value[deckTitle]) {
      console.log("deck already exists");
      Alert.alert('Warning', 'Deck title already exists !');
    } else {
      newDeck = {
        [deckTitle]: {
          title: { deckTitle },
          questions: [],
        },
      };
      const jsonValue = JSON.stringify(newDeck);
      await AsyncStorage.setItem(deckTitle, jsonValue);
    }

  } catch (e) {
    console.log("something went wrong1 e:", e);
  }
};

export const getDecks = async (value) => {
  try {
    const jsonValue = await AsyncStorage.getItem(value);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("something went wrong2");
  }
};
