import React from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import * as FileSystem from 'expo-file-system';
import TitleHeader from '../components/TitleHeader';
import * as Permissions from 'expo-permissions';
import {ThemeContext,UserContext} from '../MyContexts';
//import * as SMS from 'expo-sms';
import {ScrollView, Animated} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class UserLoginScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.dt = props.route.params.dt;
	
    this.state = { phoneBorderBottomColor: '#000',
	               passwordBorderBottomColor: '#000',				  			  
				   loading: false,
				   phone: this.dt.to,			 
				   password: "",
                   isLoading: false,
                   fadeAnim: new Animated.Value(0)				   
				 };	
				 
	this.navv = null;
    
  }

  
  
  
  _continue = (u, upp) => {
	 //form validation
	  
  let validationErrors = (this.state.phone.length < 6 || this.state.password.length < 6);
	  if(validationErrors){
	 
	 if(this.state.phone.length < 6){
		 showMessage({
			 message: "A valid phone number is required",
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
	  this.dt.password = this.state.password;	  
	  
	  console.log("this.dt: ",this.dt);
	  
	  showMessage({
			 message: "Signing you in..",
			 type: 'info'
		 });
		 this.setState({isLoading: true});
     helpers.login(this.dt,upp);
	}
	 
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
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
		   <UserContext.Consumer>
					  {({user,up}) => (
		   <ScrollView>
	        <Container>	     
                 
				   <Row style={{flex: 1, marginTop: 10, height: '100%'}}>
				   
				   {this.state.isLoading ? (
					 <NoteView style={{ justifyContent: 'center'}}>
					   <Animated.View
						  style={{opacity: this.state.fadeAnim}}
					   >
						<TitleHeader bc="#000" tc="#000" title="Processing.."/>
				       </Animated.View>
				     </NoteView>
				   ) : (
				    <NoteView style={{ alignItems: 'center', justifyContent: 'center'}}>
				     <TitleHeader bc="#000" tc="#000" title="Enter your password"/>
					</NoteView>
					)}
				   
				     <ProductInputWrapper>
					 <ProductDescription>Phone number</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.phoneBorderBottomColor,width: '70%'}}
				     placeholder="Phone number"
					 value={this.dt.to}
				     onChangeText={text => {
						this.setState({phone: text});
					 }}
					 onFocus={() => {
						 
						this.setState({phoneBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({phoneBorderBottomColor: "#000"});
					 }}
					  keyboardType="decimal-pad"
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>Password</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.passwordBorderBottomColor,width: '70%'}}
				     placeholder="Password"
				     onChangeText={text => {
						this.setState({password: text});
					 }}
					 onFocus={() => {
						 
						this.setState({passwordBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({passwordBorderBottomColor: "#000"});
					 }}
					  secureTextEntry={true}
					/>
					</ProductInputWrapper>
					
				   </Row>
				   
				  
				  <Row style={{flex: 1,justifyContent: 'flex-end', width: '90%'}}>
				   <SubmitButton
				       onPress={() => {this._continue(user, up)}}
				       title="Submit"
                    >
                        <CButton title="Submit" background="#000" color="#fff" />					   
				    </SubmitButton>		
                    </Row>					
			</Container>
			</ScrollView>
			)}
					   </UserContext.Consumer>		
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
`;

const ProductInputWrapper = styled.View` 
                   margin-left: 10px;
`;

const ProductDescription = styled.Text` 
                   color: #000;
				   margin-top: 12px;
				   margin-bottom: 2px;
				   font-size: 14px;
				   
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

`;