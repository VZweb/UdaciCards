import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DeckList from "./components/DeckList";
import DeckDetails from "./components/DeckDetails";
import Quiz from "./components/Quiz";
import AddCard from "./components/AddCard";
import AddDeck from "./components/AddDeck";
import { Provider } from "react-redux";
import store from "./store";
import Ionicons from "react-native-vector-icons/Ionicons";
import { setLocalNotification } from "./utils/helpers";

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen(props) {
  const { route } = props;
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="DeckList"
        component={DeckList}
        options={{
          title: "UdaciCards",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#697b83",
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: "#afcedb",
          },
        }}
      />
      <HomeStack.Screen
        name="DeckDetails"
        component={DeckDetails}
        options={({ route }) => ({ title: route.params.title })}
      />
      <HomeStack.Screen
        name="AddCard"
        component={AddCard}
        options={{ title: "Add Card" }}
      />
      <HomeStack.Screen
        name="Quiz"
        component={Quiz}
        options={{ title: "Quiz" }}
      />
    </HomeStack.Navigator>
  );
}

const AddDeckStack = createStackNavigator();

function AddDeckStackScreen() {
  return (
    <AddDeckStack.Navigator>
      <AddDeckStack.Screen
        name="AddDeck"
        component={AddDeck}
        options={{ title: "Add Deck" }}
      />
    </AddDeckStack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    setLocalNotification();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
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
