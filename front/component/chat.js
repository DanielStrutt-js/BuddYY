import React from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import socketIOClient from "socket.io-client";
// console.ignoredYellowBox = ['Remote debugger'];

// YellowBox.ignoreWarnings([
//     'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
// ]);



class chat extends React.Component {
    constructor() {
        super();
        this.state = { messageList:[]};
    
    }
    componentDidMount(){
        //this.socket = socketIOClient("http://10.2.5.219.:3000");
        // this.socket.on('sendMessage', (data)=> {
        //     console.log("sendMessage", data);
        //     var messageListCopy = [...this.state.messageList];
        //     messageListCopy.push(data);
        //     this.setState({messageToSend: '', messageList: messageListCopy});
        //   });
      }
    render() {

        return (

        <View style={{flex:1}}>

        {/* <ScrollView  style={{flex:1}}>
        {renderMessage}

        </ScrollView >

        <KeyboardAvoidingView behavior="padding" enabled>

            <Input value={this.state.messageToSend} onChangeText={(messageToSend) => this.setState({messageToSend})} placeholder='your message'/>
            <Button title="Send" onPress={()=> this.socket.emit("sendMessage", {message : this.state.messageToSend, user: 'Aïnes'}) } />

        </KeyboardAvoidingView> */}

        </View>

        
        // <ListItem
        //     key={i}
        //     title={`${data.user} : ${data.message}`}
            
        //   />
);
    }
}

export default chat;