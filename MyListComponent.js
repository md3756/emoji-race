import React from 'react'
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native'

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
        across: Number(0)
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

    render() {
        const items = []

        this.props.store.state.items.forEach((item, i) => 
          items.push((
            <View key={i} style={{borderBottomColor: "powderblue", borderBottomWidth: 5}}>
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
            </View>
        ))
        )

      return (
        <View>
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
            style={{flex: 1}}
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