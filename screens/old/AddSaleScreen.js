import React from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import SaleTable from '../components/SaleTable';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {ScrollView} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';



import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class AddSaleScreen extends React.Component { 
  constructor(props) {
    super(props);
	//helpers._getPermissionAsync('camera roll');
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
	this.props = props;
	
    this.state = { inputBorderBottomColor: '#ccc',
                   inputBorderBottomWidth: 1,
				   notesBorderBottomColor: '#ccc',
				   shippingBorderBottomColor: '#ccc',
				   taxBorderBottomColor: '#ccc',
				   discountBorderBottomColor: '#ccc',
				   customerType: "none",
				   loading: false,
				   customerID: "none",
				   hasCustomer: false,
				   formerP: null,
				   formerC: null,
				   products: [],
				   customers: [],
				   saleDate: "",
				   discount: "0",
				   discountType: "flat",
				   tax: "0",
				   taxType: "flat",
				   shipping: "0",
				   notes: "",
				   status: "sold",
				   feesTypes: [{key: 1,name: "Flat", value: "flat"},{key: 2,name: "%", value: "percentage"}],
				   tableData: {
		               headers:["Product","Qty","price(N)","Subtotal(N)"],
		               rows:[
		                ["Product 1","4","1500","6000"],
		                ["Product 4","2","1000","6000"],
		                ["Product 7","3","6000","18000"],
		                ["Product 3","10","3000","30000"],
		              ]
	                },
					productsTable: {
		               headers:["Product","Qty","price(N)","Subtotal(N)"],
		               rows:[],
					   total: 0
	                }
				 };	
    this.p = {};
    this.c = {};
	
	this.populateProducts();
	this.populateCustomers();
	
	this.navv = null;
  }
  
    getTotal = (products) => {
	let ret = 0;
	
	for(let i = 0; i < products.length; i++){
		let p = products[i];
		console.log("p: ",p);
		ret += (parseInt(p[2]) * parseInt(p[3]));
	}
    console.log("ret: ",ret);
    this.state.productsTable.total = ret;	
  }
  
  populateProducts = () => {
	  try{
	       this.p = this.props.navigation.state.params.p;
		   console.log("p: ",this.p);
		   let canAddThisProduct = false;
		   
		 if(this.state.products.length < 1){
			 canAddThisProduct = true;
		 }
		 else{
			 console.log("state products: ",this.state.products);
           if(!this.state.products.some(p => p.sku === this.p.sku)){
			  console.log("inside if");
		      canAddThisProduct = true;
		    }
		 }
		 if(canAddThisProduct && this.p){
		   this.state.formerP = this.p;
		   this.state.products.push(this.p);
		    let subtotal = parseInt(this.p.sellingPrice) * this.p.qty;
		  this.state.productsTable.rows.push([this.p.sku,this.p.name,this.p.qty,this.p.sellingPrice]);
		   
		   this.getTotal(this.state.productsTable.rows);
		 }
	}
	catch(err){
		console.log(err);
		console.log('no product has been selected');
	} 
	//console.log("Products\n");
	//console.log(this.state.products);
  }

  populateCustomers = () => {
	  try{
	  this.c = this.props.navigation.state.params.c;
	  if(this.c != this.state.formerC){
		 this.state.formerC = this.c;
		this.state.customers.push(this.c);
		this.state.hasCustomer = true;
	  }
	}
	catch(err){
		console.log('no customer has been selected');
	} 
	//console.log("Customers\n");
	//console.log(this.state.customers);
  }
  
  static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppInputImageHeader xml={AppStyles.svg.headerWallet}  leftParam = "goBack" navv = {navigation} title="Add Sale" subtitle="Add a new sale"  sml={40}/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
       },
	   headerLeft: null,
	   }
   
    };
	  
	  
  _renderTypes = (src) => {
      
	  console.log(src);
	  
      return src.map((element) => {
								<ProductSelect.Item label={element.name} value={element.value}/>
								});						
  }

  _renderCustomers = () => {
      
	  
	  
      this.state.customers.map((element) => {
								return <ProductSelect.Item key={element.id} label={element.customerName} value={element.id}/>
								});						
  }
  
   goToSelectProduct = () => {
	this.navv.navigate('SelectProduct',{
		from: "AddSale",
	});  
  }  
  goToSelectCustomer = () => {
	this.navv.navigate('SelectCustomer');  
  }  
  
