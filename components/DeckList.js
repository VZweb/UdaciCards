import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

function DeckList(props) {
  const { decks, navigation } = props;
  const renderItem = ({ item }) => (
    <Item title={item.title} questions={item.questions} />
  );

  const Item = ({ title, questions }) => (
    <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('DeckDetails', {title})}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.questions}>{questions.length} cards</Text>
    </TouchableOpacity>
  );

  const onPressItem = (title) => {
    const { navigate } = props.navigation;
    navigate('DeckDetails', { deck: title });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Object.values(decks)}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#afcedb",
  },
  item: {
    backgroundColor: "#697b83",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: "white"
  },
  questions: {
    fontSize: 20,
    color: "white"
  },
});

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(DeckList);
