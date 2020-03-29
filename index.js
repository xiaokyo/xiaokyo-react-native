/**
 * @format
 */
import React, { useState, useEffect } from 'react'
import { AppRegistry, NativeModules, AppState } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import storage from '~/src/utils/storage'
import './permissionAuth';

AppRegistry.registerHeadlessTask("SomeTaskName", () => require("~/SomeTaskName"));

// NativeModules.CustomExample.startHeadlessTask();

let isLunchSocket = false
const AppStateComponent = props => {
  const [state, setstate] = useState(AppState.currentState)
  console.log('state', state)
  const _handleAppStateChange = async nextAppState => {
    // if (state.match(/inactive|background/) && nextAppState === "active") {
    //   console.log("App has come to the foreground!");
    // }
    const token = await storage.get('token')
    if (nextAppState === 'background') {
      if (!isLunchSocket && token) {
        NativeModules.CustomExample.startHeadlessTask();
        isLunchSocket = true
      }
    } else {
      // NativeModules.CustomExample.endHeadLessTask();
    }
    setstate(nextAppState);
  };

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    }
  }, [])

  return <App />
}


AppRegistry.registerComponent(appName, () => AppStateComponent);
