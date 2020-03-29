import { socketConnect } from '~/src/socket'
// import SmsListener from 'react-native-android-sms-listener'

module.exports = async (taskData) => {
  // 要做的事情
  console.log('start headless');
  await socketConnect();
  // notification.newScheduleNotification();
}