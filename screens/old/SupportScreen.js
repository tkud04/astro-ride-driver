import React from 'react';
import {ScrollView, Button} from 'react-native';
import styled from 'styled-components';
import HeaderMenuButton from '../components/HeaderMenuButton';
import AppHomeHeader from '../components/AppHomeHeader';
import TitleHeader from '../components/TitleHeader';
import CButton from '../components/CButton';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');


export default class SupportScreen extends React.Component { 
   constructor(props) {
    super(props);
    
this.user = {};
helpers.getLoggedInUser((u) => {this.user = u});
		
    this.state = {
         		   inputBorderBottomColor: '#ccc',
                   inputBorderBottomWidth: 1,
				   nameBorderBottomColor: '#ccc',
				   phoneBorderBottomColor: '#ccc',
				   emailBorderBottomColor: '#ccc',
				   notesBorderBottomColor: '#ccc',
				   name: this.user.name,
				   uid: this.user.id,
				   email: this.user.email,
				   phone: this.user.phone,
				   notes: ""	
				 };	
				    
		this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
					
	this.navv = null;
	
  }

   
   launchDrawer = () => {
	this.navv.toggleDrawer();  
  }

static navigationOptions = ({navigation}) => {
	 
	  return {
       drawerLabel: 'Support',
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight    		   
	   },
	   headerTitle: () => <AppHomeHeader xml={AppStyles.svg.chartBar} navv = {navigation} title="Tembo" subtitle="Support"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
	   }
	  }
	  
	  };
  
  _contact = () => {
	  //form validation
	 	  
  let validationErrors = (this.state.uid < 1 || this.state.name.length < 6 || this.state.email.length < 6 || this.state.phone.length < 6  || this.state.notes.length < 6);
	  if(validationErrors){
	 if(this.state.uid < 1){
		 showMessage({
			 message: "Invalid user ID",
			 type: 'danger'
		 });
	 }
	 if(this.state.name.length < 6){
		 showMessage({
			 message: "Customer name must be at least 6 characters",
			 type: 'danger'
		 });
	 }
	 if(this.state.email.length < 6){
		 showMessage({
			 message: "Customer email must be at least 6 characters",
			 type: 'danger'
		 });
	 }
	 if(this.state.phone.length < 6){
		 showMessage({
			 message: "Customer phone must be at least 6 characters",
			 type: 'danger'
		 });
	 }
	 if(this.state.notes.length < 6){
		 showMessage({
			 message: "Please let us know of your complaints, inquiries or suggestions",
			 type: 'danger'
		 });
	 }
	 
	}
	
	else{
	  const dt = {
		  uid: this.state.uid,
				   name: this.state.name,
				   email: this.state.email,
				   phone: this.state.phone,
				   notes: this.state.notes
	 };  
	 
	 console.log(dt);
     //helpers.updateCustomer(dt,this.navv);	
	}
	 
  }
  
  render() {
	  this.navv = this.props.navigation;
	  
    return (
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
	        <Container>
			  <ScrollView>		
                  <Row style={{justifyContent: 'center',alignItems: 'center',marginTop: 40}}>		   
				      <Logo source={require('../assets/images/bg.jpg')}/>
				   </Row>
			  
				  <TitleHeader bc="green" tc="green" title="Reach out to us for any complaints,requests or suggestions"/>
                   
				   <BottomInputs>
				    <ProductInputWrapper>
					 <ProductDescription>Name</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.nameBorderBottomColor}}
				     placeholder="Customer name"
					  value={this.state.name}
				     onChangeText={text => {
						this.setState({name: text});
					 }}
					 onFocus={() => {
						 
						this.setState({nameBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({nameBorderBottomColor: "#ccc"});
					 }}
					/>
					</ProductInputWrapper>
				
				     <ProductInputWrapper>
					 <ProductDescription>Email address</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.emailBorderBottomColor}}
				     placeholder="Email address"
				     value={this.state.email}
					 onChangeText={text => {
						this.setState({email: text});
					 }}
					 onFocus={() => {
						 
						this.setState({emailBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({emailBorderBottomColor: "#ccc"});
					 }}
					  keyboardType="email-address"
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>Phone number</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.phoneBorderBottomColor}}
				     placeholder="Phone number"
					 value={this.state.phone}
				     onChangeText={text => {
						this.setState({phone: text});
					 }}
					 onFocus={() => {
						 
						this.setState({phoneBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({phoneBorderBottomColor: "#ccc"});
					 }}
					 keyboardType="decimal-pad"
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>Details</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.notesBorderBottomColor}}
				     placeholder="Your inquiries, complaints or suggestions"
					 value={this.state.notes}
				     onChangeText={text => {
						this.setState({notes: text});
					 }}
					 onFocus={() => {
						 
						this.setState({notesBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({notesBorderBottomColor: "#ccc"});
					 }}
					  multiline={true}
					/>
					</ProductInputWrapper>
					
				   </BottomInputs>
                  <SubmitButton
				       onPress={() => {this._contact()}}
				       title="Submit"
                    >
                        <CButton title="Submit" background="green" color="#fff" />					   
				    </SubmitButton>  
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
					 padding: 10px;
					 margin-top: 5px;
					 margin-bottom: 20px;
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

const BottomInputs = styled.View`
   margin-top: 10px;
   margin-left: 10px;
   margin-bottom: 10px;
   width: 90%;
`;

const Header = styled.View`
 align-items: center;
 justify-content: center;
 background-color: green;
 margin-top: 60px;
 padding: 40px;
 width: 100%;
`;

const HeaderText = styled.Text`
  color: #fff;
  font-size: 28px;
`;

const MenuButton = styled.TouchableOpacity`

`;