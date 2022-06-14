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
const LoginPage = () => {
  console.log('==========in==LoginPage', Config);
  const [name, setName] = useState('xyz');
  const _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error);
    } else {
      console.log('Result Name: ' + result.name);
      console.log('Result Name: ' + result.email);
      //console.log('Result Name: ' + result.picture);
    }
  };
  const initUser = token => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' +
        token,
    )
      .then(response => {
        response.json().then(json => {
          const ID = json.id;
          console.log('ID ' + ID);

          const EM = json.email;
          console.log('Email ' + EM);

          const FN = json.first_name;
          setName(FN);
          console.log('First Name ' + FN, json.last_name);
        });
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK');
      });
  };
  const LogoutBYFb = () => {
    console.log(LoginManager.logOut());
  };
  const LoginBYFb = () => {
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
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        <Text>{'APPPP'}</Text>

        <TouchableOpacity
          onPress={() => {
            LoginBYFb();
          }}>
          <Text>FACEBOOK LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            LogoutBYFb();
          }}>
          <Text>FACEBOOK LOGOUT</Text>
        </TouchableOpacity>
        <Text>{name}</Text>
        <Text>Instagram Login start {Config.INSTAGRAM_APP_ID}</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.instagramLogin.show()}>
          <Text style={{color: 'red', textAlign: 'center'}}>
            Login with Instagram
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
        <Text>Instagram Login end</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
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
});

export default LoginPage;
