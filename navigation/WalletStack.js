import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppHomeHeader from '../components/AppHomeHeader';
import AppTransparentHeader from '../components/AppTransparentHeader';
import AppTransparentInputHeader from '../components/AppTransparentInputHeader';
import AppStyles from '../styles/AppStyles';
import DashboardScreen from '../screens/DashboardScreen';



/////////////////////////////////////////////////

const Stack = createStackNavigator();


let WalletStack = () => (
<Stack.Navigator>
				<Stack.Screen
                  name="Wallet"
	              component={DashboardScreen}
				  options={({route}) => ({
				  headerTransparent: true,
	             header: () => <AppTransparentHeader xml={AppStyles.svg.chartBar}  r = {route} title="AstroRide" subtitle="Dashboard"  sml={100}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />

				
                </Stack.Navigator>
);

export default WalletStack;
