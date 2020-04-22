import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppHomeHeader from '../components/AppHomeHeader';
import AppStyles from '../styles/AppStyles';
import TripsScreen from '../screens/TripsScreen';

/////////////////////////////////////////////////

const Stack = createStackNavigator();


let TripsStack = () => (
<Stack.Navigator>
                  <Stack.Screen
                  name="Trips"
	              component={TripsScreen}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight
	              },
	             header: () => <AppHomeHeader xml={AppStyles.svg.chartBar}  r = {route} title="AstroRide" subtitle="Trips"  sml={40}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 					
				
                </Stack.Navigator>
);

export default TripsStack;
