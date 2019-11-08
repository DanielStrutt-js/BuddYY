import React from 'react';
import { View,Text,ScrollView, KeyboardAvoidingView, YellowBox,  } from 'react-native';
import { Input, Button, ListItem } from 'react-native-elements';
import socketIOClient from "socket.io-client";
console.ignoredYellowBox = ['Remote debugger'];

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
import {connect} from 'react-redux';


class chat extends React.Component {
    constructor() {
        super();
        this.state = { messageList:[], messageToSend:""};
    
    }
    componentDidMount(){
        this.socket = socketIOClient("http://10.2.5.219:3000/");
        this.socket.on('sendMessage', (message)=> {
            
            var messageListCopy = [...this.state.messageList];
            messageListCopy.push(message);
            console.log("sendMessage", messageListCopy);
            
            this.setState({messageToSend: '', messageList: messageListCopy});
          });
      }
    render() {
        var message = this.state.messageList.map((data, i)=>{
        
            return (<ListItem
              key={i}
              title={`${data.user} : ${data.message}`}
              bottomDivider
            />)
          }
        )
        console.log(this.state.messageToSend);

        return (

        
           <View style={{flex:1, backgroundColor:"#101D35"}}>
              
         
        <ScrollView  style={{flex:1}}>
        {message}

        </ScrollView >

        <KeyboardAvoidingView behavior="padding" enabled>

            <Input value={this.state.messageToSend} onChangeText={(messageToSend) => this.setState({messageToSend})} placeholder='your message'/>
            <Button title="Send" onPress={()=> this.socket.emit("sendMessage", {message : this.state.messageToSend, user: this.props.user}) } /> 

        </KeyboardAvoidingView>

        </View>

        
        
);
    }
}
function mapStateToProps(state) {

    console.log('test je recois de mon reducer lid et username suivant : ',state)
    console.log(state);

    return { user: state.id.username }
  }
  
  export default connect(
      mapStateToProps,
      null
  )(chat);