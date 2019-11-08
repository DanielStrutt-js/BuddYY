import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {Input, Button} from "react-native-elements";
import HeaderHome from './header';
import ButtonHome from './button';
import {connect} from 'react-redux';


class SignIn extends Component {
    constructor(){
        super() 
        this.state={
            email:'',
            password:'',
        }
    }

handleSubmit=()=>{
    
    console.log('clickonpress')

                fetch(`http://10.2.5.226:3000/users/signIn?`+`email=${this.state.email}&password=${this.state.password}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((response) => response.json())
            .then((user) => {
                    console.log(user)
                    if(user.result === false){
                    //errorMessage='Cet utilisateur nexiste pas'
                    this.props.navigation.navigate('Home')
                    }
                    else{
                    this.props.onSignUpClick(user.user._id)
                    this.props.navigation.navigate('Notification')
                }
                })
            .catch((error) => {
                console.error(error);
            });;
            
    
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
                            onChangeText={(value) => this.setState({email: value})} 
                            value={this.state.email}
                            autoCapitalize = 'none'
                     />
                      <Input containerStyle={styles.Input}
                            inputContainerStyle={{ borderBottomWidth:0}}
                            placeholder='Mot de passe'
                            labelStyle={{ marginLeft : 15}}
                            onChangeText={(value) => this.setState({password: value})} 
                            value={this.state.password}
                            secureTextEntry={true}
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

function signInStateToProps(dispatch) {

    

    return {
        onSignUpClick: function(iduser) { 
            console.log('je recois de mon reducer lid suivant : ', iduser)
            dispatch( {type: 'signIn', id: iduser} )
    
    }
  }
}
  export default connect(
    null,
    signInStateToProps,
)(SignIn);

const styles = StyleSheet.create({

container : { flex : 1, backgroundColor:'#101D35', },
logo : {justifyContent:'center',alignItems:'center', margin:20},
Input : {  backgroundColor:'#fff' , borderRadius : 15, borderWidth : 4, marginTop: 10,
borderColor:'#CCA43B', }
})