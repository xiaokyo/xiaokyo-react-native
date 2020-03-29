import PushNotification from 'react-native-push-notification';

class Notification {
  constructor() {
    PushNotification.configure({
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        // console.log('NOTIFICATION:', notification);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      senderID: 'YOUR GCM (OR FCM) SENDER ID',
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  newNotification = () => {
    PushNotification.localNotification({
      /* iOS and Android properties */
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
    });
  };

  newScheduleNotification = ({ title, message }) => {
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      title,
      message, // (required)
      date: new Date(Date.now() + 1 * 1000), // in 60 secs
    });
  };
}

export default Notification;
