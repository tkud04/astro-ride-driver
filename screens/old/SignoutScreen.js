import React from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppHomeHeader from '../components/AppHomeHeader';
import TitleHeader from '../components/TitleHeader';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import {ThemeContext,UserContext} from '../MyContexts';
import {ScrollView,Button,KeyboardAvoidingView} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class SignoutScreen extends React.Component { 
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
	
  }


   launchDrawer = () => {
	this.navv.toggleDrawer();  
  }
   
     static navigationOptions = ({navigation}) => {
	 
	  return {
       drawerLabel: 'Sign out',
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight    		   
	   },
	   headerTitle: () => <AppHomeHeader xml={AppStyles.svg.chartBar} navv = {navigation} title="Tembo" subtitle="Sign out?"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
	   }
	  }
	 };	  
	  
	
	_updateSignoutButton = () => {
	if(this.state.loading){
		           return (
					  <CButton title="Processing.." background="green" color="#fff" />
					  );
						
					  }
					  else{
						 return (
					  <UserContext.Consumer>
					  {({user,up,loggedIn}) => (<SubmitButton
					  style={{marginBottom: 30}} 
				       onPress={() => {this._signout(user, up)}}
				       title="Submit"
                    >
                        <CButton title="Sign me out" background="green" color="#fff" />					   
				    </SubmitButton>			
					  )}
					   </UserContext.Consumer>		
					  );
	}
	}
	  
  _signout = (uu,upp,lli) => {

		this.state.loading = true;
	 
	 //console.log(dt);
	 
	 showMessage({
			 message: "Signing you out..",
			 type: 'info'
		 });
		 
     //Log user in
		        helpers.logout((res) => {
					
					if(res.status == "ok"){
                        lli = false;						
                        upp([{},lli]);
                        						
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
  
  render() {
	  let navv = this.props.navigation;
	  this.navv = navv;
	  
    return (
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
		   <KeyboardAvoidingView>
	        <Container>
			  <ScrollView>		     
				   <Row style={{justifyContent: 'center',alignItems: 'center',flexDirection: 'column',marginTop: 20}}>			   
				   <Logo source={require('../assets/images/bg.jpg')}/>	
                    <TitleHeader bc="red" tc="red" title="NOTE: Make sure you sync your data with our servers so as to avoid permanent loss of your data when you sign out."/>									   
				   </Row>
				   
				   
				    
                  {
					 this._updateSignoutButton()
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