import React from 'react';
import styled from 'styled-components';
import AppImageHeader from '../components/AppImageHeader';
import HeaderMenuButton from '../components/HeaderMenuButton';
import Customer from '../components/Customer';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {ScrollView, Button} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class CustomersScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({goToAddCustomer: this.goToAddCustomer});
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
    this.state = { text: '', loading: false,customers: []};	
    this.navv = null;
    this.c = null;	
	
	helpers.getCustomers((cc => {
		this.state.customers = cc;
		}));
  }
  
  
   goToCustomer = () => {
	/**showMessage({
			 message: `Going to customer screen with id ${this.c.id}`,
			 type: 'info'
		 });
	**/
	this.navv.navigate('EditCustomer',{
		c: this.c,
	});  
  }
  
  goToAddCustomer = () => {
	this.navv.navigate('AddCustomer');  
  }

   static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppImageHeader xml={AppStyles.svg.headerUsers}  leftParam = "goBack" rightParam = "goToAddCustomer" navv = {navigation} title="Customers" subtitle="Manage your customers"/>,
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
				    placeholder="Customer name, email or phone number"
				    onChangeText={text => {
						console.log(`Current text: ${text}`);
					}}
                  />
				  
				  {
					  this.state.customers.map((c) => {
						  //console.log(p);							  
						  return  <CustomerButton key={c['id']} onPress={() => {this.c = c; this.goToCustomer()}}><Customer data={c}/></CustomerButton>
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


const CustomerButton = styled.TouchableOpacity`

`;

const MenuButton = styled.TouchableOpacity`

`;
