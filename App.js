/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import Config from 'react-native-config';
import Router from './src/Router';
import {Provider} from 'react-redux';
import {store} from './src/store';
const App = () => {
  console.log('===========Config===', Config);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};


export default App;
