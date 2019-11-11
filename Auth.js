import React from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Facebook from 'expo-facebook';

import store from './store'
import { auth, firebase } from './firebase'

async function logIn() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('2448109548635277', {
        permissions: ['public_profile'],
      });
      switch (type) {
        case 'success': {
          console.log('FB SUCCESS');
          await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential

          // await auth.setPersistence(auth.Auth.Persistence.LOCAL);  // Set persistent auth state
          // const credential = auth.FacebookAuthProvider.credential(token);
          // await auth.signInAndRetrieveDataWithCredential(credential) // Sign in with Facebook credential

          // auth.getRedirectResult().then(function(result) {
          //   if (result.credential) {
          //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          //     var t = token;
          //     console.log("Firebase token " + t)
          //     // ...
          //   }
          //   // The signed-in user info.
          //   var user = result.user;
          // }).catch(function(error) {
          //   console.log("Firebase Nope")
          //   // Handle Errors here.
          //   var errorCode = error.code;
          //   var errorMessage = error.message;
          //   // The email of the user's account used.
          //   var email = error.email;
          //   // The firebase.auth.AuthCredential type that was used.
          //   var credential = error.credential;
          //   // ...
          // });
          // Do something with Facebook profile data
          // OR you have subscribed to auth state change, authStateChange handler will process the profile data
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
    <Button
    onPress={() => {logIn()}}
    title="Login with Facebook"
    />
    )

  }
}

// class Auth extends React.Component {
//     constructor(props) {
//       super(props)

//       this.state = {
//         email: '',
//         password: '',
//         newUser: false,
//         user: ''
//       }
//     }

//     onChangeEmail(text) {
//       this.setState({email: text})
//     }

//     onChangePassword(text) {
//       this.setState({password: text})
//     }

//     toggleNewUser() {
//       this.setState({newUser: !this.state.newUser})
//     }

//     onClick() {
//       if(this.state.newUser)
//         auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
//       else
//         auth.signInWithEmailAndPassword(this.state.email, this.state.password)
//     }

//     onChangeName(name) {
//         this.setState({user: name})
//     }

//     render() {
//       return (
//         <View>
//           <Text style={{fontSize:20}}>Log in please</Text>
//           {this.state.newUser && <TextInput placeholder="name" style={{backgroundColor: 'white', width: 250, padding: 5, fontSize: 24, margin: 10}} value={this.state.name} onChangeText={text => this.onChangeName(text)}/>}        
//           <TextInput placeholder="email" style={{backgroundColor: 'white', width: 250, padding: 5, fontSize: 24, margin: 10}} value={this.state.email} onChangeText={text => this.onChangeEmail(text)}/>
//           <TextInput secureTextEntry={true} placeholder="password" style={{backgroundColor: 'white', width: 250, padding: 5, fontSize: 24, margin: 10}} value={this.state.password} onChangeText={text => this.onChangePassword(text)}/>
        
//           <Button disabled={!this.state.email && !this.state.password} title={this.state.newUser ? 'Sign Up' : "Log In"} onPress={() => this.onClick()}/>
        
//           <TouchableOpacity onPress={() => this.toggleNewUser()} style={{marginTop: 25}}><Text>or {!this.state.newUser ? 'Sign Up' : 'Log In'}</Text></TouchableOpacity>
//         </View>
//       )
//     }
//   }
  
// Connect Component to the store
Auth = store.connect(Auth)

export default Auth;