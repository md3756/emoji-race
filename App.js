import React from 'react'
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native'

// Import initialized store singleton
import store from './store'
import { firestore } from './firebase'

// Import components
import MyList from './MyListComponent'
import Auth from './Auth';

firestore.collection('items').onSnapshot((snapshot) => {
  const items = []
  snapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      items.push({...doc.data(), id: doc.id})
  });

  store.dispatch('SET_ITEMS', items)
});


let AuthGate = (props) => {
  if(props.store.state.user === null) {
    return (<Auth/>)
  } else {
    return (<MyList />) 
  }
}

AuthGate = store.connect(AuthGate)


export default function App() {
  return (
    <store.Provider>
      <View style={styles.container}>
        <AuthGate />
      </View>
    </store.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
