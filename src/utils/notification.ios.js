import PushNotificationIOS from 'react-native-push-notification';

const showNotification = (title, message) => {
  //   PushNotification.localNotification({
  //     channelId: 'channel-id', // (required)
  //     title: title,
  //     message: message,
  //   });
  PushNotificationIOS.presentLocalNotification({
    channelId: 'channel-id',
    alertTitle: title,
    alertBody: message,
  });
};

const handleScheduleNotification = (title, message) => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + 5);
  PushNotificationIOS.scheduleLocalNotification({
    channelId: 'channel-id',
    alertTitle: title,
    alertBody: message,
    fireDate: date.toISOString(),
  });
};

const handleCancel = () => {
  PushNotificationIOS.removeAllDeliveredNotifications();
};

export {showNotification, handleScheduleNotification, handleCancel};