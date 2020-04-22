import React from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import MapView,{Marker} from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import TitleHeader from '../components/TitleHeader';
import HR from '../components/HR';
import SvgIcon from '../components/SvgIcon';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {ScrollView, Dimensions} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');
const LOCATION_TASK_NAME = 'background-location-task';

export default class PaymentScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
	//this.dt = props.navigation.state.params.dt;
	
	
    this.state = { 
				 };	
				 
	this.navv = null;
    
  }
  
    launchDrawer = () => {
	this.navv.toggleDrawer();  
  }
	  
  
  
  _continue = () => {
	 //form validation
	  
 
	 
  }

  _addPaymentMethod = () => {
	 this.navv.navigate('CashPayment',{
		       dt: {}
	        });
  }
  
  render() {
	 let navv = this.props.navigation;
	  this.navv = navv;
    return (
	<ScrollView>
	       <BackgroundImage source={require('../assets/images/bg.jpg')}>
		   
	        <Container>	     

				   <Row style={{flex: 1, marginTop: 15, width: '100%'}}>
				   <PaymentTypeView>
				     <PaymentType>Payment methods</PaymentType>
				   </PaymentTypeView>
				    <ProductInputWrapper>
					 <PaymentTypeWrapper>
					   <PaymentTypeLogo>
					     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardMoney)} w={50} h={30}/>
					   </PaymentTypeLogo>
					   <ProductDescription style={{marginLeft: 15}}>Cash</ProductDescription>
					  </PaymentTypeWrapper>
					  <PaymentButton
					   onPress={() => {this._addPaymentMethod()}}
					  >
					  <PaymentActionText>Add Payment Method</PaymentActionText>
					  </PaymentButton>
					</ProductInputWrapper>
                    </Row>	
                    <HR color={AppStyles.themeColorTransparent}/>	
					<Row style={{flex: 1, marginTop: 5, width: '100%'}}>
				   <PaymentTypeView>
				     <PaymentType>Ride Profiles</PaymentType>
				   </PaymentTypeView>
				    <ProductInputWrapper>
					 <PaymentTypeWrapper>
					   <PaymentTypeLogo>
					     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardUserCircle)} w={50} h={30}/>
					   </PaymentTypeLogo>
					   <ProductDescription style={{marginLeft: 15}}>Personal</ProductDescription>
					  </PaymentTypeWrapper>
					  <PaymentButton
					   onPress={() => {this._continue()}}
					  >
					  <PaymentActionText>Add Profile</PaymentActionText>
					  </PaymentButton>
					</ProductInputWrapper>
                    </Row>	
                    <HR color={AppStyles.themeColorTransparent}/>	
                    <Row style={{flex: 1, marginTop: 5, width: '100%'}}>
				   <PaymentTypeView>
				     <PaymentType>Promotions</PaymentType>
				   </PaymentTypeView>
				    <ProductInputWrapper>
					  <PaymentButton
					   onPress={() => {this._continue()}}
					  >
					  <PaymentActionText>Add Promo Code</PaymentActionText>
					  </PaymentButton>
					</ProductInputWrapper>
                    </Row>	
                    <HR color={AppStyles.themeColorTransparent}/>	
					<Row style={{flex: 1, marginTop: 5, width: '100%'}}>
				   <PaymentTypeView>
				     <PaymentType>Vouchers</PaymentType>
				   </PaymentTypeView>
				    <ProductInputWrapper>
					 <PaymentTypeWrapper>
					   <PaymentTypeLogo>
					     <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardGift)} w={50} h={30}/>
					   </PaymentTypeLogo>
					   <PaymentButton
					   onPress={() => {this._continue()}}
					  >
					  <PaymentActionText style={{marginLeft: 10}}>Vouchers</PaymentActionText>
					  </PaymentButton>
					  </PaymentTypeWrapper>
					  
					</ProductInputWrapper>
                    </Row>					
          				
			</Container>
	
			</BackgroundImage>
				</ScrollView>	
    );
  }
  
}



const BackgroundImage = styled.ImageBackground`
           width: 100%;
		   height: 100%;
`;

const Container = styled.View`
					 background-color: #fff;
					flex: 1;
`;

const ProductInputWrapper = styled.View` 
                   margin-left: 10px;
`;

const ProductDescription = styled.Text` 
                   color: #000;
				   margin-top: 12px;
				   margin-bottom: 2px;
				   font-size: 15px;
				   
`;
					 

const Row = styled.View`
   margin: 5px;
   width: 100%;
`;

const PaymentTypeView = styled.View`
  margin-top: 10px;
  margin-left: 5px;
`;

const PaymentType = styled.Text`
  color: #777;
  font-size: 17;
  font-weight: bold;
  margin-bottom: 15;
`;

const PaymentActionText = styled.Text`
                   color: #00e;
				   margin-top: 12px;
				   margin-bottom: 2px;
				   font-size: 15px;
`;

const PaymentButton = styled.TouchableOpacity`

`;

const PaymentTypeLogo = styled.View`
height: 50;
align-items: center;
justify-content: center;
`;

const PaymentTypeWrapper = styled.View`
flex-direction: row;
`;