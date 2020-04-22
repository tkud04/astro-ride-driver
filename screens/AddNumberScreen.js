import React from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import * as FileSystem from 'expo-file-system';
import TitleHeader from '../components/TitleHeader';
import * as Permissions from 'expo-permissions';
//import * as SMS from 'expo-sms';
import {ScrollView, Dimensions, ActivityIndicator, Animated} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class AddNumberScreen extends React.Component { 
   constructor(props) {
    super(props);
	//this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
	
    this.state = { phoneBorderBottomColor: '#000',				  
				   loading: false,
				   phone: "",
                   isLoading: false,
                   fadeAnim: new Animated.Value(0)				   
				 };	
				 
	this.navv = null;
    
  }
	  
  
  
  
  _continue = () => {
	 //form validation
	  
  let validationErrors = (this.state.phone.length < 10);
	  if(validationErrors){
	 
	 if(this.state.phone.length < 10){
		 showMessage({
			 message: "A valid phone number is required",
			 type: 'danger'
		 });
	 }
	 
	}
	
	else{
		let formattedNumber = helpers.formatPhoneNumber(this.state.phone);
		
		
	  
	  const dt = {
		    to: formattedNumber,
		    id: helpers.getUniqueID('user'),
			code: helpers.getCode()
	 };  
	 this.setState({isLoading: true});
	 
     helpers.sendSMSAsync(dt, this.navv);
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
	        <Container>	     

				   <Row style={{flex: 1, marginTop: 5, width: '100%'}}>
				     <ProductInputWrapper style={{flexDirection: 'row',width: '100%'}}>
					 <ProductDescription style={{width: '20%'}}>+234</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.phoneBorderBottomColor,width: '70%'}}
				     placeholder="0801 234 5678"
					  value={this.state.phone}
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
				   </Row>
				  
				   <Row style={{flex: 1,justifyContent: 'flex-end', width: '90%'}}>
				  
					{this.state.isLoading ? (
					 <NoteView style={{ justifyContent: 'center'}}>
					   <Animated.View
						  style={{opacity: this.state.fadeAnim}}
					   >
						<TitleHeader bc="rgb(101, 33, 33)" tc="rgb(101, 33, 33)" title="Processing.."/>
				       </Animated.View>
				     </NoteView>
				   ) : (
				    <NoteView style={{ alignItems: 'center', justifyContent: 'center'}}>
				     <TitleHeader bc="rgb(101, 23, 33)" tc="rgb(101, 33, 33)" title="By continuing you may receive a verification SMS. Message and data rates may apply"/>
					</NoteView>
					)}
				   
				   <SubmitButton
				       onPress={() => {this._continue()}}
				       title="Submit"
                    >
                        <CButton title="Continue" background="rgb(101, 33, 33)" color="#fff" />					   
				    </SubmitButton>	
                    </Row>					
			</Container>
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