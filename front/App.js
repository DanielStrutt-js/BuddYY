import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Profilescreen from './component/profile';
//import LoginScreen from './component/sign-up';
//import HomeScreen from './component/home';

import Navigation from './component/nav';
// import Chat from './component/chat';

export default function App() {
  return (
    <Navigation/>
  );
}
