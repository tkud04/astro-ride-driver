import React from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppHomeHeader from '../components/AppHomeHeader';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import * as FileSystem from 'expo-file-system';
import TitleHeader from '../components/TitleHeader';
import HR from '../components/HR';
import SvgIcon from '../components/SvgIcon';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import {ScrollView, Dimensions, ActivityIndicator, Animated} from 'react-native';
import * as RootNavigation from '../RootNavigation.js';
import {ThemeContext,UserContext} from '../MyContexts';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';


export default class ProfileScreen extends React.Component { 
   constructor(props) {
    super(props);
	helpers._getPermissionAsync('camera roll');
	this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
	this.u = props.route.params.u;
	
	
    this.state = { 
                    fnameBorderBottomColor: '#000',
                    emailBorderBottomColor: '#000',
                    lnameBorderBottomColor: '#000',
                    phoneBorderBottomColor: '#000',
                    passwordBorderBottomColor: '#000',
                    confirmPasswordBorderBottomColor: '#000',
					fname: "",
					lname: "",
					email: "",
					phone: "",
					password: "",
					confirmPassword: "",
					img: null,
					homeButtonText: "Add home",
					locations: [],
					homeLocation: {},
					workLocation: {},
					workButtonText: "Add work",
					hasSavedLocations: false,
					isLoading: false,
					savedLocations: [],
					fadeAnim: new Animated.Value(0)		
				 };	
				 
	this.navv = null;

  }
  
    launchDrawer = () => {
	this.navv.toggleDrawer();  
  }

