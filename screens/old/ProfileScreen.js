import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CustomButton from '../components/CustomButton';
import Tips from '../components/Tips';
import SvgIcon from '../components/SvgIcon';
import AppHomeHeader from '../components/AppHomeHeader';
import HeaderMenuButton from '../components/HeaderMenuButton';
import CButton from '../components/CButton';
import * as helpers from '../Helpers';
import * as ImagePicker from 'expo-image-picker';
import AppStyles from '../styles/AppStyles';
import {ScrollView, Button} from 'react-native';
import {ThemeContext,UserContext} from '../MyContexts';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class ProfileScreen extends React.Component { 
     constructor(props) {
    super(props);
		 helpers._getPermissionAsync('camera roll');
		 this.props.navigation.setParams({launchDrawer: this.launchDrawer});
		 
		 
       this.state = { inputBorderBottomColor: '#ccc',
                   inputBorderBottomWidth: 1,
				   nameBorderBottomColor: '#ccc',				   
				   emailBorderBottomColor: '#ccc',			   
				   phoneBorderBottomColor: '#ccc',			   
				   passwordBorderBottomColor: '#ccc',			   
				   confirmPasswordBorderBottomColor: '#ccc',			   
				   loading: false,
				   dataSource: [],
				   name: "",				   
				   email: "",		
                   img: null,				   
				   phone: "",				   
				   confirmPassword: "",				   
				   password: ""				   
				 };	
				 
		
				     
	this.navv = null;
  }
  
    launchDrawer = () => {
	this.navv.toggleDrawer();  
  }
	

   static navigationOptions = ({navigation}) => {
	 
	  return {
       drawerLabel: 'Subscribe',
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight    		   
	   },
	   headerTitle: () => <AppHomeHeader xml={AppStyles.svg.chartBar} navv = {navigation} title="Daily Sales Report" subtitle="Pofile"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
	   }
	  }
	  
	  };
	  
	addImage = async () => {
	  let ret = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  aspect: [4,4],
		  quality: 1
	  });
	  
	  console.log(ret);
	  
	  if(!ret.cancelled){
		  this.setState({img: ret.uri});
		  
		  showMessage({
			 message: "Image uploaded!",
			 type: 'success'
		 });
	  }
  }
  
  updateState = (dt) => {
			 console.log("user: ",dt);
			  this.state.name = dt.name;
			  this.state.email = dt.email;
			  this.state.phone = dt.phone;
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
				   name: this.state.name,
				   email: this.state.email,
				   phone: this.state.phone,
				   password: this.state.password
	 };  
	 
	 console.log(dt);
     //helpers.updateCustomer(dt,this.navv);	
	}
	
	  }
	 
  }

  render() {
	  	  let navv = this.props.navigation;
	  this.navv = navv;

    return (
	<ThemeContext.Consumer>
 {theme => (
   <UserContext.Consumer>
   {({user,up,loggedIn}) => {
	   this.updateState(user);
	   return (
	        <Container>
			  <ScrollView>
			     <TitleBar>
			             <Title>Welcome back,</Title>
			             <Name>{this.state.name}</Name>
				        
			        </TitleBar>
					<ImageRow style={{justifyContent: 'center',alignItems: 'center'}}>
                   <ImageUpload
				     onPress={() => this.addImage()}
				   >					
				   <Logo source={{uri: this.state.img}}/>			   
				   </ImageUpload>
				   <ProductDescription style={{marginTop: 2}}>Tap to upload</ProductDescription>
				   </ImageRow>
					<BottomInputs>
				    <ProductInputWrapper>
					 <ProductDescription>Name</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.nameBorderBottomColor}}
				     placeholder="Name"
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
				     placeholder="Email adress"
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
					
					<ProductInputWrapper>
					 <ProductDescription>Confirm new password</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.confirmPasswordBorderBottomColor}}
				     placeholder="Confirm password"
				     onChangeText={text => {
						this.setState({confirmPassword: text});
					 }}
					 onFocus={() => {
						 
						this.setState({confirmPasswordBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({confirmPasswordBorderBottomColor: "#ccc"});
					 }}
					 secureTextEntry={true}
					/>
					</ProductInputWrapper>
					
				   </BottomInputs>
				   <SubmitButton
				       onPress={() => {this._update()}}
				       title="Submit"
                    >
                        <CButton title="Submit" background="green" color="#fff" />					   
				    </SubmitButton>
				   		    
			  </ScrollView>
			</Container>
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
           width: 110px;
		   height: 110px;
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
                   color: #777;
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
   width: 100%;
`;

const MenuButton = styled.TouchableOpacity`

`;
