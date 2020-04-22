import React,{useState, useEffect, useCallback, useRef} from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import MapView,{Marker, Polyline, Circle} from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import SvgIcon from '../components/SvgIcon';
import LoadingView from '../components/LoadingView';
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

let dt = null, navv = null, map = null, viewShot = null;
let AnimatedPolyLine = Animated.createAnimatedComponent(Polyline);




 const _next = async (arr) => {
	 //user,pm,n/
	 let u = arr[0], pm = arr[1], n = arr[2], snc = arr[3]; 
	// this.navv.navigate('ConfirmRide');  
	let validationErrors = (pm === "none");
	
	if(validationErrors){
		if(pm === "none"){
			 showMessage({
			 message: "Please select your payment method",
			 type: 'danger'
		 });
		}
	}
	else{
		console.log("dt: ",dt);
		dt.paymentMethod = pm;
		dt.u = u;
		
	//show LoadingView
		
	//_takeSnapshot();
	helpers.confirmRide(dt,n,snc);
	}

  }

 

  _handleMapRegionChange = mapRegion => {
   // this.setState({region: mapRegion });
  };

  
  const _focusMap = () => {
	  if(map !== null){
		  map.fitToSuppliedMarkers(['origin','destination'],{ edgePadding:{top: 50,right: 50, bottom: 50,left: 50}});
		 
	  } 
  }
  
  
  const _launchDrawer = () => {
	navv.toggleDrawer();  
  }
  
  
  const _takeSnapshot = () => {
	if(map.current !== null && viewShot.current !== null){
		  /**
		  const snapshot = this.map.takeSnapshot({
			  result: 'base64'
		  });
		  **/
		  const snapshot = viewShot.current.capture();
		  snapshot.then((uri) => {dt.snapshot = uri});
		 
	  }   
  }
  