  static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	  headerTitle: () => <AppHomeHeader xml={AppStyles.svg.chartBar} navv = {navigation} title="AstroRide" subtitle="Dashboard"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
       },
	   headerLeft: null,
	   }
   
    };
	  
	  
	    updateState = (dt) => {
			// console.log("user: ",dt);
			  this.state.fname = dt.fname;
			  this.state.lname = dt.lname;
			  this.state.email = dt.email;
			  this.state.phone = dt.phone;
  }
  
  getLocationss = (u) => {
        this.setState({isLoading: true});
		  helpers.getLocations(u).then(res => {
		   //console.log('Test', JSON.stringify(res));
		   //console.log("res in 3rd then(): ",res);
		   //return res;
		   console.log("get location returned: ", res);
		   if(res.length > 0){
			  //this.state.locations = res;
              
              //check if Home and Work locations are present, if not use default values
              for(let x = 0; x < res.length; x++){				 
				  if(res[x].fav === "home" || res[x].fav === "work"){
					  if(res[x].fav == "home"){
						  console.log("home: ",res[x]);
						 this.setState({homeButtonText: res[x].address});
						 this.setState({homeLocation: res[x]});
					  }
					  if(res[x].fav == "work"){
						  console.log("work: ",res[x]);
						 this.setState({workButtonText: res[x].address});
						 this.setState({workLocation: res[x]});
					  }
				  }
				  else{
					  this.state.locations.push(res[x]);
				  }
			  }			  
		   }
		   else{
			   /**
			    showMessage({
			     message: `An error occured: ${res.message}`,
			     type: 'danger'
		        });
			  **/
		   }
	   }).catch(error => {
		   console.log(`Unknown error: ${error}`);			
	   }); 
		  this.state.hasSavedLocations = true;
		  this.setState({isLoading: false});
  }
  
    addImage = async () => {
	  let ret = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  aspect: [4,4],
		  quality: 1
	  });
	  
	  console.log(ret);
	  
	  if(!ret.cancelled){
		  let fileContents = await FileSystem.readAsStringAsync(ret.uri, {encoding: FileSystem.EncodingType.Base64});
		  //console.log("fileContents: ",fileContents);
		  this.setState({img: fileContents});
		  
		  showMessage({
			 message: "Image uploaded!",
			 type: 'success'
		 });
	  }
	  
	  //save img here
  }
  
  
 	 _update = () => {
	  //form validation
	  
	  if(this.state.password.length > 0){
		  if(this.state.password.length < 6 || this.state.password != this.state.confirmPassword){
			   if(this.state.password.length < 6){
		 showMessage({
			 message: "Password must be at least 6 characters",
			 type: 'danger'
		 });
	 }if(this.state.password != this.state.confirmPassword){
		 showMessage({
			 message: "Passwords must match",
			 type: 'danger'
		 });
	 }
		  }
	  }
	  
	  else{
		 
  let validationErrors = (this.state.name.length < 2 || this.state.phone.length < 6 || this.state.email.length < 6);
	  if(validationErrors){

	 if(this.state.name.length < 2){
		 showMessage({
			 message: "Name must be at least 2 characters",
			 type: 'danger'
		 });
	 }
	 if(this.state.email.length < 6){
		 showMessage({
			 message: "Email address must be at least 6 characters",
			 type: 'danger'
		 });
	 }if(this.state.phone.length < 6){
		 showMessage({
			 message: "Phone number must be at least 6 characters",
			 type: 'danger'
		 });
	 }
	 
	}
	
	else{
	  const dt = {
		  img: this.state.img,
				   fname: this.state.fname,
				   lname: this.state.lname,
				   email: this.state.email,
				   phone: this.state.phone,
				   password: this.state.password
	 };  
	 
	 console.log(dt);
     //helpers.updateCustomer(dt,this.navv);	
	}
	
	  }
	 
  }
  
  _addSavedPlace = (fav) => {
	  let loc = {};
	  if(!fav){
		  fav = "random";
	  }
	  
	  switch(fav){
		  case "home":
		   loc = this.state.homeLocation;
		  break;
		  
		  case "work":
		   loc = this.state.workLocation;
		  break;
	  }
	  
	  console.log("fav,loc: ",[fav,loc]);
	  this.navv.navigate('AddLocation',{fav: fav,loc: loc});
  }

  _goToTest = (u) => {
	  RootNavigation.navigate('Test', { u: u });
  }

  _goToAccountSettings = (u) => {
	 RootNavigation.navigate('AccountSettings', { u: u });
  }
  
  render() {
	 let navv = this.props.navigation;
	  this.navv = navv;
	  
  if(this.state.isLoading){
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
	      <ThemeContext.Consumer>
 {theme => (
   <UserContext.Consumer>
   {({user,up,loggedIn}) => {
	   this.updateState(user);
	   if(!this.state.hasSavedLocations){
		   //console.log("user,u: ",[user,this.u]); 	   
		   this.getLocationss(user);
	   }
	   return (
	     <ScrollView>
	        <Container>
			   <Row style={{flex: 1, marginTop: 15, width: '100%'}}>
			    <AccountButton
				    onPress={() => this._goToAccountSettings(user)}
				   >
			     <ImageRow style={{flexDirection: 'row', alignItems: 'center'}}>
                  				
				   <Logo source={{uri: "data:image/png;base64," + this.state.img}}/>			   
				   <DescriptionWrapper>
				     <ProductDescription style={{marginTop: 2, color: '#000'}}>{`${this.state.fname} ${this.state.lname}`}</ProductDescription>
				     <ProductDescription style={{marginTop: 2, color: '#000'}}>{this.state.phone}</ProductDescription>
				   </DescriptionWrapper>
				   
				   </ImageRow>
				   </AccountButton>
			     </Row>
			   <HR color={AppStyles.themeColorTransparent}/>
			   <Row style={{flex: 1, marginTop: 15, width: '100%', flexDirection: 'column'}}>
			   {this.state.isLoading ? (
			   <PaymentTypeView>
                 <Animated.View
						  style={{opacity: this.state.fadeAnim}}
				  >			   
				     <PaymentType>Loading..</PaymentType>
				  </Animated.View>
				   </PaymentTypeView>
			   ) : (
			     <PaymentTypeView>	     
				     <PaymentType>Saved Locations</PaymentType>
				   </PaymentTypeView>
			   )}
				    <ProductInputWrapper>
					 <PaymentTypeWrapper>
					   <PaymentTypeLogo>
					     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardHouse)} w={30} h={20}/>
					   </PaymentTypeLogo>
					   <DescriptionWrapper style={{alignItems: 'center', justifyContent: 'center'}}>
					   <AccountButton
					    onPress={() => {this._addSavedPlace("home")}}
					   >
					   <ProductDescription style={{marginLeft: 15}}>{this.state.homeButtonText}</ProductDescription>
					   </AccountButton>
					   </DescriptionWrapper>
					  </PaymentTypeWrapper>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <PaymentTypeWrapper>
					   <PaymentTypeLogo>
					     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardBriefCase)} w={30} h={20}/>
					   </PaymentTypeLogo>
					   <DescriptionWrapper style={{alignItems: 'center', justifyContent: 'center'}}>
					   <AccountButton
					    onPress={() => {this._addSavedPlace("work")}}
					   >
					   <ProductDescription style={{marginLeft: 15}}>{this.state.workButtonText}</ProductDescription>
					   </AccountButton>
					   </DescriptionWrapper>
					  </PaymentTypeWrapper>
					  <PaymentButton
					   onPress={() => {this._addSavedPlace()}}
					  >
					  <PaymentActionText>More Saved Places</PaymentActionText>
					  </PaymentButton>
					</ProductInputWrapper>
			     </Row>
			   <HR color={AppStyles.themeColorTransparent}/>	
			   <Row style={{flex: 1, marginTop: 15, width: '100%', flexDirection: 'column'}}>
			     <PaymentTypeView>
				     <PaymentType>Family</PaymentType>
				   </PaymentTypeView>
					<ProductInputWrapper style={{marginBottom: 10}}>
					  <PaymentButton
					   onPress={() => {this._addFamily()}}
					  >
					  <PaymentActionText>Set up your family</PaymentActionText>
					   <ProductDescription style={{}}>Pay for your loved ones and get notifications</ProductDescription>
					  </PaymentButton>
					</ProductInputWrapper>
			     </Row>
				 <HR color={AppStyles.themeColorTransparent}/>	
			   <Row style={{flex: 1, marginTop: 15, width: '100%', flexDirection: 'column'}}>
			     <PaymentTypeView>
				     <PaymentType>Test</PaymentType>
				   </PaymentTypeView>
					<ProductInputWrapper style={{marginBottom: 10}}>
					  <PaymentButton
					   onPress={() => {this._goToTest()}}
					  >
					  <PaymentActionText>Test</PaymentActionText>
					   <ProductDescription style={{}}>Run tests</ProductDescription>
					  </PaymentButton>
					</ProductInputWrapper>
			     </Row>
			</Container>
		</ScrollView>	   		    
			);
	 }}
   </UserContext.Consumer>
 )}
