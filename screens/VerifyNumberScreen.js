import React from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import * as FileSystem from 'expo-file-system';
import TitleHeader from '../components/TitleHeader';
import * as Permissions from 'expo-permissions';
import {ScrollView, Dimensions, ActivityIndicator, Animated} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class VerifyNumberScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
	this.dt = props.route.params.dt;
	
    this.state = { codeOneBorderBottomColor: '#000',
                	codeTwoBorderBottomColor: '#000',				  
                	codeThreeBorderBottomColor: '#000',				  
                	codeFourBorderBottomColor: '#000',
                    codeOne: '0',					
                    codeTwo: '0',					
                    codeThree: '0',					
                    codeFour: '0',					
				   loading: false,		 
				   showLoading: false,
                    isLoading: false,
                   fadeAnim: new Animated.Value(0)				   
				 };	
				 
	this.navv = null;
    
  }
	  
  
  
  
  _continue = () => {
	 //form validation
	  let isCodeOneValid = (this.state.codeOne.length < 1) && (isNaN(this.state.codeOne)); 
	  let isCodeTwoValid = (this.state.codeTwo.length < 1) && (isNaN(this.state.codeTwo)); 
	  let isCodeThreeValid = (this.state.codeThree.length < 1) && (isNaN(this.state.codeThree)); 
	  let isCodeFourValid = (this.state.codeFour.length < 1) && (isNaN(this.state.codeFour)); 
	  
  let validationErrors = (isCodeOneValid && isCodeTwoValid && isCodeThreeValid && isCodeFourValid);
	  if(validationErrors){
	 
	 	 showMessage({
			 message: "Invalid input. Please try again.",
			 type: 'danger'
		 });
	 
	}
	
	else{
		let cc = `${this.state.codeOne}${this.state.codeTwo}${this.state.codeThree}${this.state.codeFour}`;
		
		this.dt.codeConfirm = cc;
		
	 console.log("dt: ",this.dt);

	if(`${this.dt.code}` !== this.dt.codeConfirm){
		showMessage({
			 message: `The code is invalid.`,
			 type: 'danger'
		 });
	}
	else{
	  showMessage({
			 message: `Verifying`,
			 type: 'info'
		 });
	  this.setState({isLoading: true});
		  helpers.checkIfUserExists(this.dt.to,(res) => {
			  console.log("res: ",res);
			  if(res.status === "ok"){
			     if(res.exists){
				     this.navv.navigate('UserLogin',{
		               dt: this.dt
	                 });
			     }
			     else{
				     this.navv.navigate('AddName',{
		               dt: this.dt
	                 });
			     }
			  }
			  else{
				  showMessage({
			 message: `Network error, please try again.`,
			 type: 'danger'
		 });
			  }
		  });	
	}
	
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
	        <Container>	     

				   <Row style={{flex: 1, marginTop: 10, width: '100%'}}>
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
				     <TitleHeader bc="rgb(101, 23, 33)" tc="rgb(101, 33, 33)" title="Enter the 4-digit code sent to your mobile number:"/>
					</NoteView>
					)}
 					 <ProductInputWrapper style={{marginTop: 20,flexDirection: 'row',width: '100%'}}>
					
				    <ProductInput
					style={{borderColor: this.state.codeOneBorderBottomColor,width: '20%', marginRight: 5}}
				     placeholder="0"
					 maxLength={1}
				     onChangeText={text => {
						this.setState({codeOne: text});
						helpers.focusTextInput(this.refs.codeTwo);
					 }}
					 onFocus={() => {
						 
						this.setState({codeOneBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({codeOneBorderBottomColor: "#000"});
					 }}
					 keyboardType="decimal-pad"
					/>
					<ProductInput
					style={{borderColor: this.state.codeTwoBorderBottomColor,width: '20%', marginRight: 5}}
				     placeholder="0"
				     onChangeText={text => {
						this.setState({codeTwo: text});
						helpers.focusTextInput(this.refs.codeThree);
					 }}
					 onFocus={() => {
						 
						this.setState({codeTwoBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({codeTwoBorderBottomColor: "#000"});
					 }}
					 keyboardType="decimal-pad"
					 ref="codeTwo"
					/>
					<ProductInput
					style={{borderColor: this.state.codeThreeBorderBottomColor,width: '20%', marginRight: 5}}
				     placeholder="0"
				     onChangeText={text => {
						this.setState({codeThree: text});
						helpers.focusTextInput(this.refs.codeFour);
					 }}
					 onFocus={() => {
						 
						this.setState({codeThreeBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({codeThreeBorderBottomColor: "#000"});
					 }}
					 keyboardType="decimal-pad"
					 ref="codeThree"
					/>
					<ProductInput
					style={{borderColor: this.state.codeFourBorderBottomColor,width: '25%'}}
				     placeholder="0"
				     onChangeText={text => {
						this.setState({codeFour: text});
						this.setState({showLoading: true});
					 }}
					 onFocus={() => {
						 
						this.setState({codeFourBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({codeFourBorderBottomColor: "#000"});
					 }}
					 keyboardType="decimal-pad"
					 ref="codeFour"
					/>
					</ProductInputWrapper>
				   </Row>
				  
				   <Row style={{flex: 1,justifyContent: 'flex-end', width: '90%'}}>
				   
				    <SubmitButton
				       onPress={() => {this._continue()}}
				       title="Submit"
                    >
                        <CButton title="Continue" background="rgb(101, 33, 33)" color="#fff" />					   
				    </SubmitButton>	
				   
                    </Row>					
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