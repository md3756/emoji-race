import React from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground} from 'react-native';
import {Card} from 'react-native-paper'
import * as Facebook from 'expo-facebook';

import store from './store'
import { auth, firebase } from './firebase'

async function logIn() {
    const appId =Expo.Constants.manifest.extra.facebook.appId;
    console.log("HELLO")
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(appId, {
        permissions: ['public_profile'],
      });
      switch (type) {
        case 'success': {
          console.log('FB SUCCESS');
          await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential
          console.log("FB TOKEN   " + token)

          return Promise.resolve({type: 'success'});
        }
        case 'cancel': {
          console.log('FB YA CANCELED')
          return Promise.reject({type: 'cancel'});
        }
      }
    } catch(err) {
      console.log('ERROR', err);
    }
}
  

class Auth extends React.Component {
  render() {
    return (
      <ImageBackground
      source={require("./assets/didit.png")}
        style={{width: '100%',
        height: '100%',
        justifyContent: 'center'}}
        >
        
      <Card style= {{borderRadius: 10, margin: 35, justifyContent: "center"}}>
        <Button
      onPress={() => {logIn()}}
      title="Login with Facebook"
    />
      </Card>
      </ImageBackground>
    
    )

  }
}
// Connect Component to the store
Auth = store.connect(Auth)

export default Auth;