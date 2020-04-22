import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import SvgIcon from '../components/SvgIcon';
import LoadingView from '../components/LoadingView';
import TitleHeader from '../components/TitleHeader';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {ScrollView, Dimensions, ActivityIndicator, Animated} from 'react-native';
import {ThemeContext,UserContext} from '../MyContexts';
import {showMessage, hideMessage} from 'react-native-flash-message';
import HR from '../components/HR';

import { Notifications } from 'expo';

const { width, height } = Dimensions.get('window');

let dt = {}, navv = null;

  
  const _launchDrawer = () => {
	navv.toggleDrawer();  
  }
  
 
  
 
const AddLocationScreen = (props) =>  { 
   
	navv = props.navigation;
	let fav = props.route.params.fav;
	let loc = props.route.params.loc;
	let favName = "", favAddr = "", favCoords = {};
	switch(fav){
		case "home":
		 favName = "Home";
		break;
		
		case "work":
		 favName = "Work";
		break;
		
		default:
		 favName = "";
	}
	//console.log("loc: ", loc);
	 if(Object.keys(loc).length > 0){
		 favAddr = loc.address;
		 favCoords = helpers.splitLatLng(loc.latlng);
	 }
	 else{
		 
	 }
	
	
	const [nameBorderColor, setNameBorderColor] = useState('#000');
	const [locationBorderColor, setLocationBorderColor] = useState('#000');
	const [name, setName] = useState(favName);
	const [location, setLocation] = useState(null);
	const [address, setAddress] = useState(favAddr);
	const [markerCoords, setMarkerCoords] = useState(favCoords);
	const [hasLocation, setHasLocation] = useState(false);
	const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
	const [isLoadingComplete, setIsLoadingComplete] = useState(false);
	const [fadeAnim] = useState(new Animated.Value(0));
	

   const  _setLocationText = async (u, hasLocation) => {
			if(hasLocation){
			 dt = {
			  user: u,
		      markerCoords: markerCoords,
		      fav: fav,
		      formattedAddress: address
			}
			setIsLoadingComplete(true);
			 console.log("dt here: ",dt);
			  	helpers.addLocation(dt,navv);
			}
			else{
				_setLocation(address);
			}
 }
 
 const _setLocation = async (data) => {
   console.log("data: ",data);
   setIsLoadingComplete(true);
   if(hasLocationPermissions){
	   let dest = data.coordinate;
	   let address = await helpers.searchAddress({address: data});
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
	  setHasLocation(true);
	  setIsLoadingComplete(false);
   }
   else{
	   showMessage({
			 message: "Locations permissions not granted",
			 type: 'warning'
		 });
   }
   // this.setState({region: mapRegion });
  }
  
const _setDestinationMap = () => {
	  console.log("fav: ",fav);
	  let origin = {
		  latlng: markerCoords,
		  formattedAddress: address
	  };
	  
	  console.log("origin: ",origin);
	  navv.navigate('AddLocationMap',{
		  fav: fav,
		  origin: origin
		  });
  }
 
 const  _getLocationAsync = async () => {
	  const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      setHasLocationPermissions(true);
	  /**
	  let loc = await Location.getCurrentPositionAsync({});
	  console.log("Current position: ",loc);
	  let addr = await helpers.getAddress({latitude: loc.coords.latitude, longitude: loc.coords.longitude});
	  console.log("Address: ",addr);
	  
	  if(addr.status === "error"){
		   //this.setState({ tryAgain: true});
	  }
	  else{
		  //the results object is an array. we are using the first object returned ( of type ROOFTOP)
	  let rooftop = addr.results[0],addressComponents = rooftop.address_components;
	  let formattedAddress = addressComponents[0].short_name;
	 
	  for(let i = 1; i < 4; i++){
		  formattedAddress += " " + addressComponents[i].short_name;
	  }
	  
	  console.log("Formatted address: ",formattedAddress);
	  setAddress(formattedAddress);
	  
	  setMarkerCoords({
		     latitude: loc.coords.latitude,
		     longitude: loc.coords.longitude
		    });
	 
	 }
	 **/
    }
	else{
		showMessage({
			 message: "Locations permissions not granted",
			 type: 'warning'
		 });
	}
	
  }
 
	
    useEffect(() => {
		 props.navigation.setParams({launchDrawer: _launchDrawer});
		 
		 _getLocationAsync();
   },[]);
   
   useEffect(() => {
	if(isLoadingComplete){
	Animated.loop(
	Animated.sequence([
	Animated.timing(fadeAnim,{
		toValue: 1,
		duration: 1000
	}),
	Animated.timing(fadeAnim,{
		toValue: 0,
		duration: 1000
	})
	])
	).start();
    }
   },[isLoadingComplete]);
  
	
    return (
	 <UserContext.Consumer> 
   {({user,up,loggedIn}) => (
	        <Container>				
					<Row style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, width: '100%',backgroundColor: 'rgba(0,0,0,0)'}}>
						{isLoadingComplete ? (
						<Animated.View
						  style={{opacity: fadeAnim}}
						 >
						<TitleHeader bc="rgb(101, 33, 33)" tc="rgb(101, 33, 33)" title="Processing.."/>
						</Animated.View>
					   
						) : (
						 <TitleHeader bc="rgb(101, 33, 33)" tc="rgb(101, 33, 33)" title="Add Favorite"/>
						)}
					</Row>
					<Row style={{ marginTop: 5, marginBottom: 10, width: '100%',backgroundColor: 'rgba(0,0,0,0)'}}>
                    <InputWrapper>
					<InputWrapperControl
					style={{borderColor: nameBorderColor,width: '90%'}}
				     placeholder="Name"
					 value={name}
				     onChangeText={text => {
						setName(text);
					 }}
					 onFocus={() => {
						 setNameBorderColor("#00a2e8");
					 }}
					 onBlur={() => {
						setNameBorderColor("#eee");						
					 }}
					/>
					<InputWrapperControl
					style={{borderColor: locationBorderColor,width: '90%'}}
				     placeholder="Address"
					 value={address}
				     onChangeText={text => {
						setAddress(text);
					 }}
					 onFocus={() => {
						 setLocationBorderColor("#00a2e8");
					 }}
					 onBlur={() => {
						setLocationBorderColor("#eee");						
					 }}
					 onEndEditing={() => {_setLocationText(user,false)}}
					/>
					</InputWrapper>		 
					</Row>
					
					 {hasLocation ? (
					 <Row style={{ marginTop: 5, marginBottom: 10, width: '100%', justifyContent: 'center',backgroundColor: 'rgba(0,0,0,0)'}}>
					 <>
					<AddOnMapButton
				         onPress={() => {_setLocationText(user,true)}}
				         title="Submit"
                        >
                     <AddOnMapWrapper>
					   <DestinationLogoo>
					     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardDirections)} w={30} h={30}/>
					   </DestinationLogoo>
					   <AddOnMapDescription>
					     <DestinationText style={{borderColor: AppStyles.themeColorTransparent,width: '90%'}}>
					       {address}
					     </DestinationText>
					   </AddOnMapDescription>
					 </AddOnMapWrapper>		
                      </AddOnMapButton>	
                     </>
                     </Row>					 
					) : (null)}
					
					
					<HR color={AppStyles.themeColorTransparent}/>
				
				     <Row style={{flex: 1, marginTop: 5, width: '100%',backgroundColor: 'rgba(0,0,0,0)'}}>
					  <AddOnMapButton
				         onPress={() => {_setDestinationMap()}}
				         title="Submit"
                        >
                     <AddOnMapWrapper>
					   <AddOnMapLogo>
					     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardMapMarkerAlt)} w={20} h={20}/>
					   </AddOnMapLogo>
					   <AddOnMapDescription>
					     <DestinationText style={{borderColor: AppStyles.themeColorTransparent,width: '90%'}}>
					       Set location on map
					     </DestinationText>
					   </AddOnMapDescription>
					 </AddOnMapWrapper>		
                      </AddOnMapButton>	
					 
                    </Row>						
				 
			</Container>
		 )}
   </UserContext.Consumer>
    );  

}

