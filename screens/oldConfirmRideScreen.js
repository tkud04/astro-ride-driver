import React,{useState, UseEffect, useRef} from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import MapView,{Marker, Polyline} from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import SvgIcon from '../components/SvgIcon';
import TitleHeader from '../components/TitleHeader';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {ScrollView, Dimensions, ActivityIndicator, Animated} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import ViewShot from "react-native-view-shot";
import {ThemeContext,UserContext} from '../MyContexts';
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


let AnimatedPolyLine = Animated.createAnimatedComponent(Polyline);

export default class ConfirmRideScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
	this.dt = props.route.params.dt;
	helpers._getPermissionAsync('camera roll');
	
    this.state = { 
                     hasLocationPermissions: false,
                     locationResult: null,
					 fromAddress: "",
                     fromMarkerCoords: {latitude: 0,longitude: 0},
					 toAddress: "",
                     toMarkerCoords: {latitude: 0,longitude: 0},
					 region: {
                       latitude: LATITUDE,
                       longitude: LONGITUDE,
                       latitudeDelta: LATITUDE_DELTA,
                       longitudeDelta: LONGITUDE_DELTA,
                     },
	                 isLoadingComplete: false,
	                 focusMapLoading: true,
					 points:[],
					 polylineOpacity: 0.5,
					 paymentMethod: "cash",
					 paymentMethods: [{key: 1,name: "Cash", value: "cash"}
						 ],
					cameraRollUri: null,
					isMapReady: false
				 };	
				 
	this.navv = null;
    this.map = null;
	this.viewShot = useRef();
	
	this._init();
	this._getDirections();
	
	
  }
  
    launchDrawer = () => {
	this.navv.toggleDrawer();  
  }
	  
  
  _next = async (user) => {
	// this.navv.navigate('ConfirmRide');  
	let validationErrors = (this.state.paymentMethod === "none");
	
	if(validationErrors){
		if(this.state.paymentMethod === "none"){
			 showMessage({
			 message: "Please select your preferred method",
			 type: 'danger'
		 });
		}
	}
	else{
		this.dt.paymentMethod = this.state.paymentMethod;
		this.dt.u = user;
		
	this._takeSnapshot();
	helpers.confirmRide(this.dt);
	}

  }

  _init = async () => {
	  const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      this.setState({ hasLocationPermissions: true });   
	  this.setState({ fromAddress: this.dt.origin.formattedAddress, toAddress: this.dt.destination.formattedAddress});
      this.setState({ fromMarkerCoords: {
		     latitude: this.dt.origin.latlng.latitude,
		     longitude: this.dt.origin.latlng.longitude
		    },
			toMarkerCoords: {
		     latitude: this.dt.destination.latlng.latitude,
		     longitude: this.dt.destination.latlng.longitude
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
  
  _getDirections = async () => {
	  //console.log("this.dt: ",this.dt);
	 let ret = {
		 from:{
			 latitude: this.dt.origin.latlng.latitude,
			 longitude: this.dt.origin.latlng.longitude,
		 },
		 to:{
			 latitude: this.dt.destination.latlng.latitude,
			 longitude: this.dt.destination.latlng.longitude,
		 }
	 }
	 
	 let directions = await helpers.getDirections(ret);
	 //console.log("directions: ",directions);
	 
	 if(directions.routes.length > 0){
		 let overlayPoints = directions.routes[0].overview_polyline.points;
		 let points = await helpers.decodeDirectionPoints(overlayPoints);
		 let rr = [];

		 for(let i = 0; i < points.length;i++){
			 let p = points[i];
			 rr.push({latitude: p[0],longitude: p[1]});
		 }
		  //console.log("Points: ",rr);
		  this.setState({points: rr});
	 }
   // this.setState({region: mapRegion });
  };

  _handleMapRegionChange = mapRegion => {
   // this.setState({region: mapRegion });
  };

  
  _focusMap = () => {
	  if(this.map !== null){
		  this.map.fitToSuppliedMarkers(['origin','destination'],{ edgePadding:{top: 50,right: 50, bottom: 50,left: 50}});
		 
	  } 
  }
  
  _saveToCameraRollAsync = async () => {
    try {
      let result = await captureRef(this.map, {
        format: 'png',
      });

      let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
      console.log(saveResult);
      this.setState({ cameraRollUri: saveResult });
    }
    catch(snapshotError) {
      console.error(snapshotError);
    }
  }
  
  _takeSnapshot = () => {
	if(this.map !== null){
		  /**
		  const snapshot = this.map.takeSnapshot({
			  result: 'base64'
		  });
		  **/
		  const snapshot = this.viewShot.capture();
		  snapshot.then((uri) => {this.dt.snapshot = uri});
		 
	  }   
  }
  
  
  render() {
	 let navv = this.props.navigation;
	  this.navv = navv;
	  if(this.state.region !== null){
			//console.log("current coords: ",this.state.markerCoords);
		  
	  }
    return (
	 <UserContext.Consumer>
   {({user,up,loggedIn}) => (
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
	        <Container>	     

				   
					  {this.state.isLoadingComplete ? (
					 <Row style={{flex: 1, marginTop: 10, width: '100%'}}>
					 <ViewShot ref={ref => {this.viewShot = ref}} options={{ format: "png", quality: 0.9, result: "base64" }}>	
				     <MapView 
					   ref={ref => {
                         this.map = ref;
						 this._focusMap();
						
                       }}
                       mapType="standard"
					   style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - 200}}
					   region={this.state.region}
                       onRegionChange={region => this._handleMapRegionChange(region)}
					   //onPress={e => this._setDestination(e.nativeEvent)}
					    onMapReady={() => {this.setState({isMapReady: true}); this._focusMap()}}
   				     >
				       <Marker
					      coordinate={this.state.toMarkerCoords}
						  title="Destination"
                          description={this.state.toAddress}
						  draggable={true}
						  identifier="destination"
					   />
					   <Marker
					      coordinate={this.state.fromMarkerCoords}
						  title="Origin"
                          description={this.state.fromAddress}
						  draggable={true}
						  identifier="origin"
					   />
					   <AnimatedPolyLine
		                 coordinates={this.state.points}
		                 strokeColor={`rgba(0,0,0,${this.state.polylineOpacity})`} // fallback for when `strokeColors` is not supported by the map-provider	
		                 strokeWidth={3}
	                   />
					 </MapView>	
					 </ViewShot>
                    <WWrapper>
					<StatsView style={{backgroundColor: 'rgb(101, 33, 33)',padding: 10, marginBottom: 9, marginLeft: 0}}>
						  <RideView>
						  <LogoView>
						     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.logoCarWhite)} w={30} h={20}/>
						  </LogoView>
                            <RideType>
							  <AstroTextView>
							     <AstroText style={{color: '#fff'}}>Astro Ride</AstroText>
							     <PassengersView>
								    <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardUsersWhite)} w={30} h={15}/>
									<PassengersText style={{color: '#fff', marginLeft: 0}}>4</PassengersText>
								 </PassengersView>
							  </AstroTextView>
							</RideType>	
                            <PriceView>
							  <PriceText style={{color: '#fff'}}>N2050 to N2650</PriceText>
							</PriceView>							
						  </RideView>
						 </StatsView>
						 <StatsView>
						 <PaymentMethodWrapper>
                       <PaymentMethodLogo>
					     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardMoney)} w={20} h={20}/>
					   </PaymentMethodLogo>
						  <PaymentMethod
					     selectedValue={this.state.paymentMethod}
						mode="dropdown"
					    onValueChange={(value,index) => {this.setState({paymentMethod: value})}}
					   >
					     <PaymentMethod.Item key="5" label="Choose preferred payment method" value="none"/>
						{
							this.state.paymentMethods.map((element) => {
								return <PaymentMethod.Item key={"ptype-" + element.key} label={element.name} value={element.value}/>
								})	
						}
					   </PaymentMethod>
					   </PaymentMethodWrapper>
						</StatsView>
						<SubmitButton
				         onPress={() => {this._next(user)}}
				         title="Submit"
                        >
                        <CButton title="CONFIRM RIDE" background="rgb(101, 33, 33)" color="#fff" />					   
				    </SubmitButton>	
					</WWrapper>
				     
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
					 {this.state.cameraRollUri &&
                      <Image
                        source={{ uri: this.state.cameraRollUri }}
                        style={{ width: 300, height: 200 }}
                        resizeMode="contain"
                      />}
					</TestView>
				   </Row>
				  		
			</Container>
			</BackgroundImage>
		 )}
   </UserContext.Consumer>
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


