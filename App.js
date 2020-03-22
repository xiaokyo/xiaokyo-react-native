import 'react-native-gesture-handler';
import React from 'react'
import StatusBar from '~/src/components/statusBar'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// graphql
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// stack pages
import Login from './src/pages/login'
import Register from './src/pages/register'

// pages
import Posts from './src/pages/posts'
import Profile from './src/pages/profile'

// Drawer content
import DrawerContent from '~/src/components/drawerContent'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const client = new ApolloClient({
  uri: 'http://192.168.1.3:4000/graphql',
});

export default props => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator initialRouteName="Home" screenOptions={{ header: () => null, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const Home = props => {
  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="Posts" component={Posts} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  )
}