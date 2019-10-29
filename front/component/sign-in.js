import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Header , Input} from "react-native-elements"

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
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
                 <View style={{ borderColor :'#CCA43B', margin:7, padding:15, borderWidth:3, flex:1 , alignItems:'center' }}>
                        <View style={styles.logo}>
                                <Image source={require('../assets/logos/logo.png')}/>
                        </View>
                        
                        <Input containerStyle={styles.Input}
                                inputContainerStyle={{ borderBottomWidth:0}}
                                placeholder='Email'
                                labelStyle={{ marginLeft : 15}}
                         />
                          <Input containerStyle={styles.Input}
                                inputContainerStyle={{ borderBottomWidth:0}}
                                placeholder='Mot de passe'
                                labelStyle={{ marginLeft : 15}}
                         />
                        <TouchableOpacity >
                            <Text style={{ color: '#CCA43B', fontSize:14 , margin : 20 }}>Mot de passe oublié?</Text>
                        </TouchableOpacity>
                       
                 </View>
               
            </View>
        );
    }
}
const styles = StyleSheet.create({

    container : { flex : 1, backgroundColor:'#101D35', },
    logo : {justifyContent:'center',alignItems:'center', margin:20},
    Input : {  backgroundColor:'#fff' , borderRadius : 15, borderWidth : 4, marginTop: 10,
    borderColor:'#CCA43B', }
})

export default SignIn;