/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './permissionAuth';
import Notification from './notification';

const notification = new Notification();

setTimeout(() => {
  notification.newScheduleNotification();
}, 5000);

AppRegistry.registerComponent(appName, () => App);
