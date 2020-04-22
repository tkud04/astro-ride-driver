import React from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import MapView,{Marker} from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import TitleHeader from '../components/TitleHeader';
import HR from '../components/HR';
import SvgIcon from '../components/SvgIcon';
import * as Permissions from 'expo-permissions';
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

export default class SetDestinationScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
	this.dt = props.route.params.dt;
	
	
    this.state = { 
                     hasLocationPermissions: false,
                     locationResult: null,
					 address: "",
					 toAddress: "",
                     markerCoords: {latitude: 0,longitude: 0},
					 region: {
                       latitude: LATITUDE,
                       longitude: LONGITUDE,
                       latitudeDelta: LATITUDE_DELTA,
                       longitudeDelta: LONGITUDE_DELTA,
                     },
	                 isLoadingComplete: false,
					 irrelevant: false,
					 hasDestination: false,
					 toAddressBorderColor: "#eee",
					 rideType: "me",
					 rideTypes: [{key: 1,name: "For me", value: "me"},
	                     {key: 3,name: "For someone else", value: "other"}
						 ]
				 };	
				 
	this.navv = null;
    this.map = null;
	
	this._getLocationAsync();
  }
  
    launchDrawer = () => {
	this.navv.toggleDrawer();  
  }
	  
  
  _next = async () => {
	// this.navv.navigate('ConfirmRide'); 
  }

  _getLocationAsync = async () => {
	  const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      this.setState({ hasLocationPermissions: true });   
	  this.setState({ address: this.dt.origin.formattedAddress});
      this.setState({ markerCoords: {
		     latitude: this.dt.origin.latlng.latitude,
		     longitude: this.dt.origin.latlng.longitude
		    }
			});
	  
      // Center the map on the location we just fetched.
      this.setState({
        region: {
          latitude: this.dt.origin.latlng.latitude,
          longitude: this.dt.origin.latlng.longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        },
      });
    }
	else{
		showMessage({
			 message: "Locations permissions not granted",
			 type: 'warning'
		 });
	}
	this.setState({ isLoadingComplete: true});
  }
  
  _handleMapRegionChange = mapRegion => {
   // this.setState({region: mapRegion });
  };

  _setDestination = async (data) => {
   console.log("data: ",data);
   if(this.state.hasLocationPermissions){
	   let dest = data.coordinate;
	   let address = await helpers.searchAddress({address: data});
	  console.log("Address: ",address);
	  
	  if(address.results.length < 1){
		  this.setState({address: "No results found."});
	  }
	  else{
	  
	  //the results object is an array. we are using the first object returned ( of type ROOFTOP)
	  let rooftop = address.results[0],addressComponents = rooftop.address_components;
	  let formattedAddress = addressComponents[0].short_name;
	 
	  for(let i = 1; i < 4; i++){
		  formattedAddress += " " + addressComponents[i].short_name;
	  }
	  
	  console.log("Formatted address: ",formattedAddress);
	  this.setState({
		  address: formattedAddress,
		  markerCoords:{
		      latitude: rooftop.geometry.location.lat,
		      longitude: rooftop.geometry.location.lng
			}
		  });	  
	  }
	  
	  this.setState({hasDestination: true});
   }
   else{
	   showMessage({
			 message: "Locations permissions not granted",
			 type: 'warning'
		 });
   }
   // this.setState({region: mapRegion });
  };
  
  _next = () => {
	  this.dt.destination = {
		      latlng: this.state.markerCoords,
		      formattedAddress: this.state.address
			}
			console.log(this.dt);
			this.navv.navigate('ConfirmRide',{
		       dt: this.dt
	        });
  }
  

  _setDestinationMap = () => {
							this.dt.rideType = this.state.rideType;
										console.log(this.dt);
			this.navv.navigate('SetDestinationMap',{
		       dt: this.dt
	        });
  }

  _setDestinationText = async (hasDestination) => {
			console.log(this.state.toAddress);
			if(hasDestination){
				this.dt.rideType = this.state.rideType;
			 this.dt.destination = {
		      latlng: this.state.markerCoords,
		      formattedAddress: this.state.address
			}
			 console.log("dt here: ",this.dt);
			  this.navv.navigate('ConfirmRide',{
		       dt: this.dt
	          });	
			}
			else{
				this._setDestination(this.state.toAddress);
			}
			
  }
  
  render() {
	 let navv = this.props.navigation;
	  this.navv = navv;
	  if(this.state.region !== null){
			//console.log("current coords: ",this.state.markerCoords);
		  
	  }
    return (
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
	        <Container>	     
            <ScrollView>
				   
					  {this.state.isLoadingComplete ? (
					 <Row style={{flex: 1, marginTop: 60, width: '100%',backgroundColor: 'rgba(0,0,0,0)'}}>
					  {this.state.irrelevant ? (
					  <TitleHeader bc="rgb(101, 33, 33)" tc="rgb(101, 33, 33)" title="Select destination on map"/>	
					  ) : (
					    <>
					   <ProductInputWrapper>
					   <RideTypeWrapper>
                       <RideTypeLogo>
					     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardUserCircle)} w={20} h={20}/>
					   </RideTypeLogo>
					   <RideType
					     selectedValue={this.state.rideType}
						mode="dropdown"
					    onValueChange={(value,index) => {this.setState({rideType: value})}}
					   >
					     <RideType.Item key="5" label="Who is this ride for?" value="none"/>
						{
							this.state.rideTypes.map((element) => {
								return <RideType.Item key={"qtype-" + element.key} label={element.name} value={element.value}/>
								})	
						}
					   </RideType>
					   </RideTypeWrapper>
				    <ProductText style={{borderColor: AppStyles.themeColorTransparent,width: '90%'}}>
					  {this.dt.origin.formattedAddress}
					</ProductText>
					<ProductInput
					style={{borderColor: this.state.toAddressBorderColor,width: '90%'}}
				     placeholder="Where are you going to?"
				     onChangeText={text => {
						this.setState({toAddress: text});
					 }}
					 onFocus={() => {
						 
						this.setState({toAddressBorderColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({toAddressBorderColor: "#eee"});
					 }}
					 onEndEditing={() => {this._setDestinationText(false)}}
					/>
					</ProductInputWrapper>
					
					
					<HR color={AppStyles.themeColorTransparent}/>
					
					 <ProductInputWrapper style={{width: '100%', marginLeft: -5}}>
					 {this.state.hasDestination ? (
					 <>
					<DestinationButton
				         onPress={() => {this._setDestinationText(true)}}
				         title="Submit"
                        >
                     <DestinationItemWrapper>
					   <DestinationLogoo>
					     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardDirections)} w={30} h={30}/>
					   </DestinationLogoo>
					   <DestinationDescription>
					     <DestinationText style={{borderColor: AppStyles.themeColorTransparent,width: '90%'}}>
					       {this.state.address}
					     </DestinationText>
					   </DestinationDescription>
					 </DestinationItemWrapper>		
                      </DestinationButton>	
                      <HR color={AppStyles.themeColorTransparent}/>
                     </>					  
					) : (null)}
					
					
					 <DestinationItemWrapper>
					   <DestinationLogoo>
					     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardClock)} w={30} h={30}/>
					   </DestinationLogoo>
					   <DestinationDescription>
					     <DestinationText style={{borderColor: AppStyles.themeColorTransparent,width: '90%'}}>
					      Previous locations will be shown here
					     </DestinationText>
					   </DestinationDescription>
					 </DestinationItemWrapper>		
                   
                     <HR color={AppStyles.themeColorTransparent}/>
                     
					  <DestinationButton
				         onPress={() => {this._setDestinationMap()}}
				         title="Submit"
                        >
                     <DestinationItemWrapper>
					   <DestinationLogo>
					     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardMapMarkerAlt)} w={20} h={20}/>
					   </DestinationLogo>
					   <DestinationDescription>
					     <DestinationText style={{borderColor: AppStyles.themeColorTransparent,width: '90%'}}>
					       Set location on map
					     </DestinationText>
					   </DestinationDescription>
					 </DestinationItemWrapper>		
                      </DestinationButton>					 
					</ProductInputWrapper>
				
						</>
					  )}
				    
                    </Row>					
				   ) : (
				       <Row style={{flex: 1, marginTop: 10, flexDirection: 'row', width: '100%'}}>
					    <NoteView>
						  <Note>Loading..</Note>
						   <ActivityIndicator size="small" color="#0000ff" />
						</NoteView>					   
				       </Row>
					  )}
				    <Row>
				    <TestView>
					  <TestText></TestText>
					</TestView>
				   </Row>
		     </ScrollView>		
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
				   margin-bottom: 10px;				  
				   background-color: rgba(0,0,0,0);
