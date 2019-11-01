import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs';
// import SettingsScreen from "../screens/settingsScreen";

// import DetailsScreen from "../screens/DetailsScreen";

//import LoginScreen from '../component/sign-in';
//import HomeScreen from '../component/home';
import Map from '../component/map'
//import SignScreen from './signUp';
//import LoginScreen from './signIn';
//import HomeScreen from '../component/home';

// const TabNavigator = createBottomTabNavigator(
//     {
//     login: LoginScreen,
//      Home: HomeScreen,
//     //  PageA: DetailsScreen,
//     //  PageB: SettingsScreen,
//     },
//     {
//      defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ tintColor }) => {
//        var iconName;
//        if (navigation.state.routeName == 'login') {
//         iconName = 'home';
//        } else if (navigation.state.routeName == 'Home') {
//         iconName = 'home';
//     //    } else if (navigation.state.routeName == 'PageA') {
//     //     iconName = 'arrows-alt';
//     //    }else if (navigation.state.routeName == 'PageB') {
//     //     iconName = 'arrow-circle-left';
//        }
   
//        return <Icon name={iconName} size={25} color={tintColor} />;
//       },
//      }),
//      tabBarOptions: {
//       activeTintColor: 'tomato',
//       inactiveTintColor: 'gray',
//      },
//     }
//    );;
var StackNavigator = createStackNavigator({
  Home: {
    screen: Map,
    navigationOptions: () => ({
      header: null
    })
  },

}
);

export default navigation = createAppContainer(StackNavigator);
