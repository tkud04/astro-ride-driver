import React from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import MapView,{Marker} from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import TitleHeader from '../components/TitleHeader';
import HeaderMenuButton from '../components/HeaderMenuButton';
import AstroIcon from '../components/AstroIcon';
import * as Permissions from 'expo-permissions';
import {ThemeContext,UserContext} from '../MyContexts';
import * as Location from 'expo-location';
import {ScrollView, Dimensions, ActivityIndicator, Animated} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');
const LOCATION_TASK_NAME = 'background-location-task';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class DashboardScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
	//this.dt = props.navigation.state.params.dt;
	
	
    this.state = { 
                     hasLocationPermissions: false,
                     locationResult: null,
					 address: "",
                     markerCoords: {latitude: 0,longitude: 0},
					 region: {
                       latitude: LATITUDE,
                       longitude: LONGITUDE,
                       latitudeDelta: LATITUDE_DELTA,
                       longitudeDelta: LONGITUDE_DELTA,
                     },
	                 isLoadingComplete: false,
					 tryAgain: false,
					 networkProblem: false,
					 networkProblemText: "",
					 fadeAnim: new Animated.Value(0)
				 };	
				 
	this.navv = null;
    this.map = null;
	
	this._getLocationAsync();
  }
  
    launchDrawer = () => {
	this.navv.toggleDrawer();  
  }
	  
  
  _testt = async () => {
	  const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  }
  
  _next = async () => {
	  let dt = {
		    origin:{
		      latlng: this.state.markerCoords,
		      formattedAddress: this.state.address
			}
		  };
	 this.navv.navigate('SetDestination',{
		   dt: dt
	    });
  }
  
  _getGreeting = (fname) => {
	  let today = new Date();
	  let greeting = "Good evening, ";
	  
	  if(today.getHours() < 12) greeting = "Good morning, ";
	  else if(today.getHours() < 17) greeting = "Good afternoon, ";
	  greeting += fname;
	  return greeting;
  }

  _getLocationAsync = async () => {
	  try{
	  this.setState({ tryAgain: false});
	  const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      this.setState({ hasLocationPermissions: true });

      let location = await Location.getCurrentPositionAsync({});
	  console.log("Current position: ",location);
	  let address = await helpers.getAddress({latitude: location.coords.latitude, longitude: location.coords.longitude});
	  console.log("Address: ",address);
	  
	  if(address.status === "error"){
		   this.setState({ tryAgain: true});
	  }
	  else{
		  //the results object is an array. we are using the first object returned ( of type ROOFTOP)
	  let rooftop = address.results[0],addressComponents = rooftop.address_components;
	  let formattedAddress = addressComponents[0].short_name;
	 
	  for(let i = 1; i < 4; i++){
		  formattedAddress += " " + addressComponents[i].short_name;
	  }
	  
	  console.log("Formatted address: ",formattedAddress);
      this.setState({ locationResult: JSON.stringify(location),  address: formattedAddress});
      this.setState({ markerCoords: {
		     latitude: location.coords.latitude,
		     longitude: location.coords.longitude
		    }
			});
	  
      // Center the map on the location we just fetched.
      this.setState({
        region: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        },
      });
	  this.setState({ isLoadingComplete: true});
	  }
	  
    }
	else{
		showMessage({
			 message: "Locations permissions not granted",
			 type: 'warning'
		 });
	}
  }
  catch(e){
	  console.log("e: ",e.toString());
	  this.setState({ 
	      networkProblem: true,
		  networkProblemText: "Couldn't load map. Please check your internet connection and try again",
		  isLoadingComplete: true
	  });
  }
  }
  
  _handleMapRegionChange = mapRegion => {
   // this.setState({region: mapRegion });
  };
  
  
  render() {
	 let navv = this.props.navigation;
	  this.navv = navv;
	  if(this.state.region !== null){
			//console.log("current coords: ",this.state.markerCoords);
		  
	  }
	  
	if(!this.state.isLoadingComplete){
	   Animated.loop(
	    Animated.sequence([
	      Animated.timing(this.state.fadeAnim,{
		    toValue: 1,
		    duration: 1000
	      }),
	      Animated.timing(this.state.fadeAnim,{
		   toValue: 0,
		   duration: 1000
	      })
	    ])
	  ).start();
    }
	
    return (
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
	        <Container>	     

				   
					  {this.state.isLoadingComplete ? (
					 <Row style={{flex: 1, marginTop: 10, width: '100%'}}>
					 
					 {!this.state.networkProblem ? (
					   <>
					    <MapView 
					   ref={ref => {
                         this.map = ref;
                       }}
                       mapType="standard"
					   style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - 150}}
					   region={this.state.region}
                       onRegionChange={region => this._handleMapRegionChange(region)}
   				     >
				       <Marker
					      coordinate={this.state.markerCoords}
						  title="Your current location"
                          description={this.state.address}
						  draggable={true}
					   >
					   <MarkerView>
					  <AstroIcon xml={AppStyles.svg.cardLocation} w={40} h={30} ss={{ alignItems: 'center', justifyContent: 'center'}}/>
					  </MarkerView>
					   </Marker>
					 </MapView>	

					   <WelcomeView>
						  <SubmitButton
						   onPress={() => {}}
						  >
						  <StatusButtonView>
						  <StatusButtonVieww>
						   <StatusButtonText>GO</StatusButtonText>
						  </StatusButtonVieww>
						  </StatusButtonView>
						  </SubmitButton>
					  </WelcomeView>
					  </>
					 ) : (
					   <NetworkProblemView>
					     <NetworkProblemView2>
					      <NetworkProblemText>{this.state.networkProblemText}</NetworkProblemText>
						 </NetworkProblemView2>
					   </NetworkProblemView>
					 )}
				    
					 <WWrapper>
                    
					  <SubmitButton
				       onPress={() => {this._next()}}
				       title="Submit"
                    >
                      <TripsPlannerView>
					    <AstroIcon xml={AppStyles.svg.ionCaretDownOutline} w={30} h={30} ss={{marginTop: 10}}/>
						<TripsPlannerText>You're offline</TripsPlannerText>
						<AstroIcon xml={AppStyles.svg.ionOptionsOutline} w={30} h={30} ss={{marginTop: 10}}/>
					  </TripsPlannerView>		   
				    </SubmitButton>	
					 <SubmitButton
                    >
				     <LastTripView>
					   <LastTripIcon>
					      <AstroIcon xml={AppStyles.svg.ionSunnyOutline} w={30} h={30} ss={{marginLeft: 4, alignItems: 'center', justifyContent: 'center'}}/>
					   </LastTripIcon>
					   <LastTrip>
					     <TripLocation>Today's opportunities</TripLocation>
					     <Address>Top ways to earn more</Address>
					   </LastTrip>
					 </LastTripView>
					</SubmitButton>	
					</WWrapper>
                    </Row>					
				   ) : (
				       <Row style={{flex: 1, marginTop: 10, flexDirection: 'row', width: '100%'}}>
					   {this.state.tryAgain ? (
					   <NoteView>
						  <Note>Couldn't load maps.. this seems to be a network problem.</Note>
						  <SubmitButton
				       onPress={() => {this._getLocationAsync()}}
                    >
                        <CButton title="Try again" background="rgb(101, 33, 33)" color="#fff" />					   
				    </SubmitButton>	
						</NoteView>
					    
                       ): (
					     <NoteView>
						   <Animated.View
						  style={{opacity: this.state.fadeAnim}}
					   >
						<TitleHeader bc="#000" tc="#000" title="Loading your dashboard"/>
				       </Animated.View>
						</NoteView>
					   )}						
				       </Row>
					  )}
				    <Row>
				    
				   </Row>
				  		
			</Container>
			</BackgroundImage>
    );
  }
  
}



