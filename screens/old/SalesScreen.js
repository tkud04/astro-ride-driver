import React from 'react';
import styled from 'styled-components';
import AppImageHeader from '../components/AppImageHeader';
import HeaderMenuButton from '../components/HeaderMenuButton';
import Sale from '../components/Sale';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {ScrollView, Button} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class SalesScreen extends React.Component { 
  constructor(props) {
    super(props);
	this.props.navigation.setParams({goToAddSale: this.goToAddSale});
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
    this.state = { text: '', loading: false,sales: []};	
    this.navv = null;
    this.s = null;	
	this.counter = 0;
	
	helpers.getSales((ss => {
		this.state.sales = ss;
		}));
  }
  
  
   goToSale = () => {
	/**showMessage({
			 message: `Going to sale screen with id ${this.s.id}`,
			 type: 'info'
		 });
	**/
	
	this.navv.navigate('EditSale',{
		s: this.s,
	});  
  }
  
  goToAddSale = () => {
	this.navv.navigate('AddSale');  
  }

   static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppImageHeader xml={AppStyles.svg.headerWallet}  leftParam = "goBack" rightParam = "goToAddSale" navv = {navigation} title="Sales" subtitle="Manage your sales"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
       },
	   headerLeft: null,
	   }
   
    };
	
	xxx = (n) => {
		helpers.logout((r) =>{
			//console.log("r",r);
			if(r.status === "ok"){
				n.navigate('Home');
			}
		});
	}

  render() {
	  let navv = this.props.navigation;
	  this.navv = navv;
	  //this.xxx(this.navv);
    return (
	        <Container>
			  <ScrollView>		     
				  <SearchInput
				    placeholder="Sales id or customer name"
				    onChangeText={text => {
						console.log(`Current text: ${text}`);
					}}
                  />
				  
				   {
					  this.state.sales.map((s) => {
						  //console.log(s);				
                          let ctr = "sale-" + this.counter;
                          ++this.counter;						  
						  return  <SalesButton key={ctr} onPress={() => {this.s = s; this.goToSale()}}><Sale data={s}/></SalesButton>
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
					 border: 1px solid #bcbcbc;
					 border-radius: 5;
					 margin-top: 10px;
`;


const SalesButton = styled.TouchableOpacity`

`;

const MenuButton = styled.TouchableOpacity`

`;