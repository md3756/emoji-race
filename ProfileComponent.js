import React from 'react'
import { Button, Text, TouchableOpacity, View} from 'react-native'
import {Card, TextInput} from 'react-native-paper'
import { firebase } from './firebase';

import store from './store'

class ProfileComponent extends React.Component {
    constructor(props) {
      super(props)

    }

    logout = async () => {
      try {
          await this.props.store.dispatch("LOGOUT");
          await firebase.auth().signOut();
          console.log('SIGNING OUT\n\n')
      } catch(err) {
        console.log('ERROR IN LOGGING OUT\n\n', err);
      }
    }

    render() {
        console.log('PROFILE\n\n');
        const info = firebase.auth().currentUser.providerData;
        const name = info[0]["displayName"];
        const userid = info[0]["uid"];
        const items = []
        this.props.store.state.items.forEach((item, i) => 
          {if (userid == item.user) {  
            items.push((
            <View key={i} style={{borderBottomColor: "cornflowerblue", borderBottomWidth: 10}}>
            <View style={{justifyContent: "space-between"}}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Race', {group_: item.group_})}
                >
                <Text style={{fontSize: 22, textAlign: "center"}}>{item.group_}</Text>
              </TouchableOpacity>
              <Text style={{fontSize: 20, textAlign: "center"}}>Emoji: {item.emoji} </Text>
              <Text style={{fontSize: 20, textAlign: "center"}}>Times across: {item.across}</Text>
            </View>  
            </View>
            )) }}
        )
        

      return (
        <View style={{borderTopWidth: 15}}> 
            <Card style={{paddingBottom: 10, bottom: 15, marginBottom: 15, margin: 15}}>
            <TouchableOpacity 
              style={{ height: 25, alignSelf: 'flex-end' }}
              onPress={() => this.logout()}
              >
              <Text>Sign Out</Text>
          </TouchableOpacity>
          <Text style={{marginBottom: 5, fontSize: 22, textAlign: "center"}}>
          Hello {name} !!! 
          </Text>
          <Text style={{marginBottom: 5, fontSize: 22, textAlign: "center"}}>
          These are the races you are in! You can click on the race to join!
          </Text>
          </Card>
          <Card style={{bottom: 10}} >{items}</Card>
          <Text style={{marginBottom: 5, fontSize: 14, textAlign: "center"}}>
              Go to the Welcome Screen to start a new race or join another one!
          </Text>
        </View>
      )
    }
  }
  
  // Connect Component to the store
ProfileComponent = store.connect(ProfileComponent)

  export default ProfileComponent