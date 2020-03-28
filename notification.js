import PushNotification from 'react-native-push-notification';

class Notification {
  constructor() {
    PushNotification.configure({
      onRegister: function(token) {
        console.log('TOKEN:', token);
      },
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
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

  newScheduleNotification = () => {
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: 'My Notification Message', // (required)
      date: new Date(Date.now() + 5 * 1000), // in 60 secs
    });
  };
}

export default Notification;
