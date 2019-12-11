import React from 'react'
import {Text, TouchableOpacity, View, Button} from 'react-native'
import { firebase } from './firebase';
import {Card, TextInput } from 'react-native-paper'


import store from './store'

class MyListComponent extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        name: '', 
        emoji: "", 
        pos: 0, 
        across: 0
      }
    }

    onChange(text) {
      this.setState({name: text})
    }

    onOtherChange(text) {
      this.setState({emoji: text})
    }

    onClick() {
      this.setState({name: '', emoji: ''})      
      this.props.store.dispatch('ADD_ITEM', {
        name: this.state.name,
        emoji: this.state.emoji,
        pos: Number(0), 
        across: Number(0), 
        group_: this.props.navigation.state.params.group_, 
        user: firebase.auth().currentUser.providerData[0]["uid"]
      })
    }

    onItemDelete(item, index) {
      this.props.store.dispatch('DELETE_ITEM', { id: item.id })
    }

    onItemPress(item, index) {
      newpos = item.pos + 1
      across = item.across
      if (newpos >= 95) {
        newpos = 0
        across += 1
      }
      this.props.store.dispatch('CHANGE_POSITION', {
        id: item.id, 
        pos: newpos,
        across: across
      })
      
    }

    winner() {
     this.props.store.dispatch("WINNER_WINNER")
     
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
        const items = []
        const { navigation } = this.props;
        console.log(navigation.getParam("group_"))

        this.props.store.state.items.forEach((item, i) => 
          {if (navigation.getParam("group_") == item.group_) {  items.push((
            <Card key={i} style={{borderBottomColor: "cornflowerblue", borderBottomWidth: 5,  margin: 5}}>
            <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
              <TouchableOpacity
                onPress={() => this.onItemPress(item, i)}
                >
                <Text style={{fontSize: 24}}>{item.name}</Text>
              </TouchableOpacity>
              <Text style={{fontSize: 24}}>Times across: {item.across}</Text>
              <Button 
                title="X" 
                onPress={() => this.onItemDelete(item, i)} 
              />
            </View>
              <Text style={{left: `${item.pos}%`, fontSize: 24}}>
                {item.emoji}
              </Text>
            </Card>
        )) }}
        )
      return (
        <View >
            <TouchableOpacity 
              style={{ height: 20, alignSelf: 'flex-end' }}
              onPress={() => this.logout()}
              >
              <Text>Sign Out</Text>
          </TouchableOpacity>
          <Text style={{marginBottom: 5, fontSize: 22, textAlign: "center"}} >GROUP: {JSON.stringify(navigation.getParam('group_', 'null'))}</Text>
          
          <Text style={{marginBottom: 5, fontSize: 22, textAlign: "center"}}>
            EMOJI RACE 
          </Text>
          <Text style={{marginBottom: 20, fontSize: 18, textAlign: "center"}}>
            Tap on your Initials to move your emoji! 
          </Text>
          <View style={{flexDirection: 'row', justifyContent: "center"}}>
            <TextInput 
              placeholder="Initials"
              style={{backgroundColor: 'white', flex: .25, textAlign: "center"}} 
              value={this.state.name} 
              onChangeText={text => this.onChange(text)}/>
              
              <TextInput 
              placeholder="Emoji"
              style={{backgroundColor: 'powderblue', flex: .25, textAlign: "center"}} 
              value={this.state.emoji} 
              onChangeText={text => this.onOtherChange(text)}/>
            <Button 
            disabled={(!this.state.name) || (!this.state.emoji)} 
            title="Enter Race" onPress={() => this.onClick()}
            style={{flex: .5}}
            />
          </View>
          {items}
        </View>
      )
    }
  }
  
  // Connect Component to the store
  MyListComponent = store.connect(MyListComponent)

  export default MyListComponent