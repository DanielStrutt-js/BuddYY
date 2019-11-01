import React from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class HomeScreen extends React.Component { 
    constructor(){
        super() 
        this.state={
            firstname:'',
            email:'',
        }
    }
   
    handleSignUp=()=>{
        
        console.log('clickonpress')
        console.log(this)
        this.props.navigation.navigate('SignUP')
    }


    handleSignIn=()=>{
        
            console.log('clickonpress')
            console.log(this)
            this.props.navigation.navigate('SignIn')
        
        // fetch('http://10.2.5.219:3000/Sign-Up', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body : `first_name=${this.state.firstname}&email=${this.state.email}`,
        //   }).then((response) => response.json())
        //   .then((user) => {
        //         console.log(user)          
        //     })
        //   .catch((error) => {
        //     console.error(error);
        //   });;
    }
  
render() {
    console.log(this.state);
    return (

<ImageBackground source={require("../assets/Home.png")} style= {{flex:1, justifyContent:"center",alignItems:"center" }}>
  {/* <Input placeholder='INPUT WITH ICON' leftIcon={{ type: 'font-awesome', name: 'chevron-left'}}
           containerStyle = {{height: 40, borderColor: 'white',borderWidth: 2, margin: 5, borderRadius: 5, width:'70%',backgroundColor:'white',opacity:0.5}}
            underlineColorAndroid = "transparent"
            placeholder = "  Aïnes "
            placeholderTextColor = "white"
            autoCapitalize = "none"
            onChangeText={(value)=> this.setState({firstname:value})}
            />

         <Input placeholder='INPUT WITH ICON'leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
         containerStyle = {{height: 40, borderColor: 'white',borderWidth: 2, margin: 5, borderRadius: 5, width:'70%',backgroundColor:'white',opacity:0.5}}
          underlineColorAndroid = "transparent"
          placeholder = "  aines@lacapsule.com  "
          placeholderTextColor = "white"
          autoCapitalize = "none"
          onChangeText={(value)=> this.setState({email:value})}
          /> */}
<Button
    title="S'inscrire"
    buttonStyle= {{ backgroundColor:'#101D35'}}
    titleStyle= {{color:'#CCA43B', textAlign:'center'}}
    containerStyle={{ width : '80%', 
    marginTop:300, borderWidth: 4, borderColor: '#CCA43B'}}
  onPress={this.handleSignUp}
/>
<Button
    title="Se Connecter"
    buttonStyle= {{ backgroundColor:'#101D35'}}
    titleStyle= {{color:'#CCA43B', textAlign:'center'}}
    containerStyle={{ width : '80%', 
    marginTop:60, borderWidth: 4, borderColor: '#CCA43B'}}
  onPress={this.handleSignIn}
/>
</ImageBackground>
        




        );
   } }
