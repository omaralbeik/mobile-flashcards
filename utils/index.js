// React Native
import { AsyncStorage } from 'react-native';

// Expo
import { Notifications, Permissions } from 'expo';

/**
 * Create a random id
 */
export function generateId(date = new Date()) {
  return `${date.getTime()}`;
}

/**
 * Create an object from a given array
 */
export function objectFromArray(arr, key = 'id') {
  if (arr && arr.length) {
    return arr.reduce((v, i) => {
      v[i[key]] = i;
      return v;
    }, {});
  } else {
    return {};
  }

}

/**
 * Create an array from a given object
 */
export function arrayFromObject(obj, key = 'id') {
  if (!obj) {
    return [];
  }
  return Object.keys(obj).map(key => (obj[key]));
}

const NOTIFICATION_KEY = 'FlashCards:notifications';

export function cancelLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(_ =>
    Notifications.cancelAllScheduledNotificationsAsync()
  );
}

function _createLocalNotification() {
  return ({
    title: "Study Time!",
    body: "Let's take a quick quiz in one of your decks :)",
    ios: {
      sound: true
    },
    android: {
      sound: true
    }
  })
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(_createLocalNotification(), {
                time: tomorrow,
                repeat: 'day'
              });

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
