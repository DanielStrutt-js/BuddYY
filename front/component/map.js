import React from 'react';
import MapView , {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,  Image, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import  * as Location from 'expo-location';
import Modal from "react-native-modal";
import { Header , Input, Button } from "react-native-elements";
import TimePicker from "react-native-24h-timepicker";

export default class Map extends React.Component {



  constructor(){

    super()
    this.state = {
        currentLatitude:0,
        currentLongitude:0,
        errorMessage: null,
        markers:[],
        region:null,
        isModalVisible: false,
        markerTitle: null ,
        markerUri: null,
        markerDisc: null,
        markerOpenTimes: null,
        status: true,
        time: ""

      };

    }

      componentWillMount() {

    this._getLocationAsync();
  }
  
  
_getLocationAsync = async () => {

  
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  
  if (status !== 'granted ') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }

  Location.watchPositionAsync({distanceInterval: 2},
    (location) => {
  
       this.setState({
         currentLatitude:location.coords.latitude,
         currentLongitude:location.coords.longitude });    
         
        var region = { currentLatitude:location.coords.latitude,
          currentLongitude:location.coords.longitude }
          
        })
        
        
};
   
  
toggleModal = () => {
  this.setState({ isModalVisible: !this.state.isModalVisible })
  if(this.state.status == false){
   this.ShowHideTextComponentView()}
};




setMarker = (markerData) => {
  this.setState({ markerTitle: markerData.title })
  this.setState({markerUri: markerData.uri})
  this.setState({markerDisc: markerData.description})
  this.setState({markerOpenTimes: markerData.openTimes})

  this.toggleModal()
   
};

handleSubmit=()=>{
    
  console.log('clickonpress')
  this.props.click()
  }

  ShowHideTextComponentView = () =>{

if(this.state.status == true  )
{
  this.setState({status: false})
  
  }
   else
    {
      this.setState({status: true})

  
  
}
  }


  onCancel() {
    this.TimePicker.close();
  }
 
  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

    render() {

     console.log(this.state.markerSelected)

      var markerData = [
        {title:"Frog&Rosbiff", latitude: 48.864626, longitude:2.350272, description:"Bar edfq QD DQ SD dSF d sfsqdf f sdf df fdsq dsqf q fdqs ", pin:"#CCA43B", uri:"https://www.frogpubs.com/pics/data/pubs/illustrations/1-178-1200x650.jpg", openTimes: "17h a 0.30h" },
        {title:"The Long Hop", latitude: 48.850509, longitude:2.349018, description:"fsfqfqvggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg fqds f f sdf sdf sdf sdf qsfd  fdqsfd qsdfsqd f qdf ", pin:"#CCA43B", uri: "https://media-cdn.tripadvisor.com/media/photo-s/0a/a8/08/d6/bar-interieur.jpg", openTimes: "15h a 02h"},
        {title:"Cafe-Oz", latitude: 48.833401, longitude: 2.333917, description:"d fsdf ds f dsf sf sdf dsf dsf sd fs fqds fsdf sdf ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ", pin:"#CCA43B" ,uri: "http://www.lesbarres.com/media/image/slideshow/43fa46ed146f6516f6f46f7e2b367c215f23fd18.jpg", openTimes: "17h a 24h"},
        {title:"LeChina", latitude: 48.849952,  longitude:2.373512, description:"d fsqd fsd fsqd fds fqdsd fdsfdsf q fqdsf qsdf dsfsdfqsdfqs ", pin:"#CCA43B", uri:"https://i.imgur.com/urCdvqH.jpg", openTimes: "16h a 24h"},
   ]
   var swipe=["up", "down", "left", "right"]



   return (
        <View style={styles.container}>

<Header
                    leftComponent={{ icon: 'chevron-left', color: '#CCA43B', }}
                    centerComponent={{ text: 'CHOISIR UN MARQUEUR', style: { color: '#CCA43B', fontWeight:'bold', fontSize:18 } }}
                    containerStyle={{
                        backgroundColor: '#101D35',
                        borderBottomColor:'#CCA43B',
                        borderBottomWidth:3,
                        justifyContent: 'space-around',
                      }}
                 />


  <Modal isVisible={this.state.isModalVisible}
         onSwipeComplete={this.toggleModal}
         swipeDirection={swipe}
         style={styles.module}
         swipeThreshold={20}
         >

        <View style={ styles.popupView }>
          
        <Text style={styles.barName} >{this.state.markerTitle}</Text>
        <View style={styles.wrapper}>
        <Image
         style={styles.stretch}
         source={{uri:this.state.markerUri}}
       />
       </View>
       {  this.state.status ? <Text style={styles.openTimeStyle}>Ouverture: {this.state.markerOpenTimes}</Text>: null }
       
       {  this.state.status ?<Text style={styles.discriptionStyle} >{this.state.markerDisc}</Text>: null }

       { this.state.status  ? null : <Button
              onPress={() => this.TimePicker.open()}
              style={styles.timeButton}
              buttonStyle= {{ backgroundColor:'#9C2C2C',}}
        title="Heure"
        titleStyle= {{color:'#CCA43B', textAlign:'center', }}
        containerStyle={{marginTop:10, borderWidth: 3, borderColor: '#CCA43B',}}
              
             > </Button> }
       
       {  this.state.status ? null: <TimePicker
                            ref={ref => {this.TimePicker = ref;}}
                            onCancel={() => this.onCancel()}
                            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                       /> }
       {  this.state.status ? null:  <Input style={styles.input}
                            inputStyle={styles.input}
                            inputContainerStyle={{ borderBottomWidth:0}}
                            placeholder='Discrition'
                            labelStyle={{ marginLeft : 15}}
                            
                     />}

      <View style={{flex:1,
        justifyContent: 'flex-end', marginBottom: 36, width : '90%',}} >

        {  this.state.status ? <Button 
        buttonStyle= {{ backgroundColor:'#9C2C2C',}}
        title="create event"
        titleStyle= {{color:'#CCA43B', textAlign:'center', }}
        containerStyle={{ 
         borderWidth: 3, borderColor: '#CCA43B',}}
         onPress={this.ShowHideTextComponentView}
         
        />: null }
        
        {  this.state.status ? null:  <Button 
        buttonStyle= {{ backgroundColor:'#9C2C2C',}}
        title="valide"
        titleStyle= {{color:'#CCA43B', textAlign:'center', }}
        containerStyle={{ 
         borderWidth: 3, borderColor: '#CCA43B',}}
         onPress={this.ShowHideTextComponentView}
         
        />}
         
        </View>
         
        </View>
   </Modal>

  

      <MapView style={styles.mapStyle}
               initialRegion={{
                latitude: 48.866667,
                longitude: 2.333333,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,  
       }}>
               {markerData.map(markerData => (
               <Marker coordinate={{latitude: markerData.latitude, longitude: markerData.longitude}}
                       pinColor={markerData.pin}
                       title={markerData.title}
                       onPress={() => this.setMarker(markerData)}
                       
                       
                />))}
               
          <Marker key={"currentPos"}
          pinColor="red"
          title="Hello"
          description="I'am here"
          coordinate={{latitude: this.state.currentLatitude, longitude: this.state.currentLongitude}}
          />
          </MapView>
    </View>
  );
}
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#101D35',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: "90%",
    },
    module:{
      backgroundColor: '#101D35',
      borderColor:'#CCA43B',
      borderWidth:3,
    },
    popupView:{
      flex: 1,
      backgroundColor:'#101D35',
      alignItems: 'center',

    },
    stretch: {
      width: "100%",
      height: "100%",
      resizeMode: 'stretch',

    },
    wrapper: {
      width: "100%",
      height: "30%",
      borderTopWidth:3,
      borderBottomWidth:3,
      borderColor: '#CCA43B',
    },
    barName: {
      color: '#CCA43B',
      fontWeight:'bold',
      fontSize:25
    },
    openTimeStyle: {
      color: '#CCA43B',
      fontSize:20
    },
    discriptionStyle: {
      color: '#CCA43B',
      fontSize:15,
      margin: 15


    },
    timeButton: {
      backgroundColor: "#9C2C2C",
      paddingVertical: 11,
      paddingHorizontal: 17,
      borderWidth: 3,
      borderColor: '#CCA43B',
      marginVertical: 50,
      borderRadius: 3,
      color: '#CCA43B',
      fontWeight:'bold',
      fontSize:25

},
input: {
  color: "#CCA43B",
  fontSize: 15,
  fontWeight: "600"
}
  });