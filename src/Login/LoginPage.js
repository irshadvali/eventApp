/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
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
import LinkedInModal from 'react-native-linkedin';
const LoginPage = () => {
  console.log('==========in==LoginPage', Config);
  const [name, setName] = useState('xyz');
  const [email, setEmail] = useState();
  const [payload, setPayload] = useState();
  const [reloadpage, setReloadpage] = useState();
  const linkedRef = React.createRef<LinkedInModal>();
  const linkedinRef = useRef(null);
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

  const getUser = async data => {
    const {access_token, authentication_code} = data;
    if (!authentication_code) {
      const response = await fetch(
        'https://api.linkedin.com/v2/me?projection= (id,firstName,lastName,profilePicture(displayImage~:playableStreams) )',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      const apipayload = await response.json();
      console.log('=apipayload=====', apipayload);
      setPayload(apipayload);
    } else {
      Alert.alert(`authentication_code = ${authentication_code}`);
    }
  };
  const getUserEmailId = async data => {
    const {access_token, authentication_code} = data;
    if (!authentication_code) {
      const response = await fetch(
        'https://api.linkedin.com/v2/clientAwareMemberHandles?  q=members&projection=(elements*(primary,type,handle~))',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      const emailpayload = await response.json();
      console.log('======', emailpayload.elements[0]['handle~'].emailAddress);
      setEmail(emailpayload.elements[0]['handle~'].emailAddress);
      //handleGetUser();
    } else {
      Alert.alert(`authentication_code = ${authentication_code}`);
    }
  };
  // const handleGetUser = useCallback(() => {
  //   if (payload) {
  //     if (props.setFirstName) {
  //       props.setFirstName(payload.firstName.localized.en_US);
  //     }
  //     if (props.setLastName) {
  //       props.setLastName(payload.lastName.localized.en_US);
  //     }
  //     if (props.setProfileImage) {
  //       if (
  //         payload.profilePictfsure !== undefined &&
  //         payload.profilePicture['displayImage~'] !== null &&
  //         payload.profilePicture['displayImage~'].elements[3].identifiers[0]
  //           .identifier !== null &&
  //         payload.profilePicture['displayImage~'].elements[3].identifiers[0]
  //           .identifier !== undefined
  //       ) {
  //         props.setProfileImage(
  //           payload.profilePicture['displayImage~'].elements[3].identifiers[0]
  //             .identifier,
  //         );
  //       } else {
  //         props.setProfileImage('https://picsum.photos/200');
  //       }
  //     }
  //     if (props.setLinkedInId) {
  //       props.setLinkedInId(payload.id);
  //     }
  //     if (email) {
  //       if (props.setEmailId) {
  //         props.setEmailId(email);
  //         props.setIsLoggedIn(true);
  //         props.navigation.replace('HomeScreen', {
  //           FName: payload.firstName.localized.en_US,
  //           LName: payload.lastName.localized.en_US,
  //           EmailId: email,
  //           ImageUri:
  //             payload.profilePicture['displayImage~'].elements[3].identifiers[0]
  //               .identifier,
  //           From: 'LINKEDIN',
  //         });
  //       }
  //     }
  //   }
  // }, [email, payload, props]);
  const _handleLinkedInLogin = () => {
    return <Text>Buttonaaaaa</Text>;
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

        {/* <LinkedInModal
          ref={linkedinRef}
          clientID={'77hfyp77zfseo5'}
          clientSecret={'tjjxCHs149edRSuY'}
          redirectUri="https://irshadvali.github.io/resume/"
          onSuccess={token => {
            let name_surname = 'https://api.linkedin.com/v2/me';
            let user_mail =
              'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))';
            let namereq = new XMLHttpRequest();
            namereq.open('GET', user_mail);
            namereq.setRequestHeader(
              'Authorization',
              'Bearer ' + token.access_token,
            );
            namereq.onreadystatechange = function () {
              if (namereq.readyState === 4) {
                console.log('Text:', namereq.responseText);
              }
            };
            namereq.send();
          }}
        /> */}
        <LinkedInModal
          ref={linkedRef}
          clientID="[ Your client id from https://www.linkedin.com/developer/apps ]"
          clientSecret="[ Your client secret from https://www.linkedin.com/developer/apps ]"
          redirectUri="[ Your redirect uri set into https://www.linkedin.com/developer/apps ]"
          onSuccess={token => console.log(token)}
        />
        {/* <Button
          title="Log Out"
          onPress={this.linkedRef.current.logoutAsync()}
        /> */}
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
