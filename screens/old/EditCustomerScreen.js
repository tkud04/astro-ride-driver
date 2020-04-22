import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CButton from '../components/CButton';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppStyles from '../styles/AppStyles';
import * as FileSystem from 'expo-file-system';
import * as helpers from '../Helpers';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {ScrollView} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class EditCustomerScreen extends React.Component { 
   constructor(props) {
    super(props);
	 helpers._getPermissionAsync('camera roll');
	 helpers._getPermissionAsync('contacts');
	 	this.c = props.navigation.state.params.c;
		this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
		
    this.state = { inputBorderBottomColor: '#ccc',
                   inputBorderBottomWidth: 1,
				   nameBorderBottomColor: '#ccc',
				   saBorderBottomColor: '#ccc',
				   emailBorderBottomColor: '#ccc',
				   phoneBorderBottomColor: '#ccc',
				   notesBorderBottomColor: '#ccc',
				   customerType: "none",
				   loading: false,
				   dataSource: [],
				   customerImg: this.c.customerImg,
				   customerName: this.c.customerName,
				   customerID: "",
				   customerEmail: this.c.customerEmail,
				   customerPhone: this.c.customerPhone,
				   customerType: this.c.customerType,
				   sa: this.c.sa,
				   notes: this.c.notes,
				   gender: this.c.gender,
				   customerTypes: [{key: 1,name: "Individual", value: "individual"},
	                     {key: 3,name: "Company", value: "company"}],
				  genderTypes: [{key: 1,name: "Male", value: "male"},
	                     {key: 3,name: "Female", value: "female"},
	                     {key: 5,name: "Company", value: "company"},]	
				 };	
				     
	this.navv = null;
	
		if(!isNaN(this.state.customerImg)) this.state.customerImg = require("../assets/images/pic-11.jpg");
	  console.log(this.c);
  }

   
   static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppInputImageHeader xml={AppStyles.svg.headerUsers}  leftParam = "goBack" navv = {navigation} title="Edit Customer" subtitle="Edit this customer" sml={60}/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
       },
	   headerLeft: null,
	   }
   
    };
	  
  _renderQuantityTypes = (src) => {
      
	  console.log(src);
	  
      return src.map((element) => {
								<CustomerSelect.Item label={element.name} value={element.value}/>
								});						
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
		  this.setState({customerImg: fileContents});
		  
		  showMessage({
			 message: "Image uploaded!",
			 type: 'success'
		 });
	  }
  }
  
  _updateCustomer = () => {
	  //form validation
	 	  
  let validationErrors = (this.state.customerName.length < 1 || this.state.customerType ==  "none" || this.state.gender ==  "none" || this.state.customerEmail.length < 6 || this.state.customerPhone.length < 6  || this.state.sa.length < 6);
	  if(validationErrors){
	 if(this.state.customerName.length < 1){
		 showMessage({
			 message: "Customer name must be at least 1 character",
			 type: 'danger'
		 });
	 }
	 if(this.state.customerType ==  "none"){
		 showMessage({
			 message: "Please choose a customer type",
			 type: 'danger'
		 });
	 }
	 if(this.state.gender ==  "none"){
		 showMessage({
			 message: "Please choose a gender",
			 type: 'danger'
		 });
	 }
	 if(this.state.customerEmail.length < 6){
		 showMessage({
			 message: "Customer email must be at least 6 characters",
			 type: 'danger'
		 });
	 }
	 if(this.state.customerPhone.length < 6){
		 showMessage({
			 message: "Customer phone must be at least 6 characters",
			 type: 'danger'
		 });
	 }
	 if(this.state.sa.length < 6){
		 showMessage({
			 message: "Customer shipping adddress must be at least 6 characters",
			 type: 'danger'
		 });
	 }
	 
	}
	
	else{
	  const dt = {
		  id: this.c.id,
		  customerImg: this.state.customerImg,
				   customerName: this.state.customerName,
				   customerType: this.state.customerType,
				   customerEmail: this.state.customerEmail,
				   customerPhone: this.state.customerPhone,
				   sa: this.state.sa,
				   notes: this.state.notes,
				   gender: this.state.gender
	 };  
	 
	 console.log(dt);
     helpers.updateCustomer(dt,this.navv);	
	}
	 
  }
  
  render() {
	  this.navv = this.props.navigation;
	  
    return (
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
	        <Container>
			  <ScrollView>		     
                   
				   <Row style={{marginTop: 10}}>
				   <ImageUpload
				    onPress={() => this.addImage()}
				   >
				   
				   <Logo source={{uri: "data:image/png;base64," + this.state.customerImg}}/>
				   </ImageUpload>
				   <TopRightInputs>
				   <ProductInputWrapper>
					 <ProductDescription>Customer name</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.nameBorderBottomColor}}
				     placeholder="Customer name"
					  value={this.state.customerName}
				     onChangeText={text => {
						this.setState({customerName: text});
					 }}
					 onFocus={() => {
						 
						this.setState({nameBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({nameBorderBottomColor: "#ccc"});
					 }}
					/>
					</ProductInputWrapper>
									
				   </TopRightInputs>
				   </Row>
				   <BottomInputs>
				   <ProductInputWrapper>
					 <ProductDescription>Select customer type</ProductDescription>
					  <CustomerSelect
					    style={{borderColor: this.state.inputBorderBottomColor}}
					    selectedValue={this.state.customerType}
						mode="dropdown"
					    onValueChange={(value,index) => {this.setState({customerType: value})}}
					  >
					    <CustomerSelect.Item key="ctype-1" label="Customer type" value="none"/>
						{
							this.state.customerTypes.map((element) => {
								return <CustomerSelect.Item key={"qtype-" + element.key} label={element.name} value={element.value}/>
								})	
						}
					  </CustomerSelect>
					</ProductInputWrapper>
				    
					<ProductInputWrapper>
					 <ProductDescription>Select customer gender</ProductDescription>
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
				     <ProductInputWrapper>
					 <ProductDescription>Customer email address</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.emailBorderBottomColor}}
				     placeholder="Email address"
				     value={this.state.customerEmail}
					 onChangeText={text => {
						this.setState({customerEmail: text});
					 }}
					 onFocus={() => {
						 
						this.setState({emailBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({emailPriceBorderBottomColor: "#ccc"});
					 }}
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>Customer phone number</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.phoneBorderBottomColor}}
				     placeholder="Phone number"
					 value={this.state.customerPhone}
				     onChangeText={text => {
						this.setState({customerPhone: text});
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
					 <ProductDescription>Customer shipping address</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.saBorderBottomColor}}
				     placeholder="Address, city, state, zipcode"
					 value={this.state.sa}
				     onChangeText={text => {
						this.setState({sa: text});
					 }}
					 onFocus={() => {
						 
						this.setState({saBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({saBorderBottomColor: "#ccc"});
					 }}
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>Notes</ProductDescription>
				    <ProductInput
					 style={{borderColor: this.state.notesBorderBottomColor}}
				     placeholder="Notes"
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
				       onPress={() => {this._updateCustomer()}}
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
                   color: #555;
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
           width: 66px;
		   height: 66px;
		   background: black;
		   border-radius: 33px;
		   margin-left: 8px;
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
	color: #000;
	margin-bottom: 20px;
`;

const BottomInputs = styled.View`
   margin-top: 10px;
   margin-left: 10px;
   margin-bottom: 10px;
   width: 90%;
`;