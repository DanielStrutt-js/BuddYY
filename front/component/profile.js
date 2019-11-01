import React, { Component } from 'react';
import { View, StyleSheet, Text,TextInput,ScrollView} from 'react-native';
import { Avatar,Input, Button, Header,} from 'react-native-elements';
import ButtonHome from './button';


export default class Profilescreen extends React.Component{
    constructor(){
        super()
        this.state = {userName: '',
                        job: '',
                        hobby: '',
                        drink:'',
                        bands: ''};

    }

    handleSumbit(){

        
        var profileData = JSON.stringify({
          userName: this.state.userName,
          job: this.state.job,
          hobby: this.state.hobby,
          drink:this.state.drink,
          bands:this.state.bands
        });
    
    //     fetch(`http://10.2.5.224:3000/Profile`, {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: profileData,
    //     }).then((response) =>{
    //       return response.json();
    //    })
    //    .then((data)=> {
          
    //     //  REDUX PART
    //       console.log('RESULTAT DE LERENGISTREMENT EN BD USER --->', data.user._id)
    
    //       // On envoit au reducer l'_id du user
    //       this.props.profile(data.user._id);
    //    })
    //    .catch((error)=> {
    //        console.log('Request failed in my Sign-Up Home request', error)
    //    });
    
    
    //     // Envoi au réducer
        
    
    //     this.props.navigation.navigate('Profile');
    }
    
     

    render(){
        
        return(
                
                    
                <View style={styles.container}>
  
                    <Header
                    leftComponent={{ icon: 'chevron-left', color: '#CCA43B', }}
                    centerComponent={{ text: 'PROFIL', style: { color: '#CCA43B', fontWeight:'bold', fontSize:18 } }}
                    containerStyle={{
                        backgroundColor: '#101D35',
                        borderBottomColor:'#CCA43B',
                        borderBottomWidth:3,
                        justifyContent: 'space-around',
                      }}
                        />
                 <View style={{ borderColor :'#CCA43B', margin:7, padding:15, borderWidth:3, flex:1 , alignItems:'center',width:"90%" }}>

                             <Avatar
                                size='xlarge'
                            rounded
                            containerStyle={styles.Avatar}
                            showEditButton
                            source={{
                                uri:
                                '',
                            }}
                            
                            />
                       

                       <Input containerStyle={styles.Input}
                                inputContainerStyle={{ borderBottomWidth:0}}
                                placeholder='Pseudo'
                                labelStyle={{ marginLeft : 15}}
                                onChangeText={(value) => this.setState({userName: value})} 
                                value={this.state.userName}
                            />

                        <Input containerStyle={styles.Input}
                                inputContainerStyle={{ borderBottomWidth:0}}
                                placeholder='Job'
                                labelStyle={{ marginLeft : 15}}
                                onChangeText={(value) => this.setState({job: value})} 
                                value={this.state.job}
                            />
                        <Input containerStyle={styles.Input}
                                inputContainerStyle={{ borderBottomWidth:0}}
                                placeholder='Hobby'
                                labelStyle={{ marginLeft : 15}}
                                onChangeText={(value) => this.setState({hobby: value})} 
                                value={this.state.hobby}
                            />
                        <Input containerStyle={styles.Input}
                                inputContainerStyle={{ borderBottomWidth:0}}
                                placeholder='Boissons préférées'
                                labelStyle={{ marginLeft : 15}}
                                onChangeText={(value) => this.setState({drink: value})} 
                                value={this.state.drink}
                            />
                        <Input containerStyle={styles.Input}
                                inputContainerStyle={{ borderBottomWidth:0, height: 40}}
                                placeholder='groupe préférés'
                                labelStyle={{ marginLeft : 15}}
                                onChangeText={(value) => this.setState({bands: value})} 
                                value={this.state.bands}
                            />  

                        <ButtonHome Title='VALIDER' click={this.handleSubmit}/>

                             
                           


                        </View>   
                        </View>         
      
                
        )
    }
    
}

const styles = StyleSheet.create({

    container : { flex : 1, backgroundColor:'#101D35', justifyContent:'center', alignItems:'center'},
    logo : {justifyContent:'center',alignItems:'center', margin:20},
    Avatar: { borderWidth: 4, borderColor: '#CCA43B', backgroundColor:'#101D35',  marginBottom:15, marginTop:15},
    Input : {  backgroundColor:'#fff' , borderRadius : 15, borderWidth : 4, marginTop: 10,
    borderColor:'#CCA43B'}
    })