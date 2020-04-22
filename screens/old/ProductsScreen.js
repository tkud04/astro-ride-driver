import React from 'react';
import styled from 'styled-components';
import AppImageHeader from '../components/AppImageHeader';
import HeaderMenuButton from '../components/HeaderMenuButton';
import Product from '../components/Product';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {ScrollView, Button} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class ProductsScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({goToAddProduct: this.goToAddProduct});
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
    this.state = { 
	    text: '',
	    loading: false,
		products: [],
		navvv: null
    };	
    this.navv = null;
    this.p = null;
	
	helpers.getProducts((pp => {
		//pp.ri = require(pp.img);
		this.setState({products: pp});
		}));

	//console.log(this.state.products);
  }

  goToProduct = () => {
	/**showMessage({
			 message: `Going to product screen with sku ${this.p.sku}`,
			 type: 'info'
		 });
	**/
	this.navv.navigate('EditProduct',{
		p: this.p,
	});  
  }
  
  goToAddProduct = () => {
	this.navv.navigate('AddProduct');  
  }
  
   static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppImageHeader xml={AppStyles.svg.headerStore}  leftParam = "goBack" rightParam = "goToAddProduct" navv = {navigation} title="Products" subtitle="Manage your products"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
       },
	   headerLeft: null,
	   }
   
    };



  render() {
	  let navv = this.props.navigation;
	  this.navv = navv;
    return (
	        <Container>
			  <ScrollView>		     
				  <SearchInput
				    placeholder="Product name or SKU"
				    onChangeText={text => {
						console.log(`Current text: ${text}`);
					}}
                  />
				  
				  {
					  this.state.products.map((p) => {
						  //console.log(p);					  
						  return  <ProductButton key={p['sku']} onPress={() => {this.p = p; this.goToProduct()}}><Product data={p}/></ProductButton>
					  })
				  }
                		  
			  </ScrollView>
			</Container>
    );
  }
  
}

const Container = styled.View`
                     flex: 1;
					 background-color: #fff;
					 justify-content: center;
					 align-items: center;
`;
					 
const SearchInput = styled.TextInput`
					 align-items: center;
					 border-radius: 5;
					 margin-top: 10px;
					 border: 1px solid #bbb;
					 padding: 10px;
					 margin-bottom: 20px;
					 color: #ccc;
`;

const ProductButton = styled.TouchableOpacity`

`;

const MenuButton = styled.TouchableOpacity`

`;

