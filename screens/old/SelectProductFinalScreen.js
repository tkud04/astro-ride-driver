import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CButton from '../components/CButton';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {ScrollView} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class SelectProductFinalScreen extends React.Component { 
   constructor(props) {
	   super(props);
	 	this.p = props.navigation.state.params.p;
		this.from = props.navigation.state.params.from;
		
		this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
		
    this.state = { inputBorderBottomColor: '#ccc',
                   inputBorderBottomWidth: 1,
				   qtyBorderBottomColor: '#ccc',		
				   nameBorderBottomColor: '#ccc',		
				   loading: false,
				   p: this.p,
				   qty: 1,
				   profit: 0
				 };	
				     
	this.navv = null;
    this.calculateProfit();
  
  }

   
   static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppInputImageHeader xml={AppStyles.svg.headerWallet}  leftParam = "goBack" navv = {navigation} title="Add product" subtitle="Add quantity" sml={60}/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
       },
	   headerLeft: null,
	   }
   
    };
	  
  
  calculateProfit = () => {
	  let cp = parseInt(this.state.p.costPrice), sp = parseInt(this.state.p.sellingPrice), qty = parseInt(this.state.qty);
	  if(isNaN(cp)) cp = 0;
	  if(isNaN(sp)) sp = 0;
	  if(isNaN(qty)) qty = 0;
	  
	  this.state.profit = (sp - cp) * qty;
	  console.log("Profit: ",this.state.profit);
  }
  
  _chooseProduct = () => {
	  //form validation
	 	  	  let cp = parseInt(this.state.p.costPrice), sp = parseInt(this.state.p.sellingPrice), qty = parseInt(this.state.qty);
	  if(isNaN(cp)) cp = 0;
	  if(isNaN(sp)) sp = 0;
	  if(isNaN(qty)) qty = 0;
	  
  let validationErrors = (this.state.qty < 1);
	  if(validationErrors){
	 if(this.state.qty < 1){
		 showMessage({
			 message: "Quantity must be at least 1",
			 type: 'danger'
		 });
	 }
	 
	}
	
	else{
	  this.p.profit = this.state.profit;
	  this.p.qty = this.state.qty;
	 
	 console.log(this.p);
     showMessage({
			 message: `Product ${this.p.sku} selected`,
			 type: 'info'
		 });
	
	this.navv.navigate(this.from,{
		p: this.p,
	});  
	}
	 
  }
  
  render() {
	  this.navv = this.props.navigation;
    return (
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
	        <Container>
			  <ScrollView>		     
                   
				   <BottomInputs>
				     <ProductInputWrapper>
					 <ProductDescription>Product</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.nameBorderBottomColor}}
				     placeholder="Product name"
				     value={this.state.p.name}
					 editable={false}
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>Quantity</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.qtyBorderBottomColor}}
				     placeholder="Quantity"
					 value={`${this.state.qty}`}
				     onChangeText={text => {
						this.setState({qty: text});
					 }}
					 onFocus={() => {
						 
						this.setState({qtyBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({qtyBorderBottomColor: "#ccc"});
						this.calculateProfit();
					 }}
					 keyboardType="decimal-pad"
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>Cost price (N)</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.nameBorderBottomColor}}
				     placeholder="Cost price"
				     value={this.state.p.costPrice}
					 editable={false}
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>Selling price (N)</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.nameBorderBottomColor}}
				     placeholder="Selling price"
				     value={this.state.p.sellingPrice}
					 editable={false}
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>Profit (N)</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.nameBorderBottomColor}}
				     placeholder="Profit"
				     value={`${this.state.profit}`}
					 editable={false}
					 onFocus={() => {
						 
						this.setState({nameBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({nameBorderBottomColor: "#ccc"});
					 }}
					/>
					</ProductInputWrapper>
				   </BottomInputs>
                   <SubmitButton
				       onPress={() => {this._chooseProduct()}}
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
	color: #ccc;
	margin-bottom: 20px;
`;

const BottomInputs = styled.View`
   margin-top: 10px;
   margin-left: 10px;
   margin-bottom: 10px;
   width: 90%;
`;