</ThemeContext.Consumer>	
    );
  }
  
}


const Container = styled.View`
                     flex: 1;
					 background-color: #fff;
`;

const TitleBar = styled.View`
                     width: 100%;
					 margin-top: 20px;
					 margin-bottom: 8px;
					 align-items: center;
					 justify-content: center;
`;


const Logo = styled.Image`
           width: 60px;
		   height: 60px;
		   background: #adacac;
		   border-radius: 55px;
`;

const ImageUpload = styled.TouchableOpacity`

`;


const Title = styled.Text`
                     margin-top: -5px;
                     font-size: 24;
					 font-weight: 500;
					 color: #b8bece;
`;

const Name = styled.Text`
                     font-size: 24;
					 font-weight: bold;
					 color: #3c4560;
					 margin-top: 5px;
`;

const NavButton = styled.Button``;


const ProductInputWrapper = styled.View` 
                   margin-left: 10px;
`;

const ProductDescription = styled.Text` 
                   color: #000;
				   margin-bottom: 2px;
				   font-size: 14px;
`;
					 
const ProductInput = styled.TextInput`
					 align-items: center;
					 border: 1px solid #bbb;
					 padding: 5px;
					 margin-top: 5px;
					 margin-bottom: 10px;
					 color: #000;
`;

const SubmitButton = styled.TouchableOpacity`

`;


const BottomInputs = styled.KeyboardAvoidingView`
   margin-top: 20px;
   margin-left: 10px;
   margin-bottom: 10px;
   width: 90%;
`;

const Row = styled.View`
   margin: 5px;
   width: 100%;
   flex-direction: row;
`;

const ImageRow = styled.View`
   margin: 5px;
   margin-top: 15px;
   width: 100%;
`;

const MenuButton = styled.TouchableOpacity`

`;

const PaymentTypeView = styled.View`
  margin-top: 10px;
  margin-left: 5px;
`;

const PaymentType = styled.Text`
  color: #777;
  font-size: 17;
  font-weight: bold;
  margin-bottom: 15;
`;

const PaymentActionText = styled.Text`
                   color: #00e;
				   margin-top: 12px;
				   margin-bottom: 2px;
				   font-size: 15px;
`;

const PaymentButton = styled.TouchableOpacity`

`;

const AccountButton = styled.TouchableOpacity`

`;

const PaymentTypeLogo = styled.View`
height: 50;
align-items: center;
justify-content: center;
`;

const PaymentTypeWrapper = styled.View`
flex-direction: row;
`;

const DescriptionWrapper = styled.View` 
margin-left: 15px;
`;