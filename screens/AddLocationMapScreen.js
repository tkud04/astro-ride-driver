import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import MapView,{Marker} from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import TitleHeader from '../components/TitleHeader';
import SvgIcon from '../components/SvgIcon';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {ThemeContext,UserContext} from '../MyContexts';
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


let dt = {}, navv = null, map = null;
let fav = "", origin = {};

  
  const _launchDrawer = () => {
	navv.toggleDrawer();  
  }
  
 
  
 
const AddLocationMapScreen = (props) =>  { 
   
	navv = props.navigation;
	//console.log("params: ",props.route.params);
	fav = props.route.params.fav;
	origin = props.route.params.origin;
	//console.log("origin: ",origin);
	
	let r = {
                       latitude: LATITUDE,
                       longitude: LONGITUDE,
                       latitudeDelta: LATITUDE_DELTA,
                       longitudeDelta: LONGITUDE_DELTA,
                     };
	
	const [region, setRegion] = useState(r);
	const [location, setLocation] = useState(null);
	const [address, setAddress] = useState("");
	const [buttonText, setButtonText] = useState("Select location on map");
	const [markerCoords, setMarkerCoords] = useState({});
	const [hasLocation, setHasLocation] = useState(false);
	const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
	const [isLoadingComplete, setIsLoadingComplete] = useState(false);
	
 
   const  _setLocationText = async (hasLocation) => {
			if(hasLocation){
			 dt.location = {
		      latlng: markerCoords,
		      formattedAddress: address
			}
			dt.name = name;
			// console.log("dt here: ",dt);
			  	
			}
			else{
				_setLocation(address);
			}
 }
 
const _getLocationAsync = async () => {
	  const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
	   setHasLocationPermissions(true);
	    let loc = await Location.getCurrentPositionAsync({});
	  console.log("Current position: ",loc); 
	  //let addr = await helpers.getAddress({latitude: loc.coords.latitude, longitude: loc.coords.longitude});
	   setMarkerCoords({
		      latitude: loc.coords.latitude,
		      longitude: loc.coords.longitude
			});	
			console.log("marker coords: ",markerCoords);
	   setRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        });
		 //setAddress("No results found.");
		setIsLoadingComplete(true);
    }
	else{
		showMessage({
			 message: "Locations permissions not granted",
			 type: 'warning'
		 });
	}
  }
  
    const _focusMap = () => {
	  if(map !== null){
		  map.fitToSuppliedMarkers(['origin','destination'],{ edgePadding:{top: 50,right: 50, bottom: 50,left: 50}});
		 
	  } 
  }
  
 

 
 const _setLocation = async (data) => {
   console.log("data: ",data);
   if(hasLocationPermissions){
	   let dest = data.coordinate;
	   let address = await helpers.getAddress({latitude: dest.latitude, longitude: dest.longitude});
	  console.log("Address: ",address);
	  
	  if(address.results.length < 1){
		  setAddress("No results found.");
	  }
	  else{
	  
	  //the results object is an array. we are using the first object returned ( of type ROOFTOP)
	  let rooftop = address.results[0],addressComponents = rooftop.address_components;
	  let formattedAddress = addressComponents[0].short_name;
	 
	  for(let i = 1; i < 4; i++){
		  formattedAddress += " " + addressComponents[i].short_name;
	  }
	  
	  console.log("Formatted address: ",formattedAddress);
	  setAddress(formattedAddress);
	  setMarkerCoords({
		      latitude: rooftop.geometry.location.lat,
		      longitude: rooftop.geometry.location.lng
			});	  	  
	  }
	  setButtonText("Next");
	   // Center the map on the location we just fetched.
	  setRegion({
          latitude: markerCoords.latitude,
          longitude: markerCoords.longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        });
	  setHasLocation(true);
   }
   else{
	   showMessage({
			 message: "Locations permissions not granted",
			 type: 'warning'
		 });
   }
   // this.setState({region: mapRegion });
  }
  
 const _handleMapRegionChange = mapRegion => {
   // this.setState({region: mapRegion });
  };
 
	
    useEffect(() => {
		 props.navigation.setParams({launchDrawer: _launchDrawer});
		 
		 _getLocationAsync();
   },[]);
   
   const _next = async (u) => {
	 let xret = {
		 user: u,
		 fav: fav,
		 address: address,
		 markerCoords: markerCoords
	 };
    console.log("xret: ", xret);
	helpers.addLocation(xret,navv);
	//navv.navigate('AddLocation',{fav: fav});
  }
  
  
	
    return (
	 <UserContext.Consumer> 
   {({user,up,loggedIn}) => (
	        <Container>	     

				   
					  {isLoadingComplete ? (
					 <>
					 <Row style={{flex: 1, marginTop: 10, width: '100%'}}>
					  
				     <MapView 
					   ref={ref => {
                         map = ref;
						 _focusMap();
						
                       }}
                       mapType="standard"
					   style={{marginBottom: 10,width: Dimensions.get('window').width, height: Dimensions.get('window').height - 250}}
					   region={region}
                       onRegionChange={region => _handleMapRegionChange(region)}
					   onPress={e => _setLocation(e.nativeEvent)}
   				     >
				       <Marker
					      coordinate={markerCoords}
						  title="Favorite"
                          description={address}
						  draggable={true}
					   />
					 </MapView>			     
                    </Row>
                    <Row style={{marginTop: 20, flexDirection: 'row', width: '100%'}}>
                         {hasLocation ? (
						 <ButtonView>
						   <SubmitButton
				             onPress={() => {_next(user)}}
				             title="Submit"
                           >
                           <CButton title={buttonText} background="rgb(101, 33, 33)" color="#fff" />					   
				           </SubmitButton>	
						  </ButtonView>
					       
					     ) : (
					      <TitleHeader bc="rgb(101, 33, 33)" tc="rgb(101, 33, 33)" title="Select location on map"/>	
					    )}
				       </Row>	
                       </>					   
				   ) : (
				       <Row style={{flex: 1, marginTop: 10, flexDirection: 'row', width: '100%'}}>
					    <NoteView>
						  <Note>Loading..</Note>
						   <ActivityIndicator size="small" color="#0000ff" />
						</NoteView>					   
				       </Row>
					  )}
				  		
			</Container>
		 )}
   </UserContext.Consumer>
    );  

}

export default AddLocationMapScreen;
  
  
 const Container = styled.View`
					 background-color: #fff;
					flex: 1;
					justify-content: flex-end;
`;

const Row = styled.View`
   margin: 5px;
   width: 100%;
   flex-direction: row;
`;

const NoteView = styled.View`

`;

const ButtonView = styled.View`
width: 100%;
`;

const Note = styled.Text` 
                   color: rgb(101, 33, 33);
				   margin-bottom: 6px;
				   font-size: 16px;
				   padding: 8px;
`;

const SubmitButton = styled.TouchableOpacity`

`;