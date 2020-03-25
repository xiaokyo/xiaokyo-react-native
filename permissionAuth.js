import { PermissionsAndroid } from 'react-native';
import SmsListener from 'react-native-android-sms-listener'

async function requestReadSmsPermission() {
  try {

    const permissions = [
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
    ]

    await PermissionsAndroid.requestMultiple(permissions);

  } catch (err) {
    console.warn(err);
  }
}
requestReadSmsPermission()

console.log('SmsListener', SmsListener)
const smsSubscription = SmsListener.addListener(message => {
  console.log(message)
})