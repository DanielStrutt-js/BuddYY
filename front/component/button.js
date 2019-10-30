import React, { Component } from 'react';
import { Button } from "react-native-elements"




class ButtonCustom extends Component {
constructor(){
    super()
}  

handleSubmit=()=>{
        
    console.log('clickonpress')
    this.props.click()
}
    
    
    render() {
        return (
            <Button 
            buttonStyle= {{ backgroundColor:'#9C2C2C'}}
            title={this.props.Title}
            titleStyle= {{color:'#CCA43B', textAlign:'center'}}
            containerStyle={{ width : '100%', 
            marginTop:20, borderWidth: 4, borderColor: '#CCA43B'}}
            onPress={this.handleSubmit}
            />
   

);
}
}

export default ButtonCustom;