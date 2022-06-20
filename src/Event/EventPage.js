/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
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
import fireDb from '../utils/firbase';
import moment from 'moment';
const EventPage = () => {
  const dispatch = useDispatch();
  const [ids, setIds] = useState([]);
  const [data, setData] = useState({});
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
  useEffect(() => {
    let idList = [];
    console.log('=======idList==1==', idList, fireDb.child('allproduct'));
    try {
      fireDb.child('event').on('value', snapshot => {
        console.log('=======idList==10==', snapshot);
        if (snapshot.val() !== null) {
          console.log(Object.keys(snapshot.val()), '===uf==', snapshot.val());
          // setAllProduct(snapshot.val());
          // setProductIds(Object.keys(snapshot.val()));
        }
      });
    } catch (e) {
      console.log('----------error---', e);
    }
  }, []);

  const insertData = () => {
    let data1 = {
      name: 'irshad',
      empId: 'aaa123',
      eventStart: moment().format('llll'),
      eventEnd: moment().add(2, 'hours').format('llll'),
    };
    fireDb.child('event').push(data1, err => {
      if (err) {
        console.log('===========fail==', err);
      } else {
        console.log('===========success==');
      }
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text>{'Event'}</Text>

          <TouchableOpacity
            onPress={() => {
              LogoutBYFb();
            }}>
            <Text>Click to logout</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            insertData();
          }}>
          <Text>Click to Fire</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    height: '100%',
    alignItems: 'center',
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
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EventPage;
