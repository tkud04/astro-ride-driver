import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppHomeHeader from '../components/AppHomeHeader';
import AppStyles from '../styles/AppStyles';
import PaymentScreen from '../screens/PaymentScreen';
import CashPaymentScreen from '../screens/CashPaymentScreen';

/////////////////////////////////////////////////

const Stack = createStackNavigator();


let PaymentStack = () => (
<Stack.Navigator>
				<Stack.Screen
                  name="Payment"
	              component={PaymentScreen}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight - 200
	              },
	             header: () => <AppHomeHeader r = {route} title="AstroRide" subtitle="Payment" sml={10}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 		
				<Stack.Screen
                  name="CashPayment"
	              component={CashPaymentScreen}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight - 200
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="Cash" sml={20}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 				
				
                </Stack.Navigator>
);

export default PaymentStack;
