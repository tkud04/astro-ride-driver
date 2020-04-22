import React from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {ScrollView} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class ProductsScreen extends React.Component { 
   constructor(props) {
    super(props);
	 helpers._getPermissionAsync('camera roll');
	 			this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});

    this.state = { inputBorderBottomColor: '#ccc',
                   inputBorderBottomWidth: 1,
				   nameBorderBottomColor: '#ccc',
				   costPriceBorderBottomColor: '#ccc',
				   salePriceBorderBottomColor: '#ccc',
				   stockBorderBottomColor: '#ccc',
				   notesBorderBottomColor: '#ccc',			   
				   loading: false,
				   dataSource: [],
				   productImg: '../assets/images/pic-11.jpg',
                   quantityType: "none",
				   costPrice: "0",
				   sellingPrice: "0",
				   stock: "0",
				   sku: helpers.generateSKU(),
				   notes: "",
				   productName: "",
				   categories: "",
				   quantityTypes: [{key: 1,name: "Box", value: "box"},
	                     {key: 3,name: "Case", plural: "Cases", value: "case"},
	                     {key: 2,name: "Pound", plural: "Pounds", value: "pound"},	                  
	                     {key: 5,name: "Centimeter",plural: "Centimeters", value: "cm"},
	                     {key: 9,name: "Inch", plural: "Inches", value: "inch"},
	                     {key: 7,name: "Gallon", plural: "Gallons", value: "gallon"},
	                     {key: 8,name: "Foot", plural: "Feet", value: "foot"},
	                     {key: 6,name: "Gram", plural: "Grams", value: "gram"},
	                     {key: 11,name: "Kilometer", plural: "Kilometers", value: "km"},
	                     {key: 10,name: "Litre", plural: "Litres", value: "litre"},
	                     {key: 12,name: "Mile", plural: "Miles", value: "mile"},
	                     {key: 13,name: "Meter", plural: "Meters", value: "meter"},
	                     {key: 14,name: "Miligram", plural: "Miligrams", value: "mg"},
	                     {key: 15,name: "Milimeter", plural: "Milimeters", value: "mm"},
	                     {key: 16,name: "Mililitre", plural: "Mililitres", value: "ml"},
	                     {key: 17,name: "Pack", plural: "Packs", value: "pack"},
	                     {key: 18,name: "Piece", plural: "Pieces", value: "piece"},
	                     {key: 19,name: "Ton", plural: "Tons", value: "ton"},
	                     {key: 20,name: "Set", plural: "Sets", value: "set"},
	                     {key: 21,name: "Unit", plural: "Units", value: "unit"},
	                     {key: 22,name: "Yard", plural: "Yards", value: "yard"},
						 {key: 4,name: "Other", plural: "Units (unspecified)", value: "other"},
	                    ]	
				 };	
				 

	this.navv = null;
  }

   static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppInputImageHeader xml={AppStyles.svg.headerStore}  leftParam = "goBack" navv = {navigation} title="Add Product" subtitle="Add a new product"  sml={40}/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
       },
	   headerLeft: null,
	   }
   
    };
	
  _renderQuantityTypes = (src) => {
      
	  console.log(src);
	  
      return src.map((element) => {
								<ProductSelect.Item label={element.name} value={element.value}/>
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
		  this.setState({productImg: fileContents});
		  
		  showMessage({
			 message: "Image uploaded!",
			 type: 'success'
		 });
	  }
  }
  
  _addProduct = () => {
	 //form validation
	  let cp = parseInt(this.state.costPrice), sp = parseInt(this.state.sellingPrice), stk = parseInt(this.state.stock);
	  if(isNaN(cp)) cp = 0;
	  if(isNaN(sp)) sp = 0;
	  if(isNaN(stk)) stk = 0;
	  
  let validationErrors = (this.state.productName.length < 1 || this.state.quantityType ==  "none" || cp < 1 || sp < 1 || stk < 1);
	  if(validationErrors){
	 if(this.state.productName.length < 1){
		 showMessage({
			 message: "Product name must be at least 1 character",
			 type: 'danger'
		 });
	 }
	 if(this.quantityType ==  "none"){
		 showMessage({
			 message: "Please choose a quantity type for your product",
			 type: 'danger'
		 });
	 }
	 if(cp < 1){
		 showMessage({
			 message: "Please add the cost price for your product",
			 type: 'danger'
		 });
	 }
	 if(sp < 1){
		 showMessage({
			 message: "Please add the sale price for your product",
			 type: 'danger'
		 });
	 }
	 if(stk < 1){
		 showMessage({
			 message: "Please add the current stock for your product",
			 type: 'danger'
		 });
	 }
	}
	
	else{
	  const dt = {
		name: this.state.productName,
		quantityType: this.state.quantityType,
		sku: this.state.sku,
		costPrice: this.state.costPrice,
		sellingPrice: this.state.sellingPrice,
		stock: this.state.stock,
		notes: this.state.notes,
		productImg: this.state.productImg,
		categories: this.state.categories,
	 };  
	 
	 console.log(dt);
	 helpers.addProduct(dt,this.navv);	
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
				   
				   <Logo source={{uri: "data:image/png;base64," + this.state.productImg}}/>
				   </ImageUpload>
				   <TopRightInputs>
					<ProductInputWrapper>
					 <ProductDescription>Select quantity type</ProductDescription>
					  <ProductSelect
					    style={{borderColor: this.state.inputBorderBottomColor}}
					    selectedValue={this.state.quantityType}
						mode="dropdown"
					    onValueChange={(value,index) => {this.quantityType = value; this.setState({quantityType: value})}}
					  >
					    <ProductSelect.Item key="qtype-1" label="Quantity type" value="none"/>
						{
							this.state.quantityTypes.map((element) => {
								return <ProductSelect.Item key={"qtype-" + element.key} label={element.name} value={element.value}/>
								})	
						}
					  </ProductSelect>
					</ProductInputWrapper>
				   </TopRightInputs>
				   </Row>
				   <BottomInputs>
				   <ProductInputWrapper>
					 <ProductDescription>Product name</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.nameBorderBottomColor}}
				     placeholder="Product name"
				     onChangeText={text => {
						this.setState({productName: text});
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
					 <ProductDescription>How much does it cost?</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.costPriceBorderBottomColor}}
				     placeholder="Cost price (N)"
				     onChangeText={text => {
						this.setState({costPrice: text});
					 }}
					 onFocus={() => {
						 
						this.setState({costPriceBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({costPriceBorderBottomColor: "#ccc"});
					 }}
					 keyboardType="decimal-pad"
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>How much do you sell it?</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.salePriceBorderBottomColor}}
				     placeholder="Sale price (N)"
				     onChangeText={text => {
						this.setState({sellingPrice: text});
					 }}
					 onFocus={() => {
						 
						this.setState({salePriceBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({salePriceBorderBottomColor: "#ccc"});
					 }}
					 keyboardType="decimal-pad"
					/>
					</ProductInputWrapper>
					<ProductInputWrapper>
					 <ProductDescription>How many do you have on ground?</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.stockBorderBottomColor}}
				     placeholder="Stock"
				     onChangeText={text => {
						this.setState({stock: text});
					 }}
					 onFocus={() => {
						 
						this.setState({stockBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({stockBorderBottomColor: "#ccc"});
					 }}
					 keyboardType="decimal-pad"
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
				       onPress={() => {this._addProduct()}}
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

const ProductSelect = styled.Picker`
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