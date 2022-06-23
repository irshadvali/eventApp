/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Platform} from 'react-native';

import Config from 'react-native-config';
import Router from './src/Router';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {
  requestUserPermission,
  notificationListener,
} from './src/utils/notificationServices';
const App = () => {
  console.log('===========Config===', Config);
  useEffect(() => {
    Platform.OS === 'android' && requestUserPermission();
    Platform.OS === 'android' && notificationListener();
  }, []);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
