import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'
import { Header } from "react-native-elements"
import { Icon } from 'react-native-elements'


class HeaderHome extends Component {
    constructor(props){
        super(props)
    }

handleSubmit=()=>{
        
    console.log('clickonpressreturn')
    this.props.click()
}
    render() {
        return (
                <Header
                leftComponent={<TouchableOpacity onPress={()=>{this.handleSubmit}}>
                <Icon
                color='#fff'
                name='chevron-left' />
                </TouchableOpacity>}
                centerComponent={{ text: 'CONNEXION', style: { color: '#CCA43B', fontWeight:'bold', fontSize:18 } }}
                containerStyle={{
                    backgroundColor: '#101D35',
                    borderBottomColor:'#CCA43B',
                    borderBottomWidth:3,
                    justifyContent: 'space-around',
                }}
                />

);
}
}

export default HeaderHome;