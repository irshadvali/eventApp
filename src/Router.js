import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import LoginPage from './Login/LoginPage';
import EventPage from './Event/EventPage';
import ASYNCKEYS from './utils/AsyncKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
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
  const [token, setToken] = useState();
  const userData = useSelector(state => state.auth);
  useEffect(() => {
    userData?.isLogout && setToken('');
    readData();
  }, [userData]);
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(ASYNCKEYS.TOKENKEYS);
      console.log('===========Async value==', value);

      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      console.log('Failed to fetch the input from storage');
    }
  };

  console.log(token, '===========router==', userData?.token);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {token || userData?.token ? (
          <RootStack.Screen name="Home" component={HomeStack} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
