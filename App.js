import 'react-native-gesture-handler';
import React from 'react'
import { View } from 'react-native'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// stack pages
import Login from './src/pages/login'

// pages
import Posts from './src/pages/posts'
import Profile from './src/pages/profile'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default props => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Login" screenOptions={{ header: () => null }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const Home = props => {
  return (
    <Drawer.Navigator drawerContent={() => null}>
      <Drawer.Screen name="Posts" component={Posts} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  )
}