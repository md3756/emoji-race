import React from 'react'
import {Text, TouchableOpacity, View, ScrollView, Button } from 'react-native'
import { firebase } from './firebase';
import ImagePick from "./imagePicker";
import {Card, TextInput } from 'react-native-paper'

import store from './store'


class IntroComponent extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        group: '', 
      }
    }

    onChange(text) {
      this.setState({group: text})
    }

    onClick() {
        this.props.store.state.group_ = this.state.group
        // console.log("IS THIS IT " + image)
        this.props.store.dispatch("NEW_GROUP", {group: this.state.group})
    }

    onNavClick() {
        // this.props.store.dispatch("SET_GROUP", {group_: this.state.group.group})
        this.props.navigation.navigate('List', {group_: group});
    }

    onItemDelete(item, index) {
      this.props.store.dispatch('DELETE_ITEM', { id: item.id })
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
        console.log('IN INTRO COMPONENT\n\n');
        const groups = []

        this.props.store.state.groups.forEach((group, i) => 
          groups.push((
            <Card key={i} style={{borderBottomColor: "cornflowerblue", borderBottomWidth: 10, margin: 15}}>
            <View style={{flexDirection: 'row', justifyContent: "center"}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Race', {group_: group.group})}
                >
                <Text style={{fontSize: 24}}>{group.group}</Text>
              </TouchableOpacity>
              
            </View>
            </Card>
        ))
        )

      return (
        <View >
            <View style={{paddingBottom: 25, margin: 15}}>
            <TouchableOpacity 
              style={{ height: 25, alignSelf: 'flex-end' }}
              onPress={() => this.logout()}
              >
              <Text>Sign Out</Text>
          </TouchableOpacity>
          <Text style={{marginBottom: 5, fontSize: 27, textAlign: "center"}}>
          WELCOME to the EMOJI RACE 
          </Text>
          <Text style={{marginBottom: 20, fontSize: 18, textAlign: "center"}}>
            JOIN A GROUP OR MAKE A NEW GROUP!
          </Text>
          <Card style={{flexDirection: "column",justifyContent: "center"}}>
            <TextInput 
              placeholder="Group Name"
              style={{backgroundColor: 'white', textAlign: "center", height: 30}} 
              value={this.state.name} 
              onChangeText={text => this.onChange(text)}/>
            {/* <ImagePick/> */}
            <Button 
            disabled={(!this.state.group)} 
            title="Enter Race" 
            onPress={() => this.onClick()}
            style={{justifyContent: "center"}}
            />
            </Card>
          </View>
        {groups} 
          
        </View>
      )
    }
  }
  
  // Connect Component to the store
 IntroComponent = store.connect(IntroComponent)

  export default IntroComponent