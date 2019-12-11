import React from 'react'
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


// Import initialized store singleton
import store from './store'
import { firestore } from './firebase'

// Import components
// import IntroComponent from './IntroComponent'
import Auth from './Auth';
import AppNavigator from './AppNavigator';
// import MyListComponent from './MyListComponent';

// const screens = {
//   Intro : IntroComponent,
//   List: MyListComponent
// }

// // 2. Create a navigator
// const navigation = createStackNavigator(screens, {initialRouteName: 'Intro'})

// // 3. Create the navigation component
// const NavigationContainer = createAppContainer(navigation)

firestore.collection('groups').onSnapshot((snapshot) => {
  const groups = []
  snapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      groups.push({...doc.data(), id: doc.id})
  });

  store.dispatch('SET_GROUPS', groups)
});

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
    return (<AppNavigator/>) 
  }
}

AuthGate = store.connect(AuthGate)


export default class App extends React.Component {
  render() {
  return (
    <store.Provider>
      <View style={styles.container}>
        <AuthGate/>
      </View>
    </store.Provider>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 45
  
  },
})
