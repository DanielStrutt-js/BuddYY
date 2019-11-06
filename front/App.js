import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Profilescreen from './component/profile';
//import LoginScreen from './component/sign-up';
//import HomeScreen from './component/home';

import Navigation from './component/nav';
import Map from './component/map';

import id from './component/users.reducer';
import name from './component/userName.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

var store = createStore(combineReducers({id,name}));


export default class App extends React.Component {
  render(){
  return (
    
    <Provider store={store}>
 
    <Navigation/>

    </Provider>
  )};
}
