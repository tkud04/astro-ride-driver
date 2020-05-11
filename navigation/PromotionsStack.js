import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppHomeHeader from '../components/AppHomeHeader';
import AppTransparentHeader from '../components/AppTransparentHeader';
import AppTransparentInputHeader from '../components/AppTransparentInputHeader';
import AppStyles from '../styles/AppStyles';
import PromotionsScreen from '../screens/PromotionsScreen';



/////////////////////////////////////////////////

const Stack = createStackNavigator();


let PromotionsStack = () => (
<Stack.Navigator>
				<Stack.Screen
                  name="Promotions"
	              component={PromotionsScreen}
				  options={({route}) => ({
				  headerStyle: {
		            backgroundColor: "#000",
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="Promotions"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />

				
                </Stack.Navigator>
);

export default PromotionsStack;