export default AddLocationScreen;
  
  
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

const DestinationLogoo = styled.View`
 align-items: center;
				   justify-content: center;
`;

const InputWrapper = styled.View` 
                   margin-left: 10px;
				   margin-bottom: 10px;				  
				   background-color: rgba(0,0,0,0);
				   width: 100%;
`;

const ButtonWrapper = styled.View` 
				   margin-bottom: 10px;				  
				   background-color: rgba(0,0,0,0);
				   width: 100%;
				   justify-content: center;
`;

const AddOnMapWrapper = styled.View` 
                   flex-direction: row;
`;

 
const AddOnMapLogo = styled.View` 
             	   background: rgb(101, 33, 33);
		   border-radius: 25px;
		   width: 12%;
		   height: 70%;
				   align-items: center;
				   justify-content: center;
`;

const AddOnMapDescription = styled.View` 
                   width: 80%;
				   
`;

const InputWrapperControl = styled.TextInput`
					 align-items: center;
					 padding: 10px;
					 margin-top: 5px;
					 margin-bottom: 5px;
					 color: #000;
					 border-width: 1;
                     background-color: #fff;
`;

const InputWrapperText = styled.Text`
                     align-items: center;
					 padding: 10px;
					 margin-top: 5px;
					 margin-bottom: 5px;
					 color: #000;
					 border-width: 1;
                     background-color: #fff;
`;

const DestinationText = styled.Text`
                     align-items: center;
                     justify-content: center;
					 margin-left: 5px;
					 margin-top: 5px;
					 color: #000;
                     background-color: #fff;
`;

const AddOnMapButton = styled.TouchableOpacity`

`;

const SubmitButton = styled.TouchableOpacity`

`;