const ConfirmRideScreen = (props) =>  { 
   
	dt = props.route.params.dt;
	navv = props.navigation;
	viewShot = useRef();
	let fadeInterval = useRef();
	
	
	const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
	const [locationResult, setLocationResult] = useState(null);
	const [fromAddress, setFromAddress] = useState("");
	const [fromMarkerCoords, setFromMarkerCoords] = useState({latitude: 0,longitude: 0});
	const [toAddress, setToAddress] = useState("");
	const [toMarkerCoords, setToMarkerCoords] = useState({latitude: 0,longitude: 0});
	const [region, setRegion] = useState({latitude: LATITUDE, longitude: LONGITUDE, latitudeDelta: LATITUDE_DELTA,longitudeDelta: LONGITUDE_DELTA});
	const [isLoadingComplete, setIsLoadingComplete] = useState(false);
	const [focusMapLoading, setFocusMapLoading] = useState(true);
	const [points, setPoints] = useState([]);
	const [polylineOpacity, setPolylineOpacity] = useState(0.5);
	const [paymentMethod, setPaymentMethod] = useState("cash");
	const [paymentMethods, setPaymentMethods] = useState([{key: 1,name: "Cash", value: "cash"}]);
	const [cameraRollUri, setCameraRollUri] = useState(null);
	const [isMapReady, setIsMapReady] = useState(false);
	const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
	const [notConfirmed, setNotConfirmed] = useState(true);
	
 
	
	const _updatePaymentMethod = useCallback((value, index) => {
	   navv.toggleDrawer();  
       },[]);
    
	
    useEffect(() => {
		
		  const _getDirections = async () => {
	  //console.log("dt: ",dt);
	 let ret = {
		 from:{
			 latitude: dt.origin.latlng.latitude,
			 longitude: dt.origin.latlng.longitude,
		 },
		 to:{
			 latitude: dt.destination.latlng.latitude,
			 longitude: dt.destination.latlng.longitude,
		 }
	 }
	 
	 let directions = await helpers.getDirections(ret);
	 //console.log("directions: ",directions);
	 
	 if(directions.routes.length > 0){
		 let overlayPoints = directions.routes[0].overview_polyline.points;
		 let ppoints = await helpers.decodeDirectionPoints(overlayPoints);
		 let rr = [];

		 for(let i = 0; i < ppoints.length;i++){
			 let p = ppoints[i];
			 rr.push({latitude: p[0],longitude: p[1]});
		 }
		  //console.log("Points: ",rr);
		  setPoints(rr);
	 }
   // this.setState({region: mapRegion });
   setIsLoadingComplete(true);
  };
		
		
      		console.log("effect running");
			 props.navigation.setParams({launchDrawer: _launchDrawer});

	  setFromAddress(dt.origin.formattedAddress);	  
      setToAddress(dt.destination.formattedAddress);	  
	  
	 
	  setFromMarkerCoords({
		     latitude: dt.origin.latlng.latitude,
		     longitude: dt.origin.latlng.longitude
		    });
			
	  setToMarkerCoords({
		     latitude: dt.destination.latlng.latitude,
		     longitude: dt.destination.latlng.longitude
		    });
	  
	  setRegion({
          latitude: dt.origin.latlng.latitude,
          longitude: dt.origin.latlng.longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        });
	  
	  _getDirections();
	
   },[isLoadingComplete ]);
  
	
    return (
	 <UserContext.Consumer> 
   {({user,up,loggedIn}) => (
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
	        <Container>	     

				   
					  {notConfirmed ? (
					  <>
					   <Row style={{flex: 1, marginTop: 10, width: '100%'}}>
					  {isLoadingComplete ? (
					   <Row style={{flex: 1, marginTop: 10, width: '100%'}}>
					 <ViewShot ref={ref => {viewShot = ref}} options={{ format: "png", quality: 0.9, result: "base64" }}>	
				     <MapView 
					   ref={ref => {
                         map = ref;
						 _focusMap();
						
                       }}
                       mapType="standard"
					   style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - 200}}
					   region={region}
                       onMapReady={() => {setIsMapReady(true); _focusMap()}}
   				     >
					  
				       <Marker
					      coordinate={toMarkerCoords}
						  title="Destination"
                          description={toAddress}
						  draggable={true}
						  identifier="destination"
					   />
					   <Marker
					      coordinate={fromMarkerCoords}
						  title="Origin"
                          description={fromAddress}
						  draggable={true}
						  identifier="origin"
					   />
					   <AnimatedPolyLine
		                 coordinates={points}
		                 strokeColor={`rgba(0,0,0,${polylineOpacity})`} // fallback for when `strokeColors` is not supported by the map-provider	
		                 strokeWidth={3}
	                   />
					   <Circle
					    center={dt.origin.latlng}
						radius={600}
					   >
					   </Circle>
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
					     selectedValue={paymentMethod}
						mode="dropdown"
						onValueChange={(value,index) => {setPaymentMethod(value)}}
					   >
					     <PaymentMethod.Item key="5" label="Choose preferred payment method" value="none"/>
						{
							paymentMethods.map((element) => {
								return <PaymentMethod.Item key={"ptype-" + element.key} label={element.name} value={element.value}/>
								})	
						}
					   </PaymentMethod>
					   </PaymentMethodWrapper>
						</StatsView>
						<SubmitButton
				         onPress={() => {_next([user,paymentMethod,navv,setNotConfirmed]); setNotConfirmed(false);}}
				         title="Submit"
                        >
                        <CButton title="CONFIRM RIDE" background="rgb(101, 33, 33)" color="#fff" />					   
				    </SubmitButton>	
					</WWrapper>
				     
                    </Row>						
				   ) : (
				       <Row style={{flex: 1, marginTop: 10,  alignContent: 'center', justifyContent: 'center', width: '100%'}}>
					  <LoadingView loadingText="Please wait.."/>
					 </Row>
					  )}
					  </Row>
				    <Row>
				    <TestView>
					 {cameraRollUri &&
                      <Image
                        source={{ uri: cameraRollUri }}
                        style={{ width: 300, height: 200 }}
                        resizeMode="contain"
                      />}
					</TestView>
				   </Row>
				   </>
					  ) : (	
					 <Row style={{flex: 1, marginTop: 10,  alignContent: 'center', justifyContent: 'center', width: '100%'}}>
					  <LoadingView loadingText="Finding drivers nearby"/>
					 </Row>
					  )}
			</Container>
			</BackgroundImage>
		 )}
   </UserContext.Consumer>
    );  

}

export default ConfirmRideScreen;
  
  
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

const LoadingText = styled.Text`
   font-size: 15px;
   font-weight: bold;
   color: #fff;
`;

