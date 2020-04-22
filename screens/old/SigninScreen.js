import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CButton from '../components/CButton';
import AppHeader from '../components/AppHeader';
import HeaderMenuButton from '../components/HeaderMenuButton';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {ThemeContext,UserContext} from '../MyContexts';
import {ScrollView,Button,KeyboardAvoidingView} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {NavigationEvents} from 'react-navigation';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class SigninScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({launchDrawer: this.launchDrawer});
	
    this.state = { inputBorderBottomColor: '#ccc',
                   inputBorderBottomWidth: 1,
				   usernameBorderBottomColor: '#ccc',				   
				   passwordBorderBottomColor: '#ccc',			   
				   loading: false,
				   dataSource: [],
				   username: "",				   
				   password: ""				   
				 };	
				     
	this.navv = null;
	
	//This screen is only visible when signed out. So clear all user data here
  }


   launchDrawer = () => {
	this.navv.toggleDrawer();  
  }
   
      static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight / 2
	   },
	   headerTitle: () => <AppHeader w="80%" h="80%" ml="30px" xml={AppStyles.svg.headerUsers} title="Sign in"/>,
	   headerLeft: () => (
	    <MenuButton onPress={navigation.getParam('launchDrawer')}>
		  <HeaderMenuButton xml={AppStyles.svg.headerHamburger} w={30} h={30} ss={{marginLeft: 10}}/>
		</MenuButton>
		),
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
       },
	   
	   }
   
    };
	
	_updateSigninButton = () => {
	if(this.state.loading){
		           return (
					  <CButton title="Processing.." background="green" color="#fff" />
					  );
						
					  }
					  else{
						 return (
					  <UserContext.Consumer>
					  {({user,up,loggedIn}) => (<SubmitButton
				       onPress={() => {this._signin(user, up, loggedIn)}}
				       title="Submit"
                    >
                        <CButton title="Submit" background="green" color="#fff" />					   
				    </SubmitButton>			
					  )}
					   </UserContext.Consumer>		
					  );
	}
	}
	  
  _signin = (uu,upp,lli) => {
	  //form validation
	 	  
  let validationErrors = (this.state.username.length < 6 || this.state.password.length < 6);
	  if(validationErrors){

	 if(this.state.username.length < 6){
		 showMessage({
			 message: "Please input a valid email address or phone number",
			 type: 'danger'
		 });
	 }
	 if(this.state.password.length < 6){
		 showMessage({
			 message: "Password must be at least 6 characters",
			 type: 'danger'
		 });
	 }
	 
	}
	
	else{
		this.state.loading = true;
	  const dt = {
				   username: this.state.username,
				   password: this.state.password
	 };  
	 
	 //console.log(dt);
	 
	 showMessage({
			 message: "Signing you in..",
			 type: 'info'
		 });
		 
     //Log user in
		        helpers.login(dt,(res) => {
					
					if(res.status == "ok"){
                        showMessage({
			              message: `Welcome back ${res.user.name}! Fetching your dashboard..`,
			              type: 'success'
		                });	
                         lli = true;
                        upp([res.tk,lli]);
                        						
						this.navv.navigate("Dashboard");
					}
					else{
						showMessage({
			              message: `Username or password incorrect, please try again.`,
			              type: 'danger'
		                });
					}
					this.state.loading = false;
				});	
	}
	 
  }
  
  render() {
	  let navv = this.props.navigation;
	  this.navv = navv;
	  
    return (
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
		   <KeyboardAvoidingView>
	        <Container>
			  <ScrollView>		     
				   <Row style={{justifyContent: 'center',alignItems: 'center'}}>			   
				   <Logo source={require('../assets/images/bg.jpg')}/>			   
				   </Row>
				   <BottomInputs>
				    <ProductInputWrapper>
					 <ProductDescription>Email address or phone number</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.usernameBorderBottomColor}}
				     placeholder="Email or phone number"
				     onChangeText={text => {
						this.setState({username: text});
					 }}
					 onFocus={() => {
						 
						this.setState({usernameBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({usernameBorderBottomColor: "#ccc"});
					 }}
					/>
					</ProductInputWrapper>
					
				   
					<ProductInputWrapper>
					 <ProductDescription>Password</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.passwordBorderBottomColor}}
				     placeholder="Password"
				     onChangeText={text => {
						this.setState({password: text});
					 }}
					 onFocus={() => {
						 
						this.setState({passwordBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({passwordBorderBottomColor: "#ccc"});
					 }}
					 secureTextEntry={true}
					/>
					</ProductInputWrapper>
					
					<ProductInputWrapper style={{flexDirection:"row", marginVertical: 10}}>
					  <ProductDescription style={{alignItems:"center", justifyContent: "center", marginTop: 10}}>New user?</ProductDescription>
				      <RegisterButton
				       onPress={() => {this.navv.navigate('Sign up')}}
				       title="Submit"
                       >
                        <RegisterButtonView>
						  <RegisterButtonText>Sign up</RegisterButtonText>
						</RegisterButtonView>					   
				      </RegisterButton>
					</ProductInputWrapper>
					
				   </BottomInputs>
                  {
					 this._updateSigninButton()
				  }
					
			  </ScrollView>
			</Container>
			</KeyboardAvoidingView>
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
`;

const ProductInputWrapper = styled.View` 
                   margin-left: 10px;
`;

const ProductDescription = styled.Text` 
                   color: #999;
				   margin-bottom: 2px;
				   font-size: 14px;
`;
					 
const ProductInput = styled.TextInput`
					 align-items: center;
					 border: 1px solid #bbb;
					 padding: 5px;
					 margin-top: 5px;
					 margin-bottom: 10px;
					 color: #ccc;
`;


const TestButton = styled.Button`
  background-color: blue;
  color: #fff;
  border-radius: 5;
  margin-top: 40px;
`;

const SubmitButton = styled.TouchableOpacity`

`;

const ImageUpload = styled.TouchableOpacity`

`;

const Logo = styled.Image`
           width: 110px;
		   height: 110px;
		   background: black;
		   border-radius: 55px;
`;

const Row = styled.View`
   margin: 5px;
   width: 100%;
   flex-direction: row;
`;

const TopRightInputs = styled.View`
   margin-left: 10px;
   margin-right: 5px;
   width: 60%;
`;

const CustomerSelect = styled.Picker`
    width: 90%;
	height: 50;
	color: #ccc;
	margin-bottom: 20px;
`;

const BottomInputs = styled.KeyboardAvoidingView`
   margin-top: 10px;
   margin-left: 10px;
   margin-bottom: 10px;
   width: 90%;
`;

const RegisterButton = styled.TouchableOpacity`

`;

const RegisterButtonView = styled.View`
  background-color: green;
  color: #fff;
  border-radius: 5;
  width: 100%;
  padding: 10px;
  margin-left: 10px;
  align-items: center;
`;

const RegisterButtonText = styled.Text`
  color: #fff;
  
`;

const MenuButton = styled.TouchableOpacity`

`;