import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,KeyboardAvoidingView} from 'react-native';
import { Avatar,Input} from 'react-native-elements';
import ButtonCustom from './button';
import HeaderHome from './header';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {connect} from 'react-redux';


class Profilescreen extends React.Component{
    constructor(){
        super()
        this.state = {
                        img: null,            
                        userName: '',
                        job: '',
                        hobby: '',
                        drink:'',
                        bands: ''};
        this.handleSubmit= this.handleSubmit.bind(this)
    }

    handleReturn=()=>{
    
        console.log('clickonpress2')
       
        this.props.navigation.navigate('Home')
    }


    handleSubmit(){

        console.log('click bordel')
        
        // var profileData = JSON.stringify({
        //   userName: this.state.userName,
        //   job: this.state.job,
        //   hobby: this.state.hobby,
        //   drink:this.state.drink,
        //   bands:this.state.bands
        // });
        console.log('questceque',this.state.userName)
    
        fetch(`http://10.2.5.224:3000/users/newProfile?id=`+this.props.userIdfromStore, {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `userName=${this.state.userName}
            &job=${this.state.job}
            &drink=${this.state.drink}
            &hobby=${this.state.hobby}&bands=${this.state.bands}`,
        }).then((response) =>{
          return response.json();
       })
       .then((data)=> {
          console.log(data)
        //  REDUX PART
          console.log('RESULTAT DE LERENGISTREMENT EN BD USER --->', data.id)
    
          // On envoit au reducer l'_id du user
          //this.props.profile(data.user.id);
          console.log('data avant save redux', data.user.userName)
          this.props.usernameClick(data.user.userName)
          this.props.navigation.navigate('Notification')
       })
       .catch((error)=> {
           console.log('Request failed in my signUp Home request', error)
       });
    
        // this.props.navigation.navigate('Profile');
    }
    
     

    render(){
        
        let { img } = this.state;

        return(
                
             
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    
                    
                    <HeaderHome
                    click={this.handleReturn} 
                    centerComponent={{ text: 'NOUVEAU PROFIL', style: { color: '#CCA43B', fontWeight:'bold', fontSize:18 } }}
                        />
                <View style={{ borderColor :'#CCA43B', margin:7, padding:15, borderWidth:3, flex:1 , alignItems:'center',width:"90%" }}>
                <ScrollView style={{flex:1, width:'100%'}}
                            contentContainerStyle={ {alignItems: 'center'}}> 
                        
                 

                             <Avatar
                                size='xlarge'
                            rounded
                            containerStyle={styles.Avatar}
                            onPress={(source) => this.setState({img: source})}
                            source ={this.state.img}
                            
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
                                placeholder='groupes préférés'
                                labelStyle={{ marginLeft : 15}}
                                onChangeText={(value) => this.setState({bands: value})} 
                                value={this.state.bands}
                            />  

                        <ButtonCustom Title='VALIDER' click={this.handleSubmit}/>
                        <Button
                                style={{width:100, marginTop:20}}
                                title="Chat Screen"
                                backgroundColor="blue"
                                color="#d11d4d"
                                onPress={() => this.props.navigation.navigate('Chat')}
                                />   

                             
                        
                       
                        </ScrollView>
                        </View>
                        </KeyboardAvoidingView>         
                       
                
        )
    }
    
    
}
function signUpStateToProps(state) {

    console.log('je sauvegarde dans mon reducer lid suivant : ',state)

    return { userIdfromStore: state.id }
  }

function userNameStateToProps(dispatch) {

    

    return {
        usernameClick: function(userName) { 
            console.log('je recois de mon reducer le name suivant : ', userName)
            dispatch( {type: 'Profile', name: userName} )
    
    }
  }
}
  
  export default connect(
    signUpStateToProps,
    userNameStateToProps
    )(Profilescreen);


export  class Profile extends React.Component{
    constructor(){
        super()
        this.state = {userName: '',
                        job: '',
                        hobby: '',
                        drink:'',
                        bands: ''};
        this.handleSubmit= this.handleSubmit.bind(this)
    }

    handleSubmit(){

        console.log('click bordel2')
        
        var profileData = JSON.stringify({
          userName: this.state.userName,
          job: this.state.job,
          hobby: this.state.hobby,
          drink:this.state.drink,
          bands:this.state.bands
        });
        
    
    //     fetch(`http://10.2.5.224:3000/users/newProfile`, {
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
        
    
        this.props.navigation.navigate('Map');
     }
    
     

    render(){
        
        return(
                
             
                <View style={styles.container}>
                    
                    
                    <HeaderHome
                    centerComponent={{ text: 'PROFIL', style: { color: '#CCA43B', fontWeight:'bold', fontSize:18 } }}
                        />
                        <ScrollView> 
                <View style={{ borderColor :'#CCA43B', margin:7, padding:15, borderWidth:3, flex:1 , alignItems:'center',width:"90%" }}>
                
                        
                 

                             <Avatar
                                size='xlarge'
                            rounded
                            containerStyle={styles.Avatar}
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

                        <ButtonCustom Title='VALIDER' click={this.handleSubmit}/>

                             
                        
                       
                       
                        </View>
                        </ScrollView>
                        </View>         
                       
                
        )
    }
    
}





const styles = StyleSheet.create({

    container : { flex : 1, backgroundColor:'#101D35', justifyContent:'center', alignItems:'center'},
    logo : {justifyContent:'center',alignItems:'center', margin:20},
    Avatar: { borderWidth: 4, borderColor: '#CCA43B', backgroundColor:'#101D35',  marginBottom:15, marginTop:15},
    Input : {  backgroundColor:'#fff' , width:'90%', borderRadius : 15, borderWidth : 4, marginTop: 10,
    borderColor:'#CCA43B'}
    })