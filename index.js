/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import './permissionAuth'

AppRegistry.registerHeadlessTask('SomeTaskName', () => require('~/SomeTaskName'))

AppRegistry.registerComponent(appName, () => App);
