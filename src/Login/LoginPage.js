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
import InstagramLogin from 'react-native-instagram-login';
import Config from 'react-native-config';
import ASYNCKEYS from '../utils/AsyncKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../action/auth.action';
const LoginPage = () => {
  console.log('==========in==LoginPage', Config);
  const [name, setName] = useState('xyz');
  const userData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error);
    } else {
      console.log('Result Name: ' + result.name);
      console.log('Result Name: ' + result.email);
    }
  };
  const initUser = token => {
    dispatch(userActions.userLogin(token));
  };
  const LogoutBYFb = () => {
    console.log(LoginManager.logOut());
  };
  const LoginBYFb = async () => {
    LoginManager.logInWithPermissions(['email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' + JSON.stringify(result),
          );
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken.toString());
            AsyncStorage.setItem(
              ASYNCKEYS.TOKENKEYS,
              data.accessToken.toString(),
            );
            initUser(data.accessToken.toString());
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  const setIgToken = data => {
    console.log('data', data);
  };

  console.log('===================loginpage==', userData);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        <Text style={styles.loginText}>{'Login Page'}</Text>

        <TouchableOpacity
          onPress={() => {
            LoginBYFb();
          }}>
          <Text style={styles.facebookBtn}>LOGIN WITH FACEBOOK</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => {
            LogoutBYFb();
          }}>
          <Text>FACEBOOK LOGOUT</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.instagramLogin.show()}>
          <Text style={[styles.facebookBtn, {backgroundColor: 'red'}]}>
            LOGIN WITH INSTAGRAM
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.btn, {marginTop: 10, backgroundColor: 'green'}]}
          onPress={() => this.onClear()}>
          <Text style={{color: 'white', textAlign: 'center'}}>Logout</Text>
        </TouchableOpacity>
        <Text style={{margin: 10}}>Token: {this.state.token}</Text>
        {this.state.failure && (
          <View>
            <Text style={{margin: 10}}>
              failure: {JSON.stringify(this.state.failure)}
            </Text>
          </View>
        )} */}
        <InstagramLogin
          ref={ref => (this.instagramLogin = ref)}
          appId={Config.INSTAGRAM_APP_ID}
          appSecret={Config.INSTAGRAM_APP_SECRET}
          redirectUrl={Config.MYURL}
          scopes={['user_profile', 'user_media']}
          onLoginSuccess={setIgToken}
          onLoginFailure={data => console.log(data)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
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
  loginText: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  facebookBtn: {
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: 'blue',
    marginHorizontal: 30,
    height: 50,
    textAlignVertical: 'center',
    color: '#ffffff',
    lineHeight: 50,
  },
});

export default LoginPage;
