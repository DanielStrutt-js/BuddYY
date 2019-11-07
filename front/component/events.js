import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, ScrollView, Text, Switch} from 'react-native'
import { Header, Button} from "react-native-elements"
import { Icon } from 'react-native-elements'
import {withNavigation} from 'react-navigation'
import ButtonCustom from './button';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';





export default class Notification extends React.Component {


    constructor(){
        super()
        this.state = {activeSections: [],
                      collapsed: true,
                      multipleSelect: false,
                      barInfo:[],
                      eventInfo:[],
                      eventBarName:null,
                      eventDiscription:null,
                    
                    };
        this.handleSubmit= this.handleSubmit.bind(this)
        this.chatButton= this.chatButton.bind(this)
    }


    
    componentWillMount() {
     ctx=this;
      fetch('http://10.2.5.219:3000/events/eventList',{
         
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(eventdata) {
   
       console.log('réponse du backend --->',eventdata)
        ctx.setState({eventInfo: eventdata,});
        
        
      })
      .catch((error)=> {
        console.log(error)
      })

      
    

    

    };


    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
      };

    chatButton = () => {
      console.log('chatButton')
      this.props.navigation.navigate('Chat');
    };

      setSections = sections => {
        this.setState({
          activeSections: sections.includes(undefined) ? [] : sections,
        });
      };

      renderHeader = (section, _, isActive) => {
        return (
          <Animatable.View
            duration={400}
            style={[styles.header, isActive ? styles.active : styles.inactive]}
            transition="backgroundColor"
          >
            <View style={{flex:1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          }}>
            <Icon
                 raised
                 style={{justifyContent: 'left',}}
                 name='comment'
                 type='font-awesome'
                 color='#CCA43B'
                 onPress={this.sayHello}
             />
             <Text style={styles.headerText}>{section.title}</Text>
             </View>
          </Animatable.View>
        );
      };
    
      renderContent(section, _, isActive) {
        
        return (
          <Animatable.View
            duration={400}
            style={[styles.content, isActive ? styles.active : styles.inactive]}
            transition="backgroundColor"
          >
            
            <Animatable.Text animation={isActive ? 'bounceIn' : undefined} >
              {section.content} 
            </Animatable.Text>
            
            
            <View style={{flex:1,
                          flexDirection: 'row',
                          justifyContent:'space-between'
                          
                          }}> 
           
            <View style={{flexDirection: 'row'}}>
            <Icon  name='users'
                   type='font-awesome'
                   color='#CCA43B' />

            <Text style={styles.headerPeople}>{section.people.length}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
            <Icon  name='hourglass-start'
                   type='font-awesome'
                   color='#CCA43B' 
                   />

            <Text style={styles.headerTime}>{section.time}</Text>
            </View>
            </View>
          </Animatable.View>
          
        );
      }

    sayHello(){
        console.log('sayhello')
      }
    

    handleSubmit(){
        console.log('click bordel')
        this.props.navigation.navigate('Map')}

        
    

    render(){

       
        const { multipleSelect, activeSections } = this.state;

       // const BACON_IPSUM =
  //'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';
         //const title = "lalala"


const SECTIONS = this.state.eventInfo.map(event => (
 
   obj = {
    title: event.bars.barName,
    content: event.eventDescription,
    time: event.eventTime,
    people:event.eventParticipants
  }
  ));
  console.log('reponse du content --->', SECTIONS)
  //console.log('réponse du state --->',this.state.eventInfo.eventDescription)
  console.log('réponse du stateBarName --->',this.state.eventBarName)
  console.log('réponse du stateDiscription --->',this.state.eventDescription)

        return(
        
            <View style={styles.container}>
            <Header
            centerComponent={{ text: 'NOTIFICATION', style: { color: '#CCA43B', fontWeight:'bold', fontSize:18 } }}
            containerStyle={{
                backgroundColor: '#101D35',
                borderBottomColor:'#CCA43B',
                borderBottomWidth:3,
                justifyContent: 'space-around',
            }}
            />
            
            
        <ScrollView style={{height:"70%"}}
        contentContainerStyle={{ paddingTop: 30, }}>
          

          

          

         
          {/* {this.state.eventInfo.map(eventInfo => (   */}
          <Accordion
            activeSections={activeSections}
            sections={SECTIONS}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
          {/* ))} */}
       
       
        </ScrollView>
      
           
            <View style={{flex:1, justifyContent: 'flex-end', alignItems: 'center', borderTopWidth: 3, borderTopColor:'#CCA43B', paddingTop: 30}}>
            <Button 
            buttonStyle= {{ backgroundColor:'#9C2C2C',}}
            title="MAP"
            titleStyle= {{color:'#CCA43B', textAlign:'center', }}
            containerStyle={{ 
             borderWidth: 3, borderColor: '#CCA43B',  marginBottom:10, width:'70%'}}
             onPress={this.handleSubmit}
             
            />
           </View>
            
            
         </View>

        )
    }
}

const styles = StyleSheet.create({

    container : { flex : 1, backgroundColor:'#101D35', height: 300 },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '300',
        marginBottom: 20,
      },
      header: {
        flex:1,
        backgroundColor: '#101D35',
        padding: 10,
        borderWidth: 3,
        borderColor:'#CCA43B',
        height: 100,
        
      },
      headerText: {
        justifyContent: 'center',
        marginLeft:50,
        fontSize: 16,
        fontWeight: '500',
        color: '#CCA43B',
        
      },
      headerTime: {
        
        textAlign: 'right',
        fontSize: 12,
        color: '#CCA43B',
        
      },
      headerPeople: {
        
        textAlign: 'left',
        fontSize: 18,
        color: '#CCA43B',
        
      },
      content: {
        padding: 20,
        backgroundColor: '#fff',
      },
      active: {
        backgroundColor: '#fff',
      },
      inactive: {
        backgroundColor:'#101D35',
      },
      selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
      },
      activeSelector: {
        fontWeight: 'bold',
      },
      selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
      },
      multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
      },
      multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
      },
    
    })
