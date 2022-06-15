/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {userActions} from '../action/auth.action';
import ASYNCKEYS from '../utils/AsyncKeys';
const EventPage = () => {
  const dispatch = useDispatch();

  const LogoutBYFb = async () => {
    console.log(LoginManager.logOut());
    try {
      await AsyncStorage.removeItem(ASYNCKEYS.TOKENKEYS);
      await AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => console.log('success all clear'));
      dispatch(userActions.userLogout());
      console.log('Storage successfully cleared!');
    } catch (e) {
      console.log('Failed to clear the async storage.');
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>{'Event'}</Text>

        <TouchableOpacity
          onPress={() => {
            LogoutBYFb();
          }}>
          <Text>Click to logout</Text>
        </TouchableOpacity>
        <Text>{name}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default EventPage;