const BackgroundImage = styled.ImageBackground`
           width: 100%;
		   height: 100%;
`;

const Container = styled.View`
					 background-color: #fff;
					flex: 1;
					justify-content: flex-end;
`;

const ProductInputWrapper = styled.View` 
                   margin-left: 10px;
`;

const ProductDescription = styled.Text` 
                   color: #000;
				   margin-top: 12px;
				   margin-bottom: 2px;
				   font-size: 24px;
				   
`;
					 
const ProductInput = styled.TextInput`
					 align-items: center;
					 border: 1px solid #bbb;
					 padding: 10px;
					 margin-top: 5px;
					 margin-bottom: 20px;
					 color: #000;
					 border-left-width: 0;
					 border-top-width: 0;
					 border-right-width: 0;
					 border-bottom-width: 3;
`;


const TestButton = styled.Button`
  background-color: blue;
  color: #fff;
  border-radius: 5;
  margin-top: 40px;
`;

const SubmitButton = styled.TouchableOpacity`
z-index: 6;
`;

const ImageUpload = styled.TouchableOpacity`

`;

const ContactUpload = styled.TouchableOpacity`

`;

const ContactView = styled.View`

`;

const ContactText = styled.Text` 
                   color: #fff;
				   background-color: green;
				   margin-bottom: 6px;
				   font-size: 16px;
				   padding: 8px;
`;
					 
