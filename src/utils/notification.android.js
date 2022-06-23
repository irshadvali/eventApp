import PushNotification from 'react-native-push-notification';

const showNotification = (title, message) => {
  //   PushNotification.createChannel(
  //     {
  //       channelId: 'channel-id', // (required)
  //       channelName: 'My channel', // (required)
  //       channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
  //       playSound: false, // (optional) default: true
  //       soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  //       importance: 4, // (optional) default: 4. Int value of the Android notification importance
  //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  //     },
  //     created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  //   );

  PushNotification.localNotification({
    channelId: 'channel-id', // (required)
    title: title,
    message: message,
  });
};

const handleScheduleNotification = (title, message) => {
  PushNotification.localNotificationSchedule({
    title: title,
    message: message,
  });
};

const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {showNotification, handleScheduleNotification, handleCancel};
