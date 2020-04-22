import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppHomeHeader from '../components/AppHomeHeader';
import AppStyles from '../styles/AppStyles';
import SignoutScreen from '../screens/SignoutScreen';

/////////////////////////////////////////////////

const Stack = createStackNavigator();


let PaymentStack = () => (
<Stack.Navigator>
				<Stack.Screen
                  name="Signout"
	              component={SignoutScreen}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight - 200
	              },
	             header: () => <AppHomeHeader r = {route} title="AstroRide" subtitle="Sign out?" sml={10}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 			
				
                </Stack.Navigator>
);

export default PaymentStack;
