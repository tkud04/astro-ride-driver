import React from 'react';
import styled from 'styled-components';
import AppInputImageHeader from '../components/AppInputImageHeader';
import Product from '../components/Product';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {ScrollView, Button} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class SelectProductScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({goToAddProduct: this.goToAddProduct});
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
	
	this.from = props.navigation.state.params.from;
	this.n = props.navigation.state.params.n;
	
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

	console.log(this.state.products);
  }

  selectProduct = () => {
	  this.navv.navigate('SelectProductFinal',{
		from: this.from,
		p: this.p,
		n: this.n
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
	   headerTitle: () => <AppInputImageHeader xml={AppStyles.svg.headerWallet}  leftParam = "goBack" navv = {navigation} title="Add product" subtitle="Choose a product" sml={60}/>,
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
						  return  <ProductButton key={p['sku']} onPress={() => {this.p = p; this.selectProduct()}}><Product data={p}/></ProductButton>
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