`;

const DestinationItemWrapper = styled.View` 
                   flex-direction: row;
`;

const RideTypeWrapper = styled.View` 
                   flex-direction: row;
`;

const RideTypeLogo = styled.View`
 align-items: center;
				   justify-content: center;
				 height: 50;
`;

const RideType = styled.Picker`
    width: 80%;
	height: 50;
	color: #000;
	margin-bottom: 20px;
`;

const DestinationLogoo = styled.View`
 align-items: center;
				   justify-content: center;
`;
 
const DestinationLogo = styled.View` 
             	   background: rgb(101, 33, 33);
		   border-radius: 25px;
		   width: 12%;
		   height: 70%;
				   align-items: center;
				   justify-content: center;
`;

const DestinationDescription = styled.View` 
                   width: 80%;
`;

const ProductDescription = styled.Text` 
                   color: #000;
				   margin-top: 12px;
				   margin-bottom: 2px;
				   font-size: 24px;
				  
`;
					 
const ProductInput = styled.TextInput`
					 align-items: center;
					 padding: 10px;
					 margin-top: 5px;
					 margin-bottom: 5px;
					 color: #000;
					 border-width: 1;
                     background-color: #fff;
`;

const ProductText = styled.Text`
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
					 padding: 10px;
					 margin-top: 5px;
					 margin-bottom: 5px;
					 color: #000;
                     background-color: #fff;
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

const DestinationButton = styled.TouchableOpacity`

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
				   padding: 8px;
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