const Logo = styled.Image`
           width: 66px;
		   height: 66px;
		   background: black;
		   border-radius: 33px;
		   margin-left: 8px;
`;

const Row = styled.View`
   margin: 5px;
   width: 100%;
`;

const TopRightInputs = styled.View`
   margin-left: 10px;
   margin-right: 5px;
   width: 60%;
`;

const CustomerSelect = styled.Picker`
    width: 90%;
	height: 50;
	color: #000;
	margin-bottom: 20px;
`;

const BottomInputs = styled.View`
   margin-top: 10px;
   margin-left: 10px;
   margin-bottom: 10px;
   width: 90%;
`;

const NoteView = styled.View`
flex-direction: row;
justify-content: center;
align-items: center;
width: 100%;
`;

const TestView = styled.View`

`;

const TestText = styled.Text` 
                   color: rgb(101, 33, 33);
				   margin-bottom: 6px;
				   font-size: 16px;
				   padding: 8px;
`;

const Note = styled.Text` 
                   color: rgb(101, 33, 33);
				   margin-bottom: 6px;
				   font-size: 16px;

`;

const WelcomeView = styled.View`
margin-bottom: 5;
background-color: transparent;
position: absolute;
bottom: 130;
right: 110;
`;


const WelcomeText = styled.Text` 
                   color: rgb(101, 33, 33);
				   margin-bottom: 6px;
				   font-size: 22px;
				   font-weight: bold;
				   padding: 8px;
				   text-align: center;
`;

const BottomButtonText = styled.Text` 
                   color: rgb(101, 33, 33);
				   margin-bottom: 6px;
				   font-size: 16px;
				   padding: 8px;
				   text-align: center;
`;

const BottomButton = styled.TouchableOpacity`
 background-color: rgba(255,255,255,0.7);
    padding-horizontal: 18;
    padding-vertical: 12;
    border-radius: 20;
	width: 100;
    padding-horizontal: 8;
    align-items: center;
    justify-content: center;
    margin-horizontal: 5;
`;

const WWrapper = styled.View`

`;

const TripsPlannerView = styled.View`
margin-bottom: 10px;
margin-left: 5px;
width: 90%;
border-bottom-width: 1;
border-color: #eee;
flex-direction: row;
justify-content: space-between;
`;

const TripsPlannerText = styled.Text`
font-size: 22px;
padding-left: 10px;
padding-vertical: 12px;
`;


const LastTripView = styled.View`
margin-bottom: 5px;
flex-direction: row;
`;

const LastTripIcon = styled.View`
flex: 1;
margin-right: 5px;

		   background: #fff;
		   border-radius: 44px;
		   align-items: center;
		   justify-content: center;
`;

const LastTrip = styled.View`
flex: 6;
`;

const TripLocation = styled.Text`
font-size: 13px;
font-weight: bold;
margin-vertical: 2px;
`;

const Address = styled.Text`
font-size: 13px;
`;

const MarkerView = styled.View`

`;

const NetworkProblemView = styled.View`
width: ${Dimensions.get('window').width};
height: ${Dimensions.get('window').height - 220};
align-items: center;
justify-content: center;
`;

const NetworkProblemView2 = styled.View`
align-items: center;
justify-content: center;
background-color: #000;
padding-vertical: 5;
`;

const NetworkProblemText = styled.Text`
font-size: 20;
text-align: center;
color: #fff;
`;

const StatusButtonView = styled.View`
align-items: center;
justify-content: center;
margin-vertical: 10;
`;
const StatusButtonVieww = styled.View`
background-color: #000;
border-radius: 100;
align-items: center;
justify-content: center;
width: 100;
`;

const StatusButtonText = styled.Text`
font-size: 25;
color: #fff;
`;