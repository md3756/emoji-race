import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import IntroComponent from './IntroComponent';
import MyListComponent from './MyListComponent';
import ProfileComponent from './ProfileComponent';



const AppNavigator = createMaterialTopTabNavigator(
  {
    Profile: {screen: ProfileComponent},
    Welcome: {screen: IntroComponent},
    Race: {screen: MyListComponent},
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      tabStyle: {
        backgroundColor: 'powderblue'
      }
    }
  }
);


const NavigationContainer = createAppContainer(AppNavigator);

export default NavigationContainer;