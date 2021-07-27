import React from "react";
import { StyleSheet, View, Platform, Text, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import DeckList from "./components/DeckList";
import DeckDetails from "./components/DeckDetails";
import Quiz from "./components/Quiz";
import AddCard from "./components/AddCard";
import AddDeck from "./components/AddDeck";
import { Provider } from "react-redux";
import store from "./store";
import Ionicons from "react-native-vector-icons/Ionicons";

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="DeckList" component={DeckList}/>
      <HomeStack.Screen name="DeckDetails" component={DeckDetails} />
      <HomeStack.Screen name="AddCard" component={AddCard} />
      <HomeStack.Screen name="Quiz" component={Quiz} />
    </HomeStack.Navigator>
  );
}

const AddDeckStack = createStackNavigator();

function AddDeckStackScreen() {
  return (
    <AddDeckStack.Navigator>
      <AddDeckStack.Screen name="AddDeck" component={AddDeck} />
    </AddDeckStack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused
                  ? "home"
                  : "home-outline";
              } else if (route.name === "Add Deck") {
                iconName = focused ? "add-circle-sharp" : "add-circle-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#697b83",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Add Deck" component={AddDeckStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
