import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import { Platform } from 'react-native';

const NOTIFICATION_KEY = "UdaciFitness:notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(() => {
    Platform.OS != "web" && Notifications.cancelAllScheduledNotificationsAsync;
  });
}

function createNotification() {
  return {
    title: "Complete a quiz!",
    body: "👋 don't forget to complete a quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted" && Platform.OS != 'web') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleNotificationAsync({
              content: createNotification(),
              trigger: {
                hour: 0, minute: 34, repeats: true 
              },
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
