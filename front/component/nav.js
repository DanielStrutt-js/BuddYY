

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SignScreen from './signUp';
import LoginScreen from './signIn';
import HomeScreen from './home';
import ChatScreen from './chat';
import Profilescreen from './profile';
import Map from './map';
import Notification from './events'

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
    screen: HomeScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  SignUP: {
    screen: SignScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  SignIn: {
    screen: LoginScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  Chat: {
    screen: ChatScreen,
   navigationOptions: () => ({ title: "Chat Screen" })
 },
  Profile: {
    screen: Profilescreen,
    navigationOptions: () => ({
      header: null
    })
  },

  Map: {
    screen: Map,
    navigationOptions: () => ({
      header: null
    })
  },

  Notification: {
    screen: Notification,
    navigationOptions: () => ({
      header: null
    })
  },

}
);

export default navigation = createAppContainer(StackNavigator);
