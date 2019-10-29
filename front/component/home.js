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
   
    handleSubmit=()=>{
        console.log('clickonpress')
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

<ImageBackground source={require("../assets/signIn.png")} style= {{flex:1, justifyContent:"center",alignItems:"center" }}>
  <Input placeholder='INPUT WITH ICON' leftIcon={{ type: 'font-awesome', name: 'chevron-left'}}
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
          />
<Button
  title="Solid Button"
  onPress={this.handleSubmit}
/>
</ImageBackground>
        




        );
   } }
  