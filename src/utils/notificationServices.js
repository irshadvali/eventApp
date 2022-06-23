import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
//import admin from 'firebase-admin';
export async function requestUserPermission() {
  console.log('===========fuction---requestUserPermission==1=');
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('===========fuction---requestUserPermission==2=');
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  } catch (error) {
    console.log('===========fuction==requestUserPermission======err===', error);
  }
}

const getFcmToken = async () => {
  console.log('===========fuction---getFcmToken==1=');
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('=======old==', fcmToken);
  if (!fcmToken) {
    try {
      //await messaging().registerDeviceForRemoteMessage();
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('=======new==', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('===========fcm========err===', error);
    }
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });
  messaging().onMessage(async remoteMessage => {
    console.log('receive in forground', remoteMessage);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      //setLoading(false);
    });
};

export const sendMgs = async payload => {
  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      Authorization: `${'key=AAAAmsogzQE:APA91bEQHySEcPT6BR5OxnNo4hv9Ja9wlc6V96S2WRMxvlyKX9dYTcOEESO5Zyur1ncwGv5Km_geCykXe5FvSW0zt1s5FGQmp-ArDovRV-Z7tnFrQl8OSVjUgWxoyq9dikYJzjE5miDW'}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: 'eijFO9tISf69QsyTohTdnk:APA91bEFdaoL-XlXluu6wYA6uwBd-aN-0ahvtyaRO27xPRdn4eBrRf3C-LGQVeieoSNvOvzqdz5Zg6XgAwga-GacOndlHjoNBVLP6Uoky4gYaaPNKdtGu9NVclhCVPQVq_bG8BixUmbz',
      notification: {
        body: payload.eventName,
        title: 'Event App',
      },
      data: payload,
    }),
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};
