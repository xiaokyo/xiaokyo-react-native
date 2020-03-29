import 'react-native-gesture-handler';
import React from 'react'
import StatusBar from '~/src/components/statusBar'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// redux
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './src/redux'

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
  uri: 'https://xiaok.club/graphql',
});

export default props => {
  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
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