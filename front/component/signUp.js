import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import {Input} from "react-native-elements"
import ButtonHome from './button';
import HeaderHome from './header';
import {connect} from 'react-redux';

class SignUp extends React.Component {
    constructor(){
        super() 
        this.state={
            id:'',
            firstname:'',
            lastname:'',
            email:'',
            password:'',
        }
    }

handleSubmit=()=>{
    
    console.log('clickonpress')
    console.log(this.state.lastname)
   

    
    
    fetch('http://10.2.5.219:3000/users/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : `firstname=${this.state.firstname}
        &lastname=${this.state.lastname}
        &email=${this.state.email}
        &password=${this.state.password}`,
      })
      .then((response) => response.json())
      .then((user) => {
            console.log('je recupere un truc', user)
            this.props.onSignUpClick(user.user._id)
            this.props.navigation.navigate('Profile')  
        })
      .catch((error) => {
        console.error(error);
      });;

}


render() {
    return (
        <View style={styles.container}>
            <HeaderHome
             />
             <View style={{ borderColor :'#CCA43B', margin:7, padding:15, borderWidth:3, flex:1 , alignItems:'center' }}>
                    <View style={styles.logo}>
                            <Image source={require('../assets/logos/logo.png')}/>
                    </View>
                    
                      <Input containerStyle={styles.Input}
                            inputContainerStyle={{ borderBottomWidth:0}}
                            placeholder='Mot de passe'
                            labelStyle={{ marginLeft : 15}}
                            onChangeText={(value) => this.setState({firstname:value})}
                            value={this.state.firstname}
                     />


                    <Input containerStyle={styles.Input}
                            inputContainerStyle={{ borderBottomWidth:0}}
                            placeholder='Prénom'
                            labelStyle={{ marginLeft : 15}}
                            onChangeText={(value) => this.setState({lastname:value})}
                            value={this.state.lastname}
                     />

                       <Input containerStyle={styles.Input}
                            inputContainerStyle={{ borderBottomWidth:0}}
                            placeholder='Email'
                            labelStyle={{ marginLeft : 15}}
                            onChangeText={(value) => this.setState({email:value})}
                            value={this.state.email}
                     />

                      <Input containerStyle={styles.Input}
                            inputContainerStyle={{ borderBottomWidth:0}}
                            placeholder='Mot de passe'
                            labelStyle={{ marginLeft : 15}}
                            onChangeText={(value) => this.setState({password:value})}
                            value={this.state.password}
                     />

                    <TouchableOpacity >
                        <Text style={{ color: '#CCA43B', fontSize:14 , margin : 20 }}>Mot de passe oublié?</Text>
                    </TouchableOpacity>
                    <ButtonHome Title='REJOINDRE' click={this.handleSubmit} />

             </View>
           
        </View>
    );
}
}

function signUpStateToProps(dispatch) {

    

    return {
        onSignUpClick: function(iduser) { 
            console.log('je recois de mon reducer lid suivant : ', iduser)
            dispatch( {type: 'signUp', id: iduser} )
    
    }
  }
}
  export default connect(
    null,
    signUpStateToProps,
)(SignUp);


const styles = StyleSheet.create({

container : { flex : 1, backgroundColor:'#101D35', },
logo : {justifyContent:'center',alignItems:'center', margin:20},
Input : {  backgroundColor:'#fff' , borderRadius : 15, borderWidth : 4, marginTop: 10,
borderColor:'#CCA43B', }
})

