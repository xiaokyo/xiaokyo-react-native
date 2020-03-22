import 'react-native-gesture-handler';
import React from 'react'
import StatusBar from '~/src/components/statusBar'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// stack pages
import Login from './src/pages/login'
import Register from './src/pages/register'

// pages
import Posts from './src/pages/posts'
import Profile from './src/pages/profile'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default props => {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator initialRouteName="Login" screenOptions={{ header: () => null, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
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