const WWrapper = styled.View`

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
           width: 44px;
		   height: 44px;
		   background: black;
		   border-radius: 22px;
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
const StatsView = styled.View`
   margin: 5px;
   width: 100%;
   align-items: stretch;
`;

const RideView = styled.View`
    justify-content: space-between;
	flex-direction: row;
	width: 70%;
`;

const PaymentTypeView = styled.View`
   align-items: stretch;
`;

const AstroTextView = styled.View`
  flex-direction: row;
`;

const AstroText = styled.Text` 
                   color: rgb(101, 33, 33);
				   margin-bottom: 4px;
				   font-size: 20px;
				   padding: 8px;
				   font-weight: bold;
`;

const PassengersView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PassengersText = styled.Text` 
                   color: rgb(101, 33, 33);
				   margin-bottom: 4px;
				   margin-left: 5px;
				   
				   font-weight: bold;
`;

const RideType = styled.View`
    align-items: center;
	flex-direction: row;
`;

const PriceView = styled.View`
   align-items: center;
   justify-content: center;
   margin-left: 20;
`;

const PriceText = styled.Text`
   font-size: 12px;
   font-weight: bold;
   color: rgb(101, 33, 33);
`;

const LogoView = styled.View`
   align-items: center;
   justify-content: center;
   margin-left: 10;
`;

const PaymentMethodWrapper = styled.View` 
                   flex-direction: row;
`;

const PaymentMethodLogo = styled.View`
 align-items: center;
				   justify-content: center;
				 height: 20;
`;

const PaymentMethod = styled.Picker`
    width: 50%;
	height: 20;
	color: #000;
	margin-bottom: 20px;
`;

