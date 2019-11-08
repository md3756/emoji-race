import React from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Facebook from 'expo-facebook';

import store from './store'
import { auth } from './firebase'

async function logIn() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('2448109548635277', {
        permissions: ['public_profile', 'email'],
      });
      switch (type) {
        case 'success': {
          console.log('SUCCESS');
          await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
          const credential = firebase.auth.FacebookAuthProvider.credential(token);
          const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential
    
          // Do something with Facebook profile data
          // OR you have subscribed to auth state change, authStateChange handler will process the profile data
          
          return Promise.resolve({type: 'success'});
        }
        case 'cancel': {
          console.log('YA CANCELED')
          return Promise.reject({type: 'cancel'});
        }
      }
    } catch(err) {
      console.log('ERROR', err);
    }
}
  

  const Auth = (props) => {
    return (
      <Button
      onPress={() => {this.logIn}}
      title="Login with Facebook"
      />

    )
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