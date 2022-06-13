import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import LoginPage from './Login/LoginPage';
import EventPage from './Event/EventPage';
import {useSelector} from 'react-redux';
// login flow
const Auth = createNativeStackNavigator();
const AuthStack = () => (
  <Auth.Navigator
    initialRouteName="LoginPage"
    screenOptions={{
      animationEnabled: false,
      headerShown: false,
    }}>
    <Auth.Screen name="LoginPage" component={LoginPage} />
  </Auth.Navigator>
);

// Home use only in authenticated screens
const Home = createNativeStackNavigator();
const HomeStack = () => (
  <Home.Navigator
    initialRouteName="Events"
    screenOptions={{headerShown: false}}>
    <Home.Screen name="Events" component={EventPage} />
  </Home.Navigator>
);
const RootStack = createNativeStackNavigator();
const Router = () => {
  const [userObj, setUserObj] = useState(false);
  console.log(userObj, '==========in==Router');
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {userObj ? (
          <RootStack.Screen name="Home" component={HomeStack} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