updateCustomer =() => {
	if(this.state.hasCustomer){
						return (
					  <AddProductsView>
					    <CustomerText>{this.state.customers[0].customerName}</CustomerText>
					  </AddProductsView>				  
					  );
					  }
					  else{
						 return (
					  <ProductUpload
					     onPress={() => this.goToSelectCustomer()}
					  >
					  <AddProductsView>
					    <AddProductsText>Click here</AddProductsText>
					  </AddProductsView>				  
					  </ProductUpload>
					  );
					  }
}

_addSale = () => {
	//console.log(this.state);
	 //form validation
	  let shipping = parseInt(this.state.shipping), tax = parseInt(this.state.tax), discount = parseInt(this.state.discount);
	 
	  if(isNaN(shipping)) shipping = 0;
	  if(isNaN(tax)) tax = 0;
	  if(isNaN(discount)) discount = 0;
	  
  let validationErrors = (this.state.customers.length < 1 || this.state.products.length < 1 || this.state.taxType == "none" || this.state.discountType ==  "none" || tax < 0 || discount < 0);
	  if(validationErrors){
	 if(this.state.customers.length < 1){
		 showMessage({
			 message: "Please add a customer",
			 type: 'danger'
		 });
	 }
	 if(this.state.products.length < 1){
		 showMessage({
			 message: "Please add a product",
			 type: 'danger'
		 });
	 }
	 if(this.state.taxType == "none"){
		 showMessage({
			 message: "Please select a valid tax type",
			 type: 'danger'
		 });
	 }
	 if(this.state.discountType ==  "none"){
		 showMessage({
			 message: "Please select a valid discount type",
			 type: 'danger'
		 });
	 }
	 if(tax < 0){
		 showMessage({
			 message: "Please add a valid tax amount",
			 type: 'danger'
		 });
	 }
	 if(discount < 0){
		 showMessage({
			 message: "Please add a valid discount amount",
			 type: 'danger'
		 });
	 }
	}
	else{
		let dt = {
			customers: this.state.customers,
			products: this.state.products,
			taxType: this.state.taxType,
			discountType: this.state.discountType,
            shipping: shipping,
            tax: tax,
            discount: discount			
		};
		
		console.log(dt);
		helpers.addSale(dt,this.navv);
	}
}
  
  render() {
	  let navv = this.props.navigation;
	  this.navv = navv;
	  this.populateProducts();
	  this.populateCustomers();
	   
    return (
	         <BackgroundImage source={require('../assets/images/bg.jpg')}>
	        <Container>
			  <ScrollView>		     
                   
				   <Row style={{marginTop: 10}}>				   
				   <Logo>
				    <AddedBy>Added by myself</AddedBy>
				   </Logo>
				   <TopRightInputs>
					<ProductInputWrapper>
					 <ProductDescription style={{alignItems: 'center'}}>Customer</ProductDescription>
					 {
					    this.updateCustomer()
					 }
                    </ProductInputWrapper>
                    <ProductInputWrapper>
					 <ProductDescription>Add products</ProductDescription>
					  <ProductUpload
					     onPress={() => this.goToSelectProduct()}
					  >
					  <AddProductsView>
					    <AddProductsText>Click here</AddProductsText>
					  </AddProductsView>				  
					  </ProductUpload>
					</ProductInputWrapper>					
				   </TopRightInputs>
				   </Row>
				   <TableDiv>
				   <SaleTable data={this.state.productsTable}/>
				   </TableDiv>
				   <BottomInputs>
				   <ProductInputWrapper>
					 <ProductDescription>Shipping(N)</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.shippingBorderBottomColor}}
				     placeholder="Shipping fee"
					 
				     onChangeText={text => {
						this.setState({shipping: text});
					 }}
					 onFocus={() => {
						 
						this.setState({shippingBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({shippingBorderBottomColor: "#ccc"});
					 }}
					  keyboardType="decimal-pad"
					/>
					</ProductInputWrapper>
					<ProductInputWrapper style={{flexDirection: 'row'}}>
					<BigInputWrapper>
					<ProductDescription>Tax(N)</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.taxBorderBottomColor}}
				     placeholder="Tax"
					
				     onChangeText={text => {
						this.setState({tax: text});
					 }}
					 onFocus={() => {
						 
						this.setState({taxBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({taxBorderBottomColor: "#ccc"});
					 }}
					  keyboardType="decimal-pad"
					/>
					</BigInputWrapper>					
					<SmallInputWrapper>
					<ProductDescription>Type</ProductDescription>
					<CustomSelect
					    style={{borderColor: this.state.inputBorderBottomColor}}
					    selectedValue={this.state.taxType}
						mode="dropdown"
					    onValueChange={(value,index) => {this.setState({taxType: value})}}
					  >
					    <CustomSelect.Item key="gtype-1" label="Tax type" value="none"/>
						{
							this.state.feesTypes.map((element) => {
								return <CustomSelect.Item key={"gtype-" + element.key} label={element.name} value={element.value}/>
								})	
						}
					  </CustomSelect>
					</SmallInputWrapper>
					</ProductInputWrapper>
					<ProductInputWrapper style={{flexDirection: 'row'}}>
					<BigInputWrapper>
					<ProductDescription>Discount(N)</ProductDescription>
				    <ProductInput
					style={{borderColor: this.state.discountBorderBottomColor}}
				     placeholder="Discount"
					 
				     onChangeText={text => {
						this.setState({discount: text});
					 }}
					 onFocus={() => {
						 
						this.setState({discountBorderBottomColor: "#00a2e8"});
					 }}
					 onBlur={() => {
						
						this.setState({discountBorderBottomColor: "#ccc"});
					 }}
					  keyboardType="decimal-pad"
					/>
					</BigInputWrapper>					
					<SmallInputWrapper>
					<ProductDescription>Type</ProductDescription>
					<CustomSelect
					    style={{borderColor: this.state.inputBorderBottomColor}}
					    selectedValue={this.state.discountType}
						mode="dropdown"
					    onValueChange={(value,index) => {this.setState({discountType: value})}}
					  >
					    <CustomSelect.Item key="gtype-1" label="Discount type" value="none"/>
						{
							this.state.feesTypes.map((element) => {
								return <CustomSelect.Item key={"gtype-" + element.key} label={element.name} value={element.value}/>
								})	
						}
					  </CustomSelect>
					</SmallInputWrapper>
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
					/>
					</ProductInputWrapper>
				   </BottomInputs>
                  <SubmitButton
				       onPress={() => {this._addSale()}}
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

const BigInputWrapper = styled.View` 
                  flex: 3;
`;

const SmallInputWrapper = styled.View` 
                  flex: 1;
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

const ProductUpload = styled.TouchableOpacity`

`;

const ContactUpload = styled.TouchableOpacity`

`;

const AddProductsView = styled.View`
 background-color: green;
 border-radius: 10px;
`;

const ContactText = styled.Text` 
                   color: #fff;
				   background-color: green;
				   margin-bottom: 6px;
				   font-size: 16px;
				   padding: 8px;
`;
					 
const Logo = styled.View`
           width: 66px;
		   height: 66px;
		   background: #fff;
		   border-radius: 33px;
		   border: 1px solid green;
		   margin-left: 8px;
`;

const AddedBy = styled.Text` 
                   color: green;
				   font-size: 13px;
				   padding: 8px;
`;

const AddProductsText = styled.Text` 
                   color: #fff;
				   margin-bottom: 2px;
				   font-size: 16px;
				   padding: 8px;
`;

const CustomerText = styled.Text` 
                   color: #fff;
				   margin-bottom: 2px;
				   font-size: 14px;
				   padding: 4px;
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
   flex-direction: row;
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

const TableDiv = styled.View`
   margin-top: 10px;
   margin-left: 10px;
   margin-bottom: 10px;
   width: 90%;
`;

const CustomSelect = styled.Picker`
    width: 90%;
	height: 50;
	color: #000;
	margin-bottom: 20px;
`;