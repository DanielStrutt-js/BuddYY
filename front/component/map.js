import React from 'react';
import MapView , {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,  Image, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Modal from "react-native-modal";
import { Header , Input, Button, } from "react-native-elements";
import TimePicker from "react-native-24h-timepicker";
import ToggleSwitch from 'rn-toggle-switch';




export default class Map extends React.Component {

  
  
  constructor(){
    
    super()
    this.state = {
        currentLatitude:0,
        currentLongitude:0,
        errorMessage: null,
        markers:[],
        eventMarker:[],
        region:null,
        isModalVisible: false,
        isEventModalVisible: false,
        markerTitle: null ,
        markerUri: null,
        markerDisc: null,
        markerOpenTimes: null,
        eventMarkerTitle: null ,
        eventMarkerUri: null,
        eventMarkerTime: null,
        eventMarkerParticipants:[],
        eventMarkerCreator:null,
        meventMarkerOpenTimes: null,
        status: "BarDiscription",
        statusFelicitation: false,
        time: "",
        discCreate: "",
        dayMode: true,
        barEvent: "showBars"
        
      };
  
    }
  
      componentWillMount() {
        var ctx=this;
        this._getLocationAsync();
        fetch('http://10.2.5.226:3000/events/barList',{
           
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
     
          //console.log('réponse du backend --->',data)
          ctx.setState({markers: data});
         
        })
        .catch((error)=> {
          console.log(error)
        })
       
        fetch('http://10.2.5.226:3000/events/eventList',{
           
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(eventdata) {
     
         // console.log('réponse du backend --->',eventdata)
          ctx.setState({eventMarker: eventdata});
         
        })
        .catch((error)=> {
          console.log(error)
        })

        
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
      if(this.state.status == "createEvent" || this.state.status == "Felicitation"  )
       this.ShowHideTextComponentView()
    };

    toggleEventModal = () => {
      this.setState({ isEventModalVisible: !this.state.isEventModalVisible })
     
    };

   dayNightSwitch = () =>{
    {
      if(this.state.dayMode==true){
      this.setState({dayMode:false})
    }else{
      this.setState({dayMode:true})
    }
    }
   }
   
   eventBarSwitch = () =>{
    {
      if(this.state.barEvent=="showBars"){
      this.setState({barEvent:"showEvents"})
    }else{
      this.setState({barEvent:"showBars"})
    }
    }
   } 

    
    setMarker = (markers) => {
      this.setState({ markerTitle: markers.barName})
      this.setState({markerUri: markers.barImg})
      this.setState({markerDisc: markers.description})
      this.setState({markerOpenTimes: markers.openTimes})

      this.toggleModal()
       
    };

    setEvent = (eventMarker) => {
      this.setState({ eventMarkerTitle: eventMarker.bars.barName })
      this.setState({eventMarkerUri: eventMarker.bars.barImg})
      this.setState({eventMarkerTime: eventMarker.eventTime})
      this.setState({eventMarkerParticipants: eventMarker.eventParticipants})
      this.setState({eventMarkerCreator: eventMarker.eventCreator.userName})

      this.toggleEventModal()
       
    };

    handleSubmit=()=>{
        
      console.log('clickonpress')
      this.props.click()
  }

  ShowHideTextComponentView = () =>{

    if(this.state.status == "BarDiscription" )
    {
      this.setState({status: "createEvent"})
      }
     if(this.state.status =="createEvent" ) 
      {
      this.setState({status: "Felicitation"})
    }
    if(this.state.status =="Felicitation" ) 
      {
      this.setState({status: "BarDiscription"})}
    
    
  }
  
  
  onCancel() {
    this.TimePicker.close();
  }
 
  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  
  
    render() {

     /*var eventData = [
      {title:"Frog&Rosbiff", latitude: 48.554626, longitude:2.355272, description:"Bar edfq QD DQ SD dSF d sfsqdf f sdf df fdsq dsqf q fdqs ", pin:"#CCA43B", uri:"https://www.frogpubs.com/pics/data/pubs/illustrations/1-178-1200x650.jpg", openTimes: "17h " },
      {title:"The Long Hop", latitude: 48.550509, longitude:2.349558, description:"fsfqfqvggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg fqds f f sdf sdf sdf sdf qsfd  fdqsfd qsdfsqd f qdf ", pin:"#CCA43B", uri: "https://media-cdn.tripadvisor.com/media/photo-s/0a/a8/08/d6/bar-interieur.jpg", openTimes: "15h"},
      {title:"Cafe-Oz", latitude: 48.855501, longitude: 2.333917, description:"d fsdf ds f dsf sf sdf dsf dsf sd fs fqds fsdf sdf ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ", pin:"#CCA43B" ,uri: "http://www.lesbarres.com/media/image/slideshow/43fa46ed146f6516f6f46f7e2b367c215f23fd18.jpg", openTimes: "17h "},
      {title:"LeChina", latitude: 48.843952,  longitude:2.573512, description:"d fsqd fsd fsqd fds fqdsd fdsfdsf q fqdsf qsdf dsfsdfqsdfqs ", pin:"#CCA43B", uri:"https://i.imgur.com/urCdvqH.jpg", openTimes: "16h "},
 ]
      
      /*var markerData = [
        {title:"Frog&Rosbiff", latitude: 48.864626, longitude:2.350272, description:"Bar edfq QD DQ SD dSF d sfsqdf f sdf df fdsq dsqf q fdqs ", pin:"#CCA43B", uri:"https://www.frogpubs.com/pics/data/pubs/illustrations/1-178-1200x650.jpg", openTimes: "17h a 0.30h" },
        {title:"The Long Hop", latitude: 48.850509, longitude:2.349018, description:"fsfqfqvggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg fqds f f sdf sdf sdf sdf qsfd  fdqsfd qsdfsqd f qdf ", pin:"#CCA43B", uri: "https://media-cdn.tripadvisor.com/media/photo-s/0a/a8/08/d6/bar-interieur.jpg", openTimes: "15h a 02h"},
        {title:"Cafe-Oz", latitude: 48.833401, longitude: 2.333917, description:"d fsdf ds f dsf sf sdf dsf dsf sd fs fqds fsdf sdf ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ", pin:"#CCA43B" ,uri: "http://www.lesbarres.com/media/image/slideshow/43fa46ed146f6516f6f46f7e2b367c215f23fd18.jpg", openTimes: "17h a 24h"},
        {title:"LeChina", latitude: 48.849952,  longitude:2.373512, description:"d fsqd fsd fsqd fds fqdsd fdsfdsf q fqdsf qsdf dsfsdfqsdfqs ", pin:"#CCA43B", uri:"https://i.imgur.com/urCdvqH.jpg", openTimes: "16h a 24h"},
   ]*/
   var swipe=["up", "down", "left", "right"]
    
   console.log(this.state.markerUri)

   if(this.state.dayMode===true){
     var mapStyle=[
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]
      }else{
      var mapStyle=[
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8ec3b9"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1a3646"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#64779e"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#334e87"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6f9ba5"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3C7680"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#304a7d"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2c6675"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#255763"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#b0d5ce"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3a4762"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#0e1626"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#4e6d70"
            }
          ]
        }
      ]
      
    }
   
    //console.log(this.state.markers)
   //console.log(this.state.eventMarker)
   console.log(this.state.eventMarker)
   
   //console.log(this.state.eventMarkerCreator)
   return (
        <View style={styles.container}>

<Header
                    leftComponent={{ icon: 'chevron-left', color: '#CCA43B', }}
                    centerComponent={{ text: 'CHOISIR UN MARQUEUR', style: { color: '#CCA43B', fontWeight:'bold', fontSize:18 } }}
                    rightComponent={ <ToggleSwitch
                      text={{on: 'DAY', off: 'NIGHT', activeTextColor: 'white', inactiveTextColor: '#CCA43B'}}
                      textStyle={{fontWeight: 'bold', fontSize:6}}
                      color={{ indicator: 'white', active: '#CCA43B', inactive:  'rgba( 247, 247, 247, 1)', activeBorder: '#CCA43B', inactiveBorder: '#E9E9E9'}}
                      active={true}
                      disabled={false}
                      width={20}
                      radius={10}
                      onValueChange={this.dayNightSwitch}
                    />}
                    
                      containerStyle={{
                        backgroundColor: '#101D35',
                        borderBottomColor:'#CCA43B',
                        borderBottomWidth:3,
                        justifyContent: 'space-around',
                        marginTop: 25,
                      }}/>



                     
  
  
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
           {  this.state.status=="BarDiscription" ? <Text style={styles.openTimeStyle}>Ouverture:</Text>: null }
           
           {  this.state.status=="BarDiscription" ? <Text style={styles.discriptionStyle} >{this.state.markerDisc}</Text>: null }

           { this.state.status=="createEvent"  ?  <Button
                  onPress={() => this.TimePicker.open()}
                  style={styles.timeButton}
                  buttonStyle= {{ backgroundColor:'#9C2C2C',}}
            title="Heure"
            titleStyle= {{color:'#CCA43B', textAlign:'center', }}
            containerStyle={{marginTop:10, borderWidth: 3, borderColor: '#CCA43B',}} > </Button>: null }
           
           {  this.state.status =="createEvent" ?<TimePicker
                                ref={ref => {this.TimePicker = ref;}}
                                onCancel={() => this.onCancel()}
                                onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                           />: null }
          
          
           {  this.state.status =="createEvent" ? <Input style={styles.input}
                                inputStyle={styles.input}
                                inputContainerStyle={{ borderBottomWidth:0, borderColor: '#CCA43B'}}
                                placeholder="Description de l'événement"
                                labelStyle={{ marginLeft : 15}}
                                multiline={true} 
                                maxLength={150}
                                onChangeText={(value) => this.setState({discCreate:value})}
                                value={this.state.discCreate} />: null}
          
         
         
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}} >  
           {  this.state.status=="Felicitation"? <Text style={styles.felicitation} >FÉLICITATION ÉVÈNEMENT CRÉE</Text>: null}
          </View>

          <View style={{flex:1,
            justifyContent: 'flex-end', marginBottom: 36, width : '90%',}} >

            {  this.state.status=="BarDiscription" ? <Button 
            buttonStyle= {{ backgroundColor:'#9C2C2C',}}
            title="create event"
            titleStyle= {{color:'#CCA43B', textAlign:'center', }}
            containerStyle={{ 
             borderWidth: 3, borderColor: '#CCA43B',}}
             onPress={this.ShowHideTextComponentView}
             
            />: null }
            
            {  this.state.status=="createEvent" ? <Button 
            buttonStyle= {{ backgroundColor:'#9C2C2C',}}
            title="valide"
            titleStyle= {{color:'#CCA43B', textAlign:'center', }}
            containerStyle={{ 
             borderWidth: 3, borderColor: '#CCA43B',}}
             onPress={this.ShowHideTextComponentView}
             
            />: null}

           {  this.state.status=="Felicitation" ? <Button 
            buttonStyle= {{ backgroundColor:'#9C2C2C',}}
            title="ok"
            titleStyle= {{color:'#CCA43B', textAlign:'center', }}
            containerStyle={{ 
             borderWidth: 3, borderColor: '#CCA43B',}}
             onPress={this.toggleModal}
             
            />: null }
             
            </View>
             
            </View>
   </Modal>

   <Modal isVisible={this.state.isEventModalVisible}
         onSwipeComplete={this.toggleEventModal}
         swipeDirection={swipe}
         style={styles.module}
         swipeThreshold={20}
         >

            <View style={ styles.popupView }>
              
            <Text style={styles.barName} >{this.state.eventMarkerTitle}</Text>
            <View style={styles.wrapper}>
            <Image
             style={styles.stretch}
             source={{uri:this.state.eventMarkerUri}}
           />
           </View>
           <Text style={styles.openTimeStyle}>DEBUT: {this.state.eventMarkerTime}</Text>
           
           <Text style={styles.discriptionStyle}>Creator: {this.state.eventMarkerCreator}</Text>
           <Text style={styles.discriptionStyle}>Nombre de participants: {this.state.eventMarkerParticipants.length}</Text>

           
           
           
          
          
           
          
         
         
          

          <View style={{flex:1,
            justifyContent: 'flex-end', marginBottom: 36, width : '90%',}} >

            {  this.state.status=="BarDiscription" ? <Button 
            buttonStyle= {{ backgroundColor:'#9C2C2C',}}
            title="rejoindre event"
            titleStyle= {{color:'#CCA43B', textAlign:'center', }}
            containerStyle={{ 
             borderWidth: 3, borderColor: '#CCA43B',}}
             onPress={this.toggleEventModal}
             
            />: null }
            
            
             
            </View>
             
            </View>
   </Modal>


          <MapView style={styles.mapStyle}
                   customMapStyle={mapStyle}
                   initialRegion={{
                    latitude: 48.866667,
                    longitude: 2.333333,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,  
           }}>
                  
                  {  this.state.barEvent=="showBars" ?<View>
                   {this.state.markers.map(markers => (
            <Marker coordinate={{latitude: markers.latitude, longitude: markers.longitude}}
                           pinColor={'#CCA43B'}
                           title={markers.barName}
                           onPress={() => this.setMarker(markers)}
                           
                           
                    />))}</View>: null }

                   {  this.state.barEvent=="showEvents" ?<View>
                   {this.state.eventMarker.map(eventMarker => (
            <Marker coordinate={{latitude: eventMarker.bars.latitude, longitude: eventMarker.bars.longitude}}
                           title={eventMarker.bars.barName}
                           onPress={() => this.setEvent(eventMarker)}
                           
                           
                    />))}</View>: null }

                    
                   
              <Marker key={"currentPos"}
              pinColor="red"
              title="Hello"
              description="I'am here"
              coordinate={{latitude: this.state.currentLatitude, longitude: this.state.currentLongitude}}
              />
              </MapView>
         <Header containerStyle={{
                        backgroundColor: '#101D35',
                        borderTopColor:'#CCA43B',
                        borderTopWidth:3,
                        
                        justifyContent: 'center'
                      }}
                      centerComponent={ <ToggleSwitch
                        text={{on: 'BARS', off: 'EVENTS', activeTextColor: 'white', inactiveTextColor: '#CCA43B'}}
                        textStyle={{fontWeight: 'bold', fontSize:15}}
                        color={{ indicator: 'white', active: '#CCA43B', inactive:  'rgba( 247, 247, 247, 1)', activeBorder: '#CCA43B', inactiveBorder: '#E9E9E9'}}
                        active={true}
                        disabled={false}
                        width={100}
                        radius={15}
                        onValueChange={this.eventBarSwitch}
                      />}
                      centerContainerStyle={{marginBottom:20}} />
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
      height: "80%",
    },
    module:{
      backgroundColor: '#101D35',
      borderColor:'#CCA43B',
      borderWidth:3,
    },
    popupView:{
      flex:1,
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
    },
    felicitation: {
      
      color: '#CCA43B',
      fontWeight:'bold',
      fontSize:25,
      textAlign: 'center'
      
    },
    toggleSwitch:{
      flex:1,
      
    }
  });

 
