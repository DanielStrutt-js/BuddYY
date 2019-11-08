import React, { Component } from 'react';
import { View, StyleSheet, Text,TextInput,ScrollView, TouchableOpacity, Image, CameraRoll, Platform,KeyboardAvoidingView } from 'react-native';
import { Avatar,Input, Button, Header,} from 'react-native-elements';
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
        this.handleSubmit= this.handleSubmit.bind(this);
      
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
        this.props.navigation.navigate('Notification')
    
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
    
        fetch(`http://10.2.5.219:3000/users/newProfile?id=`+this.props.userIdfromStore, {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `userName=${this.state.userName}&job=${this.state.job}&drink=${this.state.drink}&hobby=${this.state.hobby}&bands=${this.state.bands}`,
        }).then((response) =>{
          return response.json();
       })
       .then((data)=> {
        console.log(data)
      //  REDUX PART
        console.log('RESULTAT DE LERENGISTREMENT EN BD USER --->', data.id)

  //     // Envoi au réducer

        // On envoit au reducer l'_id du user
        //this.props.profile(data.user.id);
        console.log('data avant save redux', data.user.userName)
        this.props.usernameClick(data.user.userName)
        this.props.navigation.navigate('Notification')
     })
     .catch((error)=> {
         console.log('Request failed in my signUp Home request', error)
     });
    
    //     this.props.navigation.navigate('Profile');
    }
    
     
    // _mediaLibraryAsync = async () => {
    //     // I ask permissions
    //     let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     this.setState({ permissionsGranted: status === 'granted' }, this.getAlbums);
    
    //     // if permissions granted
    //     let albumsReponse = await MediaLibrary.getAlbumsAsync();
        
    //     console.log("albumsReponse=", albumsReponse);
    //   };

    render(){
        
        // const { uri } = await Camera.takePictureAsync();
        // const asset = await MediaLibrary.createAssetAsync(uri);


        return(
                
             
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    
                    
                    <HeaderHome
                    centerComponent={{ text: 'NOUVEAU PROFIL', style: { color: '#CCA43B', fontWeight:'bold', fontSize:18 } }}
                    click={this.handleReturn}
                        />
                <View style={{ borderColor :'#CCA43B', margin:7, padding:15, borderWidth:3, flex:1 , alignItems:'center',width:"90%" }}>
                <ScrollView style={{flex:1, width:'100%'}}
                            contentContainerStyle={ {alignItems: 'center'}}> 
                        
                 

                             <Avatar
                                size='xlarge'
                            rounded
                            containerStyle={styles.Avatar}
                            onPress={this._onTakePic}
                            //onPress={(source) => this.setState({img: source})}
                            //source ={this._onSave}
                            imageProps={{resizeMode: 'cover'}}
                            
                            />
                            <View style={{ flexDirection: 'row' }}>
        
                                    
                                    <TouchableOpacity
                                    style={styles.button}
                                    onPress={this._onChoosePic}>
                                    <Text style={styles.buttonText}>Choose</Text>
                                    </TouchableOpacity> 

                                   
                                    <TouchableOpacity
                                    style={styles.button}
                                    onPress={this._onTakePic}>
                                    <Text style={styles.buttonText}>Take</Text>
                                    </TouchableOpacity>
                                    
                                    
                                    <TouchableOpacity
                                    style={styles.button}
                                    onPress={this._onSave}>
                                    <Text style={styles.buttonText}>Save</Text>
                                    </TouchableOpacity>
                                    
                                </View>
                       
                        
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
                      
                       
                        </ScrollView>
                        </View>
                        </KeyboardAvoidingView>         
                       
                
        )
    }

      
  // When "Choose" is pressed, we show the user's image library
  // so they may show a photo from disk inside the image view.
  _onChoosePic = async () => {
    const {
      cancelled,
      uri,
    } = await ImagePicker.launchImageLibraryAsync();
    if (!cancelled) {
      this.setState({ imageUri: uri });
       console.log('Choose',uri) // this logs correctly
      // TODO: why isn't this showing up inside the Image on screen?
    }
  }

  // When "Take" is pressed, we show the user's camera so they
  // can take a photo to show inside the image view on screen.
  _onTakePic = async () => {
    const {
      cancelled,
      uri,
    } = await ImagePicker.launchCameraAsync({});
    if (!cancelled) {
      this.setState({ imgUri: uri });
    }
    console.log('Take',uri)
  }

  // When "Save" is pressed, we snapshot whatever is shown inside 
  // of "this.imageView" and save it to the device's camera roll.
  _onSave = async () => {
    const uri = await Expo.takeSnapshotAsync(this.imageView, {});
    await CameraRoll.saveToCameraRoll(uri);
    // TODO: show confirmation that it was saved (flash the word saved across bottom of screen?)
  }
}

askPermission = async () => {
    // only if user allows permission to camera roll
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
   // const { onStartUpload } = this.props;
    // On Android users are prompted every time,
    // so no need to show additional Alert
    if (status !== 'granted') {
      if (Platform.OS === 'ios') this.showAlert();
      return;
    }
}
    
function signUpStateToProps(state) {

    console.log('je recupere dans mon reducer lid suivant : ',state)

    return { userIdfromStore: state.id }
  }

function userNameStateToProps(dispatch) {



    return {
        usernameClick: function(userName) { 
            console.log('je sauvegazrde de mon reducer le name suivant : ', userName)
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
        this.state = {  img: req.query.img,
                        userName: req.query.userName,
                        job: req.query.job,
                        hobby: req.query.hobby,
                        drink: req.query.drink,
                        bands: req.query.bands};
        this.handleSubmit= this.handleSubmit.bind(this)
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
        this.props.navigation.navigate('Notification')
    
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

                        <ButtonCustom Title='VALIDER' click={this.handleSubmit} />

                             
                        
                       
                       
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
    borderColor:'#CCA43B'},
    buttonText: {
        fontSize: 21,
      },
    })

    