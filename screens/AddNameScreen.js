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
import {ScrollView} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class AddNameScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.dt = props.route.params.dt;
	
    this.state = { fnameBorderBottomColor: '#000',
	               lnameBorderBottomColor: '#000',				  
	               genderBorderBottomColor: '#000',				  
				   loading: false,
				   fname: "",			 
				   lname: "",			 
				   gender: "none",
                   genderTypes: [
				         {key: 1,name: "Male", value: "male"},
	                     {key: 3,name: "Female", value: "female"},
	                    ]				   
				 };	
				 
	this.navv = null;
    
  }

	  
  
  
  
  _continue = () => {
	 //form validation
	  
  let validationErrors = (this.state.fname.length < 4 || this.state.lname.length < 4 || this.state.gender === "none");
	  if(validationErrors){
	 
	 if(this.state.fname.length < 4){
		 showMessage({
			 message: "Your first name is required",
			 type: 'danger'
		 });
	 }
	 if(this.state.lname.length < 4){
		 showMessage({
			 message: "Your first name is required",
			 type: 'danger'
		 });
	 }
	 
	 if(this.state.gender === "none"){
		 showMessage({
			 message: "Gender is required",
			 type: 'danger'
		 });
	 } 
	 
	}
	
	else{
	  this.dt.fname = this.state.fname;
	  this.dt.lname = this.state.lname;	  
	  this.dt.gender = this.state.gender;	  
	 
		this.navv.navigate('AddLogin',{
		   dt: this.dt
	    });
	}
	 
  }
  
  render() {
	 let navv = this.props.navigation;
	  this.navv = navv;
    return (
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
	        <Container>	     

				   <Row style={{flex: 1, marginTop: 10, flexDirection: 'row', width: '100%'}}>
				     <ProductInputWrapper style={{width: '50%'}}>
					 <ProductDescription>First name</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.fnameBorderBottomColor,width: '70%'}}
				     placeholder="First name"
				     onChangeText={text => {
						this.setState({fname: text});
					 }}
					 onFocus={() => {
						 
						this.setState({fnameBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({fnameBorderBottomColor: "#000"});
					 }}
					/>
					</ProductInputWrapper>
					<ProductInputWrapper style={{width: '50%'}}>
					 <ProductDescription>Last name</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.lnameBorderBottomColor,width: '70%'}}
				     placeholder="Last name"
				     onChangeText={text => {
						this.setState({lname: text});
					 }}
					 onFocus={() => {
						 
						this.setState({lnameBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({lnameBorderBottomColor: "#000"});
					 }}
					/>
					</ProductInputWrapper>
				   </Row>
				   
				   <Row style={{flex: 1, marginTop: 10, width: '100%'}}>
				     <ProductInputWrapper>
					 <ProductDescription>Gender</ProductDescription>
					  <CustomerSelect
					    style={{borderColor: this.state.inputBorderBottomColor}}
					    selectedValue={this.state.gender}
						mode="dropdown"
					    onValueChange={(value,index) => {this.setState({gender: value})}}
					  >
					    <CustomerSelect.Item key="gtype-1" label="Customer gender" value="none"/>
						{
							this.state.genderTypes.map((element) => {
								return <CustomerSelect.Item key={"gtype-" + element.key} label={element.name} value={element.value}/>
								})	
						}
					  </CustomerSelect>
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