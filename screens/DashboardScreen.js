import React from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import MapView,{Marker} from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import TitleHeader from '../components/TitleHeader';
import HeaderMenuButton from '../components/HeaderMenuButton';
import * as Permissions from 'expo-permissions';
import {ThemeContext,UserContext} from '../MyContexts';
import * as Location from 'expo-location';
import {ScrollView, Dimensions, ActivityIndicator} from 'react-native';
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
					 tryAgain: false
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
  
  _handleMapRegionChange = mapRegion => {
   // this.setState({region: mapRegion });
  };
  
  
  render() {
	 let navv = this.props.navigation;
	  this.navv = navv;
	  if(this.state.region !== null){
			//console.log("current coords: ",this.state.markerCoords);
		  
	  }
    return (
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
	        <Container>	     

				   
					  {this.state.isLoadingComplete ? (
					 <Row style={{flex: 1, marginTop: 10, width: '100%'}}>
					 
				     <MapView 
					   ref={ref => {
                         this.map = ref;
                       }}
                       mapType="standard"
					   style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - 220}}
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
					  <HeaderMenuButton xml={AppStyles.svg.cardLocation} w={40} h={30} ss={{ alignItems: 'center', justifyContent: 'center'}}/>
					  </MarkerView>
					   </Marker>
					 </MapView>	
					 <WWrapper>
                    <UserContext.Consumer>
					  {({user,up}) => (
					   <WelcomeView>
						  <WelcomeText>{this._getGreeting(user.fname)}</WelcomeText>
					  </WelcomeView>
					  )}
					   </UserContext.Consumer>	
					  <SubmitButton
				       onPress={() => {this._next()}}
				       title="Submit"
                    >
                      <WhereToView>
					    <WhereTo>Where to?</WhereTo>
					  </WhereToView>		   
				    </SubmitButton>	
					 <SubmitButton
                    >
				     <LastTripView>
					   <LastTripIcon>
					      <HeaderMenuButton xml={AppStyles.svg.cardMapMarker2} w={20} h={20} ss={{marginLeft: 4, alignItems: 'center', justifyContent: 'center'}}/>
					   </LastTripIcon>
					   <LastTrip>
					     <TripLocation>No previous trips</TripLocation>
					     <Address>Last trip address will be shown here</Address>
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
						  <Note>Loading..</Note>
						  <ActivityIndicator size="small" color="#0000ff" />
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
border-bottom-width: 1;
border-color: #eee;
margin-bottom: 10;
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

const WhereToView = styled.View`
background-color: #dedede;
margin-bottom: 10px;
margin-left: 5px;
width: 90%;
`;

const WhereTo = styled.Text`
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

		   background: #adacac;
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