import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {Input, Button} from "react-native-elements"
import HeaderHome from './header'
import ButtonHome from './button'


class SignIn extends Component {
    constructor(){
        super() 
        this.state={
            firstname:'',
            email:'',
        }
    }

    handleSubmit=()=>{
        
        console.log('clickonpress')
        
        this.props.navigation.navigate('Home')
    }

    handleReturn=()=>{
        
        console.log('clickonpress2')
       
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderHome click={this.handleReturn} />
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
                        
                                <ButtonHome Title='VALIDER' click={this.handleSubmit}/>
                                
                       
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