import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Header } from "react-native-elements"

class Header extends Component {
    constructor() {
        super();
       
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                leftComponent={{ icon: 'chevron-left', color: '#CCA43B', }}
                centerComponent={{ text: 'CONNEXION', style: { color: '#CCA43B', fontWeight:'bold', fontSize:18 } }}
                containerStyle={{
                    backgroundColor: '#101D35',
                    borderBottomColor:'#CCA43B',
                    borderBottomWidth:3,
                    justifyContent: 'space-around',
                }}
                />
                </View>

);
}
}

export default Header;